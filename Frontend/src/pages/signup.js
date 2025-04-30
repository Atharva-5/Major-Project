import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    caste: '',
    gender: '',
    age: '',
    profile_photo: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_photo') {
      setFormData({ ...formData, profile_photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      await axios.post('http://127.0.0.1:8000/auth/register/', form, {
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
      <label className="floating-label">
        {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
      </label>
    </div>
  );

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form" encType="multipart/form-data">
        <h2 className="signup-title">Sign Up</h2>
        {error && <p className="signup-error">{error}</p>}

        {renderInput('name')}
        {renderInput('email', 'email')}
        {renderInput('phone')}
        {renderInput('caste')}
        {renderInput('gender')}
        {renderInput('age')}
        {renderInput('password', 'password')}

        <div className="input-group">
          <input
            type="file"
            name="profile_photo"
            onChange={handleChange}
            className="input-field"
            required
          />
          <label className="floating-label">Profile Photo</label>
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
