import React, { useEffect, useState } from 'react';
import { getPendingApprovals, approveExpense, rejectExpense } from '../api/approvals';
import { getRules } from '../api/rules';

const Approvals = () => {
  const [expenses, setExpenses] = useState([]);
  const [rules, setRules] = useState([]);

  const fetchExpenses = async () => {
    try {
      const data = await getPendingApprovals();
      setExpenses(data);
    } catch (err) {
      console.error('Error fetching approvals:', err);
    }
  };

  const fetchRules = async () => {
    try {
      const data = await getRules();
      setRules(data);
    } catch (err) {
      console.error('Error fetching rules:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchRules();
  }, []);

  const handleApprove = async (expenseId) => {
    const approver = JSON.parse(localStorage.getItem('user')).name;
    await approveExpense(expenseId, approver);
    fetchExpenses();
  };

  const handleReject = async (expenseId) => {
    const approver = JSON.parse(localStorage.getItem('user')).name;
    await rejectExpense(expenseId, approver);
    fetchExpenses();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Approvals</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Pending Expenses</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Current Step</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp.id} className="border-t">
                <td className="p-2 border">{exp.employeeName}</td>
                <td className="p-2 border">{exp.amount} {exp.currency}</td>
                <td className="p-2 border">{exp.category}</td>
                <td className="p-2 border">{exp.currentStep || 'Manager'}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleApprove(exp.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleReject(exp.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Approval Rules</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Rule Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Approvers / %</th>
            </tr>
          </thead>
          <tbody>
            {rules.map(rule => (
              <tr key={rule.id} className="border-t">
                <td className="p-2 border">{rule.name}</td>
                <td className="p-2 border">{rule.type}</td>
                <td className="p-2 border">
                  {rule.type === 'percentage'
                    ? `${rule.percentage}% of approvers`
                    : rule.approvers.map(a => a.name).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvals;
