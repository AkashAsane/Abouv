const Task = require('../models/Task.js');

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, category } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const task = await Task.create({
    user: req.user.id,
    title,
    description,
    category,
  });
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

  await task.remove();
  res.json({ message: 'Task removed' });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
