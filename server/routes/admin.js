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

// ✅ GET COLLEGES (ADMIN) - /api/admin/colleges
router.get('/colleges', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', category = '', location = '', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const skip = (page - 1) * limit;
    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const [colleges, total] = await Promise.all([
      College.find(query)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      College.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: colleges,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
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
    res.json({ success: true, data: college });
  } catch (error) {
    console.error('Get college error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch college' });
  }
});

// ✅ CREATE COLLEGE - /api/admin/colleges
router.post('/colleges', auth, adminAuth, [
  body('name').trim().isLength({ min: 2 }).withMessage('College name is required'),
  body('category').isIn(['Engineering', 'Medical', 'Management', 'Law', 'Arts', 'Science', 'Commerce', 'University', 'College', 'Research', 'Agriculture', 'Architecture', 'Innovation', 'OpenUniversity', 'SkillUniversity', 'StatePublicUniversity']).withMessage('Invalid category'),
  body('location').trim().isLength({ min: 2 }).withMessage('Location is required'),
  body('description').optional().trim(),
  body('website').optional().isURL().withMessage('Invalid website URL'),
  body('phone').optional().matches(/^\d{10}$/).withMessage('Invalid phone number'),
  body('email').optional().isEmail().withMessage('Invalid email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const college = new College(req.body);
    await college.save();

    res.status(201).json({
      success: true,
      message: 'College added successfully',
      data: college
    });
  } catch (error) {
    console.error('Add college error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'College with this name already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to add college' });
  }
});

// ✅ UPDATE COLLEGE - /api/admin/colleges/:id
router.put('/colleges/:id', auth, adminAuth, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('category').optional().isIn(['Engineering', 'Medical', 'Management', 'Law', 'Arts', 'Science', 'Commerce', 'University', 'College', 'Research', 'Agriculture', 'Architecture', 'Innovation', 'OpenUniversity', 'SkillUniversity', 'StatePublicUniversity']),
  body('location').optional().trim().isLength({ min: 2 }),
  body('description').optional().trim(),
  body('website').optional().isURL(),
  body('phone').optional().matches(/^\d{10}$/),
  body('email').optional().isEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const college = await College.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    res.json({
      success: true,
      message: 'College updated successfully',
      data: college
    });
  } catch (error) {
    console.error('Update college error:', error);
    res.status(500).json({ success: false, message: 'Failed to update college' });
  }
});

// ✅ DELETE COLLEGE - /api/admin/colleges/:id
router.delete('/colleges/:id', auth, adminAuth, async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

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

export default router;