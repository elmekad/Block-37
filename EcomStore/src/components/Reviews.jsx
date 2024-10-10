import { useState, useEffect } from 'react';
import api from '../services/api';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await api.get(`/api/products/${productId}/reviews`);
      setReviews(response.data);
    }
    fetchReviews();
  }, [productId]);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
