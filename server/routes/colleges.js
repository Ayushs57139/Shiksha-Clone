import express from 'express';
import College from '../models/College.js';

const router = express.Router();

// Get all colleges with pagination, search, and filters
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      category = '', 
      location = '',
      sort = 'name'
    } = req.query;
    
    let query = { status: 'active' };
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Location filter
    if (location && location !== 'all') {
      query.location = location;
    }

    const skip = (page - 1) * limit;
    
    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'rating':
        sortObj = { rating: -1 };
        break;
      case 'students':
        sortObj = { students: -1 };
        break;
      case 'established':
        sortObj = { established: -1 };
        break;
      default:
        sortObj = { name: 1 };
    }
    
    const colleges = await College.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await College.countDocuments(query);
    
    res.json({
      success: true,
      data: colleges,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        totalRecords: total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch colleges' });
  }
});

// Get college by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const college = await College.findOne({ slug, status: 'active' });
    
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

// Get colleges by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const colleges = await College.find({ 
      category, 
      status: 'active' 
    })
    .sort({ rating: -1, name: 1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await College.countDocuments({ category, status: 'active' });
    
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
    console.error('Error fetching colleges by category:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch colleges' });
  }
});

// Get colleges by location
router.get('/location/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const colleges = await College.find({ 
      location, 
      status: 'active' 
    })
    .sort({ rating: -1, name: 1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await College.countDocuments({ location, status: 'active' });
    
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
    console.error('Error fetching colleges by location:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch colleges' });
  }
});

// Search colleges
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const colleges = await College.find({
      $and: [
        { status: 'active' },
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { location: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    })
    .sort({ rating: -1, name: 1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await College.countDocuments({
      $and: [
        { status: 'active' },
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { location: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    });
    
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
    console.error('Error searching colleges:', error);
    res.status(500).json({ success: false, message: 'Failed to search colleges' });
  }
});

// Get college statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalColleges = await College.countDocuments({ status: 'active' });
    const avgRating = await College.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    const categoryStats = await College.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const locationStats = await College.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const totalStudents = await College.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, totalStudents: { $sum: '$students' } } }
    ]);

    const totalCourses = await College.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, totalCourses: { $sum: '$courses' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalColleges,
        avgRating: avgRating[0]?.avgRating || 0,
        categoryStats,
        locationStats,
        totalStudents: totalStudents[0]?.totalStudents || 0,
        totalCourses: totalCourses[0]?.totalCourses || 0
      }
    });
  } catch (error) {
    console.error('Error fetching college stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
});

// Get featured colleges
router.get('/featured/list', async (req, res) => {
  try {
    const featuredColleges = await College.find({ 
      featured: true, 
      status: 'active' 
    })
    .sort({ rating: -1 })
    .limit(10);
    
    res.json({
      success: true,
      data: featuredColleges
    });
  } catch (error) {
    console.error('Error fetching featured colleges:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch featured colleges' });
  }
});

// Get top rated colleges
router.get('/top-rated/list', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const topRatedColleges = await College.find({ status: 'active' })
      .sort({ rating: -1, students: -1 })
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: topRatedColleges
    });
  } catch (error) {
    console.error('Error fetching top rated colleges:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch top rated colleges' });
  }
});

export default router;
