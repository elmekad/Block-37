const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  items: {
    type: DataTypes.JSON,  // JSON type to store array of products
    allowNull: false,
    defaultValue: [],
  },
  
});

Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = Cart;
