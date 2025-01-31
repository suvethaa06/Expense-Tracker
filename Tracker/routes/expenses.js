const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new expense
router.post('/', async (req, res) => {
    const expense = new Expense({
        type: req.body.type,
        category: req.body.category,
        amount: req.body.amount,
        date: req.body.date,
        description: req.body.description
    });

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update expense
router.patch('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const updates = req.body;
        Object.keys(updates).forEach(key => {
            expense[key] = updates[key];
        });

        const updatedExpense = await expense.save();
        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete expense
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await expense.deleteOne();
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get expenses by date range
router.get('/range', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const expenses = await Expense.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ date: -1 });
        
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
