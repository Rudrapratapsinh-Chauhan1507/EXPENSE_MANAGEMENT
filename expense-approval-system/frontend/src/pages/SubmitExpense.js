import React, { useEffect, useState } from 'react';
import { submitExpense, getExpenses } from '../api/expenses';

const SubmitExpense = () => {
  const [form, setForm] = useState({ amount: '', currency: 'USD', category: '', description: '', date: '' });
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const data = await getExpenses();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await submitExpense(form);
      alert('Expense submitted!');
      setForm({ amount: '', currency: 'USD', category: '', description: '', date: '' });
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert('Submission failed!');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Submit Expense</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 space-y-4">
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="w-full p-2 border rounded" required />
        <input name="currency" value={form.currency} onChange={handleChange} placeholder="Currency" className="w-full p-2 border rounded" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
      </form>

      {/* History */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Expense History</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.slice().reverse().map(exp => (
              <tr key={exp._id} className="border-t">
                <td className="p-2 border">{exp.amount} {exp.currency}</td>
                <td className="p-2 border">{exp.category}</td>
                <td className="p-2 border">{exp.description}</td>
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

export default SubmitExpense;
