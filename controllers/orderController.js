const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
exports.createOrder = async (req, res) => {
    const { items, totalAmount, shippingAddress } = req.body;

    try {
        const order = new Order({ userId: req.user.id, items, totalAmount, shippingAddress });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
