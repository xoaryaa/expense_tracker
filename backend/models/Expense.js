const db = require('../db');

class Expense {
    static add(amount, category_id, note) {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO expenses (amount, category_id, note) VALUES (?, ?, ?)',
                [amount, category_id, note],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT expenses.id, amount, categories.name AS category, note, date FROM expenses JOIN categories ON expenses.category_id = categories.id',
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                }
            );
        });
    }
}

module.exports = Expense;