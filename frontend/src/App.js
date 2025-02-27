import React, { useState, useEffect } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import './App.css';
import dotenv from "dotenv";
dotenv.config()

const ip_addr = process.env.IP_ADDR
console.log(ip_addr)
const App = () => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        const response = await fetch(`http://${ip_addr}:5000/api/expenses`);
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