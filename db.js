const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://aotrider:aotrider2026@aotrider-cluster.wt8rrm7.mongodb.net/aotrider?retryWrites=true&w=majority";

async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");
}

module.exports = { connectDB };
