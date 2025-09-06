import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


import connectDB from './db/connection.js';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';


dotenv.config();


// Connect DB BEFORE starting server
await connectDB();


const app = express();
const port = process.env.PORT || 5050;


// Security & logging
app.use(helmet());
app.use(morgan('dev'));


// Body parsing
app.use(express.json());


// CORS (explicitly allow Authorization header)
app.use(
cors({
origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:5173',
methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
allowedHeaders: ['Content-Type','Authorization'],
credentials: false, // using Bearer tokens – no cookies needed
})
);


// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));


// Routes
app.use('/api', userRoutes);
app.use('/api', transactionRoutes);


// Global error handler (last)
app.use((err, _req, res, _next) => {
console.error('Unhandled error:', err);
res.status(500).json({ message: 'Internal server error' });
});


app.listen(port, () => {
console.log(`🚀 Server listening on http://localhost:${port}`);
});