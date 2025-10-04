import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const mockExpenses = [
  { _id: '1', employeeName: 'John Doe', amount: 120, currency: 'USD', category: 'Travel', description: 'Taxi fare', date: '2025-10-01', status: 'Pending' },
  { _id: '2', employeeName: 'Jane Smith', amount: 250, currency: 'USD', category: 'Meals', description: 'Lunch with client', date: '2025-09-28', status: 'Approved' },
  { _id: '3', employeeName: 'Alice Johnson', amount: 90, currency: 'USD', category: 'Stationery', description: 'Office supplies', date: '2025-09-30', status: 'Rejected' },
];

export const getExpenses = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(mockExpenses), 300));
};

export const submitExpense = async (expense) => {
  return new Promise((resolve) => {
    const newExpense = { ...expense, _id: String(mockExpenses.length + 1), status: 'Pending' };
    mockExpenses.push(newExpense);
    setTimeout(() => resolve(newExpense), 300);
  });
};
