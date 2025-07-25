import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  link: String,
  slug: { type: String, unique: true },
  fees: String,
  salary: String,
  rating: String,
  reviews: Number,
  category: String,
});
export default mongoose.models.College || mongoose.model('College', schema);
