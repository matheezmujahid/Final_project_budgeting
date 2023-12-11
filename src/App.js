import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Menu from './Menu/Menu';
import Dashboard from './Dashboard/Dashboard';
import Footer from './Footer/Footer';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import Configuration from './Configuration/Configuration';
import BudgetUsed from './BudgetUsed/BudgetUsed';
function App() {
  return (
    <Router>
      <Menu />
      <div className="mainContainer">
        <Routes>
         
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/Configuration" element={<Configuration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/BudgetUsed" element={<BudgetUsed />} />
          <Route
            path="/"
            element={<Navigate to="/login" />} // Update this based on your authentication logic
          />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
