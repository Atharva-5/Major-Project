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
    caste: '',
    gender: '',
    age: '',
    photo: '',
    occupation: '',
    interests: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      setFormData({ ...formData, photo: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'interests') {
        const interestsList = value.split(',').map(item => item.trim());
        form.append(key, JSON.stringify(interestsList)); // ✅ stringify the array
      } else {
        form.append(key, value);
      }
    });

    try {
      await axios.post('http://127.0.0.1:8000/auth/register/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('Registration failed. Please check your details.');
    }
  };


  const renderInput = (field, type = 'text') => {
    const labelMap = {
      username: 'Username',
      email: 'Email',
      password: 'Password',
      phone: 'Phone Number',
      caste: 'Caste',
      gender: 'Gender (e.g., Male/Female)',
      age: 'Age',
      occupation: 'Occupation',
      interests: 'Interests (comma-separated)',
    };

    return (
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
          {labelMap[field] || field.charAt(0).toUpperCase() + field.slice(1)}
        </label>
      </div>
    );
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form" encType="multipart/form-data">
        <h2 className="signup-title">Create your Profile ⭐</h2>
        {error && <p className="signup-error">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
          {renderInput('username')}
          {renderInput('email', 'email')}
          {renderInput('phone')}
          {renderInput('caste')}
          {renderInput('gender')}
          {renderInput('age', 'number')}
          {renderInput('occupation')}
          {renderInput('interests')}
          {renderInput('password', 'password')}
        </div>

        {/* Profile photo input */}
        <div className="input-group mb-6">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="input-field"
            required
          />
          <label className="floating-label">Profile Photo (JPEG/PNG)</label>
        </div>

        {/* Button section */}
        <div className="button-container flex justify-center gap-4">
          <button type="submit" className="signup-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
