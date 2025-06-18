const mongoose = require('mongoose');

const uri = "mongodb+srv://kimleng:<db_password>@midterm.hniszn4.mongodb.net/?retryWrites=true&w=majority&appName=midterm";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // optional: exit if DB connection fails
  }
};

module.exports = connectDB;
