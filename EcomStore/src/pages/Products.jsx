import { useState, useEffect } from 'react';
import api from '../services/api';
import Reviews from '../components/Reviews';
import './Products.css';
import Navbar from '../components/Navbar';

const Products = () => {
    const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
    return (
        <div className="containerNav">
      <Navbar />
        <div className="products-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <h2>{product.name}</h2>
              <img src={product.image} alt={product.name} />
              <p>{product.description}</p>
            </div>
          ))}
        </div></div>
      );
    };
  
  export default Products;
