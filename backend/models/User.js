import mongoose from "mongoose";

const portfolioItemSchema = new mongoose.Schema({
  symbol: { type: String, required: true }, 
  quantity: { type: Number, required: true, min: 0 }, 
  avgBuyPrice: { type: Number, required: true, min: 0 }, 
   
});

const tradeSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  type: { type: String, enum: ['buy', 'sell'], required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true }, 
    firstName:{type:String},
    lastName:{type:String},
 
    cashBalance: { type: Number, default: 100000 }, 


    portfolioValue: { type: Number, default: 0 }, 


    portfolio: [portfolioItemSchema], 


    tradingHistory: [tradeSchema],

  },{ timestamps: true }
);
const User =  mongoose.model("User", userSchema);

export default User;
