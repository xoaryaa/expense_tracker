const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./expenses.db');

// Create tables
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      category_id INTEGER,
      note TEXT,
      date TEXT DEFAULT (DATE('now')),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);
    db.run(`
    INSERT OR IGNORE INTO categories (id, name) VALUES (1, 'Food')
  `);
});

module.exports = db;