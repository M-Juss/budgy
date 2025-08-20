import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js'

dotenv.config();

const app = express()
const port = process.env.PORT || 5050

app.use(cors())
app.use(express.json())

app.use("/api", userRoutes);
app.use("/api", transactionRoutes);

connectDB();

// app.get('/', (req, res) => {
//     res.send('<h1>Welcome to Budgy!</h1>')
// })
 
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})