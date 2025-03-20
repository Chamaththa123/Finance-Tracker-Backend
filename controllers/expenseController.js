const Expense = require("../models/expenseModel");

exports.createExpense = async (req, res) => {
  const { title,description, amount, userId } = req.body;
  try {
    const expense = new Expense({ userId: userId, title, description, amount });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error("Create Expense Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  const { userId } = req.params;
  try {
    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Get Expenses Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    res.status(200).json(expense);
  } catch (err) {
    console.error("Get Expenses Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { title, description, amount } = req.body;
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, description, amount },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (err) {
    console.error("Update Expense Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      console.log("Expense not found");
      return res.status(404).json({ message: "Expense not found" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense removed" });
  } catch (err) {
    console.error("Delete Expense Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.searchExpenses = async (req, res) => {
  const { q } = req.query;
  try {
    const expenses = await Expense.find({
      userId: req.userId,
      title: { $regex: q, $options: "i" },
    });
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Search Expenses Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
