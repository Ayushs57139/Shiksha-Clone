import { MongoClient } from 'mongodb';
import { nirfArchitectureData } from '../src/data/college_data/nirfArchitectureData.js';

async function addNirfArchitectureData() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();

    const db = client.db('shiksha');
    const collection = db.collection('colleges');

    console.log('🏗️ Adding NIRF Architecture Data to Database...');

    // Clear existing NIRF architecture data
    await collection.deleteMany({ source: 'nirf-arch-2024' });
    console.log('✅ Cleared existing NIRF architecture data');

    // Add all NIRF architecture institutions
    const result = await collection.insertMany(nirfArchitectureData);
    console.log(`✅ Added ${result.insertedIds.length} architecture institutions`);

    // Verify the data
    const count = await collection.countDocuments({ source: 'nirf-arch-2024' });
    console.log(`📊 Total NIRF architecture institutions in database: ${count}`);

    // Show sample data
    const sample = await collection.findOne({ source: 'nirf-arch-2024' });
    if (sample) {
      console.log('\n📋 Sample architecture institution:');
      console.log(`- Name: ${sample.name}`);
      console.log(`- NIRF Rank: ${sample.nirfRank}`);
      console.log(`- NIRF Score: ${sample.nirfScore}`);
      console.log(`- Category: ${sample.category}`);
      console.log(`- Location: ${sample.location}, ${sample.state}`);
    }

    // Show top 5 institutions
    const top5 = await collection.find({ source: 'nirf-arch-2024' }).sort({ nirfRank: 1 }).limit(5).toArray();
    console.log('\n🏆 Top 5 Architecture Institutions:');
    top5.forEach((inst, index) => {
      console.log(`${index + 1}. ${inst.name} (Rank: ${inst.nirfRank}, Score: ${inst.nirfScore})`);
    });

    await client.close();
    console.log('\n🎉 NIRF Architecture Data successfully added to database!');

  } catch (error) {
    console.error('❌ Error adding NIRF architecture data:', error);
  }
}

addNirfArchitectureData(); 