const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const {authenticateJWT} = require('../middleware/auth');
const router = express.Router();
console.log(getCart);
// Define routes
router.get('/:userId', authenticateJWT, getCart); // Get the user's cart
router.post('/:userId', authenticateJWT, addToCart); // Add an item to the cart
router.delete('/:userId/:itemId', authenticateJWT, removeFromCart); // Remove an item from the cart

module.exports = router;
