import mongoose from 'mongoose';
import College from './models/College.js';
import dotenv from 'dotenv';

dotenv.config();

async function testDatabase() {
  try {
    console.log('🔍 Testing Database Connection...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ayushs81740:6JplFZPJ3W38tYAh@cluster0.emv3s7n.mongodb.net/Shiksha', {
      dbName: 'shiksha'
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Check total colleges
    const totalColleges = await College.countDocuments();
    console.log(`📊 Total colleges in database: ${totalColleges}`);
    
    // Check engineering colleges
    const engineeringColleges = await College.countDocuments({ category: 'Engineering' });
    console.log(`🏗️ Engineering colleges: ${engineeringColleges}`);
    
    // Get sample colleges
    const sampleColleges = await College.find().limit(5);
    console.log('\n📋 Sample colleges:');
    sampleColleges.forEach(college => {
      console.log(`  - ${college.name} (${college.category}) - ${college.location}`);
    });
    
    // Check if any colleges have nirf_ranking
    const rankedColleges = await College.countDocuments({ nirf_ranking: { $exists: true } });
    console.log(`🏆 Colleges with NIRF ranking: ${rankedColleges}`);
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

testDatabase(); 