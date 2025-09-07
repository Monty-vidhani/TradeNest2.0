import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth, useUser } from "@clerk/clerk-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function useLiveTrading() {
  const { getToken } = useAuth();
  const { isLoaded, user } = useUser();
  const [prices, setPrices] = useState({});
  const [me, setMe] = useState({ portfolioValue: 0 });
  const [tradingHistory, setTradingHistory] = useState([]);

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    // socket
    const s = io(API, { transports: ["websocket"] });
    s.emit("join", { clerkUserId: user.id });

    s.on("price:tick", ({ symbol, price }) => {
      setPrices(prev => ({ ...prev, [symbol]: price }));
    });

    s.on("portfolio:update", (enriched) => {
      setMe(prev => prev ? { ...prev, cashBalance: enriched.cashBalance, portfolioValue: enriched.portfolioValue, portfolio: enriched.items } : prev);
    });
 s.on("trade:executed", (trade) => {
      setTradingHistory(prev => [...prev, trade]);
    });

    // initial /me
    (async () => {
      const token = await getToken();
      const res = await fetch(`${API}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setMe(data);
      const res2 = await fetch(`${API}/api/trades/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const history = await res2.json();
  setTradingHistory(history);
    })();

    return () => s.disconnect();
  }, [isLoaded, user?.id, getToken]);

   const buy = useCallback(async (symbol, quantity) => {
    console.log("Sending buy:", { symbol, quantity });
    try {
      const token = await getToken({ template: "default" });
      if (!token) throw new Error("No Clerk token found");

      const res = await fetch(`${API}/api/trades/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ symbol, quantity }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Buy failed: ${res.status} → ${text}`);
      }

      const data = await res.json();
      setMe(prev => ({ ...prev, ...data }));
      return data;

    } catch (err) {
      console.error(" Buy error:", err);
      throw err;
    }
  }, [getToken]);

  const sell = useCallback(async (symbol, quantity) => {
    try {
      const token = await getToken({ template: "default" });
      if (!token) throw new Error("No Clerk token found");

      const res = await fetch(`${API}/api/trades/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ symbol, quantity }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Sell failed: ${res.status} → ${text}`);
      }

      const data = await res.json();

      setMe(prev => ({
        ...prev,
        portfolio: Array.isArray(prev?.portfolio)
          ? prev.portfolio.map(pos =>
              pos.symbol === symbol
                ? { ...pos, quantity: pos.quantity - 1 }
                : pos
            ).filter(pos => pos.quantity > 0) 
          : []
      }));
      return data;

    } catch (err) {
      console.error(" Sell error:", err);
      throw err;
    }
  }, [getToken]);

  return {  me, setMe, prices, setPrices, buy, sell, tradingHistory, setTradingHistory};
}
