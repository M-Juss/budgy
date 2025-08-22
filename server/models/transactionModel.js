import mongoose, { mongo } from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // add objectId which is foreign key to the User Schema
  amount: { type: Number, required: true, min: 0 }, // add min 0
  type: { type: String, enum: ['Income', 'Expense'], required: true }, // add enum which are the expected value
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, trim:true, default: "" } // trim string values
});

export default mongoose.model("Transaction", transactionSchema);
