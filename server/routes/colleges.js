import express from 'express';
import College from '../models/College.js';

const router = express.Router();

// Get all colleges with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      location, 
      search,
      rating,
      fees,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get colleges with pagination
    const colleges = await College.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await College.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: colleges,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching colleges',
      error: error.message
    });
  }
});

// Get college by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const college = await College.findOne({ slug }).lean();
    
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
    res.status(500).json({
      success: false,
      message: 'Error fetching college',
      error: error.message
    });
  }
});

// Get colleges by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20, location, search } = req.query;

    const filter = { category: { $regex: category, $options: 'i' } };
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const colleges = await College.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await College.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: colleges,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('Error fetching colleges by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching colleges by category',
      error: error.message
    });
  }
});

// Get colleges by location
router.get('/location/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const { page = 1, limit = 20, category, search } = req.query;

    const filter = { location: { $regex: location, $options: 'i' } };
    
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const colleges = await College.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await College.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: colleges,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('Error fetching colleges by location:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching colleges by location',
      error: error.message
    });
  }
});

// Get college statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await College.aggregate([
      {
        $group: {
          _id: null,
          totalColleges: { $sum: 1 },
          totalStudents: { $sum: '$students' },
          averageRating: { $avg: '$rating' },
          categories: { $addToSet: '$category' },
          locations: { $addToSet: '$location' }
        }
      },
      {
        $project: {
          _id: 0,
          totalColleges: 1,
          totalStudents: 1,
          averageRating: { $round: ['$averageRating', 1] },
          categories: 1,
          locations: 1
        }
      }
    ]);

    // Get category distribution
    const categoryStats = await College.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get location distribution
    const locationStats = await College.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        ...stats[0],
        categoryDistribution: categoryStats,
        locationDistribution: locationStats
      }
    });

  } catch (error) {
    console.error('Error fetching college stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching college stats',
      error: error.message
    });
  }
});

// Search colleges
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const filter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { highlights: { $regex: query, $options: 'i' } }
      ]
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const colleges = await College.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await College.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: colleges,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('Error searching colleges:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching colleges',
      error: error.message
    });
  }
});

// Trigger scraper
router.get('/scrape/trigger', async (req, res) => {
  try {
    // This would trigger the scraper process
    // For now, just return success
    res.json({
      success: true,
      message: 'Scraper triggered successfully'
    });
  } catch (error) {
    console.error('Error triggering scraper:', error);
    res.status(500).json({
      success: false,
      message: 'Error triggering scraper',
      error: error.message
    });
  }
});

export default router;
