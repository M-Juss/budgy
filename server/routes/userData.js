import express from 'express'
import db from "../db/connection.js"
import { ObjectId } from 'mongodb'

const router = express.Router()
const collection = db.collection("transactions")

router.post("/transaction", async (req, res) => { //create or add new Transaction
    const newTransaction = req.body
    try{
        let result = await collection.insertOne(newTransaction);
        res.status(201).json({message: "Transaction added succesfully!", id: result.insertedId })
    } catch (err){
        console.error('Insert error:', err );
        res.status(500).json({ message: 'Something went wrong' });
    }
})

router.get("/transaction", async (req,res) => { // get All of the Transaction
    try{
        let result = await collection.find({}).toArray()
        res.status(200).json(result)
    }catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.get("/expenses", async (req, res) => {
  try {
    const result = await collection.aggregate([
      {
        $match: { type: "Expense" }
      },
      {
        $group: {
          _id: "$category", // ✅ Group by category
          totalAmount: { $sum: { $toDouble: "$amount" } }
        }
      },
      {
        $project: {
          _id: 0, // ✅ Exclude _id from final result
          category: "$_id", // ✅ Rename _id to category
          amount: "$totalAmount"
        }
      }
    ]).toArray();

    res.status(200).json(result);
  } catch (error) {
    console.log("Error message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;