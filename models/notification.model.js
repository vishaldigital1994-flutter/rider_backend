const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    profileId: {
      type: String, // ✅ CHANGED
      required: true,
    },
    title: String,
    body: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
