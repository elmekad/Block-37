import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './components/Cart';
import AdminProductPage from './components/AdminProductPage';
import ProductDetails from './components/ProductDetails';

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
        <Route path="/components/AdminProductPage" element={<AdminProductPage />} />
        <Route path="*" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/ProductDetails" element={<ProductDetails />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
