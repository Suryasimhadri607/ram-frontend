// src/pages/AdminRegister.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AdminRegister() {
  const [admin, setAdmin] = useState({
    emailId: '',
    password: '',
    phone: '',
    role: 'ADMIN', // Default role
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/auth/register',
        admin
      );
      setMessage('Admin Registration Successful!');
      setAdmin({
        emailId: '',
        password: '',
        phone: '',
        role: 'ADMIN',
      });
    } catch (error) {
      console.error('Admin registration failed:', error);
      setMessage('Registration Failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Registration</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email ID</label>
          <input
            type="email"
            className="form-control"
            name="emailId"
            value={admin.emailId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={admin.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={admin.password}
            onChange={handleChange}
            required
          />
        </div>

        <input type="hidden" name="role" value="ADMIN" />

        <button type="submit" className="btn btn-success">
          Register Admin
        </button>
      </form>
    </div>
  );
}

export default AdminRegister;
