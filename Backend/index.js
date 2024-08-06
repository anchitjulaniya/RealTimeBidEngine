// app.js or index.js
const express = require('express');
const mongoose = require('mongoose');
const bidRoutes = require('./routes/bidRoutes');

const app = express();

// Middleware
app.use(express.json());

// DataBase Connection
mongoose.connect('mongodb://localhost:27017/RealTimeBidEngine', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/bids', bidRoutes);



// 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
