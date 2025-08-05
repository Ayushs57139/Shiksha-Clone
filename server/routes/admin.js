import express from 'express';
import { body, validationResult } from 'express-validator';
import College from '../models/College.js';
import User from '../models/User.js';
import Resume from '../models/Resume.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  // For demo purposes, we'll skip authentication
  // In production, you should implement proper JWT token verification
  next();
};

// ✅ GET DASHBOARD STATISTICS - /api/admin/dashboard/stats
router.get('/dashboard/stats', auth, adminAuth, async (req, res) => {
  try {
    // Get real-time statistics
    const [
      totalColleges,
      totalUsers,
      totalResumes,
      recentColleges,
      recentUsers,
      recentResumes
    ] = await Promise.all([
      College.countDocuments(),
      User.countDocuments(),
      Resume.countDocuments(),
      College.find().sort({ createdAt: -1 }).limit(5).select('name category location createdAt'),
      User.find().sort({ createdAt: -1 }).limit(5).select('firstName lastName email createdAt'),
      Resume.find().sort({ createdAt: -1 }).limit(5).select('personalInfo createdAt')
    ]);

    // Get category-wise college counts
    const categoryStats = await College.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get location-wise college counts
    const locationStats = await College.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get monthly registrations
    const monthlyStats = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalColleges,
          totalUsers,
          totalResumes,
          totalCourses: 150, // Static for now
          totalExams: 75 // Static for now
        },
        recentActivity: {
          colleges: recentColleges,
          users: recentUsers,
          resumes: recentResumes
        },
        analytics: {
          categoryStats,
          locationStats,
          monthlyStats
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard statistics' });
  }
});

// ✅ GET RECENT ACTIVITY - /api/admin/dashboard/activity
router.get('/dashboard/activity', auth, adminAuth, async (req, res) => {
  try {
    const recentColleges = await College.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name category location createdAt');

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('firstName lastName email createdAt');

    const recentResumes = await Resume.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('personalInfo createdAt');

    const activities = [
      ...recentColleges.map(college => ({
        type: 'college',
        action: 'added',
        title: `New college "${college.name}" added`,
        time: college.createdAt,
        data: college
      })),
      ...recentUsers.map(user => ({
        type: 'user',
        action: 'registered',
        title: `New user registration: ${user.email}`,
        time: user.createdAt,
        data: user
      })),
      ...recentResumes.map(resume => ({
        type: 'resume',
        action: 'created',
        title: `New resume created by ${resume.personalInfo?.firstName || 'User'}`,
        time: resume.createdAt,
        data: resume
      }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 20);

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Activity fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recent activity' });
  }
});

// ✅ GET COLLEGE STATISTICS - /api/admin/colleges/stats/overview
router.get('/colleges/stats/overview', auth, adminAuth, async (req, res) => {
  try {
    const stats = await College.aggregate([
      {
        $group: {
          _id: null,
          totalColleges: { $sum: 1 },
          totalCategories: { $addToSet: '$category' },
          totalLocations: { $addToSet: '$location' }
        }
      },
      {
        $project: {
          _id: 0,
          totalColleges: 1,
          totalCategories: { $size: '$totalCategories' },
          totalLocations: { $size: '$totalLocations' }
        }
      }
    ]);

    const categoryStats = await College.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const locationStats = await College.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || { totalColleges: 0, totalCategories: 0, totalLocations: 0 },
        categoryStats,
        locationStats
      }
    });
  } catch (error) {
    console.error('College stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch college statistics' });
  }
});

// ✅ GET ALL COLLEGES - /api/admin/colleges
router.get('/colleges', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, location } = req.query;
    const skip = (page - 1) * limit;

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

    const [colleges, total] = await Promise.all([
      College.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      College.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        colleges,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get colleges error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch colleges' });
  }
});

// ✅ GET COLLEGE BY ID - /api/admin/colleges/:id
router.get('/colleges/:id', auth, adminAuth, async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    res.json({
      success: true,
      data: college
    });
  } catch (error) {
    console.error('Get college error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch college' });
  }
});

// ✅ CREATE COLLEGE - /api/admin/colleges
router.post('/colleges', auth, adminAuth, [
  body('name').notEmpty().withMessage('College name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('established').optional().isInt().withMessage('Established year must be a number'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('students').optional().isInt().withMessage('Students must be a number'),
  body('courses').optional().isInt().withMessage('Courses must be a number')
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

    console.log('Creating college with data:', req.body);

    const collegeData = {
      ...req.body,
      slug: req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      status: 'active',
      source: 'admin'
    };

    console.log('Processed college data:', collegeData);

    const college = new College(collegeData);
    await college.save();

    console.log('College created successfully:', college);

    res.status(201).json({
      success: true,
      message: 'College created successfully',
      data: college
    });
  } catch (error) {
    console.error('Create college error:', error);
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'College with this name already exists' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to create college' });
    }
  }
});

// ✅ UPDATE COLLEGE - /api/admin/colleges/:id
router.put('/colleges/:id', auth, adminAuth, [
  body('name').optional().notEmpty().withMessage('College name cannot be empty'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('established').optional().isInt().withMessage('Established year must be a number'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('students').optional().isInt().withMessage('Students must be a number'),
  body('courses').optional().isInt().withMessage('Courses must be a number')
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

    const college = await College.findById(req.params.id);
    
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    const updateData = {
      ...req.body,
      slug: req.body.name ? req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : college.slug
    };

    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'College updated successfully',
      data: updatedCollege
    });
  } catch (error) {
    console.error('Update college error:', error);
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'College with this name already exists' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to update college' });
    }
  }
});

// ✅ DELETE COLLEGE - /api/admin/colleges/:id
router.delete('/colleges/:id', auth, adminAuth, async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    await College.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'College deleted successfully'
    });
  } catch (error) {
    console.error('Delete college error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete college' });
  }
});

// ✅ GET USERS - /api/admin/users
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', status = '', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const skip = (page - 1) * limit;
    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Status filter
    if (status) {
      query.role = status;
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-password -__v'),
      User.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// ✅ GET ANALYTICS - /api/admin/analytics
router.get('/analytics', auth, adminAuth, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);

    // Get date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // User registration trends
    const userTrends = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // College addition trends
    const collegeTrends = await College.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Category distribution
    const categoryDistribution = await College.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Location distribution
    const locationDistribution = await College.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // User role distribution
    const roleDistribution = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        userTrends,
        collegeTrends,
        categoryDistribution,
        locationDistribution,
        roleDistribution
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
});

export default router;