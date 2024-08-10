const express = require('express')

const InviteController = require('../Controller/BidInvitation')

const router = express.Router()

router.post('/api/bids/:id/invite ',InviteController.invite)

module.exports = router