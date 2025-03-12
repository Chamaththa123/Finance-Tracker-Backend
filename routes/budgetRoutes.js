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


router.post('/', createBudget);
router.get('/user/:userId', getBudgets);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);
router.get('/search', searchBudgets);

module.exports = router;