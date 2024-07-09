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

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    phone_number: '',
    name: '',
  });

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
  
  // added now
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting Sign Up Data:', signUpData);
      const response = await axios.post('http://localhost:8000/api/v1/auth/signup/', {
        email: signUpData.email,
        password: signUpData.password,
        phone_number: signUpData.phone_number,
        name: signUpData.name,
      });

      console.log('Sign Up Success:', response.data);
      localStorage.setItem('userEmail', email);

      if (isOrganization) {
        onRoleChange('Organisation');
      } else {
        onRoleChange('applicant');
      }
      navigate('/');
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

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log('Submitting Sign Up Data:', signUpData);
  //     const response = await axios.post('http://localhost:8000/api/v1/auth/signup/', signUpData);
  //     alert("Sign up success")
  //     console.log('Sign Up Success:', response.data);
  //     if (response.status === 201) {
  //       navigate('/signin');
  //     } else {
  //       console.error('Unexpected response status:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Sign Up Error:', error);
  //     if (error.response && error.response.status === 400) {
  //       // Check if the error is due to duplicate entry (email already exists)
  //       if (error.response.data.email) {
  //         alert('User with this email already exists.');
  //       } else {
  //         alert('Signup functionality not implemented.');
  //       }
  //     } else {
  //       alert('Signup functionality not implemented.');
  //     }
  //   }
  // };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  // const handleForgotPassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:8000/utils/password_reset/', {
  //       email,
  //     });
  //     console.log('Password reset link sent:', response.data);
  //     alert('Password reset link sent to your email!');
  //   } catch (error) {
  //     console.error('Forgot Password Error:', error);
  //     alert('Failed to send reset link. Please try again.');
  //   }
  // };

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
            name="email"
            value={signUpData.email}
            onChange={handleSignUpChange}
            required
          />
          <input
            style={{ borderRadius: '20px' }}
            type="password"
            placeholder="Password"
            name="password"
            value={signUpData.password}
            onChange={handleSignUpChange}
            required
          />
          <input
            style={{ borderRadius: '20px' }}
            type="text"
            placeholder="Full Name"
            name="name"
            value={signUpData.name}
            onChange={handleSignUpChange}
            required
          />
          <input
            style={{ borderRadius: '20px' }}
            type="text"
            placeholder="Phone Number"
            name="phone_number"
            value={signUpData.phone_number}
            onChange={handleSignUpChange}
            required
          />
          {/* <button type="submit">Sign Up</button>
        </form>
      </div> */}
      {/* added now */}
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
          <button type="button" onClick={handleSignup}>Sign Up</button>
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
          />
          <input
            style={{ borderRadius: '20px' }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;