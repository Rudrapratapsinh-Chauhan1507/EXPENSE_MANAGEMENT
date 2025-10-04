import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

export const createUser = async (user) => {
  const res = await axios.post(`${BASE_URL}/users`, user);
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await axios.put(`${BASE_URL}/users/${id}`, user);
  return res.data;
};
