import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    photo: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === 'photo' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));

    try {
      await axios.post('http://127.0.0.1:8000/auth/register/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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

        <div className="form-columns">
          <div className="form-column">
            {renderInput('username')}
            {renderInput('email')}
            {renderInput('password', 'password')}
          </div>

          <div className="form-column">
            {renderInput('phone')}
            <div className="input-group">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              <label className="floating-label">Gender</label>
            </div>

            <div className="input-group">
              <input type="file" name="photo" onChange={handleChange} className="input-field" />
              <label className="floating-label">Photo</label>
            </div>
          </div>
        </div>

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
