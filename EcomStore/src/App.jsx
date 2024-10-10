import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './components/Cart';
import AdminProductPage from './components/AdminProductPage';

// Add the route in your App.jsx


// import './App.css';
// import './pages/Home.css';

const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/products" element={<AdminProductPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router></div>
  );
};

export default App;
