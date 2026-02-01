const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const profileRoutes = require("./routes/profile.routes");
const walletRoutes = require("./routes/wallet.routes");
const supportRoutes = require("./routes/support.routes");
const notificationRoutes = require("./routes/notification.routes");
const memberRoutes = require("./routes/member.routes");
const bookingRoutes = require("./routes/booking.routes");
const schedulerRoutes = require("./routes/scheduler.routes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/profile", profileRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/notifications", notificationRoutes); 
app.use("/api/members", memberRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/schedulers", schedulerRoutes);




(async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
})();
