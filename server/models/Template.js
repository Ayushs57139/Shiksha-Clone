import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Professional', 'Creative', 'Technical', 'Academic', 'Financial', 'Marketing', 'Healthcare', 'Education', 'Engineering', 'Design', 'Business', 'Sales', 'Management', 'Consulting', 'Research', 'Media', 'Entertainment', 'Sports', 'Legal', 'Real Estate', 'Hospitality', 'Retail', 'Manufacturing', 'Technology'], required: true },
  description: { type: String, default: '' },
  preview: { type: String, default: '' },
  html: { type: String, required: true },
  accentColor: { type: String, default: '#0f766e' },
  secondaryColor: { type: String, default: '#111827' },
  tertiaryColor: { type: String, default: '#64748b' },
  layout: { type: String, enum: ['executive', 'creative', 'technical', 'marketing', 'academic', 'financial', 'minimalist', 'modern', 'classic', 'bold', 'elegant', 'dynamic'], default: 'executive' },
  focus: { type: String, default: 'general' },
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

templateSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Template', templateSchema);


