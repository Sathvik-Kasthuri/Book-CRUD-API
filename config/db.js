const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection Established");
    console.log("MONGO_URI:", process.env.MONGO_URI);
  } catch (error) {
    console.error("Connection Failed:", error.message);
  }
};

module.exports = connectDB;
