// routes/bidRoutes.js
const express = require('express');
const router = express.Router();
const bidController = require('../Controller/BidCollection');

// Create a new bid
router.post('/', bidController.createBid);

// Get a specific bid by ID
router.get('/:id', bidController.getBidById);

// Update a bid
router.put('/:id', bidController.updateBid);

// Publish a bid
router.post('/:id/publish', bidController.publishBid);

// Close a bid
router.post('/:id/close', bidController.closeBid);

module.exports = router;
