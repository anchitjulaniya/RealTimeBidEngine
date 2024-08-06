const express = require('express')
const actionRoute = require('./Routes/BidAction')
const inviteRoute = require('./Routes/BidInvitation')
const RealTimeUpdateRoute = require('./Routes/RealTimeUpdate')
const app = express()

app.use(express.json())

app.use(actionRoute)

app.use(inviteRoute)

app.use(RealTimeUpdateRoute)

app.listen(3000,()=>{
    console.log('listening on port 3000')
})