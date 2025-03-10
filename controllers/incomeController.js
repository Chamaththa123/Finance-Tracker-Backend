const Income = require('../models/incomeModel');

exports.createIncome = async (req, res) => {
  const { title, description, amount } = req.body;
  try {
    const income = new Income({ userId: req.userId, title, description, amount });
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    console.error('Create Income Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.userId });
    res.status(200).json(incomes);
  } catch (err) {
    console.error('Get Incomes Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateIncome = async (req, res) => {
  const { title, description, amount } = req.body;
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ message: 'Income not found' });
    if (income.userId.toString() !== req.userId)
      return res.status(401).json({ message: 'Not authorized' });

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { title, description, amount },
      { new: true }
    );
    res.status(200).json(updatedIncome);
  } catch (err) {
    console.error('Update Income Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ message: 'Income not found' });
    if (income.userId.toString() !== req.userId)
      return res.status(401).json({ message: 'Not authorized' });

    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Income removed' });
  } catch (err) {
    console.error('Delete Income Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};