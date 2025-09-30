import { MongoClient } from 'mongodb';
import { nirfInnovationData } from '../src/data/college_data/nirfInnovationData.js';

async function addNirfInnovationData() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();

    const db = client.db('diksha-buddy');
    const collection = db.collection('colleges');

    console.log('💡 Adding NIRF Innovation Data to Database...');

    // Clear existing NIRF innovation data
    await collection.deleteMany({ source: 'nirf-innovation-2024' });
    console.log('✅ Cleared existing NIRF innovation data');

    // Add all NIRF innovation institutions
    const result = await collection.insertMany(nirfInnovationData);
    console.log(`✅ Added ${result.insertedIds.length} innovation institutions`);

    // Verify the data
    const count = await collection.countDocuments({ source: 'nirf-innovation-2024' });
    console.log(`📊 Total NIRF innovation institutions in database: ${count}`);

    // Show sample data
    const sample = await collection.findOne({ source: 'nirf-innovation-2024' });
    if (sample) {
      console.log('\n📋 Sample innovation institution:');
      console.log(`- Name: ${sample.name}`);
      console.log(`- NIRF Rank: ${sample.nirfRank}`);
      console.log(`- NIRF Score: ${sample.nirfScore}`);
      console.log(`- Category: ${sample.category}`);
      console.log(`- Location: ${sample.location}, ${sample.state}`);
    }

    // Show top 5 institutions
    const top5 = await collection.find({ source: 'nirf-innovation-2024' }).sort({ nirfRank: 1 }).limit(5).toArray();
    console.log('\n🏆 Top 5 Innovation Institutions:');
    top5.forEach((inst, index) => {
      console.log(`${index + 1}. ${inst.name} (Rank: ${inst.nirfRank}, Score: ${inst.nirfScore})`);
    });

    await client.close();
    console.log('\n🎉 NIRF Innovation Data successfully added to database!');

  } catch (error) {
    console.error('❌ Error adding NIRF innovation data:', error);
  }
}

addNirfInnovationData(); 