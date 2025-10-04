import React from 'react';

const Dashboard = () => {
  const stats = {
    totalExpenses: 12,
    pending: 5,
    approved: 6,
    rejected: 1,
  };

  const recentExpenses = [
    { id: 1, employee: 'John Doe', amount: 120, currency: 'USD', status: 'Pending' },
    { id: 2, employee: 'Jane Smith', amount: 250, currency: 'USD', status: 'Approved' },
    { id: 3, employee: 'Alice Johnson', amount: 80, currency: 'USD', status: 'Rejected' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">Total Expenses: {stats.totalExpenses}</div>
        <div className="bg-white p-4 rounded shadow text-center">Pending: {stats.pending}</div>
        <div className="bg-white p-4 rounded shadow text-center">Approved: {stats.approved}</div>
        <div className="bg-white p-4 rounded shadow text-center">Rejected: {stats.rejected}</div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Employee</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentExpenses.map(e => (
              <tr key={e.id} className="border-t">
                <td className="p-2 border">{e.employee}</td>
                <td className="p-2 border">{e.amount} {e.currency}</td>
                <td className="p-2 border">{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
