import { MongoClient } from 'mongodb';

const nirfResearchData = [
  {
    _id: 'nirf-research-1',
    name: 'Indian Institute of Science, Bengaluru',
    slug: 'iisc-bengaluru',
    category: 'Research',
    location: 'Bengaluru',
    state: 'Karnataka',
    rating: 4.8,
    nirfRank: 1,
    nirfScore: 84.98,
    established: 1909,
    students: 4000,
    courses: 50,
    description: 'India\'s premier research institution, ranked #1 in NIRF Research Rankings 2024.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['NIRF Rank 1', 'Premier Research Institution', 'IISc Bengaluru'],
    image: '',
    website: 'https://iisc.ac.in/',
    phone: '+91 80 2293 2000',
    email: 'registrar@iisc.ac.in',
    status: 'active',
    source: 'nirf-2024',
    instituteId: 'IR-R-U-0220'
  },
  {
    _id: 'nirf-research-2',
    name: 'Indian Institute of Technology Madras',
    slug: 'iit-madras-research',
    category: 'Research',
    location: 'Chennai',
    state: 'Tamil Nadu',
    rating: 4.7,
    nirfRank: 2,
    nirfScore: 83.29,
    established: 1959,
    students: 8000,
    courses: 100,
    description: 'Premier IIT ranked #2 in NIRF Research Rankings 2024.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['NIRF Rank 2', 'IIT Madras', 'Premier Engineering Institution'],
    image: '',
    website: 'https://www.iitm.ac.in/',
    phone: '+91 44 2257 8000',
    email: 'director@iitm.ac.in',
    status: 'active',
    source: 'nirf-2024',
    instituteId: 'IR-R-U-0456'
  },
  {
    _id: 'nirf-research-3',
    name: 'Indian Institute of Technology Delhi',
    slug: 'iit-delhi-research',
    category: 'Research',
    location: 'New Delhi',
    state: 'Delhi',
    rating: 4.6,
    nirfRank: 3,
    nirfScore: 81.08,
    established: 1961,
    students: 8000,
    courses: 100,
    description: 'Premier IIT ranked #3 in NIRF Research Rankings 2024.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['NIRF Rank 3', 'IIT Delhi', 'Premier Engineering Institution'],
    image: '',
    website: 'https://home.iitd.ac.in/',
    phone: '+91 11 2659 7135',
    email: 'director@admin.iitd.ac.in',
    status: 'active',
    source: 'nirf-2024',
    instituteId: 'IR-R-I-1074'
  },
  {
    _id: 'nirf-research-4',
    name: 'Indian Institute of Technology Bombay',
    slug: 'iit-bombay-research',
    category: 'Research',
    location: 'Mumbai',
    state: 'Maharashtra',
    rating: 4.5,
    nirfRank: 4,
    nirfScore: 77.75,
    established: 1958,
    students: 8000,
    courses: 100,
    description: 'Premier IIT ranked #4 in NIRF Research Rankings 2024.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['NIRF Rank 4', 'IIT Bombay', 'Premier Engineering Institution'],
    image: '',
    website: 'https://www.iitb.ac.in/',
    phone: '+91 22 2572 2545',
    email: 'director@iitb.ac.in',
    status: 'active',
    source: 'nirf-2024',
    instituteId: 'IR-R-U-0306'
  },
  {
    _id: 'nirf-research-5',
    name: 'Indian Institute of Technology Kharagpur',
    slug: 'iit-kharagpur-research',
    category: 'Research',
    location: 'Kharagpur',
    state: 'West Bengal',
    rating: 4.4,
    nirfRank: 5,
    nirfScore: 72.65,
    established: 1951,
    students: 8000,
    courses: 100,
    description: 'Premier IIT ranked #5 in NIRF Research Rankings 2024.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['NIRF Rank 5', 'IIT Kharagpur', 'Premier Engineering Institution'],
    image: '',
    website: 'https://www.iitkgp.ac.in/',
    phone: '+91 3222 255221',
    email: 'director@iitkgp.ac.in',
    status: 'active',
    source: 'nirf-2024',
    instituteId: 'IR-R-U-0573'
  }
];

async function addNirfData() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();
    
    const db = client.db('shiksha');
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