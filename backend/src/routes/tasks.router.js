const express = require('express');
const router = express.Router();
const { createTask, queryTasks, updateTask, getTaskById } = require('../services/task.service');
const { validateNewTask } = require('../validators/task.validator');

router.post('/', (req, res) => {
  const errors = validateNewTask(req.body);
  if (errors.length) return res.status(400).json({ errors });
  try {
    const t = createTask(req.body);
    return res.status(201).json(t);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create task' });
  }
});

router.get('/', (req, res) => {
  const { status, priority, sort } = req.query;
  try {
    const tasks = queryTasks({ status, priority, sortByDue: sort === 'due' });
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const { status, priority } = req.body;

  const allowedStatus = ['Open','In Progress','Done'];
  const allowedPriority = ['Low','Medium','High'];
  if (status && !allowedStatus.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  if (priority && !allowedPriority.includes(priority)) return res.status(400).json({ error: 'Invalid priority' });

  try {
    const updated = updateTask(id, { status, priority });
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update task' });
  }
});


router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const t = getTaskById(id);
  if (!t) return res.status(404).json({ error: 'Task not found' });
  return res.json(t);
});

module.exports = router;
