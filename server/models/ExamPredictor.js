import mongoose from 'mongoose';

const examPredictorSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
    index: true
  },
  examType: {
    type: String,
    required: true,
    enum: ['JEE', 'NEET', 'CAT', 'GATE', 'UPSC', 'SSC', 'Banking', 'Other'],
    index: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Engineering', 'Medical', 'Management', 'Civil Services', 'Banking', 'Other'],
    index: true
  },
  description: {
    type: String,
    required: true
  },
  eligibility: {
    minAge: Number,
    maxAge: Number,
    education: [String],
    nationality: [String]
  },
  examPattern: {
    totalQuestions: Number,
    totalMarks: Number,
    duration: Number, // in minutes
    sections: [{
      name: String,
      questions: Number,
      marks: Number,
      time: Number
    }]
  },
  importantDates: {
    registrationStart: Date,
    registrationEnd: Date,
    examDate: Date,
    resultDate: Date
  },
  cutoffs: {
    general: Number,
    obc: Number,
    sc: Number,
    st: Number,
    ews: Number
  },
  colleges: [{
    name: String,
    location: String,
    branch: String,
    seats: Number,
    lastRank: Number
  }],
  preparationTips: [String],
  studyMaterial: [{
    title: String,
    type: String, // 'Book', 'Video', 'Online Course', 'Mock Test'
    link: String,
    description: String
  }],
  mockTests: [{
    title: String,
    questions: Number,
    duration: Number,
    difficulty: String,
    link: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
examPredictorSchema.index({ examName: 1, examType: 1 });
examPredictorSchema.index({ category: 1, isActive: 1 });
examPredictorSchema.index({ 'importantDates.examDate': 1 });

export default mongoose.model('ExamPredictor', examPredictorSchema);
