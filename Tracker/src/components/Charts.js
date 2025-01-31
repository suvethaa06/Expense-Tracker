import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import './Charts.css';

import { Chart, Filler } from 'chart.js';

// Register the Filler plugin
Chart.register(Filler);


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Charts = ({ expenses }) => {
    // Prepare data for line chart (expense trend)
    const prepareLineChartData = () => {
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const dailyTotals = last7Days.map(date => {
            return expenses
                .filter(exp => exp.date.split('T')[0] === date)
                .reduce((total, exp) => total + (exp.type === 'expense' ? exp.amount : 0), 0);
        });

        return {
            labels: last7Days,
            datasets: [
                {
                    label: 'Daily Expenses',
                    data: dailyTotals,
                    borderColor: '#ff5252',
                    backgroundColor: 'rgba(255, 82, 82, 0.1)',
                    tension: 0.4,
                    fill: true,
                },
            ],
        };
    };

    // Prepare data for pie chart (category distribution)
    const preparePieChartData = () => {
        const categoryTotals = expenses
            .filter(exp => exp.type === 'expense')
            .reduce((acc, exp) => {
                acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
                return acc;
            }, {});

        const backgroundColors = [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
        ];

        return {
            labels: Object.keys(categoryTotals),
            datasets: [
                {
                    data: Object.values(categoryTotals),
                    backgroundColor: backgroundColors,
                    borderWidth: 1,
                },
            ],
        };
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expense Trend (Last 7 Days)',
                color: '#ffffff',
            },
        },
        scales: {
            y: {
                ticks: { color: '#ffffff' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
            x: {
                ticks: { color: '#ffffff' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#ffffff',
                },
            },
            title: {
                display: true,
                text: 'Expense Distribution by Category',
                color: '#ffffff',
            },
        },
    };

    return (
        <div className="charts-container">
            <div className="chart-wrapper">
                <Line data={prepareLineChartData()} options={lineOptions} />
            </div>
            <div className="chart-wrapper">
                <Pie data={preparePieChartData()} options={pieOptions} />
            </div>
        </div>
    );
};

export default Charts;
