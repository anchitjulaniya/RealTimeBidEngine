// controllers/bidController.js
const Bid = require('../Model/BidCollection');

// Create a new bid
exports.createBid = async (req, res) => {
  try {
    const bid = new Bid(req.body);
    await bid.save();
    res.status(201).json({
      status : true,
      result : bid
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all bids
exports.getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find() // .populate('participants.userId');
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bids', error: error.message });
  }
};

// Get a specific bid
exports.getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    console.log(bid)
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.status(200).json({
      status : true,
      result : bid
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a bid
exports.updateBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.status(200).json({
      status : true,
      result : bid
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Publish a bid
exports.publishBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, { status: 'published' }, { new: true });
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    // 
    res.status(200).json({
      status : true,
      result : bid
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Close a bid
exports.closeBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, { status: 'closed' }, { new: true });
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.status(200).json({
      status : true,
      result : bid
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
