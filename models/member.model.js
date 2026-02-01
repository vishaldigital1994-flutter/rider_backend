const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    adminProfileId: {
      type: String,
      required: true,
    },
    name: String,
    gender: {
      type: String,
      enum: ["Female"],
      default: "Female",
    },
    mobile: String,
    category: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
