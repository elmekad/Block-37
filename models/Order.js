const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Order = sequelize.define('Order', {
  totalAmount: { type: DataTypes.DECIMAL, allowNull: false },
  shippingAddress: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: true,
});

// Associations
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = Order;
