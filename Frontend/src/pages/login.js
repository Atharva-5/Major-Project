import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', formData);
      localStorage.setItem('accessToken', response.data.access);
      navigate('/home'); // Redirect to homepage after login
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };
  const handleRegister = () => {
    navigate('/signup'); // Redirects to Register Page
  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        {['username', 'password'].map((field) => (
          <div key={field} className="input-group">
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
        <div class="button-container">
          <button type="submit" className="login-button">Login</button>
          <button type="button" onClick={handleRegister} className="signin-button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
