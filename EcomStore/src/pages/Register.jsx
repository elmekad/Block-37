import { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import './Register.css';
const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post('/api/auth/register', formData);
    // Handle success or failure
  };

  return (
    <div className="containerNav">
      <Navbar />
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default Register;
