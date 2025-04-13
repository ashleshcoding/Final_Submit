import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveUserToLocalStorage = (data) => {
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('username', data.username);
    localStorage.setItem('email', data.email);
    localStorage.setItem('token', data.token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url = isLogin ? 'http://localhost:3001/login' : 'http://localhost:3001/signup';

    try {
      const response = await axios.post(url, formData);
      const data = response.data;

      if (data.success) {
        if (isLogin) {
          saveUserToLocalStorage(data);
          navigate('/dashboard');
        } else {
          alert('Registration successful! Logging you in...');

          try {
            const loginResponse = await axios.post('http://localhost:3001/login', {
              username: formData.username,
              email: formData.email,
              password: formData.password
            });

            if (loginResponse.data.success) {
              saveUserToLocalStorage(loginResponse.data);
              navigate('/dashboard');
            } else {
              setMessage(loginResponse.data.error || 'Login failed after registration.');
            }
          } catch (loginError) {
            setMessage(loginError.response?.data?.error || 'Login failed after registration.');
          }
        }
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.response?.data?.error || 'Server not responding or invalid request.');
    }
  };

  return (
    <div className="card p-4 shadow">
      <h2 className="text-center text-danger">{isLogin ? 'Login' : 'Sign Up'}</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-danger w-100">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="text-center mt-3">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          className="btn btn-link p-0 ms-2"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage('');
          }}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
