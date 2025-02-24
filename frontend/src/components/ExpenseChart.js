import React from 'react';
import { Bar } from 'react-chartjs-2';

const ExpenseChart = ({ expenses }) => {
    const data = {
        labels: expenses.map((e) => e.category),
        datasets: [
            {
                label: 'Expenses',
                data: expenses.map((e) => e.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Expense Chart</h2>
            <Bar data={data} />
        </div>
    );
};

export default ExpenseChart;