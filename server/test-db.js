import { MongoClient } from 'mongodb';

async function testDatabase() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();
    
    const db = client.db('Shiksha');
    const colleges = await db.collection('colleges').find({}).toArray();
    
    console.log('Total colleges:', colleges.length);
    console.log('Categories:', [...new Set(colleges.map(c => c.category))]);
    console.log('\nSample colleges:');
    colleges.slice(0, 5).forEach(c => {
      console.log(`- ${c.name} (${c.category})`);
    });
    
    // Check for specific categories
    const stateUniversities = colleges.filter(c => 
      c.name.toLowerCase().includes('state university') || 
      c.name.toLowerCase().includes('university') && c.category === 'University'
    );
    console.log('\nState Universities:', stateUniversities.length);
    
    const governmentColleges = colleges.filter(c => 
      c.category === 'College' && 
      !c.name.toLowerCase().includes('private')
    );
    console.log('Government Colleges:', governmentColleges.length);
    
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

testDatabase(); 