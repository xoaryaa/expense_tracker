// Show Home Page
function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('history').style.display = 'none';
    document.getElementById('graphs').style.display = 'none';
}

// Show History Page
function showHistory() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('history').style.display = 'block';
    document.getElementById('graphs').style.display = 'none';
    fetchExpenses();
}

// Show Graphs Page
function showGraphs() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('history').style.display = 'none';
    document.getElementById('graphs').style.display = 'block';
    renderChart();
}

// Fetch expenses from the backend
async function fetchExpenses() {
    const response = await fetch('http://localhost:5000/api/expenses');
    const expenses = await response.json();
    renderExpenses(expenses);
}

// Render expenses in the table
function renderExpenses(expenses) {
    const tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the table
    expenses.forEach(expense => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = expense.amount;
        row.insertCell().textContent = expense.category;
        row.insertCell().textContent = expense.note;
        row.insertCell().textContent = expense.date;
    });
}

// Render the chart
function renderChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    fetch('http://localhost:5000/api/expenses')
        .then(response => response.json())
        .then(expenses => {
            const data = {
                labels: expenses.map(e => e.category),
                datasets: [
                    {
                        label: 'Expenses',
                        data: expenses.map(e => e.amount),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            };
            new Chart(ctx, {
                type: 'bar',
                data: data,
            });
        });
}

// Add a new expense
document.getElementById('expenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const note = document.getElementById('note').value;

    const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, category_id: 1, note }), // Hardcoded category_id for simplicity
    });

    if (response.ok) {
        alert('Expense added!');
        document.getElementById('expenseForm').reset();
    }
});

// Initial load
showHome();