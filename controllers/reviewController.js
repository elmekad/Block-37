const Review = require('../models/Review');
const Product = require('../models/Product');

// Get all reviews for a product
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new review
exports.addReview = async (req, res) => {
    const { rating, text } = req.body;

    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Review({ productId: req.params.productId, userId: req.user.id, rating, text });
        await review.save();

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { rating, text } = req.body;

    try {
        const review = await Review.findByIdAndUpdate(req.params.reviewId, { rating, text }, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
