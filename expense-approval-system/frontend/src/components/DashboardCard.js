import React from 'react';

const DashboardCard = ({ title, count, color }) => {
  const bgColor = {
    yellow: 'bg-yellow-400',
    green: 'bg-green-400',
    red: 'bg-red-400',
  }[color || 'gray'];

  return (
    <div className={`${bgColor} p-4 rounded shadow text-white`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

export default DashboardCard;
