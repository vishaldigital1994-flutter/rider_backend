const express = require("express");
const SupportTicket = require("../models/supportTicket.model");
const EmergencyContact = require("../models/emergencyContact.model");

const router = express.Router();

// ---------------- SUPPORT NUMBER ----------------
router.get("/support-number", (req, res) => {
  res.json({ phone: "+911234567890" });
});

// ---------------- EMERGENCY CONTACTS ----------------
router.post("/emergency", async (req, res) => {
  try {
    const contact = await EmergencyContact.create(req.body);
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/emergency/:profileId", async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({
      profileId: req.params.profileId,
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- CREATE TICKET ----------------
router.post("/", async (req, res) => {
  try {
    const ticket = await SupportTicket.create({
      profileId: req.body.profileId,
      subject: req.body.subject,
      description: req.body.description,
      type: req.body.type || "Enquiry",
      status: "Open",
      messages: [
        { sender: "USER", message: req.body.description },
      ],
    });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- CHAT MESSAGE ----------------
router.post("/:ticketId/message", async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.messages.push({
      sender: req.body.sender,
      message: req.body.message,
    });

    await ticket.save();
    res.json(ticket.messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- UPDATE STATUS ----------------
router.patch("/:ticketId/status", async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = req.body.status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- GET TICKETS (KEEP LAST) ----------------
router.get("/:profileId", async (req, res) => {
  try {
    const tickets = await SupportTicket.find({
      profileId: req.params.profileId,
    }).sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
