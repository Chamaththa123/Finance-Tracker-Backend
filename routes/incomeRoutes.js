const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  createIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
} = require('../controllers/incomeController');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

router.post('/', auth, createIncome);
router.get('/', auth, getIncomes);
router.put('/:id', auth, updateIncome);
router.delete('/:id', auth, deleteIncome);

module.exports = router;