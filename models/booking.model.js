const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    adminProfileId: {
      type: String,
      required: true,
    },

    pickup: {
      address: String,
      lat: Number,
      lng: Number,
    },

    drop: {
      address: String,
      lat: Number,
      lng: Number,
    },

    status: {
      type: String,
      enum: ["CREATED", "ACCEPTED", "STARTED", "COMPLETED", "CANCELLED"],
      default: "CREATED",
    },

    accessories: {
      helmet: Boolean,
      mask: Boolean,
      medicalKit: Boolean,
    },

    payment: {
      amount: Number,
      method: String,
      paid: Boolean,
    },

    sosRaised: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
