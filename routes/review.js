const express = require('express');
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const {authenticateJWT} = require('../middleware/auth');

const router = express.Router();

// Public route: Get all reviews for a product
router.get('/:productId', getReviews);

// Protected routes: Require JWT to add, update, or delete a review
router.post('/:productId', authenticateJWT, addReview);
router.put('/:reviewId', authenticateJWT, updateReview);
router.delete('/:reviewId', authenticateJWT, deleteReview);

module.exports = router;
