const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db'); // Correctly import connectDB and sequelize

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Connect to the Database
connectDB();

// Import Routes (make sure these are correctly imported)
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const commentRoutes = require('./routes/comment');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');

// Use Routes (make sure that each route file is exporting a router object)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Sync Sequelize models with the database
sequelize.sync().then(() => {
  // Start the Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
