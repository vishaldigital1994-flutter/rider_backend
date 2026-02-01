const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema(
  {
    profileId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relation: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmergencyContact", emergencyContactSchema);
