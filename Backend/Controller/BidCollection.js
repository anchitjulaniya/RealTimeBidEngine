// controllers/bidController.js
const Bid = require('../Model/BidCollection');

// Create a new bid
exports.createBid = async (req, res) => {
  try {
    const bid = new Bid(req.body);
    await bid.save();
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific bid
exports.getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a bid
exports.updateBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Publish a bid
exports.publishBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, { status: 'published' }, { new: true });
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    // Here you would also handle sending invitations to bidders
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Close a bid
exports.closeBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, { status: 'closed' }, { new: true });
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
