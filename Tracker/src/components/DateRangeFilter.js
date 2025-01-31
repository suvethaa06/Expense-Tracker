import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { format } from 'date-fns';
import './DateRangeFilter.css';

const DateRangeFilter = ({ onFilter }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = () => {
        onFilter({ startDate, endDate });
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        onFilter({ startDate: '', endDate: '' });
    };

    return (
        <div className="date-filter">
            <TextField
                type="date"
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                type="date"
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <div className="filter-buttons">
                <Button
                    variant="contained"
                    onClick={handleFilter}
                    disabled={!startDate || !endDate}
                >
                    Apply Filter
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleReset}
                    disabled={!startDate && !endDate}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default DateRangeFilter;
