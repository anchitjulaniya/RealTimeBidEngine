const express = require("express");
const http = require('http'); // http
const socketIo = require('socket.io'); // socket
const actionRoute = require("./Routes/BidAction");
const inviteRoute = require("./Routes/BidInvitation");
const RealTimeUpdateRoute = require("./Routes/RealTimeUpdate");
const collectionRoute = require("./Routes/BidCollection");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Middleware
app.use(express.json());


// Database Connection

// Routes
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

mongoose.connect("mongodb://localhost:27017/RealTimeBidEngine", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// server is listening
app.listen(3000, () => {
  console.log("listening on port 3000");
});
