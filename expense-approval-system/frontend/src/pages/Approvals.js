import React, { useState, useEffect } from 'react';
import { getPendingApprovals, approveExpense, rejectExpense } from '../api/approvals';

const Approvals = () => {
  const [pending, setPending] = useState([]);
  const userId = 'YOUR_USER_ID_HERE'; // replace with logged-in user id

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const data = await getPendingApprovals(userId);
      setPending(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveExpense(id, userId);
      fetchPending();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectExpense(id, userId);
      fetchPending();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Approvals</h1>

      <table className="w-full border rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Employee</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pending.map(exp => (
            <tr key={exp._id} className="border-t">
              <td className="p-2">{exp.employee?.name}</td>
              <td className="p-2">{exp.amount}</td>
              <td className="p-2">{exp.status}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleApprove(exp._id)} className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">Approve</button>
                <button onClick={() => handleReject(exp._id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approvals;
