import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const submitExpense = async (expense) => {
  const res = await axios.post(`${BASE_URL}/expenses`, expense);
  return res.data;
};

export const getExpenses = async () => {
  const res = await axios.get(`${BASE_URL}/expenses`);
  return res.data;
};
