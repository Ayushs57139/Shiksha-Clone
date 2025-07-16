const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    maxlength: [200, 'College name cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: 'India' },
    address: String,
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['engineering', 'medical', 'mba', 'law', 'arts', 'science', 'commerce']
  },
  type: {
    type: String,
    enum: ['government', 'private', 'deemed'],
    required: true
  },
  established: {
    type: Number,
    required: true,
    min: 1800,
    max: new Date().getFullYear()
  },
  affiliation: {
    university: String,
    accreditation: [String]
  },
  contact: {
    phone: String,
    email: String,
    website: String,
    fax: String
  },
  stats: {
    totalStudents: { type: Number, default: 0 },
    totalFaculty: { type: Number, default: 0 },
    totalCourses: { type: Number, default: 0 },
    campusSize: String
  },
  fees: {
    annual: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'INR' }
    },
    hostel: Number,
    other: Number
  },
  ratings: {
    overall: { type: Number, min: 0, max: 5, default: 0 },
    infrastructure: { type: Number, min: 0, max: 5, default: 0 },
    faculty: { type: Number, min: 0, max: 5, default: 0 },
    placements: { type: Number, min: 0, max: 5, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  rankings: [{
    agency: String,
    rank: Number,
    year: Number,
    category: String
  }],
  courses: [{
    name: String,
    duration: String,
    fees: Number,
    seats: Number,
    eligibility: String
  }],
  admissions: {
    process: String,
    entranceExams: [String],
    applicationDeadline: Date,
    eligibility: String,
    totalSeats: Number
  },
  placements: {
    averagePackage: Number,
    highestPackage: Number,
    placementRate: Number,
    topRecruiters: [String],
    placementStats: [{
      year: Number,
      placed: Number,
      averagePackage: Number,
      highestPackage: Number
    }]
  },
  facilities: [String],
  images: {
    logo: String,
    campus: [String],
    facilities: [String]
  },
  highlights: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create slug from name
collegeSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
  }
  next();
});

// Index for search
collegeSchema.index({ name: 'text', description: 'text', 'location.city': 'text' });
collegeSchema.index({ category: 1, 'location.state': 1 });
collegeSchema.index({ 'ratings.overall': -1 });

module.exports = mongoose.model('College', collegeSchema);