import { MongoClient } from 'mongodb';
import { nirfStatePublicUniversityData } from '../src/data/nirfStatePublicUniversityData.js';

const uri = 'mongodb://localhost:27017';
const dbName = 'shiksha';

async function addNirfStatePublicUniversityData() {
  console.log('🎓 Adding NIRF State Public University Data to Database...');
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('colleges');
    
    // Clear existing NIRF state public university data
    const deleteResult = await collection.deleteMany({ 
      category: 'StatePublicUniversity',
      nirfRank: { $exists: true }
    });
    console.log(`✅ Cleared existing NIRF state public university data`);
    
    // Add new NIRF state public university data
    const insertResult = await collection.insertMany(nirfStatePublicUniversityData);
    console.log(`✅ Added ${insertResult.insertedCount} state public university institutions`);
    
    // Verify the count
    const count = await collection.countDocuments({ category: 'StatePublicUniversity' });
    console.log(`📊 Total NIRF state public university institutions in database: ${count}`);
    
    // Show sample data
    const sample = await collection.findOne({ category: 'StatePublicUniversity' });
    if (sample) {
      console.log('\n📋 Sample state public university institution:');
      console.log(`- Name: ${sample.name}`);
      console.log(`- NIRF Rank: ${sample.nirfRank}`);
      console.log(`- NIRF Score: ${sample.nirfScore}`);
      console.log(`- Category: ${sample.category}`);
      console.log(`- Location: ${sample.location}`);
    }
    
    // Show top 5 institutions
    const top5 = await collection.find({ category: 'StatePublicUniversity' })
      .sort({ nirfRank: 1 })
      .limit(5)
      .toArray();
    
    console.log('\n🏆 Top 5 State Public University Institutions:');
    top5.forEach((institution, index) => {
      console.log(`${index + 1}. ${institution.name} (Rank: ${institution.nirfRank}, Score: ${institution.nirfScore})`);
    });
    
    console.log('\n🎉 NIRF State Public University Data successfully added to database!');
    
  } catch (error) {
    console.error('❌ Error adding NIRF state public university data:', error);
  } finally {
    await client.close();
  }
}

addNirfStatePublicUniversityData(); 