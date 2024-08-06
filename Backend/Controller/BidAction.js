
const publish = (req, res,next) => {
    res.json({
        success: true,
        message: 'Bid Published'
    })
}

const close = (req, res,next) => {
    res.json({
        success: true,
        message: 'Bid Closed'
    })
}

const ActionController = {
    publish,
    close
}

module.exports = ActionController