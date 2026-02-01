const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema(
  {
    profileId: {
      type: String, // ✅ NOT ObjectId
      required: true,
    },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: "Enquiry" },
    status: { type: String, default: "Open" },
    messages: [
      {
        sender: String,
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
