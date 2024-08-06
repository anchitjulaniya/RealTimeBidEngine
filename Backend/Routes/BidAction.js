const express = require('express')
const ActionController = require('../Controller/BidAction')

const router = express.Router()

router.post('/api/bids/:id/publish',ActionController.publish)

router.post('/api/bids/:id/close',ActionController.close)

module.exports = router