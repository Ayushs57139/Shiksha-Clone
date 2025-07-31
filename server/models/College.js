import mongoose from 'mongoose';

const CollegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Engineering', 'MBA', 'Medical', 'Design', 'Arts', 'Law', 'Science', 'Commerce']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  established: {
    type: Number,
    required: true,
    min: 1800,
    max: new Date().getFullYear()
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  students: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  courses: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  facilities: [{
    type: String,
    trim: true
  }],
  highlights: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  placements: {
    averagePackage: {
      type: Number,
      default: 0
    },
    highestPackage: {
      type: Number,
      default: 0
    },
    placementRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  examsAccepted: [{
    type: String,
    trim: true
  }],
  fees: {
    type: Number,
    default: 0
  },
  admissionProcess: {
    type: String,
    default: ''
  },
  campusLife: {
    type: String,
    default: ''
  },
  infrastructure: {
    type: String,
    default: ''
  },
  faculty: {
    type: String,
    default: ''
  },
  research: {
    type: String,
    default: ''
  },
  internationalCollaborations: [{
    type: String,
    trim: true
  }],
  achievements: [{
    type: String,
    trim: true
  }],
  gallery: [{
    type: String
  }],
  reviews: [{
    user: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better search performance
CollegeSchema.index({ name: 'text', location: 'text', category: 'text' });
CollegeSchema.index({ slug: 1 });
CollegeSchema.index({ category: 1 });
CollegeSchema.index({ location: 1 });
CollegeSchema.index({ status: 1 });
CollegeSchema.index({ featured: 1 });

// Virtual for average review rating
CollegeSchema.virtual('averageReviewRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / this.reviews.length).toFixed(1);
});

// Method to get college statistics
CollegeSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalColleges: { $sum: 1 },
        totalStudents: { $sum: '$students' },
        totalCourses: { $sum: '$courses' },
        avgRating: { $avg: '$rating' },
        avgFees: { $avg: '$fees' }
      }
    }
  ]);
  
  return stats[0] || {
    totalColleges: 0,
    totalStudents: 0,
    totalCourses: 0,
    avgRating: 0,
    avgFees: 0
  };
};

// Method to search colleges
CollegeSchema.statics.search = async function(query, filters = {}) {
  const searchQuery = {
    $and: [
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      }
    ]
  };

  // Add filters
  if (filters.category) {
    searchQuery.$and.push({ category: filters.category });
  }
  if (filters.location) {
    searchQuery.$and.push({ location: filters.location });
  }
  if (filters.status) {
    searchQuery.$and.push({ status: filters.status });
  }
  if (filters.minRating) {
    searchQuery.$and.push({ rating: { $gte: parseFloat(filters.minRating) } });
  }
  if (filters.maxFees) {
    searchQuery.$and.push({ fees: { $lte: parseFloat(filters.maxFees) } });
  }

  return this.find(searchQuery).sort({ rating: -1, name: 1 });
};

const College = mongoose.model('College', CollegeSchema);

export default College;
