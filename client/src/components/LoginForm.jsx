import React, { useState } from 'react';
import axios from 'axios';
import logo from '../Icons/1w.png'; // Add the path to your logo
import '../LoginForm.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? 'http://localhost:5000/auth/signup' : 'http://localhost:5000/auth/login';
    const data = isSignup ? { username, email, password } : { email, password };

    try {
      const response = await axios.post(endpoint, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLogin();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Authentication failed');
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="AI Podcast Generator Logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {isSignup && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <button
          className="toggle-button"
          type="button"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? 'Already have an account? Login' : 'New user? Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
