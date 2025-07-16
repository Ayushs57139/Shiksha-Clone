const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exam name is required'],
    trim: true,
    maxlength: [200, 'Exam name cannot exceed 200 characters']
  },
  fullName: {
    type: String,
    required: true
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
    enum: ['Engineering', 'Medical', 'Management', 'Law', 'Government', 'Arts', 'Science']
  },
  level: {
    type: String,
    required: true,
    enum: ['Undergraduate', 'Postgraduate', 'Both']
  },
  conductingBody: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Both'],
    required: true
  },
  frequency: {
    type: String,
    enum: ['Once a year', 'Twice a year', 'Multiple times', 'On demand'],
    default: 'Once a year'
  },
  dates: {
    applicationStart: Date,
    applicationEnd: Date,
    examDate: Date,
    resultDate: Date,
    counsellingDate: Date
  },
  fees: {
    general: Number,
    obc: Number,
    scst: Number,
    pwd: Number,
    currency: { type: String, default: 'INR' }
  },
  eligibility: {
    qualification: String,
    percentage: String,
    ageLimit: String,
    attempts: String,
    subjects: [String]
  },
  pattern: {
    duration: String,
    totalQuestions: Number,
    totalMarks: Number,
    sections: [{
      subject: String,
      questions: Number,
      marks: Number,
      duration: String
    }],
    markingScheme: String,
    negativeMarking: String
  },
  syllabus: {
    subjects: [{
      name: String,
      topics: [String],
      weightage: Number
    }]
  },
  stats: {
    totalRegistrations: { type: Number, default: 0 },
    totalApplicants: { type: Number, default: 0 },
    passPercentage: { type: Number, default: 0 }
  },
  colleges: [{
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College'
    },
    acceptsScore: Boolean,
    cutoff: String
  }],
  preparationTips: [String],
  importantDates: [{
    event: String,
    date: Date,
    description: String
  }],
  status: {
    type: String,
    enum: ['Upcoming', 'Registration Open', 'Registration Closed', 'Exam Completed', 'Results Declared'],
    default: 'Upcoming'
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
examSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
  }
  next();
});

// Index for search
examSchema.index({ name: 'text', description: 'text', field: 'text' });
examSchema.index({ field: 1, level: 1, status: 1 });

module.exports = mongoose.model('Exam', examSchema);