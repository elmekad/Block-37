const express = require('express');
const { createOrder, getOrderById, getUserOrders } = require('../controllers/orderController');

const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateJWT = require('../middleware/auth');

// console.log(orderController);
// console.log(authenticateJWT);
router.post('/', authenticateJWT.authenticateJWT, orderController.createOrder);
router.get('/:orderId', getOrderById); // Get a single order by ID
router.get('/user/:userId', getUserOrders); // Get all orders for a specific user

module.exports = router; // Export the router object

