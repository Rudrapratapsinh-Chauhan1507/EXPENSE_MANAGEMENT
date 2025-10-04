import React, { useState, useEffect } from 'react';
import RoleSelector from './RoleSelector';
import ManagerAssign from './ManagerAssign';

const UserForm = ({ onSave, editingUser, managers }) => {
  const [user, setUser] = useState({ name: '', email: '', role: '', managerId: '' });

  useEffect(() => {
    if (editingUser) setUser(editingUser);
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
    setUser({ name: '', email: '', role: '', managerId: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <input type="text" placeholder="Name" value={user.name} onChange={e => setUser({...user, name:e.target.value})} className="border p-2 rounded w-full mb-2" required/>
      <input type="email" placeholder="Email" value={user.email} onChange={e => setUser({...user, email:e.target.value})} className="border p-2 rounded w-full mb-2" required/>
      <RoleSelector value={user.role} onChange={role => setUser({...user, role})}/>
      <ManagerAssign value={user.managerId} onChange={managerId => setUser({...user, managerId})} managers={managers}/>
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
    </form>
  );
};

export default UserForm;
