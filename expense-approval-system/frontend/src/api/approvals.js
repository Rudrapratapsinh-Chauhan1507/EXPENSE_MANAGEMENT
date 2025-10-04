import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getPendingApprovals = async () => {
  const res = await axios.get(`${BASE_URL}/approvals/pending`);
  return res.data;
};

export const approveExpense = async (expenseId, approver) => {
  const res = await axios.post(`${BASE_URL}/approvals/${expenseId}`, {
    action: 'approve',
    approver
  });
  return res.data;
};

export const rejectExpense = async (expenseId, approver) => {
  const res = await axios.post(`${BASE_URL}/approvals/${expenseId}`, {
    action: 'reject',
    approver
  });
  return res.data;
};
