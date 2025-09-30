import mongoose from 'mongoose';

const psychometricResultSchema = new mongoose.Schema({
  testKey: {
    type: String,
    required: true,
    index: true
  },
  testName: {
    type: String,
    required: true
  },
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
  totalQuestions: {
    type: Number,
    required: true
  },
  answeredQuestions: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  answers: {
    type: Map,
    of: Number,
    default: {}
  },
  timeSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  completedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  // Legacy fields for backward compatibility
  responses: [{
    questionId: String,
    value: Number
  }],
  scores: [{
    dimensionKey: String,
    raw: Number,
    percentile: Number
  }],
  summary: String
}, {
  timestamps: true
});

// Indexes for efficient querying
psychometricResultSchema.index({ testKey: 1, completedAt: -1 });
psychometricResultSchema.index({ userId: 1, completedAt: -1 });
psychometricResultSchema.index({ score: -1 });

export default mongoose.model('PsychometricResult', psychometricResultSchema);


