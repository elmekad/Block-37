const express = require('express');
const router = express.Router();
const { addReview, getReviews, updateReview, deleteReview } = require('../controllers/reviewController');

// Get all reviews for a product
router.get('/:productId', getReviews);

// Add a new review
router.post('/:productId', addReview);

// Update a review
router.put('/:reviewId', updateReview);

// Delete a review
router.delete('/:reviewId', deleteReview);

module.exports = router;
