const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
// const {authenticateJWT} = require('../middleware/auth');
const router = express.Router();

// Define routes
router.get('/:userId', getCart); // Get the user's cart
router.post('/:userId', addToCart); // Add an item to the cart
router.delete('/:userId/:itemId', removeFromCart); // Remove an item from the cart

module.exports = router;
