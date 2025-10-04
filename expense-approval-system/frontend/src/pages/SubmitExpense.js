import React, { useState, useEffect } from 'react';
import { submitExpense, getExpenses } from '../api/expenses';
import { getUsers } from '../api/users';

const SubmitExpense = () => {
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    employeeId: '',
    amount: '',
    currency: 'USD',
    category: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    fetchUsers();
    fetchExpenses();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await submitExpense(form);
      alert('Expense submitted!');
      setForm({ ...form, amount: '', category: '', description: '', date: '' });
      fetchExpenses();
    } catch (err) {
      alert('Failed to submit expense');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Expense</h1>

      <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
        <select name="employeeId" value={form.employeeId} onChange={handleChange} className="p-2 border rounded w-full" required>
          <option value="">Select Employee</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>

        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="p-2 border rounded w-full" required />

        <input type="text" name="currency" placeholder="Currency" value={form.currency} onChange={handleChange} className="p-2 border rounded w-full" required />

        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="p-2 border rounded w-full" />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 border rounded w-full" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-2 border rounded w-full" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
      </form>

      <h2 className="text-xl font-bold mb-2">Expense History</h2>
      <table className="w-full border rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Employee</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Currency</th>
            <th className="p-2">Category</th>
            <th className="p-2">Description</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp._id} className="border-t">
              <td className="p-2">{exp.employee?.name}</td>
              <td className="p-2">{exp.amount}</td>
              <td className="p-2">{exp.currency}</td>
              <td className="p-2">{exp.category}</td>
              <td className="p-2">{exp.description}</td>
              <td className="p-2">{exp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmitExpense;
