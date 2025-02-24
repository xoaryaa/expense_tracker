const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

// Add an expense
router.post('/', async (req, res) => {
    const { amount, category_id, note } = req.body;
    try {
        const id = await Expense.add(amount, category_id, note);
        res.json({ id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.getAll();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;