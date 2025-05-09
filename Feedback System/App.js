import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import StickyHeader from './components/header'; // Assuming you renamed header.js
import LoginPage from './components/LoginPage';
import TeacherSelection from './components/teacher';
import FeedbackForm from './components/form';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from "./components/Dashboard";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Only show StickyHeader on non-login pages */}
      {!isLoginPage && <StickyHeader />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/teacher-select" element={<TeacherSelection />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>

      {/* Watermark */}
      <div style={styles.watermark}>Designed by: Strategic Knights</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

const styles = {
  watermark: {
    position: 'fixed',
    bottom: '10px',
    right: '20px',
    fontSize: '12px',
    color: 'black',
    opacity: 0.6,
    zIndex: 999,
    fontStyle: 'italic',
    pointerEvents: 'none',
  }
};

export default App;
