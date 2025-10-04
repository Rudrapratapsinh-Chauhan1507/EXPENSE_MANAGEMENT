import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // your backend URL
  timeout: 5000,
  withCredentials: true, // for cookies/session if needed
});

export default axiosInstance;