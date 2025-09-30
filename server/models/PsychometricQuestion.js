import mongoose from 'mongoose';

const psychometricQuestionSchema = new mongoose.Schema({
  testKey: {
    type: String,
    required: true,
    index: true
  },
  text: {
    type: String,
    required: true
  },
  dimensionKey: {
    type: String,
    required: true,
    default: 'GENERAL'
  },
  order: {
    type: Number,
    required: true,
    min: 1
  },
  // Multiple choice options
  options: [{
    value: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    correct: {
      type: Boolean,
      default: false
    }
  }],
  // Correct answer (for scoring)
  correctAnswer: {
    type: String,
    default: null
  },
  // Explanation for correct answer
  explanation: {
    type: String,
    default: null
  },
  // Legacy fields for backward compatibility
  reverseScored: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
psychometricQuestionSchema.index({ testKey: 1, order: 1 });
psychometricQuestionSchema.index({ dimensionKey: 1 });

export default mongoose.model('PsychometricQuestion', psychometricQuestionSchema);


