import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/approvals';

export const getPendingApprovals = async () => {
  const response = await axios.get(`${BASE_URL}/pending`);
  return response.data;
};

export const approveExpense = async (expenseId, approver) => {
  const response = await axios.post(`${BASE_URL}/${expenseId}`, { action: 'approve', approver });
  return response.data;
};

export const rejectExpense = async (expenseId, approver) => {
  const response = await axios.post(`${BASE_URL}/${expenseId}`, { action: 'reject', approver });
  return response.data;
};
