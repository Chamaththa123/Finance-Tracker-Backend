const Expense = require('../models/expenseModel');
const Budget = require('../models/budgetModel');

exports.createExpense = async (req, res) => {
  const { title, description, amount } = req.body;
  try {
    const budgetTitles = (await Budget.find({ userId: req.userId })).map(b => b.budgetName);
    if (!budgetTitles.includes(title) && title !== 'Other') {
      return res.status(400).json({ message: 'Invalid title: Must be a budget name or "Other"' });
    }

    const expense = new Expense({ userId: req.userId, title, description, amount });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error('Create Expense Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    res.status(200).json(expenses);
  } catch (err) {
    console.error('Get Expenses Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { title, description, amount } = req.body;
  try {
    const budgetTitles = (await Budget.find({ userId: req.userId })).map(b => b.budgetName);
    if (!budgetTitles.includes(title) && title !== 'Other') {
      return res.status(400).json({ message: 'Invalid title: Must be a budget name or "Other"' });
    }

    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.userId.toString() !== req.userId)
      return res.status(401).json({ message: 'Not authorized' });

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, description, amount },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (err) {
    console.error('Update Expense Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.userId.toString() !== req.userId)
      return res.status(401).json({ message: 'Not authorized' });

    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense removed' });
  } catch (err) {
    console.error('Delete Expense Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};