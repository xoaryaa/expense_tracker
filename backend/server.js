const express = require('express');
const cors = require('cors');
const expensesRouter = require('./routes/expenses');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/expenses', expensesRouter);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});