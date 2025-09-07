import WebSocket from "ws";

const latestPrices = new Map(); // symbol -> price
let ws = null;

export function getLatestPrice(symbol) {
  return latestPrices.get(symbol) ?? null;
}

export function startFinnhubWS({ apiKey, onPrice }) {
  ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

  ws.on("open", () => {
   
    [
    "BINANCE:BTCUSDT", 
    "BINANCE:ETHUSDT", 
    "BINANCE:SOLUSDT",
    "BINANCE:LTCUSDT",
"BINANCE:ADAUSDT",
"BINANCE:DOTUSDT",
"BINANCE:XRPUSDT",
"COINBASE:BTCUSD",
"COINBASE:ETHUSD "
  ].forEach(s =>
      ws.send(JSON.stringify({ type: "subscribe", symbol: s }))
    );
  });

  ws.on("message", (buf) => {
    try {
      const msg = JSON.parse(buf.toString());
      if (msg.type === "trade" && Array.isArray(msg.data)) {
        for (const t of msg.data) {
          latestPrices.set(t.s, t.p);
          onPrice?.({ symbol: t.s, price: t.p, ts: t.t });
        }
      }
    } catch {}
  });

  ws.on("close", () => setTimeout(() => startFinnhubWS({ apiKey, onPrice }), 2000));
  ws.on("error", () => ws?.close());
}
