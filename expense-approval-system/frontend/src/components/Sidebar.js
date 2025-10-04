import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-4 font-bold text-lg border-b border-gray-700">Menu</div>
      <nav className="flex flex-col p-4 space-y-2">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/submit" className="hover:bg-gray-700 p-2 rounded">Submit Expense</Link>
        <Link to="/approvals" className="hover:bg-gray-700 p-2 rounded">Approvals</Link>
        <Link to="/rules" className="hover:bg-gray-700 p-2 rounded">Approval Rules</Link>
        <Link to="/users" className="hover:bg-gray-700 p-2 rounded">User Management</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
