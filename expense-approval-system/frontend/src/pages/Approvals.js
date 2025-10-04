import React, { useEffect, useState } from 'react';
import { getPendingApprovals, approveExpense, rejectExpense } from '../api/approvals';

const Approvals = () => {
  const [pending, setPending] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // current logged-in user

  const fetchPending = async () => {
    try {
      const data = await getPendingApprovals(user);
      setPending(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (expenseId, action) => {
    try {
      if (action === 'approve') await approveExpense(expenseId, user.name);
      else await rejectExpense(expenseId, user.name);
      fetchPending();
    } catch (err) {
      console.error(err);
      alert('Action failed!');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>
      {pending.length === 0 ? <p>No approvals pending</p> : (
        <table className="w-full table-auto border-collapse border bg-white p-4 rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Current Step</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.map(exp => (
              <tr key={exp._id} className="border-t">
                <td className="p-2 border">{exp.employeeName}</td>
                <td className="p-2 border">{exp.amount} {exp.currency}</td>
                <td className="p-2 border">{exp.category}</td>
                <td className="p-2 border">{exp.currentStep}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleAction(exp._id, 'approve')}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(exp._id, 'reject')}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Approvals;
