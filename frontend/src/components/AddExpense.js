import React, { useState } from 'react';
import dotenv from "dotenv";
dotenv.config()

const ip_addr = process.env.IP_ADDR

const AddExpense = ({ onAdd }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [note, setNote] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://${ip_addr}/api/expenses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, category_id: 1, note }), // Hardcoded category_id for simplicity
        });
        if (response.ok) {
            setAmount('');
            setNote('');
            onAdd();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default AddExpense;