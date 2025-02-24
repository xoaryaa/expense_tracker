import React from 'react';

const ExpenseList = ({ expenses }) => (
    <div>
        <h2>Expenses</h2>
        <ul>
            {expenses.map((expense) => (
                <li key={expense.id}>
                    {expense.amount} - {expense.category} - {expense.note}
                </li>
            ))}
        </ul>
    </div>
);

export default ExpenseList;