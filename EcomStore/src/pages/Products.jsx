import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <div className="product-wrapper" key={product.id}>
            {/* Product Card with Image and Name */}
            <div className="product-card">
            <Link to={`/product/${product.id}`}>
              <img className="product-image" src={product.imageurl} alt={product.name} />
            </Link>
              <h2>{product.name}</h2>
            </div>
            
            {/* Product Details: Description, Price, and Reviews */}
            <div className="product-detail">
              <span>${product.price}</span>
            </div>
          </div>
        ))}
      </div>
  
      <button type='submit' className='btn'>Add to Cart</button>
    </div>
  );
};
  export default Products;
