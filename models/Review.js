const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const Review = sequelize.define('Review', {
  rating: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
}, {
  timestamps: true,
});

// Associations
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Review;
