const express = require('express');
const app = express();
const port = 8080;

// Middleware to parse JSON
app.use(express.json());

// Sample data
let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  { id: 1, title: 'Task 3', completed: false },
];

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT to update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    Object.assign(task, req.body);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
