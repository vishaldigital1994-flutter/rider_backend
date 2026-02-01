const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const WalletSchema = new mongoose.Schema(
  {
    balance: { type: Number, default: 0 },

    paymentOptions: {
      cash: { type: Boolean, default: true },
      wallet: { type: Boolean, default: true },
      upi: { type: Boolean, default: false },
      cards: { type: Boolean, default: false },
    },

    splitExpenseEnabled: { type: Boolean, default: false },

    recentTransactions: [TransactionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", WalletSchema);
