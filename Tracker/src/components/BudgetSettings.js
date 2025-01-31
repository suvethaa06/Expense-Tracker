import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    LinearProgress,
} from '@mui/material';
import './BudgetSettings.css';

const BudgetSettings = ({ expenses, totalExpenses }) => {
    const [open, setOpen] = useState(false);
    const [monthlyBudget, setMonthlyBudget] = useState(
        localStorage.getItem('monthlyBudget') || ''
    );
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        checkBudgetAlert();
    }, [totalExpenses]);

    const handleSave = () => {
        localStorage.setItem('monthlyBudget', monthlyBudget);
        setOpen(false);
        checkBudgetAlert();
    };

    const checkBudgetAlert = () => {
        const budget = parseFloat(monthlyBudget);
        if (budget && totalExpenses >= budget * 0.8) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    };

    const calculateProgress = () => {
        const budget = parseFloat(monthlyBudget);
        if (!budget) return 0;
        return (totalExpenses / budget) * 100;
    };

    const getProgressColor = (progress) => {
        if (progress >= 90) return 'error';
        if (progress >= 75) return 'warning';
        return 'success';
    };

    return (
        <div className="budget-settings">
            {monthlyBudget && (
                <div className="budget-progress">
                    <h3>Monthly Budget Progress</h3>
                    <LinearProgress
                        variant="determinate"
                        value={Math.min(calculateProgress(), 100)}
                        color={getProgressColor(calculateProgress())}
                        sx={{ height: 10, borderRadius: 5 }}
                    />
                    <div className="budget-details">
                        <span>₹{totalExpenses.toLocaleString('en-IN')} spent</span>
                        <span>Budget: ₹{parseFloat(monthlyBudget).toLocaleString('en-IN')}</span>
                    </div>
                </div>
            )}

            {showAlert && (
                <Alert severity="warning" className="budget-alert">
                    You've used {calculateProgress().toFixed(1)}% of your monthly budget!
                </Alert>
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                className="set-budget-btn"
            >
                {monthlyBudget ? 'Update Budget' : 'Set Budget'}
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Set Monthly Budget</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Monthly Budget (₹)"
                        type="number"
                        fullWidth
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BudgetSettings;
