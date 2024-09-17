const express = require('express');
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/auth');
const { sequelize } = require('../config/db'); // Correctly import sequelize instance


const router = express.Router();

// Public route: Get all reviews for a product
router.get('/:productId', getReviews);

// Protected routes: Require JWT to add, update, or delete a review
router.post('/:productId', authMiddleware, addReview);
router.put('/:reviewId', authMiddleware, updateReview);
router.delete('/:reviewId', authMiddleware, deleteReview);

module.exports = router;
