import mongoose from 'mongoose';
import College from './models/College.js';
import dotenv from 'dotenv';

// Import all college data
import { nirfResearchData } from '../src/data/college_data/nirfResearchData.js';
import { nirfInnovationData } from '../src/data/college_data/nirfInnovationData.js';
import { nirfStatePublicUniversityData } from '../src/data/college_data/nirfStatePublicUniversityData.js';
import { nirfSkillUniversityData } from '../src/data/college_data/nirfSkillUniversityData.js';
import { nirfOpenUniversityData } from '../src/data/college_data/nirfOpenUniversityData.js';
import { nirfArchitectureData } from '../src/data/college_data/nirfArchitectureData.js';
import { nirfAgricultureData } from '../src/data/college_data/nirfAgricultureData.js';

dotenv.config();

async function populateAllColleges() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/diksha-buddy');
    console.log('✅ Connected to MongoDB');

    // Clear existing college data
    await College.deleteMany({});
    console.log('✅ Cleared existing college data');

    // Combine all college data
    const allColleges = [
      ...(nirfResearchData || []),
      ...(nirfInnovationData || []),
      ...(nirfStatePublicUniversityData || []),
      ...(nirfSkillUniversityData || []),
      ...(nirfOpenUniversityData || []),
      ...(nirfArchitectureData || []),
      ...(nirfAgricultureData || [])
    ];

    console.log(`📊 Total colleges to add: ${allColleges.length}`);

    // Add all colleges to database
    const result = await College.insertMany(allColleges);
    console.log(`✅ Added ${result.length} colleges to database`);

    // Verify the data
    const totalCount = await College.countDocuments();
    console.log(`📊 Total colleges in database: ${totalCount}`);

    // Show category distribution
    const categoryStats = await College.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log('\n📋 Category Distribution:');
    categoryStats.forEach(stat => {
      console.log(`- ${stat._id}: ${stat.count} colleges`);
    });

    // Show location distribution
    const locationStats = await College.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    console.log('\n📍 Top 10 Locations:');
    locationStats.forEach(stat => {
      console.log(`- ${stat._id}: ${stat.count} colleges`);
    });

    await mongoose.disconnect();
    console.log('\n🎉 All college data successfully populated!');

  } catch (error) {
    console.error('❌ Error populating college data:', error);
    process.exit(1);
  }
}

populateAllColleges();
