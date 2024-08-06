// models/Bid.js
const mongoose = require('mongoose');

const BidItemSchema = new mongoose.Schema({
  itemId: mongoose.Schema.Types.ObjectId,
  description: String,
  currentHighestBid: Number
});

const BidSchema = new mongoose.Schema({
  title: String,
  bidItems: [BidItemSchema],
  startTime: Date,
  endTime: Date,
  status: {
    type: String,
    enum: ['draft', 'published', 'closed'],
    default: 'draft'
  },
  participants: [{
    userId: mongoose.Schema.Types.ObjectId,
    bids: [{
      itemId: mongoose.Schema.Types.ObjectId,
      amount: Number
    }]
  }]
});

module.exports = mongoose.model('Bid', BidSchema);
