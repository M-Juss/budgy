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

router.get("/transaction/weekly_expense&income", async (req, res) => {
  const now = new Date();
  const firstDayOfWeek = new Date(now);
  firstDayOfWeek.setDate(now.getDate() - now.getDay()); // Sunday as start
  firstDayOfWeek.setHours(0, 0, 0, 0);

  const lastDayOfWeek = new Date(now);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Saturday as end
  lastDayOfWeek.setHours(23, 59, 59, 999);

  // Day names starting with Sunday
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  try {
    const aggregated = await collection.aggregate([
      {
        $addFields: {
          dateObj: { $toDate: "$date" }
        }
      },
      {
        $match: {
          dateObj: {
            $gte: firstDayOfWeek,
            $lte: lastDayOfWeek
          }
        }
      },
      {
        $addFields: {
          dayOfWeek: { $dayOfWeek: "$dateObj" } // 1 = Sunday, 7 = Saturday
        }
      },
      {
        $group: {
          _id: {
            dayOfWeek: "$dayOfWeek",
            type: "$type"
          },
          totalAmount: { $sum: { $toDouble: "$amount" } }
        }
      },
      {
        $group: {
          _id: "$_id.dayOfWeek",
          income: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "Income"] }, "$totalAmount", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "Expense"] }, "$totalAmount", 0]
            }
          }
        }
      },
      {
        $addFields: {
          dayName: {
            $arrayElemAt: [
              ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              { $subtract: ["$_id", 1] }
            ]
          }
        }
      },
      {
        $project: {
          _id: 0,
          day: "$dayName",
          income: 1,
          expense: 1
        }
      }
    ]).toArray();

    // Ensure all days are included, even with no data
    const result = daysOfWeek.map(day => {
      const found = aggregated.find(item => item.day === day);
      return found || { day, income: 0, expense: 0 };
    });

    res.status(200).json(result);
  } catch (error) {
    console.log("Error message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/transaction/monthly_expense", async (req, res) => {
  const  date = new Date()
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