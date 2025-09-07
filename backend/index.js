import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import { Webhook } from "svix";
import User from "./models/User.js";
import userRoutes from "./routes/UserRoutes.js";
import cors from "cors";
import { requireAuth } from "@clerk/express";
import http from "http";
import { Server } from "socket.io";
import { startFinnhubWS } from "./services/market.js";
import tradeRoutes from "./routes/tradeRoutes.js";



dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 7000;
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, methods: ["GET","POST"] }
});


app.use((req, _res, next) => { req.io = io; next(); });


io.on("connection", (socket) => {
  socket.on("join", ({ clerkUserId }) => {
    if (clerkUserId) socket.join(clerkUserId);
  });
});


// ✅ Webhook endpoint
app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers;

      // Verify the webhook signature
      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders);

      const eventType = evt.type;
      console.log("EVENT TYPE:", eventType);

      // Log raw event for debugging
      console.log("RAW EVENT DATA:", JSON.stringify(evt, null, 2));

      if (eventType === "user.created") {
        const clerkUserId = evt.data.id; 
        const firstName = evt.data.first_name || "";
        const lastName = evt.data.last_name || "";
        

        console.log("Creating user with Clerk ID:", clerkUserId);

        // Check if this user already exists (prevents accidental duplicates)
        // const existingUser = await User.findOne({ clerkUserId });
        // if (existingUser) {
        //   console.log("User already exists in DB. Skipping creation.");
        // } else {
          const newUser = new User({
            clerkUserId,
            firstName,
            lastName,
          });

          await newUser.save();
          console.log(" New user saved to MongoDB:", clerkUserId);
        // }
      }

      res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    } catch (err) {
      console.error("Webhook error:", err.message);
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin:process.env.CLIENT_ORIGIN , 
  credentials: true 
}));

app.use("/api/users", userRoutes);
app.use("/api/trades", tradeRoutes);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });
  

  startFinnhubWS({
  apiKey: process.env.FINNHUB_API_KEY,
  onPrice: ({ symbol, price }) => io.emit("price:tick", { symbol, price })
});



server.listen(PORT, () => console.log(`Server running on ${PORT}`));
