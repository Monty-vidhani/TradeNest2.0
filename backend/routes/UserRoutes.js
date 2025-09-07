// routes/userRoutes.js
import express from "express";
import { requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { enrichPortfolio } from "../utils/compute.js";


const router = express.Router();

router.get("/me", requireAuth(), async (req, res) => {
  try {
    const user = await User.findOne({ clerkUserId: req.auth.userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const enriched = enrichPortfolio(user);
    res.json({
      clerkUserId: user.clerkUserId,
      firstName: user.firstName,
      lastName: user.lastName,
      cashBalance: user.cashBalance,
      portfolioValue: user.portfolioValue,
      portfolio: enriched.items,
      tradingHistory: user.tradingHistory.sort((a,b)=>new Date(b.date)-new Date(a.date))
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
