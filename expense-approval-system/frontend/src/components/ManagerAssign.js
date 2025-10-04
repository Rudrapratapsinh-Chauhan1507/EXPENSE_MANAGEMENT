import React from 'react';

const ManagerAssign = ({ value, onChange, managers }) => (
  <div className="mb-2">
    <label className="block mb-1 font-medium">Assign Manager</label>
    <select value={value || ''} onChange={e => onChange(e.target.value)} className="w-full border p-2 rounded">
      <option value="">Select Manager</option>
      {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
    </select>
  </div>
);

export default ManagerAssign;
