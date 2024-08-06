// routes/bidParticipationRoutes.js
const express = require('express');
const router = express.Router();
const bidParticipationController = require('../Controller/BidAction');

// Accept a bid request
router.post('/:id/accept', bidParticipationController.acceptBid);

// Reject a bid request
router.post('/:id/reject', bidParticipationController.rejectBid);

// Place or update a bid
router.post('/:id/bid', bidParticipationController.placeBid);

// Get real-time leaderboard
router.get('/:id/leaderboard', bidParticipationController.getLeaderboard);

module.exports = router;
