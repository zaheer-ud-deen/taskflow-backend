const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/tasks', require('./routes/taskRoutes'));
app.use('/api/v1/stats', require('./routes/statsRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API is running!' });
});

// Simple MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Export for Vercel
module.exports = app;