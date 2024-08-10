const express = require('express')

const RealTimeUpdateController = require('../Controller/RealTimeUpdate')

const router = express.Router()

router.get('/api/bids/:id/leaderboard  ',RealTimeUpdateController.leaderboard)

module.exports = router