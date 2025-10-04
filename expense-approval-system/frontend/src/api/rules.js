import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/approval-rules';

export const getRules = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const saveRule = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};
