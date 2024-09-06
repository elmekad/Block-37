const express = require('express');
const { createOrder, getOrderById, getUserOrders } = require('../controllers/orderController');

const router = express.Router();

// Define routes
router.post('/', createOrder); // Create a new order
router.get('/:orderId', getOrderById); // Get a single order by ID
router.get('/user/:userId', getUserOrders); // Get all orders for a specific user

module.exports = router; // Export the router object
