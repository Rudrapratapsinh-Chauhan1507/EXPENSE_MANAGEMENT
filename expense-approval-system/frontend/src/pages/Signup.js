import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: '',
    currency: 'USD',
    name: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async e => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/signup', form);
      // Store logged-in user in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/'); // redirect to dashboard
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <input type="text" name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="currency" placeholder="Currency (USD, EUR...)" value={form.currency} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />

        {error && <p className="text-red-600">{error}</p>}

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Signup</button>

        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
