import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
const { fetchData } = api;
import './ProductDetails.css';
import Navbar from './Navbar';

const ProductImage = ({ id }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchData(`api/products/${id}`, 'GET');
        setProduct(response);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <img src={product.imageurl} alt={product.name} />
  );
};

const ProductDetails = ({ id, renderImageOnly }) => {
  const params = useParams();
  const productId = id ? id : params.id;

  if (!productId) {
    return <div>Error: Product ID not found</div>;
  }

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await fetchData(`api/products/${productId}`, 'GET');
        setProduct(productData);

        const reviewsData = await fetchData(`api/reviews/${productId}`, 'GET');
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const response = await fetchData(`api/cart/${productId}`, 'POST', {
        productId: productId,
        quantity,
      });
      console.log('Added to cart:', response);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  if (renderImageOnly) {
    return (
      <ProductImage id={productId} />
    );
  }

  return (
    <div className="product-details-container">
      <Navbar />
      <div className="product-details">
        <h1>{product?.name}</h1>
        <ProductImage id={productId} />
        <div className="product-description">
          <p>{product?.description}</p>
          <p>Price: ${product?.price}</p>
          <div className="add-to-cart">
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;