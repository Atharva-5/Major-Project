import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Import CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    caste: '',
    gender: '',
    photo: null, // For file upload
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setFormData({ ...formData, photo: e.target.files[0] }); // Handle file upload
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for sending files
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await axios.post('http://127.0.0.1:8000/auth/register/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/login'); // Redirect to login after success
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        {error && <p className="signup-error">{error}</p>}

        <div className="form-columns">
          <div className="form-column">
            {['username', 'email', 'password'].map((field) => (
              <div className="input-group" key={field}>
                <label className="input-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
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
          </div>

          <div className="form-column">
            {['phone', 'caste', 'gender'].map((field) => (
              <div className="input-group" key={field}>
                <label className="input-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            ))}
            <div className="input-group">
              <label className="input-label">Photo</label>
              <input type="file" name="photo" onChange={handleChange} className="input-field" />
            </div>
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="signup-button">Sign Up</button>
          <button type="button" className="login-button" onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
