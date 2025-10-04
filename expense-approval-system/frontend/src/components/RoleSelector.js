import React from 'react';

const RoleSelector = ({ value, onChange }) => (
  <div className="mb-2">
    <label className="block mb-1 font-medium">Role</label>
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full border p-2 rounded">
      <option value="">Select Role</option>
      <option value="employee">Employee</option>
      <option value="manager">Manager</option>
      <option value="admin">Admin</option>
    </select>
  </div>
);

export default RoleSelector;
