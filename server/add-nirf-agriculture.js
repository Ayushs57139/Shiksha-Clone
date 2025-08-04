import { MongoClient } from 'mongodb';
import { nirfAgricultureData } from '../src/data/nirfAgricultureData.js';

async function addNirfAgricultureData() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();

    const db = client.db('shiksha');
    const collection = db.collection('colleges');

    console.log('🌾 Adding NIRF Agriculture Data to Database...');

    // Clear existing NIRF agriculture data
    await collection.deleteMany({ source: 'nirf-agri-2024' });
    console.log('✅ Cleared existing NIRF agriculture data');

    // Add all NIRF agriculture institutions
    const result = await collection.insertMany(nirfAgricultureData);
    console.log(`✅ Added ${result.insertedIds.length} agriculture institutions`);

    // Verify the data
    const count = await collection.countDocuments({ source: 'nirf-agri-2024' });
    console.log(`📊 Total NIRF agriculture institutions in database: ${count}`);

    // Show sample data
    const sample = await collection.findOne({ source: 'nirf-agri-2024' });
    if (sample) {
      console.log('\n📋 Sample agriculture institution:');
      console.log(`- Name: ${sample.name}`);
      console.log(`- NIRF Rank: ${sample.nirfRank}`);
      console.log(`- NIRF Score: ${sample.nirfScore}`);
      console.log(`- Category: ${sample.category}`);
      console.log(`- Location: ${sample.location}, ${sample.state}`);
    }

    // Show top 5 institutions
    const top5 = await collection.find({ source: 'nirf-agri-2024' }).sort({ nirfRank: 1 }).limit(5).toArray();
    console.log('\n🏆 Top 5 Agriculture Institutions:');
    top5.forEach((inst, index) => {
      console.log(`${index + 1}. ${inst.name} (Rank: ${inst.nirfRank}, Score: ${inst.nirfScore})`);
    });

    await client.close();
    console.log('\n🎉 NIRF Agriculture Data successfully added to database!');

  } catch (error) {
    console.error('❌ Error adding NIRF agriculture data:', error);
  }
}

addNirfAgricultureData(); 