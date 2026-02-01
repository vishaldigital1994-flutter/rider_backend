const express = require("express");
const Booking = require("../models/booking.model");

const router = express.Router();

/**
 * CREATE BOOKING
 */
router.post("/", async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json(booking);
});

/**
 * GET LIVE BOOKINGS
 */
router.get("/live/:adminId", async (req, res) => {
  const bookings = await Booking.find({
    adminProfileId: req.params.adminId,
    status: { $in: ["CREATED", "ACCEPTED", "STARTED"] },
  });

  res.json(bookings);
});

/**
 * CANCEL BOOKING
 */
router.put("/:id/cancel", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "CANCELLED",
  });

  res.json({ success: true });
});

/**
 * SOS
 */
router.post("/:id/sos", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    sosRaised: true,
  });

  res.json({ success: true });
});

/**
 * BOOKING HISTORY
 */
router.get("/history/:adminId", async (req, res) => {
  const bookings = await Booking.find({
    adminProfileId: req.params.adminId,
    status: { $in: ["COMPLETED", "CANCELLED"] },
  }).sort({ createdAt: -1 });

  res.json(bookings);
});


module.exports = router;
