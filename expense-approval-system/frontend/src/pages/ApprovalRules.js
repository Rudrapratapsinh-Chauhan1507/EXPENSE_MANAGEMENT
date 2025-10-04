import React, { useEffect, useState } from 'react';
import { getRules, saveRule } from '../api/rules';
import { getUsers } from '../api/users';

const ApprovalRules = () => {
  const [rules, setRules] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', type: 'percentage', percentage: 50, approvers: [] });

  const fetchRules = async () => setRules(await getRules());
  const fetchUsers = async () => setUsers(await getUsers());

  useEffect(() => {
    fetchRules();
    fetchUsers();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleApproversChange = e => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) if (options[i].selected) selected.push(options[i].value);
    setForm({ ...form, approvers: selected });
  };

  const handleSave = async () => {
    try {
      await saveRule(form);
      setForm({ name: '', type: 'percentage', percentage: 50, approvers: [] });
      fetchRules();
    } catch (err) {
      console.error(err);
      alert('Save failed!');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Approval Rules</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow mb-6 space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Rule Name" className="w-full p-2 border rounded" />
        <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="percentage">Percentage</option>
          <option value="specific">Specific Approver</option>
          <option value="hybrid">Hybrid</option>
        </select>
        {form.type === 'percentage' && (
          <input type="number" name="percentage" value={form.percentage} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Percentage" />
        )}
        <select multiple name="approvers" value={form.approvers} onChange={handleApproversChange} className="w-full p-2 border rounded">
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Rule</button>
      </div>

      {/* Rules Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Rules</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Percentage</th>
              <th className="p-2 border">Approvers</th>
            </tr>
          </thead>
          <tbody>
            {rules.map(rule => (
              <tr key={rule._id} className="border-t">
                <td className="p-2 border">{rule.name}</td>
                <td className="p-2 border">{rule.type}</td>
                <td className="p-2 border">{rule.percentage || '-'}</td>
                <td className="p-2 border">{rule.approvers.map(a => a.name).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalRules;
