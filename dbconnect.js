const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const uri = process.env.MONGODB_URI;

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

// Check if a connection already exists
if (mongoose.connection.readyState === 0) {
  mongoose.connect(uri, clientOptions)
    .then(() => {
      console.log("✅ Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
    });
} else {
  console.log("🔁 Reusing existing MongoDB connection");
}

module.exports = mongoose;
