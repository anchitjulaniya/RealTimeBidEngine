const express = require('express')
const actionRoute = require('./Routes/BidAction')
const inviteRoute = require('./Routes/BidInvitation')
const RealTimeUpdateRoute = require('./Routes/RealTimeUpdate')
const app = express()

//Middleware 
app.use(express.json())

// Database Connection
mongoose.connect('mongodb://localhost:27017/RealTimeBidEngine', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use(actionRoute)

app.use(inviteRoute)

app.use(RealTimeUpdateRoute)



// server is listening
app.listen(3000,()=>{
    console.log('listening on port 3000')
})