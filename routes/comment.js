const express = require('express');
const { getComments, addComment, updateComment, deleteComment } = require('../controllers/commentController');

const router = express.Router();

// Define routes
router.get('/:reviewId', getComments); // Get all comments for a review
router.post('/:reviewId', addComment); // Add a comment to a review
router.put('/:commentId', updateComment); // Update a comment
router.delete('/:commentId', deleteComment); // Delete a comment

module.exports = router; // Export the router object
