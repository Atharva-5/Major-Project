// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/auth/register/', formData);
      navigate('/login');
    } catch {
      setError('Registration failed. Please check your details.');
    }
  };

  const renderInput = (field, type = 'text') => (
    <div className="input-group" key={field}>
      <input
        type={type}
        name={field}
        value={formData[field]}
        onChange={handleChange}
        className="input-field"
        placeholder=" "
        required
      />
      <label className="floating-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
    </div>
  );

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        {error && <p className="signup-error">{error}</p>}

        {renderInput('username')}
        {renderInput('password', 'password')}

        <div className="button-container">
          <button type="submit" className="signup-button">Submit</button>
          <button type="button" className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
