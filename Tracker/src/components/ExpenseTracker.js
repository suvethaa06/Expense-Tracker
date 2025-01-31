import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import './ExpenseTracker.css';

const API_URL = 'http://localhost:5000/api/expenses';

function ExpenseTracker() {
    const [expenses, setExpenses] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        calculateTotals();
    }, [expenses]);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(API_URL);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const response = await axios.post(API_URL, expenseData);
            setExpenses([response.data, ...expenses]);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const updateExpense = async (id, updatedData) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}`, updatedData);
            setExpenses(expenses.map(expense => 
                expense._id === id ? response.data : expense
            ));
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const calculateTotals = () => {
        const income = expenses
            .filter(exp => exp.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);
        
        const expense = expenses
            .filter(exp => exp.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);

        setTotalIncome(income);
        setTotalExpenses(expense);
    };

    return (
        <div className="expense-tracker">
            <div className="summary">
                <div className="summary-item income">
                    <div className="summary-icon">
                        <i className="fas fa-arrow-down"></i>
                    </div>
                    <h3>Total Income</h3>
                    <p>₹{totalIncome.toLocaleString('en-IN')}</p>
                </div>
                <div className="summary-item expenses">
                    <div className="summary-icon">
                        <i className="fas fa-arrow-up"></i>
                    </div>
                    <h3>Total Expenses</h3>
                    <p>₹{totalExpenses.toLocaleString('en-IN')}</p>
                </div>
                <div className="summary-item balance">
                    <div className="summary-icon">
                        <i className="fas fa-wallet"></i>
                    </div>
                    <h3>Balance</h3>
                    <p>₹{(totalIncome - totalExpenses).toLocaleString('en-IN')}</p>
                </div>
            </div>
            
            <ExpenseForm onSubmit={addExpense} />
            <ExpenseList 
                expenses={expenses}
                onDelete={deleteExpense}
                onUpdate={updateExpense}
            />
        </div>
    );
}

export default ExpenseTracker;
