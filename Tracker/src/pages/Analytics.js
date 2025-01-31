import React from 'react';
import Charts from '../components/Charts';
import { Link } from 'react-router-dom';
import './Analytics.css';

function Analytics({ expenses }) {
    return (
        <div className="analytics-page">
            <div className="page-header">
                <Link to="/" className="back-btn">
                    <i className="fas fa-arrow-left"></i>
                    Back to Dashboard
                </Link>
                <h2>
                    <i className="fas fa-chart-line"></i>
                    Analytics
                </h2>
            </div>

            <div className="analytics-summary">
                <div className="summary-card">
                    <h3>Top Expense Category</h3>
                    <p>{getTopCategory(expenses, 'expense')}</p>
                </div>
                <div className="summary-card">
                    <h3>Top Income Category</h3>
                    <p>{getTopCategory(expenses, 'income')}</p>
                </div>
                <div className="summary-card">
                    <h3>Average Daily Expense</h3>
                    <p>₹{calculateAverageDailyExpense(expenses)}</p>
                </div>
            </div>

            <Charts expenses={expenses} />
        </div>
    );
}

function getTopCategory(expenses, type) {
    const categoryTotals = expenses
        .filter(exp => exp.type === type)
        .reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});
    
    const topCategory = Object.entries(categoryTotals)
        .sort(([,a], [,b]) => b - a)[0];
    
    return topCategory ? topCategory[0] : 'No data';
}

function calculateAverageDailyExpense(expenses) {
    const expenseOnly = expenses.filter(exp => exp.type === 'expense');
    if (expenseOnly.length === 0) return 0;

    const total = expenseOnly.reduce((sum, exp) => sum + exp.amount, 0);
    const days = 30; // Assuming last 30 days
    return (total / days).toLocaleString('en-IN', {
        maximumFractionDigits: 2
    });
}

export default Analytics;
