import React, { useEffect, useState } from 'react';
import { getExpenses } from '../api/expenses';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const approved = expenses.filter(e => e.status === 'Approved').length;
  const rejected = expenses.filter(e => e.status === 'Rejected').length;
  const pending = expenses.filter(e => e.status === 'Pending').length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-200 p-4 rounded text-center">Approved: {approved}</div>
        <div className="bg-red-200 p-4 rounded text-center">Rejected: {rejected}</div>
        <div className="bg-yellow-200 p-4 rounded text-center">Pending: {pending}</div>
      </div>

      <h2 className="text-xl font-bold mb-2">Recent Expenses</h2>
      <table className="w-full border rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Employee</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.slice(-10).map(exp => (
            <tr key={exp._id} className="border-t">
              <td className="p-2">{exp.employee?.name}</td>
              <td className="p-2">{exp.amount}</td>
              <td className="p-2">{exp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
