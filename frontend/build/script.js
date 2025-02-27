// ------------------------------
// Global Variables
// ------------------------------
let chartInstance = null; // Track the current chart instance
const ip_addr = process.env.IP_ADDR
// ------------------------------
// Page Navigation Functions
// ------------------------------
function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('history').style.display = 'none';
    document.getElementById('graphs').style.display = 'none';
}
function showHistory() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('history').style.display = 'block';
    document.getElementById('graphs').style.display = 'none';
    fetchExpenses(); // Refresh the table
}

function showGraphs() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('history').style.display = 'none';
    document.getElementById('graphs').style.display = 'block';
    renderChart(); // Render the chart on page load
}

// ------------------------------
// Expense Fetching and Rendering
// ------------------------------
async function fetchExpenses() {
    const response = await fetch(`http://${ip_addr}:5000/api/expenses`);
    const expenses = await response.json();
    renderExpenses(expenses);
}

function renderExpenses(expenses) {
    const tableBody = document.getElementById('expenseTable').querySelector('tbody');
    tableBody.innerHTML = '';
    expenses.forEach(expense => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = expense.amount;
        row.insertCell().textContent = expense.category;
        row.insertCell().textContent = expense.note;
        row.insertCell().textContent = expense.date;
    });
}

// ------------------------------
// Chart Functions
// ------------------------------
function destroyChart() {
    if (chartInstance) {
        chartInstance.destroy(); // Clean up previous chart
    }
}

function renderChart() {
    destroyChart(); // Clear previous chart

    const ctx = document.getElementById('expenseChart').getContext('2d');
    const chartType = document.getElementById('chartType').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    fetch(`http://${ip_addr}/api/expenses`)
        .then(response => response.json())
        .then(expenses => {
            // Filter data based on selections
            let filteredExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                const matchesCategory = categoryFilter === 'all' || expense.category_id == categoryFilter;
                const matchesDate = (!startDate || expenseDate >= new Date(startDate)) &&
                    (!endDate || expenseDate <= new Date(endDate));
                return matchesCategory && matchesDate;
            });

            // Group data for the chart
            const categories = [...new Set(filteredExpenses.map(e => e.category))];
            const categoryTotals = categories.map(category => {
                return filteredExpenses
                    .filter(e => e.category === category)
                    .reduce((sum, e) => sum + parseFloat(e.amount), 0);
            });

            // ------------------------------
            // Chart Data Configuration
            // ------------------------------
            const data = {
                labels: categories,
                datasets: [{
                    label: 'Total Expenses',
                    data: categoryTotals,
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                        '#FF9F40', '#7B68EE', '#20B2AA', '#FF69B4', '#32CD32'
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    borderWidth: 2,
                    hoverOffset: 20
                }]
            };

            // ------------------------------
            // Chart Options Configuration
            // ------------------------------
            const options = {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Expense Breakdown',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        bodyFont: {
                            size: 14
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            };

            // Create the chart
            chartInstance = new Chart(ctx, {
                type: chartType,
                data: data,
                options: options
            });
        });
}

// ------------------------------
// Event Listeners
// ------------------------------
// Add Expense Form Submission
document.getElementById('expenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const categoryId = document.getElementById('category').value;
    const note = document.getElementById('note').value;

    const response = await fetch(`http://${ip_addr}:5000/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, category_id: categoryId, note }),
    });

    if (response.ok) {
        alert('Expense added!');
        document.getElementById('expenseForm').reset();
        if (document.getElementById('graphs').style.display === 'block') {
            renderChart(); // Refresh chart if on graphs page
        }
    }
});

// Apply Filters Button (in Graphs Page)
document.querySelector('#graphs button').addEventListener('click', renderChart);

// ------------------------------
// Initial Setup
// ------------------------------
showHome(); // Load the homepage by default