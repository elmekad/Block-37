import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // To handle navigation
import './Login.css';
// import { post } from '../services/api';

// Main Login Component
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // For handling errors
  const navigate = useNavigate(); // Hook for navigation

  // Handles the form submission when the login button is clicked
  const handleSubmit = async (event) => {
    event.pre
    ventDefault();
    try {
      const response = await api('api/auth/login', 'POST', formData);

      localStorage.setItem('token', response.token);
  console.log(response.role, "role");
      if (response.token === 'admin') {
        navigate('/components/AdminProductPage'); // Redirect to admin page
      } else {
        navigate('/'); // Redirect to home page
        console.log('Login successful', response);
      }
    
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Account does not exist or invalid credentials');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <div className="login-page">
      
      <div className="block">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-box">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
              />
            </div>

            <div className="input-box">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn">Login</button>

            <div className="register-link">
              <p id="p">Don't have an account? <br/>
              <a href="/register">Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
