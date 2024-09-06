const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Review = require('./Review');

const Comment = sequelize.define('Comment', {
  text: { type: DataTypes.TEXT, allowNull: false },
}, {
  timestamps: true,
});

// Associations
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Review, { foreignKey: 'reviewId' });

module.exports = Comment;
