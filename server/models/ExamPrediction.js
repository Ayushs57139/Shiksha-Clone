import mongoose from 'mongoose';

const examPredictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  userName: {
    type: String,
    required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamPredictor',
    required: true,
    index: true
  },
  examName: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    required: true
  },
  predictionData: {
    currentScore: Number,
    targetScore: Number,
    studyHours: Number,
    weakAreas: [String],
    strongAreas: [String],
    recommendedStudyPlan: [String],
    expectedRank: Number,
    collegePredictions: [{
      collegeName: String,
      branch: String,
      probability: String, // 'High', 'Medium', 'Low'
      lastYearRank: Number
    }]
  },
  analysis: {
    timeToExam: Number, // days
    studyEfficiency: Number, // percentage
    improvementAreas: [String],
    mockTestScores: [{
      testName: String,
      score: Number,
      date: Date
    }],
    progressTrend: String // 'Improving', 'Stable', 'Declining'
  },
  recommendations: {
    dailyStudyHours: Number,
    weeklyGoals: [String],
    focusSubjects: [String],
    practiceTests: [String],
    resources: [String]
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Paused'],
    default: 'Active'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
examPredictionSchema.index({ userId: 1, examId: 1 });
examPredictionSchema.index({ examType: 1, status: 1 });
examPredictionSchema.index({ 'predictionData.expectedRank': 1 });

export default mongoose.model('ExamPrediction', examPredictionSchema);
