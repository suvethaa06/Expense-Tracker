import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';
import './Settings.css';

function Settings({ expenses }) {
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
        <div className="settings-page">
            <div className="page-header">
                <Link to="/" className="back-btn">
                    <i className="fas fa-arrow-left"></i>
                    Back to Dashboard
                </Link>
                <h2>
                    <i className="fas fa-cog"></i>
                    Settings
                </h2>
            </div>

            <div className="settings-section">
                <h3>Data Management</h3>
                <div className="settings-card">
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Export Data</h4>
                            <p>Download your transaction history as a CSV file</p>
                        </div>
                        <Button
                            variant="contained"
                            startIcon={<FileDownloadIcon />}
                            onClick={handleExportData}
                            className="export-btn"
                        >
                            Export CSV
                        </Button>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h3>Quick Links</h3>
                <div className="settings-card">
                    <Link to="/analytics" className="setting-link">
                        <i className="fas fa-chart-line"></i>
                        View Analytics
                    </Link>
                    <Link to="/budget" className="setting-link">
                        <i className="fas fa-wallet"></i>
                        Budget Management
                    </Link>
                    <Link to="/transactions" className="setting-link">
                        <i className="fas fa-list"></i>
                        Transaction History
                    </Link>
                </div>
            </div>

            <div className="settings-section">
                <h3>App Information</h3>
                <div className="settings-card">
                    <div className="app-info">
                        <p><strong>Version:</strong> 1.0.0</p>
                        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
