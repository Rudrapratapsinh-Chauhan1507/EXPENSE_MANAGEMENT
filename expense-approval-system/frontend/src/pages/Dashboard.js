import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { getExpenses } from '../api/expenses';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const expensesData = await getExpenses();
        setUsers(usersData);
        setExpenses(expensesData);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Cannot load dashboard data. Check backend.');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Total Users</h2>
          <p>{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Total Expenses</h2>
          <p>{expenses.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Pending Expenses</h2>
          <p>{expenses.filter(e => e.status === 'Pending').length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
