const express = require('express');
const router = express.Router();
const { addComment, getComments, updateComment, deleteComment } = require('../controllers/commentController');

// Get all comments for a review
router.get('/:reviewId', getComments);

// Add a new comment
router.post('/:reviewId', addComment);

// Update a comment
router.put('/:commentId', updateComment);

// Delete a comment
router.delete('/:commentId', deleteComment);

module.exports = router;
