 const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.use(protect);

// Get all tasks (with optional filters)
router.get("/", async (req, res) => {
  const { status, priority, search } = req.query;
  const query = { user: req.user._id };
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) query.title = { $regex: search, $options: "i" };

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  res.json(tasks);
});

// Get stats for dashboard
router.get("/stats", async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json({
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  });
});

// Create task
router.post("/", async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user._id });
  res.status(201).json(task);
});

// Update task
router.put("/:id", async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

// Delete task
router.delete("/:id", async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
});

module.exports = router;