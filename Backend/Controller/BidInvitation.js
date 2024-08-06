const invite = (req, res,next) => {
    res.json({
        success: true,
        message: 'Bid Invited'
    })
}

const InviteController = {
    invite
}

module.exports = InviteController