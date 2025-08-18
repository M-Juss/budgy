import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true }, // income or expense
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, default: "" }
});

// 👇 this will create a "transactions" collection inside budgy DB
export default mongoose.model("Transaction", transactionSchema);