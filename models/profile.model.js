const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    emergencyContact: String,
    customerType: String,
    bio: String,
    dob: String,
    gender: String,
    language: String,
    imageUrl: String,
    imagePublicId: String,
    verificationDocUrl: String,
    verificationDocPublicId: String,
    points: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    badges: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
