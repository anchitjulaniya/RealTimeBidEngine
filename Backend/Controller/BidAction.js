// controllers/bidActionController.js
const Bid = require('../Model/BidCollection');

// Accept a bid request
exports.acceptBid = async (req, res) => {
  try {
    const { userId } = req.body; // The ID of the user accepting the bid
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });

    // Check if user is already a participant
    const participant = bid.participants.find(p => p.userId.toString() === userId);
    if (participant) return res.status(400).json({ message: 'User already participating' });

    // Add user as participant
    bid.participants.push({ userId, bids: [] });
    await bid.save();

    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reject a bid request
exports.rejectBid = async (req, res) => {
  try {
    const { userId } = req.body;
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });

    // Remove user from participants
    bid.participants = bid.participants.filter(p => p.userId.toString() !== userId);
    await bid.save();

    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Place or update a bid
exports.placeBid = async (req, res) => {
  try {
    const { userId, itemId, amount } = req.body;

    // Fetch the bid document
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });

    // Find the participant in the bid
    let participant = bid.participants.find(p => p.userId.toString() === userId);
    if (!participant) return res.status(400).json({ message: 'User not participating' });

    // Check if the user already placed a bid on this item
    const existingBid = participant.bids.find(b => b.itemId.toString() === itemId);
    if (existingBid) {
      // Update the existing bid amount
      existingBid.amount = amount;
    } else {
      // Add a new bid for the item
      participant.bids.push({ itemId, amount });
    }

    // Update the current highest bid for the item
    const bidItem = bid.bidItems.find(i => i._id.toString() === itemId);
    if (bidItem) {
      bidItem.currentHighestBid = Math.max(
        ...bid.participants.flatMap(p => p.bids.filter(b => b.itemId.toString() === itemId).map(b => b.amount)),
        amount
      );
    }

    // Save the bid with updated information
    await bid.save();

    // Emit bid update to connected clients
    req.app.get('io').emit('bidUpdate', { bidId: bid._id, participantId: userId, itemId, amount });

    // Send a successful response with the updated bid
    res.status(200).json({ success: true, bid });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(400).json({ error: error.message });
  }
};


// Get real-time leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });

    // Prepare leaderboard
    const leaderboard = bid.participants.map(p => ({
      userId: p.userId,
      totalBidAmount: p.bids.reduce((sum, b) => sum + b.amount, 0)
    })).sort((a, b) => b.totalBidAmount - a.totalBidAmount);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
