const mongoose = require("mongoose");

const schedulerSchema = new mongoose.Schema(
  {
    memberId: String,

    scheduleDate: Date,
    scheduleType: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Custom"],
    },

    autoBooking: Boolean,
    reminder: Boolean,

    note: String,

    pickup: {
      address: String,
    },
    drop: {
      address: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scheduler", schedulerSchema);
