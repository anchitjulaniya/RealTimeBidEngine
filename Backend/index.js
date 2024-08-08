const express = require("express");
const mongoose = require('mongoose')
const http = require('http'); // http
const socketIo = require('socket.io'); // socket
const actionRoute = require("./Routes/BidAction");
const inviteRoute = require("./Routes/BidInvitation");
const RealTimeUpdateRoute = require("./Routes/RealTimeUpdate");
const collectionRoute = require("./Routes/BidCollection");
const dotenv = require('dotenv')
const authMiddleware = require('./Middleware/authMiddleware')
const userRoute = require('./Routes/User')
const cors = require('cors')
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

dotenv.config();

//Middleware
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173','https://real-time-bid-engine.vercel.app/'];

// CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

mongoose.connect(`${process.env.BASE_URL}`)
.then(()=>{console.log("Database is Connected Successfully")})
.catch((Error)=>{console.log(`MongoDB Error : `, Error);
})

// const authRoutes = require('./Routes/User')
// Routes
// app.use('/api/auth', authRoutes);

app.use('/api/user', userRoute);
app.use(actionRoute);
app.use(collectionRoute);
app.use(inviteRoute);

app.use(RealTimeUpdateRoute);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');
  
    // Handle bid updates
    socket.on('placeBid', (bidData) => {
      io.emit('bidUpdate', bidData); // Broadcast the bid update to all clients
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });



// server is listening
app.listen(1000, () => {
  console.log("listening on port 1000");
});
