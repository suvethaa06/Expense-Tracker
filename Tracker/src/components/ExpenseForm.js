import React, { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
    });

    const categories = [
        'Food',
        'Transportation',
        'Housing',
        'Utilities',
        'Entertainment',
        'Healthcare',
        'Shopping',
        'Salary',
        'Investment',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            amount: parseFloat(formData.amount)
        });
        setFormData({
            amount: '',
            category: '',
            description: '',
            type: 'expense',
            date: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Type</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>

            <div className="form-group">
                <label>Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount (₹)"
                    required
                    min="0"
                    step="0.01"
                />
            </div>

            <div className="form-group">
                <label>Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    required
                />
            </div>

            <div className="form-group">
                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="submit-btn">
                Add {formData.type}
            </button>
        </form>
    );
}

export default ExpenseForm;
