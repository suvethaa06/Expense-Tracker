import React, { useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import DateRangeFilter from '../components/DateRangeFilter';
import { Link } from 'react-router-dom';
import './Transactions.css';

function Transactions({ expenses, onDelete, onUpdate }) {
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);

    const handleDateFilter = ({ startDate, endDate }) => {
        if (!startDate || !endDate) {
            setFilteredExpenses(expenses);
            return;
        }

        const filtered = expenses.filter(expense => {
            const expenseDate = new Date(expense.date).toISOString().split('T')[0];
            return expenseDate >= startDate && expenseDate <= endDate;
        });

        setFilteredExpenses(filtered);
    };

    return (
        <div className="transactions-page">
            <div className="transactions-header">
                <Link to="/" className="back-btn">
                    <i className="fas fa-arrow-left"></i>
                    Back to Dashboard
                </Link>
                <h2>
                    <i className="fas fa-list"></i>
                    Transaction History
                </h2>
            </div>
            
            <DateRangeFilter onFilter={handleDateFilter} />
            
            <ExpenseList 
                expenses={filteredExpenses}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        </div>
    );
}

export default Transactions;
