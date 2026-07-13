const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// --- Serverless-safe MongoDB connection with caching ---
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};


app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.use('/api/v1/tasks', require('./routes/taskRoutes'));
app.use('/api/v1/stats', require('./routes/statsRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API is running!' });
});

module.exports = app;