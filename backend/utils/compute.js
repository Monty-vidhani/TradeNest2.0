import { getLatestPrice } from "../services/market.js";

export function enrichPortfolio(userDoc) {
  const items = userDoc.portfolio.map((p) => {
    const last = getLatestPrice(p.symbol);
    const currentPrice = last ?? p.avgBuyPrice;
    const value = currentPrice * p.quantity;
    const pnl = (currentPrice - p.avgBuyPrice) * p.quantity;
    return {
      symbol: p.symbol,
      quantity: p.quantity,
      avgBuyPrice: p.avgBuyPrice,
      currentPrice,
      value,
      pnl
    };
  });

  const portfolioValue = items.reduce((a, b) => a + b.value, 0);
  return { items, portfolioValue, cashBalance: userDoc.cashBalance };
}
