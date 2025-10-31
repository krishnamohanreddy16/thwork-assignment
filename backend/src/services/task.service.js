const db = require('../db');

function createTask({ title, description = '', priority = 'Medium', due_date, status = 'Open' }) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, priority, due_date, status)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(title, description, priority, due_date, status);
  return getTaskById(info.lastInsertRowid);
}

function getTaskById(id) {
  const stmt = db.prepare(`SELECT * FROM tasks WHERE id = ?`);
  return stmt.get(id);
}

function queryTasks({ status, priority, sortByDue = false }) {
  let sql = `SELECT * FROM tasks`;
  const where = [];
  const params = [];

  if (status) { where.push(`status = ?`); params.push(status); }
  if (priority) { where.push(`priority = ?`); params.push(priority); }

  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  if (sortByDue) sql += ' ORDER BY due_date ASC';
  else sql += ' ORDER BY created_at DESC';

  const stmt = db.prepare(sql);
  return stmt.all(...params);
}

function updateTask(id, { status, priority }) {
  const updates = [];
  const params = [];

  if (status) { updates.push('status = ?'); params.push(status); }
  if (priority) { updates.push('priority = ?'); params.push(priority); }

  if (!updates.length) return getTaskById(id); // nothing to update
  params.push(id);

  const stmt = db.prepare(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`);
  stmt.run(...params);
  return getTaskById(id);
}

module.exports = {
  createTask,
  getTaskById,
  queryTasks,
  updateTask
};
