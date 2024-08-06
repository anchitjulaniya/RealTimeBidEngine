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
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });

    // Find participant
    let participant = bid.participants.find(p => p.userId.toString() === userId);
    if (!participant) return res.status(400).json({ message: 'User not participating' });

    // Update or add bid
    const existingBid = participant.bids.find(b => b.itemId.toString() === itemId);
    if (existingBid) {
      existingBid.amount = amount;
    } else {
      participant.bids.push({ itemId, amount });
    }

    // Update highest bid for the item
    const bidItem = bid.bidItems.find(i => i.itemId.toString() === itemId);
    if (bidItem) {
      bidItem.currentHighestBid = Math.max(...bid.participants.flatMap(p => p.bids.filter(b => b.itemId.toString() === itemId).map(b => b.amount)), bidItem.currentHighestBid);
    }

    await bid.save();
    res.status(200).json(bid);
  } catch (error) {
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
