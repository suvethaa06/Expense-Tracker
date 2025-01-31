import React, { useState } from 'react';
import './ExpenseList.css';

function ExpenseList({ expenses, onDelete, onUpdate }) {
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleEdit = (expense) => {
        setEditId(expense._id);
        setEditData(expense);
    };

    const handleUpdate = () => {
        onUpdate(editId, editData);
        setEditId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value
        }));
    };

    return (
        <div className="expense-list">
            <h2>Transaction History</h2>
            {expenses.map(expense => (
                <div 
                    key={expense._id} 
                    className={`expense-item ${expense.type}`}
                >
                    {editId === expense._id ? (
                        <div className="edit-form">
                            <input
                                type="number"
                                name="amount"
                                value={editData.amount}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                            />
                            <input
                                type="text"
                                name="description"
                                value={editData.description}
                                onChange={handleChange}
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditId(null)}>Cancel</button>
                        </div>
                    ) : (
                        <>
                            <div className="expense-info">
                                <span className="date">
                                    {new Date(expense.date).toLocaleDateString()}
                                </span>
                                <span className="description">{expense.description}</span>
                                <span className="category">{expense.category}</span>
                                <span className={`amount ${expense.type}`}>
                                    {expense.type === 'expense' ? '-' : '+'}₹
                                    {expense.amount.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div className="actions">
                                <button 
                                    className="edit-btn"
                                    onClick={() => handleEdit(expense)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="delete-btn"
                                    onClick={() => onDelete(expense._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ExpenseList;
