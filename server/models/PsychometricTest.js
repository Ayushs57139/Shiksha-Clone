import mongoose from 'mongoose';

const psychometricTestSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, default: 'Aptitude', index: true },
  description: { type: String, default: '' },
  dimensions: [{
    key: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: '' }
  }],
  scale: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 5 },
    labels: [{ value: Number, label: String }]
  },
  numQuestions: { type: Number, default: 0 },
  numTests: { type: Number, default: 1 },
  rating: { type: Number, default: 4.5 },
  icon: { type: String, default: '🧠' },
  tags: [{ type: String }],
  timeLimitMinutes: { type: Number, default: 20 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

psychometricTestSchema.pre('save', function(next){
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('PsychometricTest', psychometricTestSchema);


