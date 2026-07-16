import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contactRoutes from './routes/contact.js';
import dataRoutes from './routes/data.js';
import statsRoutes from './routes/stats.js';
import goalsRoutes from './routes/goals.js';
import guestbookRoutes from './routes/guestbook.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api', contactRoutes);
app.use('/api', dataRoutes);
app.use('/api', statsRoutes);
app.use('/api', goalsRoutes);
app.use('/api', guestbookRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy.' });
});

// Database connection & Server initialization
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error: ', err);
    process.exit(1);
  });
