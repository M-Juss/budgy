import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import userData from './routes/userData.js';

dotenv.config();

const app = express()
const port = process.env.PORT || 5050

app.use(cors())
app.use(express.json())

app.use("/api", userData);

// app.get('/', (req, res) => {
//     res.send('<h1>Welcome to Budgy!</h1>')
// })

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})