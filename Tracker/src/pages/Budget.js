import React from 'react';
import BudgetSettings from '../components/BudgetSettings';
import { Link } from 'react-router-dom';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Paper
} from '@mui/material';
import './Budget.css';

function Budget({ expenses, totalExpenses }) {
    const calculateCategoryBudgets = () => {
        const categoryTotals = expenses
            .filter(exp => exp.type === 'expense')
            .reduce((acc, curr) => {
                acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                return acc;
            }, {});

        const totalSpent = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
        
        return Object.entries(categoryTotals)
            .map(([category, amount]) => ({
                category,
                amount,
                percentage: ((amount / totalSpent) * 100).toFixed(1)
            }))
            .sort((a, b) => b.amount - a.amount);
    };

    return (
        <div className="budget-page">
            <div className="page-header">
                <Link to="/" className="back-btn">
                    <i className="fas fa-arrow-left"></i>
                    Back to Dashboard
                </Link>
                <h2>
                    <i className="fas fa-wallet"></i>
                    Budget Management
                </h2>
            </div>

            <BudgetSettings expenses={expenses} totalExpenses={totalExpenses} />

            <div className="category-analysis">
                <h3>Category-wise Spending Analysis</h3>
                <TableContainer component={Paper} className="category-table">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">% of Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {calculateCategoryBudgets().map((row) => (
                                <TableRow key={row.category}>
                                    <TableCell component="th" scope="row">
                                        {row.category}
                                    </TableCell>
                                    <TableCell align="right">
                                        ₹{row.amount.toLocaleString('en-IN')}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.percentage}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default Budget;
