import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../services/api';
import './ProductDetails.css';
import Navbar from './Navbar';
const ProductDetails = () => {
  const { id } = useParams(); // This will capture the product ID from the URL.
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log('Product ID:', id);
    const fetchProductDetails = async () => {
      try {
        // Fetch the product details.
        const productData = await fetchData(`api/products/${id}`, 'GET');
        setProduct(productData);

        // Fetch reviews for the product.
        const reviewsData = await fetchData(`api/reviews/${id}`, 'GET');
        setReviews(reviewsData);

      } catch (error) {
        console.error('Failed to load product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await fetchData(`api/cart/${id}`, 'POST', {
        productId: id,
        quantity,
      });
      console.log('Added to cart:', response);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };


  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="product-details-container">
    <Navbar />
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.imageurl} alt={product.name} />
      <div className="product-description">
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <div className="add-to-cart">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
    <div className="reviews">
      <h2 id="reviews-title">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <p id="review-rating">{review.rating} / 5</p>
            <span id="review-text">{review.text}</span>
            <p id="review-author">- {review.user ? review.user.name : ''}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  </div>
);
};
export default ProductDetails;
