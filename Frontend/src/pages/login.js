// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login/", formData);
      console.log("API Response:", response.data); // ✅ Check if 'access' and 'refresh' exist

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      console.log("Stored AccessToken:", localStorage.getItem("accessToken")); // ✅ Verify storage
      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError("Login failed. Please check your credentials.");
    }
  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <div className="input-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
            required
          />
          <label className={`floating-label ${formData.username ? "filled" : ""}`}>
            Name
          </label>
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
          />
          <label className={`floating-label ${formData.password ? "filled" : ""}`}>
            Password
          </label>
        </div>
        <div className="button-container">
          <button type="button" className="signin-button" onClick={() => navigate('/signup')}>Register Here</button>
          <button type="submit" className="login-button">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;