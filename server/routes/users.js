const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();
const User = require('../models/User');

// ✅ Base route (GET /api/users)
router.get('/', (req, res) => {
  res.json({ success: true, message: 'User route is working' });
});

// ✅ GET /api/users/profile
// @desc    Get user profile (Private)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get profile error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
