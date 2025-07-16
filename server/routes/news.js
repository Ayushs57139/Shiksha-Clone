const express = require('express');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Mock news data for now
const mockNews = [
  {
    id: 1,
    title: 'JEE Main 2024 Registration Begins: Important Dates and Guidelines',
    excerpt: 'National Testing Agency (NTA) has announced the registration dates for JEE Main 2024.',
    category: 'exams',
    author: 'Education Desk',
    date: '2023-11-01',
    readTime: '3 min read',
    views: '15.2K',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: true
  },
  {
    id: 2,
    title: 'NEET 2024: Medical Colleges to Increase Seats by 10%',
    excerpt: 'The Medical Council of India has approved an increase in MBBS seats.',
    category: 'admissions',
    author: 'Medical Education Reporter',
    date: '2023-10-28',
    readTime: '4 min read',
    views: '12.8K',
    image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false
  }
];

// @route   GET /api/news
// @desc    Get all news articles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    let filteredNews = mockNews;
    if (category && category !== 'all') {
      filteredNews = mockNews.filter(article => article.category === category);
    }

    res.json({
      success: true,
      data: filteredNews,
      pagination: {
        current: parseInt(page),
        pages: 1,
        total: filteredNews.length
      }
    });

  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;