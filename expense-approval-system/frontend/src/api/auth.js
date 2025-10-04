import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/auth';

export const signup = async (data) => {
  const response = await axios.post(`${BASE_URL}/signup`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${BASE_URL}/login`, data);
  return response.data;
};
