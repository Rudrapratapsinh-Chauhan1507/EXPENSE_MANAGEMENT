import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getRules = async () => {
  const res = await axios.get(`${BASE_URL}/approval-rules`);
  return res.data;
};

export const saveRule = async (rule) => {
  const res = await axios.post(`${BASE_URL}/approval-rules`, rule);
  return res.data;
};
