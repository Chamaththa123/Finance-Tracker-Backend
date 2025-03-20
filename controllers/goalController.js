const Goal = require("../models/goalModel");

exports.createGoal = async (req, res) => {
  const { title,description, amount, userId } = req.body;
  try {
    const goal = new Goal({ userId: userId, title, description, amount });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    console.error("Create Goal Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getGoals = async (req, res) => {
  const { userId } = req.params;
  try {
    const goals = await Goal.find({ userId });
    res.status(200).json(goals);
  } catch (err) {
    console.error("Get Goals Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getGoalById = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findById(id);
    res.status(200).json(goal);
  } catch (err) {
    console.error("Get Goals Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateGoal = async (req, res) => {
  const { title, description, amount } = req.body;
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { title, description, amount },
      { new: true }
    );
    res.status(200).json(updatedGoal);
  } catch (err) {
    console.error("Update Goal Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      console.log("Goal not found");
      return res.status(404).json({ message: "Goal not found" });
    }

    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Goal removed" });
  } catch (err) {
    console.error("Delete Goal Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.searchGoals = async (req, res) => {
  const { q } = req.query;
  try {
    const goals = await Goal.find({
      userId: req.userId,
      title: { $regex: q, $options: "i" },
    });
    res.status(200).json(goals);
  } catch (err) {
    console.error("Search Goals Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
