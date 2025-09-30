import mongoose from 'mongoose';
import College from './models/College.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkCollegeCount() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/diksha-buddy');
    console.log('✅ Connected to MongoDB');

    // Get total count
    const totalCount = await College.countDocuments();
    console.log(`📊 Total colleges in database: ${totalCount}`);

    // Get count by category
    const categoryStats = await College.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log('\n📋 Category Distribution:');
    categoryStats.forEach(stat => {
      console.log(`- ${stat._id}: ${stat.count} colleges`);
    });

    // Get count by source
    const sourceStats = await College.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log('\n📋 Source Distribution:');
    sourceStats.forEach(stat => {
      console.log(`- ${stat._id || 'No source'}: ${stat.count} colleges`);
    });

    // Show sample colleges
    const sampleColleges = await College.find({}).limit(5);
    console.log('\n📋 Sample Colleges:');
    sampleColleges.forEach(college => {
      console.log(`- ${college.name} (${college.category}) - Rating: ${college.rating}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Database check completed!');

  } catch (error) {
    console.error('❌ Error checking database:', error);
    process.exit(1);
  }
}

checkCollegeCount();
