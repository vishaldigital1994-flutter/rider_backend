const express = require("express");
const Wallet = require("../models/wallet.model");
const Profile = require("../models/profile.model");

const router = express.Router();

// ================= GET WALLET =================
router.get("/:profileId", async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ profileId: req.params.profileId });

    if (!wallet) {
      return res.json({
        balance: 0,
        paymentOptions: {},
        splitExpenseEnabled: false,
        recentTransactions: [],
      });
    }

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= RECHARGE WALLET =================
router.post("/:profileId/recharge", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    let wallet = await Wallet.findOne({ profileId: req.params.profileId });

    if (!wallet) {
      wallet = await Wallet.create({ profileId: req.params.profileId });
    }

    wallet.balance += Number(amount);
    wallet.recentTransactions.push({
      type: "Wallet Recharge",
      amount: Number(amount),
      date: new Date(),
    });

    await wallet.save();

    res.json({
      success: true,
      balance: wallet.balance,
      recentTransactions: wallet.recentTransactions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SPLIT EXPENSE =================
router.post("/:profileId/split", async (req, res) => {
  try {
    const { enabled } = req.body;

    const wallet = await Wallet.findOne({ profileId: req.params.profileId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    wallet.splitExpenseEnabled = enabled;
    await wallet.save();

    res.json({ success: true, splitExpenseEnabled: wallet.splitExpenseEnabled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= PAYMENT OPTIONS =================
router.post("/:profileId/options", async (req, res) => {
  try {
    const { cash, wallet, upi, cards } = req.body;

    const walletData = await Wallet.findOne({ profileId: req.params.profileId });
    if (!walletData) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    walletData.paymentOptions = { cash, wallet, upi, cards };
    await walletData.save();

    res.json({ success: true, paymentOptions: walletData.paymentOptions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
