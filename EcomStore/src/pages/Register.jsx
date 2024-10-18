import { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Send the request to the API
      const response = await api('/api/auth/register', 'POST', formData);
  
      // Check if the registration was successful
      if (response && response.token) {
        // Store the token
        localStorage.setItem('token', response.token);
        
        // Navigate or show success message
        console.log('Registration successful:', response);
        navigate('/'); // Navigate to home page, or any other page you'd like
      } else {
        console.error('Registration failed:', response);
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
  <div className="containerNav">
    <Navbar />
    <div className='block'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className='input-box'>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
            />
          </div>
            <div className='input-box'>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
              />
           </div>
           <div className='input-box'>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
              />
            </div>
          <button type="submit" className='btn'>Register</button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Register;
