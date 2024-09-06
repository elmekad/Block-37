const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {}, { timestamps: true });

// Associations
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsToMany(Product, { through: 'CartProducts', foreignKey: 'cartId' });

module.exports = Cart;
