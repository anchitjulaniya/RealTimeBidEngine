const leaderboard  = (req, res,next) => {
    res.json({
        success: true,
        message: 'Bid updated'
    })
}

const RealTimeUpdateController = {
    leaderboard
}

module.exports = RealTimeUpdateController