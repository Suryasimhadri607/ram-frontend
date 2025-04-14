// src/pages/StudentLogin.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function StudentLogin() {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        emailId,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      navigate('/student/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-8 col-lg-6 col-xl-5">
      <div className="card shadow p-4">
      <h2 className=''>Student Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <div className="mt-3">
          <Link to="/student/register" className="btn btn-link">
            Register
          </Link>
          <Link to="/student/forgot-email" className="btn btn-link">
            Forgot Email
          </Link>
          <Link to="/student/forgot-password" className="btn btn-link">
            Forgot Password
          </Link>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}

export default StudentLogin;
