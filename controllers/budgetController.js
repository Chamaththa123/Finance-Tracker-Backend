const Budget = require('../models/budgetModel');

exports.createBudget = async (req, res) => {
  const { budgetName, price,userId } = req.body;
  try {
    const budget = new Budget({ userId: userId, budgetName, price });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    console.error('Create Budget Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId });
    res.status(200).json(budgets);
  } catch (err) {
    console.error('Get Budgets Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateBudget = async (req, res) => {
  const { budgetName, price } = req.body;
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    if (budget.userId.toString() !== req.userId)
      return res.status(401).json({ message: 'Not authorized' });

    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      { budgetName, price },
      { new: true }
    );
    res.status(200).json(updatedBudget);
  } catch (err) {
    console.error('Update Budget Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    console.log('Deleting budget with ID:', req.params.id);
    console.log('User ID from token:', req.userId);

    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      console.log('Budget not found');
      return res.status(404).json({ message: 'Budget not found' });
    }
    console.log('Budget found:', budget);

    if (budget.userId.toString() !== req.userId) {
      console.log('User not authorized');
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Budget.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Budget removed' });
  } catch (err) {
    console.error('Delete Budget Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.searchBudgets = async (req, res) => {
  const { q } = req.query;
  try {
    const budgets = await Budget.find({
      userId: req.userId,
      budgetName: { $regex: q, $options: 'i' },
    });
    res.status(200).json(budgets);
  } catch (err) {
    console.error('Search Budgets Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};