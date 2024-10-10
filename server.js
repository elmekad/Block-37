const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db'); // Correctly import connectDB and sequelize

// Import the JWT middleware
const authenticateJWT = require('./middleware/auth'); // Correctly import authenticateJWT

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Logging
app.use(cors()); // Enable CORS (configure if needed for production)

// Connect to the Database
connectDB();

// Import Routes (ensure that each route file is exporting a router object)
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const commentRoutes = require('./routes/comment');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');

// // Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Protected Routes (apply JWT authentication middleware to routes that need protection)

app.use('/api/reviews', authenticateJWT, reviewRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ message: 'Invalid JSON payload' });
  }
  next();
});

// Sync Sequelize models with the database
sequelize.sync().then(() => {
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
