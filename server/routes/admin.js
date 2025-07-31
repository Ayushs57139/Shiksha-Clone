import express from 'express';
import College from '../models/College.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  // For demo purposes, we'll skip authentication
  // In production, you should implement proper JWT token verification
  next();
};

// Get all colleges for admin
router.get('/colleges', isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category = '', location = '' } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (location && location !== 'all') {
      query.location = location;
    }

    const skip = (page - 1) * limit;
    
    const colleges = await College.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await College.countDocuments(query);
    
    res.json({
      success: true,
      data: colleges,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch colleges' });
  }
});

// Add new college
router.post('/colleges', isAdmin, [
  body('name').notEmpty().withMessage('College name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('established').isNumeric().withMessage('Established year must be a number'),
  body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('students').isNumeric().withMessage('Students count must be a number'),
  body('courses').isNumeric().withMessage('Courses count must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const {
      name,
      category,
      location,
      established,
      rating,
      students,
      courses,
      description = '',
      facilities = [],
      highlights = [],
      image = '',
      website = '',
      phone = '',
      email = ''
    } = req.body;

    // Create slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if college with same name already exists
    const existingCollege = await College.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingCollege) {
      return res.status(400).json({ 
        success: false, 
        message: 'College with this name already exists' 
      });
    }

    const college = new College({
      name,
      slug,
      category,
      location,
      established: parseInt(established),
      rating: parseFloat(rating),
      students: parseInt(students),
      courses: parseInt(courses),
      description,
      facilities,
      highlights,
      image,
      website,
      phone,
      email,
      status: 'active'
    });

    await college.save();

    res.status(201).json({
      success: true,
      message: 'College added successfully',
      data: college
    });
  } catch (error) {
    console.error('Error adding college:', error);
    res.status(500).json({ success: false, message: 'Failed to add college' });
  }
});

// Update college
router.put('/colleges/:id', isAdmin, [
  body('name').notEmpty().withMessage('College name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('established').isNumeric().withMessage('Established year must be a number'),
  body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('students').isNumeric().withMessage('Students count must be a number'),
  body('courses').isNumeric().withMessage('Courses count must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const updateData = req.body;

    // Create slug from name if name is being updated
    if (updateData.name) {
      updateData.slug = updateData.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const college = await College.findByIdAndUpdate(
      id,
      updateData,
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
    console.error('Error updating college:', error);
    res.status(500).json({ success: false, message: 'Failed to update college' });
  }
});

// Delete college
router.delete('/colleges/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const college = await College.findByIdAndDelete(id);
    
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
    console.error('Error deleting college:', error);
    res.status(500).json({ success: false, message: 'Failed to delete college' });
  }
});

// Get college by ID
router.get('/colleges/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const college = await College.findById(id);
    
    if (!college) {
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
    console.error('Error fetching college:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch college' });
  }
});

// Get college statistics
router.get('/colleges/stats/overview', isAdmin, async (req, res) => {
  try {
    const totalColleges = await College.countDocuments();
    const activeColleges = await College.countDocuments({ status: 'active' });
    const avgRating = await College.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    const categoryStats = await College.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const locationStats = await College.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalColleges,
        activeColleges,
        avgRating: avgRating[0]?.avgRating || 0,
        categoryStats,
        locationStats
      }
    });
  } catch (error) {
    console.error('Error fetching college stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
});

export default router;