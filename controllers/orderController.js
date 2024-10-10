const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
exports.createOrder = async (req, res) => {
    console.log('User making the request:', req.user);
    try {
        console.log('User making the request:', req.user);
        const { items, totalAmount, shippingAddress } = req.body;
        const userId = req.user.id;

        const order = await Order.create({
            userId,
            items,
            totalAmount,
            shippingAddress
        });
        res.status(201).json(order);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Server error' });
    }
};



// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
    
        const order = await Order.findByPk(orderId);
        if (!order) {
            
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        console.error('Error fetching order:', err); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};


  

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('Fetching orders for user with ID:', userId); // Log user ID

        const orders = await Order.findAll({ where: { userId } }); // Use findAll to get all orders for the user
        if (!orders || orders.length === 0) {
            console.log('No orders found for user with ID:', userId); // Log if no orders found
            return res.status(404).json({ message: 'No orders found' });
        }

        console.log('Found orders:', orders); // Log found orders
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err); // Log any errors
        res.status(500).json({ message: 'Server error' });
    }
};
