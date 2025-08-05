import { MongoClient } from 'mongodb';
import { nirfResearchData } from '../src/data/college_data/nirfResearchData.js';

async function addNirfData() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();
    
    const db = client.db('Shiksha');
    const collection = db.collection('colleges');
    
    console.log('🗄️ Adding NIRF Research Data to Database...');
    
    // Clear existing NIRF data
    await collection.deleteMany({ source: 'nirf-2024' });
    console.log('✅ Cleared existing NIRF data');
    
    // Add all NIRF research institutions
    const result = await collection.insertMany(nirfResearchData);
    console.log(`✅ Added ${result.insertedIds.length} research institutions`);
    
    // Verify the data
    const count = await collection.countDocuments({ source: 'nirf-2024' });
    console.log(`📊 Total NIRF research institutions in database: ${count}`);
    
    // Show sample data
    const sample = await collection.findOne({ source: 'nirf-2024' });
    if (sample) {
      console.log('\n📋 Sample institution:');
      console.log(`- Name: ${sample.name}`);
      console.log(`- NIRF Rank: ${sample.nirfRank}`);
      console.log(`- NIRF Score: ${sample.nirfScore}`);
      console.log(`- Category: ${sample.category}`);
    }
    
    await client.close();
    console.log('\n🎉 NIRF Research Data successfully added to database!');
    
  } catch (error) {
    console.error('❌ Error adding NIRF data:', error);
  }
}

addNirfData(); 