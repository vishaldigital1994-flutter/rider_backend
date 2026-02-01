const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Profile = require("../models/profile.model");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ----------------------------
// GET profile
// ----------------------------
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------
// POST profile (create)
// ----------------------------
router.post("/", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "verificationDoc", maxCount: 1 }
]), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) return res.status(400).json({ message: "Profile already exists. Use PUT to update." });

    let imageUrl = null;
    let imagePublicId = null;
    let verificationDocUrl = null;
    let verificationDocPublicId = null;

    // Profile image
    if (req.files["image"]) {
      const file = req.files["image"][0];
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "aotrider/profiles/customers" }
      );
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    // Verification document
    if (req.files["verificationDoc"]) {
      const file = req.files["verificationDoc"][0];
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "aotrider/profiles/verification" }
      );
      verificationDocUrl = result.secure_url;
      verificationDocPublicId = result.public_id;
    }

    const newProfile = await Profile.create({
      name: req.body.name,
      address: req.body.address,
      emergencyContact: req.body.emergencyContact,
      customerType: req.body.customerType,
      bio: req.body.bio,
      dob: req.body.dob,
      gender: req.body.gender,
      language: req.body.language,
      imageUrl,
      imagePublicId,
      verificationDocUrl,
      verificationDocPublicId,
    });

    res.json({ success: true, profile: newProfile });
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------------------
// PUT profile (update)
// ----------------------------
router.put("/", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "verificationDoc", maxCount: 1 }
]), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found. Use POST to create." });

    // Update profile image
    if (req.files["image"]) {
      if (profile.imagePublicId) await cloudinary.uploader.destroy(profile.imagePublicId);
      const file = req.files["image"][0];
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "aotrider/profiles/customers" }
      );
      profile.imageUrl = result.secure_url;
      profile.imagePublicId = result.public_id;
    }

    // Update verification document
    if (req.files["verificationDoc"]) {
      if (profile.verificationDocPublicId) await cloudinary.uploader.destroy(profile.verificationDocPublicId);
      const file = req.files["verificationDoc"][0];
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "aotrider/profiles/verification" }
      );
      profile.verificationDocUrl = result.secure_url;
      profile.verificationDocPublicId = result.public_id;
    }

    // Update other fields
    profile.name = req.body.name;
    profile.address = req.body.address;
    profile.emergencyContact = req.body.emergencyContact;
    profile.customerType = req.body.customerType;
    profile.bio = req.body.bio;
    profile.dob = req.body.dob;
    profile.gender = req.body.gender;
    profile.language = req.body.language;

    await profile.save();

    res.json({ success: true, profile });
  } catch (err) {
    console.error("PUT error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------------------
// DELETE profile
// ----------------------------
router.delete("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (profile?.imagePublicId) await cloudinary.uploader.destroy(profile.imagePublicId);
    if (profile?.verificationDocPublicId) await cloudinary.uploader.destroy(profile.verificationDocPublicId);

    await Profile.deleteMany();
    res.json({ success: true, message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
