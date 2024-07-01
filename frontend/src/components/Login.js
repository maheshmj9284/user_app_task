import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
      alert("User logged in successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button type="button" onClick={handleRegister} className="register-btn">SIGN UP</button>
        
        <div className="avatar">
          <FaUser size={80} color="#78e1ff" style={{ backgroundColor: '#f7f7f7', borderRadius: '50%', padding: '10px' }} />
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <div className="icon">
              <FaEnvelope size={20} color="#666" style={{ marginRight: '50px' }} />
            </div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div className="input-group">
            <div className="icon">
              <FaLock size={20} color="#666" style={{ marginRight: '10px' }} />
            </div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#!">Forgot your password?</a>
          </div>
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;