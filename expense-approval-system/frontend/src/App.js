import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SubmitExpense from './pages/SubmitExpense';
import Approvals from './pages/Approvals';
import UserManagement from './pages/UserManagement';
import ApprovalRules from './pages/ApprovalRules';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* All pages open directly */}
        <Route path="/" element={<DashboardWrapper><Dashboard /></DashboardWrapper>} />
        <Route path="/submit" element={<DashboardWrapper><SubmitExpense /></DashboardWrapper>} />
        <Route path="/approvals" element={<DashboardWrapper><Approvals /></DashboardWrapper>} />
        <Route path="/users" element={<DashboardWrapper><UserManagement /></DashboardWrapper>} />
        <Route path="/rules" element={<DashboardWrapper><ApprovalRules /></DashboardWrapper>} />
      </Routes>
    </Router>
  );
};

// Wrapper to include Navbar + Sidebar for all pages
const DashboardWrapper = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar user={JSON.parse(localStorage.getItem('user')) || { name: 'Guest', role: 'guest' }} />
      <main className="p-6 overflow-auto">{children}</main>
    </div>
  </div>
);

export default App;
