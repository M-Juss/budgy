import express from 'express'
import db from "../db/connection.js"
import { ObjectId } from 'mongodb'

const router = express.Router()
const collection = db.collection("transactions")

router.post("/transaction", async (req, res) => {
    const newTransaction = req.body
    try{
        let result = await collection.insertOne(newTransaction);
        res.status(201).json({message: "Transaction added succesfully!", id: result.insertedId })
    } catch (err){
        console.error('Insert error:', err );
        res.status(500).json({ message: 'Something went wrong' });
    }
})

router.get("/transaction", async (req,res) => {
    try{
        let result = await collection.find({}).toArray()
        res.status(200).json(result)
    }catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

export default router;