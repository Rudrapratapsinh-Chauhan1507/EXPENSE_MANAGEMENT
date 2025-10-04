import React, { useState, useEffect } from 'react';
import { getRules, saveRule } from '../api/approvalRules';
import { getUsers } from '../api/users';

const ApprovalRules = () => {
  const [rules, setRules] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', type: 'percentage', percentage: 0, approvers: [] });

  useEffect(() => {
    fetchRules();
    fetchUsers();
  }, []);

  const fetchRules = async () => {
    try {
      const data = await getRules();
      setRules(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleApprovers = e => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setForm({ ...form, approvers: options });
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      await saveRule(form);
      setForm({ name: '', type: 'percentage', percentage: 0, approvers: [] });
      fetchRules();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Approval Rules</h1>

      <form className="space-y-2 mb-6" onSubmit={handleSave}>
        <input type="text" name="name" placeholder="Rule Name" value={form.name} onChange={handleChange} className="p-2 border rounded w-full" required />

        <select name="type" value={form.type} onChange={handleChange} className="p-2 border rounded w-full">
          <option value="percentage">Percentage Rule</option>
          <option value="specific">Specific Approver</option>
          <option value="hybrid">Hybrid</option>
        </select>

        {form.type === 'percentage' && (
          <input type="number" name="percentage" placeholder="Percentage" value={form.percentage} onChange={handleChange} className="p-2 border rounded w-full" required />
        )}

        <select multiple value={form.approvers} onChange={handleApprovers} className="p-2 border rounded w-full">
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Rule</button>
      </form>

      <table className="w-full border rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Percentage</th>
            <th className="p-2">Approvers</th>
          </tr>
        </thead>
        <tbody>
          {rules.map(rule => (
            <tr key={rule._id} className="border-t">
              <td className="p-2">{rule.name}</td>
              <td className="p-2">{rule.type}</td>
              <td className="p-2">{rule.percentage || '-'}</td>
              <td className="p-2">{rule.approvers.map(a => a.name).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalRules;
