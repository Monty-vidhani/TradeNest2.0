import User from "../models/User.js";
import axios from "axios";


// POST /api/user/watchlist
export const addToWatchlist = async (req, res) => {
  try {
    const auth0Id = req.user.sub;
    const { symbol } = req.body;

    if (!symbol) return res.status(400).json({ message: "Symbol is required" });

    const user = await User.findOne({ auth0Id });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if already in watchlist
    if (!user.watchlist.some(item => item.symbol === symbol)) {
      user.watchlist.push({ symbol });
      await user.save();
    }

    res.json(user.watchlist);
  } catch (err) {
    console.error("Error in addToWatchlist:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/user/buy
export const buyStock = async (req, res) => {
  try {
    const auth0Id = req.user.sub;
    const { symbol, quantity, price } = req.body;

    if (!symbol || !quantity || !price)
      return res.status(400).json({ message: "symbol, quantity, and price are required" });

    const user = await User.findOne({ auth0Id });
    if (!user) return res.status(404).json({ message: "User not found" });

    const totalCost = quantity * price;

    if (user.cashBalance < totalCost)
      return res.status(400).json({ message: "Insufficient virtual cash" });

    // Check if stock already exists in portfolio
    const existingStock = user.portfolio.find(item => item.symbol === symbol);

    if (existingStock) {
      // Update quantity and average buy price
      const newQuantity = existingStock.quantity + quantity;
      existingStock.avgBuyPrice =
        (existingStock.avgBuyPrice * existingStock.quantity + totalCost) / newQuantity;
      existingStock.quantity = newQuantity;
      existingStock.currentPrice = price;
    } else {
      // Add new stock to portfolio
      user.portfolio.push({
        symbol,
        quantity,
        avgBuyPrice: price,
        currentPrice: price
      });
    }

    // Deduct cash and update portfolio value
    user.cashBalance -= totalCost;
    user.portfolioValue = user.portfolio.reduce(
      (acc, item) => acc + item.quantity * item.currentPrice,
      0
    );

    await user.save();

    res.json({ portfolio: user.portfolio, cashBalance: user.cashBalance, portfolioValue: user.portfolioValue });
  } catch (err) {
    console.error("Error in buyStock:", err);
    res.status(500).json({ message: "Server error" });
  }
};
