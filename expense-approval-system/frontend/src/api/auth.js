import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data.user;
  } catch (err) {
    throw err;
  }
};

export const signup = async (name, email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, { name, email, password });
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data.user;
  } catch (err) {
    throw err;
  }
};
