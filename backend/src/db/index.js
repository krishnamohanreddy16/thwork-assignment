const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../../task_tracker.db'));

// Schema creation (id autoincrement, constraints)
db.exec(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK(priority IN ('Low','Medium','High')) NOT NULL DEFAULT 'Medium',
  due_date TEXT NOT NULL, -- store ISO YYYY-MM-DD
  status TEXT CHECK(status IN ('Open','In Progress','Done')) NOT NULL DEFAULT 'Open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);
module.exports = db;
