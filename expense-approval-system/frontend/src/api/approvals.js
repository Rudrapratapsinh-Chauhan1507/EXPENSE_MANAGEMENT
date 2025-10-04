import { getExpenses } from './expenses';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';



export const getPendingApprovals = async (currentUser) => {
  const expenses = await getExpenses();
  // For demo, return all pending expenses
  return expenses.filter((e) => e.status === 'Pending');
};

export const approveExpense = async (id, approver) => {
  const expenses = await getExpenses();
  const exp = expenses.find((e) => e._id === id);
  if (exp) exp.status = 'Approved';
  return exp;
};

export const rejectExpense = async (id, approver) => {
  const expenses = await getExpenses();
  const exp = expenses.find((e) => e._id === id);
  if (exp) exp.status = 'Rejected';
  return exp;
};
