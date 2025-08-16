// routes/userRoutes.js
import express from "express";
import { requireAuth } from "@clerk/express";
import User from "../models/User.js";


const router = express.Router();

// Get logged-in user's details
// GET /api/user/me
router.get("/me", requireAuth(), async (req, res) => {
  try {
    const clerkUserId = req.auth.userId; // Clerk automatically gives you this from JWT

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found in DB" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
