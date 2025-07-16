const express = require('express');
const College = require('../models/College');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/colleges
// @desc    Get all colleges with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      location,
      rating,
      fees,
      search,
      sort = '-ratings.overall'
    } = req.query;

    // Build query
    let query = { isActive: true };

    if (category) query.category = category;
    if (location) query['location.city'] = new RegExp(location, 'i');
    if (rating) query['ratings.overall'] = { $gte: parseFloat(rating) };
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const colleges = await College.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await College.countDocuments(query);

    res.json({
      success: true,
      data: colleges,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get colleges error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/colleges/:id
// @desc    Get single college
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    
    if (!college || !college.isActive) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    res.json({
      success: true,
      data: college
    });

  } catch (error) {
    console.error('Get college error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/colleges
// @desc    Create college (Admin only)
// @access  Private/Admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();

    res.status(201).json({
      success: true,
      message: 'College created successfully',
      data: college
    });

  } catch (error) {
    console.error('Create college error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/colleges/:id
// @desc    Update college (Admin only)
// @access  Private/Admin
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    res.json({
      success: true,
      message: 'College updated successfully',
      data: college
    });

  } catch (error) {
    console.error('Update college error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/colleges/:id
// @desc    Delete college (Admin only)
// @access  Private/Admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    res.json({
      success: true,
      message: 'College deleted successfully'
    });

  } catch (error) {
    console.error('Delete college error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;