import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    caste: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {['username', 'email', 'password', 'phone', 'caste', 'gender'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block mb-2 capitalize">{field}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 rounded bg-green-600 hover:bg-green-700 font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
