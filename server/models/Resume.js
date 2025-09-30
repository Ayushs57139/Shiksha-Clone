import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    linkedin: { type: String },
    website: { type: String }
  },
  summary: { type: String },
  education: [{
    degree: { type: String },
    institution: { type: String },
    year: { type: String },
    gpa: { type: String },
    description: { type: String }
  }],
  experience: [{
    title: { type: String },
    company: { type: String },
    duration: { type: String },
    description: { type: String }
  }],
  skills: [{ type: String }],
  projects: [{
    name: { type: String },
    description: { type: String },
    technologies: { type: String },
    link: { type: String }
  }],
  certifications: [{
    name: { type: String },
    issuer: { type: String },
    date: { type: String },
    link: { type: String }
  }],
  selectedTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', default: null },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
resumeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Resume', resumeSchema); 