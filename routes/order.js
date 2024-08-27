const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getUserOrders } = require('../controllers/orderController');

// Create a new order
router.post('/', createOrder);

// Get a single order by ID
router.get('/:orderId', getOrderById);

// Get all orders for a user
router.get('/user/:userId', getUserOrders);

module.exports = router;
