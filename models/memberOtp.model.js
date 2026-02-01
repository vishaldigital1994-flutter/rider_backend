const mongoose = require("mongoose");

const memberOtpSchema = new mongoose.Schema({
  memberId: String,
  mobile: String,
  otp: String,
  expiresAt: Date,
});

module.exports = mongoose.model("MemberOtp", memberOtpSchema);
