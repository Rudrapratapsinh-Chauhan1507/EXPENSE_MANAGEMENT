import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser } from '../api/users';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'employee', managerId: '' });

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      if (editingUser) await updateUser(editingUser._id, form);
      else await createUser(form);
      setEditingUser(null);
      setForm({ name: '', email: '', role: 'employee', managerId: '' });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Save failed!');
    }
  };

  const handleEdit = user => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, managerId: user.managerId || '' });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow mb-6 space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <select name="managerId" value={form.managerId} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Manager</option>
          {users.filter(u => u.role === 'manager').map(u => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Manager</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{users.find(u => u._id === user.managerId)?.name || '-'}</td>
                <td className="p-2 border">
                  <button onClick={() => handleEdit(user)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
