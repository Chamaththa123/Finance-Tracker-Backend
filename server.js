const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db'); // Updated path
const userRoutes = require('./routes/userRoutes'); // Renamed from authRoutes
const budgetRoutes = require('./routes/budgetRoutes'); // New budget routes
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token'],
}));
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/budget', budgetRoutes); // Added budget routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));