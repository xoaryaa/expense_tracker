const expenseForm = document.getElementById('expenseForm');
const expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
const chart = document.getElementById('chart');

// Fetch expenses from the backend
async function fetchExpenses() {
    const response = await fetch('http://localhost:5000/api/expenses');
    const expenses = await response.json();
    renderExpenses(expenses);
    renderChart(expenses);
}

// Render expenses in the table
function renderExpenses(expenses) {
    expenseTable.innerHTML = ''; // Clear the table
    expenses.forEach(expense => {
        const row = expenseTable.insertRow();
        row.insertCell().textContent = expense.amount;
        row.insertCell().textContent = expense.category;
        row.insertCell().textContent = expense.note;
    });
}

// Render the chart
function renderChart(expenses) {
    chart.innerHTML = ''; // Clear the chart
    const amounts = expenses.map(expense => expense.amount);
    const maxAmount = Math.max(...amounts, 1); // Avoid division by zero

    amounts.forEach(amount => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(amount / maxAmount) * 100}%`;
        chart.appendChild(bar);
    });
}

// Add a new expense
expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const note = document.getElementById('note').value;

    const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, category_id: 1, note }), // Hardcoded category_id for simplicity
    });

    if (response.ok) {
        fetchExpenses(); // Refresh the list and chart
        expenseForm.reset(); // Clear the form
    }
});

// Initial load
fetchExpenses();