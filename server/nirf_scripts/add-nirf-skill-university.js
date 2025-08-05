import { MongoClient } from 'mongodb';
import { nirfSkillUniversityData } from '../src/data/college_data/nirfSkillUniversityData.js';

const uri = 'mongodb://localhost:27017';
const dbName = 'shiksha';

async function addNirfSkillUniversityData() {
  console.log('🎓 Adding NIRF Skill University Data to Database...');
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('colleges');
    
    // Clear existing NIRF skill university data
    const deleteResult = await collection.deleteMany({ 
      category: 'SkillUniversity',
      nirfRank: { $exists: true }
    });
    console.log(`✅ Cleared existing NIRF skill university data`);
    
    // Add new NIRF skill university data
    const insertResult = await collection.insertMany(nirfSkillUniversityData);
    console.log(`✅ Added ${insertResult.insertedCount} skill university institutions`);
    
    // Verify the count
    const count = await collection.countDocuments({ category: 'SkillUniversity' });
    console.log(`📊 Total NIRF skill university institutions in database: ${count}`);
    
    // Show sample data
    const sample = await collection.findOne({ category: 'SkillUniversity' });
    if (sample) {
      console.log('\n📋 Sample skill university institution:');
      console.log(`- Name: ${sample.name}`);
      console.log(`- NIRF Rank: ${sample.nirfRank}`);
      console.log(`- NIRF Score: ${sample.nirfScore}`);
      console.log(`- Category: ${sample.category}`);
      console.log(`- Location: ${sample.location}`);
    }
    
    // Show top 5 institutions
    const top5 = await collection.find({ category: 'SkillUniversity' })
      .sort({ nirfRank: 1 })
      .limit(5)
      .toArray();
    
    console.log('\n🏆 Top 5 Skill University Institutions:');
    top5.forEach((institution, index) => {
      console.log(`${index + 1}. ${institution.name} (Rank: ${institution.nirfRank}, Score: ${institution.nirfScore})`);
    });
    
    console.log('\n🎉 NIRF Skill University Data successfully added to database!');
    
  } catch (error) {
    console.error('❌ Error adding NIRF skill university data:', error);
  } finally {
    await client.close();
  }
}

addNirfSkillUniversityData(); 