import React from 'react';

const Navbar = ({ user }) => {
  return (
    <nav className="bg-white border-b p-4 flex justify-between items-center shadow">
      <div className="text-xl font-bold">Expense Management</div>
      <div className="flex items-center space-x-4">
        <span className="font-medium">{user.name}</span>
        <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
      </div>
    </nav>
  );
};

export default Navbar;
