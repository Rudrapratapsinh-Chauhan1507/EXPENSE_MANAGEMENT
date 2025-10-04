import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/expenses';

export const getExpenses = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const submitExpense = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};
