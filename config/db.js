const { Sequelize } = require('sequelize');
require('dotenv').config(); 

// Create a new Sequelize instance using the URI from the .env file
const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false, 
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
