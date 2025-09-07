import express from "express";
import { requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { getLatestPrice } from "../services/market.js";
import { enrichPortfolio } from "../utils/compute.js";

const router = express.Router();

// POST /api/trades/buy { symbol, quantity }
router.post("/buy", requireAuth(), async (req, res) => {
  const { symbol, quantity } = req.body;
  if (!symbol || !quantity || quantity <= 0)
    return res.status(400).json({ message: "Invalid input" });

  const user = await User.findOne({ clerkUserId: req.auth.userId });
  if (!user) return res.status(404).json({ message: "User not found" });

  const price = getLatestPrice(symbol);
  if (!price) return res.status(400).json({ message: "No live price for symbol" });

const trade = { symbol, type: 'buy', quantity, price, date: new Date() };
req.io.to(req.auth.userId).emit("trade:executed", trade);

  const cost = price * quantity;
  if (user.cashBalance < cost) return res.status(400).json({ message: "Insufficient cash" });

  const i = user.portfolio.findIndex(p => p.symbol === symbol);
  if (i >= 0) {
    const prev = user.portfolio[i];
    const newQty = prev.quantity + quantity;
    const newAvg = ((prev.avgBuyPrice * prev.quantity) + cost) / newQty;
    prev.quantity = newQty;
    prev.avgBuyPrice = newAvg;
  } else {
    user.portfolio.push({ symbol, quantity, avgBuyPrice: price });
  }

  user.cashBalance -= cost;
  user.tradingHistory.push({ symbol, type: 'buy', quantity, price });
  await user.save();

  const enriched = enrichPortfolio(user);
  req.io.to(req.auth.userId).emit("portfolio:update", enriched);
  res.json({ ok: true, portfolio: enriched, cashBalance: user.cashBalance });
});

// POST /api/trades/sell { symbol, quantity }
router.post("/sell", requireAuth(), async (req, res) => {
  const { symbol, quantity } = req.body;
  if (!symbol || !quantity || quantity <= 0)
    return res.status(400).json({ message: "Invalid input" });

  const user = await User.findOne({ clerkUserId: req.auth.userId });
  if (!user) return res.status(404).json({ message: "User not found" });

  const pos = user.portfolio.find(p => p.symbol === symbol);
  if (!pos || pos.quantity < quantity)
    return res.status(400).json({ message: "Not enough shares" });

  const price = getLatestPrice(symbol);
  if (!price) return res.status(400).json({ message: "No live price for symbol" });

  pos.quantity -= quantity;
  if (pos.quantity === 0) {
    user.portfolio = user.portfolio.filter(p => p.symbol !== symbol);
  }

  const proceeds = price * quantity;
  user.cashBalance += proceeds;
  user.tradingHistory.push({ symbol, type: 'sell', quantity, price });
  const trade = { symbol, type: 'sell', quantity, price, date: new Date() };
req.io.to(req.auth.userId).emit("trade:executed", trade);
  await user.save();

  const enriched = enrichPortfolio(user);
  req.io.to(req.auth.userId).emit("portfolio:update", enriched);
  res.json({ ok: true, portfolio: enriched, cashBalance: user.cashBalance });
});

router.get("/history", requireAuth(), async (req, res) => {
  try {
    const user = await User.findOne(
      { clerkUserId: req.auth.userId },
      { tradingHistory: 1, _id: 0 }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    const history = [...user.tradingHistory].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.json(history);
  } catch (err) {
    console.error("Error in /history:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
