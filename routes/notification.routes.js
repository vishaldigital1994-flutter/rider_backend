const express = require("express");
const Notification = require("../models/notification.model");

const router = express.Router();

// GET notifications
router.get("/:profileId", async (req, res) => {
  try {
    const list = await Notification.find({
      profileId: req.params.profileId,
    }).sort({ createdAt: -1 });

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MARK READ
router.patch("/:id/read", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
