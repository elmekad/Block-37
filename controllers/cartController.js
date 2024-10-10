const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get the user's cart// Get the user's cart
exports.getCart = async (req, res) => {
  try {
    console.log('Fetching cart for user:', req.user.id);
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Find or create the user's cart
    let cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });  // Initialize with empty items array
    }

    // Ensure cart.items is always an array
    if (!Array.isArray(cart.items)) {
      cart.items = [];
    }

    // Check if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add or update the product in the cart's items array
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  try {
    console.log('Removing item from cart for user:', req.user.id);
    
    // Find the user's cart
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      console.log('Cart not found for user:', req.user.id);
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    console.log('Cart found:', cart);
    console.log('Cart items:', cart.items);

    // Check if cart items is null or empty and handle that
    if (!cart.items || cart.items.length === 0) {
      console.log('Cart items are empty or null');
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item.productId.toString() !== itemId);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error('Error removing item from cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
