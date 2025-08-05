import { MongoClient } from 'mongodb';
import { nirfOpenUniversityData } from '../src/data/college_data/nirfOpenUniversityData.js';

async function addNirfOpenUniversityData() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();

    const db = client.db('shiksha');
    const collection = db.collection('colleges');

    console.log('🎓 Adding NIRF Open University Data to Database...');

    // Clear existing NIRF open university data
    await collection.deleteMany({ source: 'nirf-open-2024' });
    console.log('✅ Cleared existing NIRF open university data');

    // Add all NIRF open university institutions
    const result = await collection.insertMany(nirfOpenUniversityData);
    console.log(`✅ Added ${result.insertedIds.length} open university institutions`);

    // Verify the data
    const count = await collection.countDocuments({ source: 'nirf-open-2024' });
    console.log(`📊 Total NIRF open university institutions in database: ${count}`);

    // Show sample data
    const sample = await collection.findOne({ source: 'nirf-open-2024' });
    if (sample) {
      console.log('\n📋 Sample open university institution:');
      console.log(`- Name: ${sample.name}`);
      console.log(`- NIRF Rank: ${sample.nirfRank}`);
      console.log(`- NIRF Score: ${sample.nirfScore}`);
      console.log(`- Category: ${sample.category}`);
      console.log(`- Location: ${sample.location}, ${sample.state}`);
    }

    // Show top 5 institutions
    const top5 = await collection.find({ source: 'nirf-open-2024' }).sort({ nirfRank: 1 }).limit(5).toArray();
    console.log('\n🏆 Top 5 Open University Institutions:');
    top5.forEach((inst, index) => {
      console.log(`${index + 1}. ${inst.name} (Rank: ${inst.nirfRank}, Score: ${inst.nirfScore})`);
    });

    await client.close();
    console.log('\n🎉 NIRF Open University Data successfully added to database!');

  } catch (error) {
    console.error('❌ Error adding NIRF open university data:', error);
  }
}

addNirfOpenUniversityData(); 