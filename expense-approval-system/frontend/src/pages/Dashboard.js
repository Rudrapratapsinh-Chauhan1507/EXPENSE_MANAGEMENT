import React, { useEffect, useState } from 'react';
import { getExpenses } from '../api/expenses';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const summary = {
    total: expenses.length,
    approved: expenses.filter(e => e.status === 'Approved').length,
    rejected: expenses.filter(e => e.status === 'Rejected').length,
    pending: expenses.filter(e => e.status === 'Pending').length,
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold capitalize">{key}</h2>
            <p className="text-2xl">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Expenses Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.slice(-5).reverse().map(exp => (
              <tr key={exp._id} className="border-t">
                <td className="p-2 border">{exp.employeeName}</td>
                <td className="p-2 border">{exp.amount} {exp.currency}</td>
                <td className="p-2 border">{exp.category}</td>
                <td className="p-2 border">{exp.status}</td>
                <td className="p-2 border">{new Date(exp.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
