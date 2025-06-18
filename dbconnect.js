const mongoose = require('mongoose');
require('dotenv').config(); // Load from .env

const uri = process.env.MONGODB_URI;

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

// Connect and keep the connection alive
mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// No disconnect here — keep the connection open for the app to use
module.exports = mongoose;
