const express = require("express");
const Member = require("../models/member.model");
const MemberOtp = require("../models/memberOtp.model");

const router = express.Router();

/**
 * ✅ ADD MEMBER
 * POST /api/members
 */
router.post("/", async (req, res) => {
  try {
    const member = await Member.create({
      adminProfileId: req.body.adminProfileId,
      name: req.body.name,
      gender: "Female",
      mobile: req.body.mobile,
      category: req.body.category,
      isAdmin: req.body.isAdmin || false,
      isVerified: false,
      active: true,
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ GET MEMBERS BY ADMIN
 * GET /api/members/:adminId
 */
router.get("/:adminId", async (req, res) => {
  try {
    const members = await Member.find({
      adminProfileId: req.params.adminId,
      active: true,
    }).sort({ createdAt: -1 });

    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ UPDATE MEMBER
 */
router.put("/:id", async (req, res) => {
  const member = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(member);
});

/**
 * ✅ SOFT DELETE
 */
router.delete("/:id", async (req, res) => {
  await Member.findByIdAndUpdate(req.params.id, { active: false });
  res.json({ success: true });
});

module.exports = router;
