const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token'],
}));
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));