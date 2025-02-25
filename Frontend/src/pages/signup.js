import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Import the CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    caste: '',
    gender: '',
    photo: '',
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
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        {error && <p className="signup-error">{error}</p>}
        {['username', 'email', 'password', 'phone', 'caste', 'gender', 'photo'].map((field) => (
          <div className="input-group" key={field}>
            <label className="input-label">{field}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        ))}
        <button type="submit" className="signup-button">Sign Up</button>
        <button type="button" className="login-button" onClick={() => navigate('/login')}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
