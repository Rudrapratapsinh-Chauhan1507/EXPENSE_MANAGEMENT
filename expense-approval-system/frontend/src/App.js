import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SubmitExpense from './pages/SubmitExpense';
import Approvals from './pages/Approvals';
import UserManagement from './pages/UserManagement';
import ApprovalRules from './pages/ApprovalRules';

function App() {
  const user = { name: 'Admin User', role: 'admin' };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar on the left */}
        <Sidebar className="w-64 min-h-screen bg-white shadow" />

        {/* Right section: Navbar + Pages */}
        <div className="flex-1 flex flex-col">
          <Navbar user={user} />
          <main className="flex-1 p-6 overflow-auto bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/submit" element={<SubmitExpense />} />
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/rules" element={<ApprovalRules />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
