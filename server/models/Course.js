const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [200, 'Course name cannot exceed 200 characters']
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
  field: {
    type: String,
    required: true,
    enum: ['Engineering', 'Medical', 'Management', 'Law', 'Arts', 'Science', 'Commerce', 'Computer Science']
  },
  level: {
    type: String,
    required: true,
    enum: ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate', 'Doctorate']
  },
  duration: {
    years: { type: Number, required: true },
    months: { type: Number, default: 0 }
  },
  mode: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Online', 'Distance'],
    default: 'Full-time'
  },
  eligibility: {
    qualification: String,
    percentage: String,
    entranceExams: [String],
    ageLimit: String
  },
  curriculum: {
    subjects: [String],
    specializations: [String],
    practicals: [String],
    projects: [String]
  },
  fees: {
    average: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'INR' }
    },
    government: Number,
    private: Number
  },
  career: {
    opportunities: [String],
    averageSalary: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'INR' }
    },
    topEmployers: [String],
    jobRoles: [String]
  },
  colleges: [{
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College'
    },
    fees: Number,
    seats: Number,
    cutoff: String
  }],
  entranceExams: [{
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    required: Boolean
  }],
  stats: {
    totalColleges: { type: Number, default: 0 },
    totalStudents: { type: Number, default: 0 },
    employmentRate: { type: Number, default: 0 }
  },
  images: {
    thumbnail: String,
    gallery: [String]
  },
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
courseSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
  }
  next();
});

// Index for search
courseSchema.index({ name: 'text', description: 'text', field: 'text' });
courseSchema.index({ field: 1, level: 1 });

module.exports = mongoose.model('Course', courseSchema);