const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await Product.create({ name, description, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await Product.update(
      { name, description, price },
      { where: { id: req.params.id }, returning: true, plain: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
