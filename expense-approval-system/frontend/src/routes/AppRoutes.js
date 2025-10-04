import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import SubmitExpense from '../pages/SubmitExpense';
import Approvals from '../pages/Approvals';
import ApprovalRules from '../pages/ApprovalRules';
import UserManagement from '../pages/UserManagement';

const AppRoutes = () => {
  const isAuthenticated = true; // Replace with auth check
  const userRole = 'admin'; // Replace with role from auth

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            {userRole === 'employee' && <Route path="/submit-expense" element={<SubmitExpense />} />}
            {['manager', 'admin'].includes(userRole) && <Route path="/approvals" element={<Approvals />} />}
            {userRole === 'admin' && (
              <>
                <Route path="/approval-rules" element={<ApprovalRules />} />
                <Route path="/user-management" element={<UserManagement />} />
              </>
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
