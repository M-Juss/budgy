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
        console.error('Insert error:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}) 

export default router;