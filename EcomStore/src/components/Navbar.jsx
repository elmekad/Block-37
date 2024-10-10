import { Link } from 'react-router-dom';
import '../components/Navbar.css';
import React, { useState } from 'react';
// const Navbar = () => (
//   <nav>
//     <ul>
//       <li><Link to="/">Home</Link></li>
//       <li><Link to="/products">Products</Link></li>
//       <li><Link to="/cart">Cart</Link></li>
//       <li><Link to="/login">Login</Link></li>
//       <li><Link to="/register">Register</Link></li>
//     </ul>
//   </nav>
// );

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <p>Olive & Oak</p>
      <ul className={`nav-items ${isOpen ? 'show' : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Shop</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/login">Login</a></li>
      </ul>

    </nav>
  );
};

export default Navbar;
