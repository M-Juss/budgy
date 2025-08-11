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

router.get("/transaction/monthly_expense", async (req, res) => {
  const  date = new Date ()
  const currentMonth = date.getMonth() + 1
  const currentYear = date.getFullYear()

  try {
    const result = await collection.aggregate([
      {
        $match: { type: "Expense" }
      },
      {
        $addFields: {
          dateObj: {$toDate: "$date"}
        }
      }, 
      {
        $addFields: {
          month: {$month: "$dateObj"},
          year: {$year: "$dateObj"}
        }
      },
      {
        $match: {
          month: currentMonth,
          year: currentYear
        }
      },
      {
        $group: {
          _id: "$category", 
          totalAmount: { $sum: { $toDouble: "$amount" } }
        }
      },
      {
        $project: {
          _id: 0, 
          category: "$_id", 
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

router.get("/transaction/monthly_income", async (req, res) => {

  const date = new Date()
  const currentMonth = date.getMonth() + 1 
  const currentYear = date.getFullYear()

  try{
    const result = await collection.aggregate([
      {
        $match: { type: "Income"}
      },
      {
        $addFields: {
          dateObj: {$toDate: "$date"}
        }
      },
      {
        $addFields: {
          month: {$month: "$dateObj"},
          year: {$year: "$dateObj" }
        }
      },
      {
        $match: {
          month: currentMonth,
          year: currentYear
        }
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: { $toDouble: "$amount" } }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          amount: "$totalAmount"
        }
      }
    ]).toArray()
    res.status(200).json(result)
  } catch (error) {
      console.log("Error message:", error);
      res.status(500).json({ message: "Internal server error" });
  }
})

export default router;