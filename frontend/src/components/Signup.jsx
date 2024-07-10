import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = ({ onClose, onRoleChange }) => {
  const navigate = useNavigate();

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [isOrganization, setIsOrganization] = useState(false); // State for checkbox

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login/', {
        email,
        password,
      });
      console.log('Sign In Success:', response.data);
      console.log('AccessToken:', localStorage.getItem('token'));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', email);

      if (isOrganization) {
        onRoleChange('Organisation');
      } else {
        onRoleChange('applicant');
      }
      navigate('/');
    } catch (error) {
      console.error('Sign In Error:', error);
      alert('Invalid credentials');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/signup/', {
        email,
        password,
        phone_number,
        name,
      });
  
      console.log('Sign Up Success:', response.data);
      localStorage.setItem('userEmail', email);
  
      if (isOrganization) {
        onRoleChange('Organisation');
      } else {
        onRoleChange('applicant');
      }
      navigate('/verify-otp'); // Redirect to OTP verification page
    } catch (error) {
      console.error('Sign Up Error:', error);
      if (error.response && error.response.status === 400) {
        if (error.response.data.email) {
          alert('User with this email already exists.');
        } else {
          alert('Signup functionality not implemented.');
        }
      } else {
        alert('Signup functionality not implemented.');
      }
    }
  };

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#" onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input
            style={{ borderRadius: '20px' }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={{ borderRadius: '20px' }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            style={{ borderRadius: '20px' }}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={{ borderRadius: '20px' }}
            type="text"
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label className="wrap-check-64">
            <input
              type="checkbox"
              checked={isOrganization}
              onChange={(e) => setIsOrganization(e.target.checked)}
              className="switch-input"
            />
            <span className="slider round" style={{ marginTop: '10px', marginBottom: '17px' }}></span>
            <span className="checkbox-text" style={{ fontSize: '13px', fontWeight: 'bold', marginTop: '10px', marginBottom: '17px' }}>As Organization</span>
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form action="#" onSubmit={handleSignIn}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input
            style={{ borderRadius: '20px' }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={{ borderRadius: '20px' }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="wrap-check-64">
            <input
              type="checkbox"
              checked={isOrganization}
              onChange={(e) => setIsOrganization(e.target.checked)}
              className="switch-input"
            />
            <span className="slider round"></span>
            <span className="checkbox-text" style={{ fontSize: '13px', fontWeight: 'bold' }}>As Organization</span>
          </label>
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
