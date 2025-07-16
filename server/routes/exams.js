const express = require('express');
const Exam = require('../models/Exam');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/exams
// @desc    Get all exams with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      field,
      level,
      status,
      mode,
      search,
      sort = '-dates.examDate'
    } = req.query;

    // Build query
    let query = { isActive: true };

    if (field) query.field = field;
    if (level) query.level = level;
    if (status) query.status = status;
    if (mode) query.mode = mode;
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const exams = await Exam.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Exam.countDocuments(query);

    res.json({
      success: true,
      data: exams,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get exams error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/exams/:id
// @desc    Get single exam
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate('colleges.collegeId', 'name location ratings');
    
    if (!exam || !exam.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    res.json({
      success: true,
      data: exam
    });

  } catch (error) {
    console.error('Get exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/exams
// @desc    Create exam (Admin only)
// @access  Private/Admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();

    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      data: exam
    });

  } catch (error) {
    console.error('Create exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;