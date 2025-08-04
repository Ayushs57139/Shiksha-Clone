import express from 'express';
import { body, validationResult } from 'express-validator';
import Review from '../models/Review.js';
import College from '../models/College.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all reviews for a college
router.get('/college/:collegeId', async (req, res) => {
  try {
    const { collegeId } = req.params;
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

    const reviews = await Review.find({ collegeId })
      .populate('userId', 'firstName lastName email')
      .sort({ [sort]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Review.countDocuments({ collegeId });

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's review for a college
router.get('/college/:collegeId/user', auth, async (req, res) => {
  try {
    const { collegeId } = req.params;
    const userId = req.user.id;

    const review = await Review.findOne({ collegeId, userId })
      .populate('userId', 'firstName lastName email');

    res.json({ review });
  } catch (error) {
    console.error('Error fetching user review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update a review
router.post('/college/:collegeId', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('title').isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('review').isLength({ min: 10, max: 1000 }).withMessage('Review must be between 10 and 1000 characters'),
  body('pros').optional().isLength({ max: 500 }).withMessage('Pros must be less than 500 characters'),
  body('cons').optional().isLength({ max: 500 }).withMessage('Cons must be less than 500 characters')
], async (req, res) => {
  try {
    console.log('📝 Review submission request received');
    console.log('User ID:', req.user.id);
    console.log('College ID:', req.params.collegeId);
    console.log('Request body:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { collegeId } = req.params;
    const userId = req.user.id;
    const { rating, title, review, pros, cons } = req.body;

    console.log('🔍 Checking if college exists...');
    // Check if college exists
    const college = await College.findById(collegeId);
    if (!college) {
      console.log('❌ College not found');
      return res.status(404).json({ message: 'College not found' });
    }
    console.log('✅ College found:', college.name);

    console.log('🔍 Checking for existing review...');
    // Check if user has already reviewed this college
    let existingReview = await Review.findOne({ collegeId, userId });

    if (existingReview) {
      console.log('📝 Updating existing review');
      // Update existing review
      existingReview.rating = rating;
      existingReview.title = title;
      existingReview.review = review;
      existingReview.pros = pros;
      existingReview.cons = cons;
      existingReview.updatedAt = Date.now();

      await existingReview.save();
      console.log('✅ Review updated successfully');
      res.json({ message: 'Review updated successfully', review: existingReview });
    } else {
      console.log('📝 Creating new review');
      // Create new review
      const newReview = new Review({
        collegeId,
        userId,
        rating,
        title,
        review,
        pros,
        cons
      });

      await newReview.save();
      console.log('✅ Review created successfully');
      res.json({ message: 'Review created successfully', review: newReview });
    }
  } catch (error) {
    console.error('❌ Error creating/updating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a review
router.delete('/:reviewId', auth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review or is admin
    if (review.userId.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all reviews
router.get('/admin/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { page = 1, limit = 20, collegeId, userId, rating } = req.query;
    const filter = {};

    if (collegeId) filter.collegeId = collegeId;
    if (userId) filter.userId = userId;
    if (rating) filter.rating = rating;

    const reviews = await Review.find(filter)
      .populate('collegeId', 'name location')
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Review.countDocuments(filter);

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update review verification status
router.patch('/admin/:reviewId/verify', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { reviewId } = req.params;
    const { isVerified } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { isVerified },
      { new: true }
    ).populate('collegeId', 'name location')
     .populate('userId', 'firstName lastName email');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review verification updated', review });
  } catch (error) {
    console.error('Error updating review verification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Delete review
router.delete('/admin/:reviewId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { reviewId } = req.params;
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 