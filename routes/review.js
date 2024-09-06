const express = require('express');
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

// Define routes
router.get('/:productId', getReviews); // Get all reviews for a product
router.post('/:productId', addReview); // Add a new review for a product
router.put('/:reviewId', updateReview); // Update an existing review
router.delete('/:reviewId', deleteReview); // Delete a review

module.exports = router; // Export the router object
