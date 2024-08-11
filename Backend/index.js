const express = require("express");
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const actionRoute = require("./Routes/BidAction");
const inviteRoute = require("./Routes/BidInvitation");
const RealTimeUpdateRoute = require("./Routes/RealTimeUpdate");
const collectionRoute = require("./Routes/BidCollection");
const dotenv = require('dotenv');
const authMiddleware = require('./Middleware/authMiddleware');
const userRoute = require('./Routes/User');
const cors = require('cors');
const app = express();
dotenv.config();

// Create the server after defining `app`
const server = http.createServer(app);

// Initialize Socket.IO with CORS options
const io = socketIo(server, {
  cors: {
    origin:   'https://real-time-bid-engine.vercel.app'
    ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

// Middleware
app.use(express.json());

const allowedOrigins = 'https://real-time-bid-engine.vercel.app';

// CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.BASE_URL)
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
  });

// Routes
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

// Server is listening
server.listen(1000, () => {
  console.log("Listening on port 1000");
});
