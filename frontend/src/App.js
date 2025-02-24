import React, { useState, useEffect } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

const App = () => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        const response = await fetch('http://localhost:5000/api/expenses');
        const data = await response.json();
        setExpenses(data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            <AddExpense onAdd={fetchExpenses} />
            <ExpenseList expenses={expenses} />
            <ExpenseChart expenses={expenses} />
        </div>
    );
};

export default App;