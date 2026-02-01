const express = require("express");
const Scheduler = require("../models/scheduler.model");

const router = express.Router();

/// CREATE
router.post("/", async (req, res) => {
  const scheduler = await Scheduler.create(req.body);
  res.status(201).json(scheduler);
});

/// GET BY MEMBER
router.get("/member/:memberId", async (req, res) => {
  const list = await Scheduler.find({
    memberId: req.params.memberId,
  }).sort({ scheduleDate: 1 });

  res.json(list);
});

/// DELETE
router.delete("/:id", async (req, res) => {
  await Scheduler.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
