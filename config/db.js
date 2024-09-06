const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Initialize Sequelize with the PostgreSQL connection URI from .env
const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log('PostgreSQL connected successfully to the EcomClothes database');
  } catch (err) {
    console.error(`Error connecting to PostgreSQL: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { sequelize, connectDB };
