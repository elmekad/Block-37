const Review = require('../models/Review');
const Product = require('../models/Product'); 

// Get all reviews for a product
exports.getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.findAll({ where: { productId } });
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a review (requires JWT)
exports.addReview = async (req, res) => {
  const { rating, text } = req.body;
  const productId = req.params.productId;
  const userId = req.user.id; // User info is extracted from the JWT token

  try {
      const product = await Product.findByPk(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      const review = await Review.create({ rating, text, productId, userId });
      res.status(201).json(review);
  } catch (err) {
      console.error('Error in Adding Review:', err);
      res.status(500).json({ message: 'Server error' });
  }
};

// Update a review (requires JWT)
exports.updateReview = async (req, res) => {
  const { rating, text } = req.body;
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this review' });
    }

    review.rating = rating || review.rating;
    review.text = text || review.text;

    await review.save();
    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a review (requires JWT)
exports.deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this review' });
    }

    await review.destroy();
    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
