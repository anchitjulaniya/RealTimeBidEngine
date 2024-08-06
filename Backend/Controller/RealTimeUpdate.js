const leaderboard  = (req, res,next) => {
    res.json({
        success: true,
        message: 'Bid Invited'
    })
}

const RealTimeUpdateController = {
    leaderboard
}

module.exports = RealTimeUpdateController