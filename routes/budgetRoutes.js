const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  searchBudgets,
} = require('../controllers/budgetController');

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Matches your login token structure
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

router.post('/', auth, createBudget);
router.get('/', auth, getBudgets);
router.put('/:id', auth, updateBudget);
router.delete('/:id', auth, deleteBudget);
router.get('/search', auth, searchBudgets);

module.exports = router;