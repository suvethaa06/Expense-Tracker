import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Budget from './pages/Budget';
import Settings from './pages/Settings';
import './App.css';

const API_URL = 'http://localhost:5001/api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [expenses]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_URL);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const response = await axios.post(API_URL, expenseData);
      setExpenses([response.data, ...expenses]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const updateExpense = async (id, updatedData) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, updatedData);
      setExpenses(expenses.map(expense => 
        expense._id === id ? response.data : expense
      ));
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const calculateTotals = () => {
    const income = expenses
      .filter(exp => exp.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    const expense = expenses
      .filter(exp => exp.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    setTotalIncome(income);
    setTotalExpenses(expense);
  };

  return (
    <Router>
      <div className="App">
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        
        <header className="App-header">
          <div className="header-content">
            <h1>
              <i className="fas fa-wallet"></i>
              Expense Tracker
            </h1>
            <button 
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
            </button>
          </div>
          
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-home"></i>
              Dashboard
            </Link>
            <Link to="/transactions" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-list"></i>
              Transactions
            </Link>
            <Link to="/analytics" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-chart-line"></i>
              Analytics
            </Link>
            <Link to="/budget" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-wallet"></i>
              Budget
            </Link>
            <Link to="/settings" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-cog"></i>
              Settings
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  expenses={expenses}
                  totalIncome={totalIncome}
                  totalExpenses={totalExpenses}
                  onSubmit={addExpense}
                />
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <Transactions 
                  expenses={expenses}
                  onDelete={deleteExpense}
                  onUpdate={updateExpense}
                />
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <Analytics 
                  expenses={expenses}
                />
              } 
            />
            <Route 
              path="/budget" 
              element={
                <Budget 
                  expenses={expenses}
                  totalExpenses={totalExpenses}
                />
              } 
            />
            <Route 
              path="/settings" 
              element={
                <Settings 
                  expenses={expenses}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
