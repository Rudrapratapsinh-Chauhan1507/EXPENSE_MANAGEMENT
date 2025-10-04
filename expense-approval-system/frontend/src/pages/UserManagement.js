import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser } from '../api/users';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', role: 'employee', managerId: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async e => {
    e.preventDefault();
    try {
      if (editingUser) await updateUser(editingUser._id, form);
      else await createUser(form);
      setEditingUser(null);
      setForm({ name: '', email: '', role: 'employee', managerId: '' });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <form className="space-y-2 mb-6" onSubmit={handleSave}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border rounded w-full" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-2 border rounded w-full" required />
        <select name="role" value={form.role} onChange={handleChange} className="p-2 border rounded w-full">
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <select name="managerId" value={form.managerId} onChange={handleChange} className="p-2 border rounded w-full">
          <option value="">Assign Manager (optional)</option>
          {users.filter(u => u.role === 'manager').map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
      </form>

      <table className="w-full border rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Manager</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.manager?.name || '-'}</td>
              <td className="p-2">
                <button onClick={() => { setEditingUser(u); setForm({ name: u.name, email: u.email, role: u.role, managerId: u.manager?._id || '' }); }} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
