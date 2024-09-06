const Comment = require('../models/Comment');

// Get all comments for a review
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ reviewId: req.params.reviewId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new comment
exports.addComment = async (req, res) => {
    const { text } = req.body;

    try {
        const comment = new Comment({ reviewId: req.params.reviewId, userId: req.user.id, text });
        await comment.save();

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    const { text } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, { text }, { new: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
