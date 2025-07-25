import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: String,
  slug: String,
  rating: Number,
  reviewsCount: Number,
  placements: Number,
  infrastructure: Number,
  faculty: Number,
  campusLife: Number,
  valueForMoney: Number,
  learningExperience: Number,
  courseSupport: Number,
  fees: String,
  salary: String,
  ranks: {
    businessToday: String,
    times: String,
    outlook: String
  },
  links: {
    admission: String,
    courses: String,
    fees: String,
    placements: String,
    cutoff: String
  }
}, { timestamps: true });

const College = mongoose.model('College', collegeSchema);
export default College;
