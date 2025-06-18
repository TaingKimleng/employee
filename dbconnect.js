// dbconnect.js
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || "mongodb+srv://kimleng:<db_password>@midterm.hniszn4.mongodb.net/?retryWrites=true&w=majority&appName=midterm";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('🔁 Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
