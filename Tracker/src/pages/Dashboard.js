import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Charts from '../components/Charts';
import BudgetSettings from '../components/BudgetSettings';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';
import './Dashboard.css';

function Dashboard({ expenses, totalIncome, totalExpenses, onSubmit }) {
    const handleExportData = () => {
        const csvContent = [
            ['Date', 'Type', 'Category', 'Amount', 'Description'],
            ...expenses.map(expense => [
                new Date(expense.date).toLocaleDateString(),
                expense.type,
                expense.category,
                expense.amount,
                expense.description
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, `expense_tracker_${new Date().toLocaleDateString()}.csv`);
    };

    return (
        <div className="dashboard">
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

            <div className="dashboard-actions">
                <Button
                    variant="contained"
                    startIcon={<FileDownloadIcon />}
                    onClick={handleExportData}
                    className="export-btn"
                >
                    Export Data
                </Button>
                <Link to="/transactions" className="view-transactions-btn">
                    <i className="fas fa-list"></i>
                    View All Transactions
                </Link>
            </div>

            <ExpenseForm onSubmit={onSubmit} />
            
            <BudgetSettings expenses={expenses} totalExpenses={totalExpenses} />
            
            <Charts expenses={expenses} />
        </div>
    );
}

export default Dashboard;
