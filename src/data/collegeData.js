import { nirfResearchData } from './college_data/nirfResearchData.js';
import { nirfInnovationData } from './college_data/nirfInnovationData.js';
import { nirfStatePublicUniversityData } from './college_data/nirfStatePublicUniversityData.js';
import { nirfSkillUniversityData } from './college_data/nirfSkillUniversityData.js';
import { nirfOpenUniversityData } from './college_data/nirfOpenUniversityData.js';
import { nirfArchitectureData } from './college_data/nirfArchitectureData.js';
import { nirfAgricultureData } from './college_data/nirfAgricultureData.js';

// Combine all college data with error handling
export const allColleges = [
  ...(nirfResearchData || []),
  ...(nirfInnovationData || []),
  ...(nirfStatePublicUniversityData || []),
  ...(nirfSkillUniversityData || []),
  ...(nirfOpenUniversityData || []),
  ...(nirfArchitectureData || []),
  ...(nirfAgricultureData || [])
];

// Add some additional popular colleges for variety
export const additionalColleges = [
  {
    _id: 'additional-1',
    name: 'Delhi University',
    slug: 'delhi-university',
    category: 'University',
    location: 'New Delhi',
    state: 'Delhi',
    rating: 4.5,
    established: 1922,
    students: 150000,
    courses: 200,
    description: 'One of India\'s premier universities with a rich history and excellent academic programs.',
    facilities: ['Library', 'Computer Center', 'Hostel', 'Sports Complex', 'Auditorium'],
    highlights: ['Premier University', 'Central University', 'Rich Heritage'],
    image: '',
    website: 'https://www.du.ac.in/',
    phone: '+91 11 2766 7777',
    email: 'info@du.ac.in',
    status: 'active'
  },
  {
    _id: 'additional-2',
    name: 'Mumbai University',
    slug: 'mumbai-university',
    category: 'University',
    location: 'Mumbai',
    state: 'Maharashtra',
    rating: 4.3,
    established: 1857,
    students: 800000,
    courses: 150,
    description: 'One of the oldest universities in India, known for its diverse academic programs.',
    facilities: ['Library', 'Computer Center', 'Hostel', 'Sports Complex', 'Research Labs'],
    highlights: ['Oldest University', 'Diverse Programs', 'Mumbai Location'],
    image: '',
    website: 'https://mu.ac.in/',
    phone: '+91 22 2654 3000',
    email: 'info@mu.ac.in',
    status: 'active'
  },
  {
    _id: 'additional-3',
    name: 'Anna University',
    slug: 'anna-university',
    category: 'University',
    location: 'Chennai',
    state: 'Tamil Nadu',
    rating: 4.4,
    established: 1978,
    students: 50000,
    courses: 120,
    description: 'Premier technical university in Tamil Nadu, known for engineering excellence.',
    facilities: ['Library', 'Computer Center', 'Hostel', 'Sports Complex', 'Research Labs'],
    highlights: ['Technical Excellence', 'Engineering Focus', 'Chennai Location'],
    image: '',
    website: 'https://www.annauniv.edu/',
    phone: '+91 44 2235 7000',
    email: 'info@annauniv.edu',
    status: 'active'
  },
  {
    _id: 'additional-4',
    name: 'Jawaharlal Nehru University',
    slug: 'jnu',
    category: 'University',
    location: 'New Delhi',
    state: 'Delhi',
    rating: 4.6,
    established: 1969,
    students: 8000,
    courses: 100,
    description: 'Premier research university known for social sciences and humanities.',
    facilities: ['Library', 'Computer Center', 'Hostel', 'Sports Complex', 'Research Centers'],
    highlights: ['Research Excellence', 'Social Sciences', 'JNU Delhi'],
    image: '',
    website: 'https://www.jnu.ac.in/',
    phone: '+91 11 2670 4090',
    email: 'info@jnu.ac.in',
    status: 'active'
  },
  {
    _id: 'additional-5',
    name: 'Banaras Hindu University',
    slug: 'bhu',
    category: 'University',
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    rating: 4.4,
    established: 1916,
    students: 30000,
    courses: 80,
    description: 'One of the largest residential universities in Asia, located in the holy city of Varanasi.',
    facilities: ['Library', 'Computer Center', 'Hostel', 'Sports Complex', 'Temple'],
    highlights: ['Residential University', 'Varanasi Location', 'Rich Heritage'],
    image: '',
    website: 'https://www.bhu.ac.in/',
    phone: '+91 542 236 8558',
    email: 'info@bhu.ac.in',
    status: 'active'
  }
];

// Combine all colleges - include ALL colleges without deduplication
export const completeCollegeList = [...allColleges, ...additionalColleges];

// Get unique colleges by ID to avoid duplicates (more lenient than by name)
export const uniqueColleges = completeCollegeList.filter((college, index, self) => 
  index === self.findIndex(c => c._id === college._id)
);

// Alternative: Get unique colleges by name but keep more variations
export const uniqueCollegesByName = completeCollegeList.filter((college, index, self) => {
  const existingIndex = self.findIndex(c => c.name === college.name);
  if (existingIndex === index) return true;
  // If same name exists, keep the one with better rating or more details
  const existing = self[existingIndex];
  if (college.rating > existing.rating || 
      (college.description && !existing.description) ||
      (college.website && !existing.website)) {
    // Replace the existing one with this better one
    self[existingIndex] = college;
    return false;
  }
  return false;
});

// Export the full list for maximum coverage
// export const allCollegesList = completeCollegeList;

// Export categories and locations for filtering
export const collegeCategories = [...new Set(completeCollegeList.map(college => college.category))];
export const collegeLocations = [...new Set(completeCollegeList.map(college => college.location))];
export const collegeStates = [...new Set(completeCollegeList.map(college => college.state))];

// Log counts for debugging
console.log('College Data Counts:');
console.log('NIRF Research:', nirfResearchData?.length || 0);
console.log('NIRF Innovation:', nirfInnovationData?.length || 0);
console.log('State Public Universities:', nirfStatePublicUniversityData?.length || 0);
console.log('Skill Universities:', nirfSkillUniversityData?.length || 0);
console.log('Open Universities:', nirfOpenUniversityData?.length || 0);
console.log('Architecture:', nirfArchitectureData?.length || 0);
console.log('Agriculture:', nirfAgricultureData?.length || 0);
console.log('Additional:', additionalColleges.length);
console.log('Total Combined:', completeCollegeList.length);
console.log('Unique by ID:', uniqueColleges.length);
console.log('Unique by Name:', uniqueCollegesByName.length);

// Create a comprehensive list with all colleges to ensure maximum coverage
export const comprehensiveCollegeList = [
  // IITs and Premier Institutions
  {
    _id: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay',
    slug: 'iit-bombay',
    category: 'Engineering',
    location: 'Mumbai',
    state: 'Maharashtra',
    rating: 4.9,
    established: 1958,
    students: 8000,
    courses: 100,
    description: 'Premier IIT ranked among top engineering institutions in India.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['IIT Bombay', 'Premier Engineering Institution', 'Mumbai Location'],
    image: '',
    website: 'https://www.iitb.ac.in/',
    phone: '+91 22 2572 2545',
    email: 'director@iitb.ac.in',
    status: 'active'
  },
  {
    _id: 'iit-delhi',
    name: 'Indian Institute of Technology Delhi',
    slug: 'iit-delhi',
    category: 'Engineering',
    location: 'New Delhi',
    state: 'Delhi',
    rating: 4.8,
    established: 1961,
    students: 8000,
    courses: 100,
    description: 'Premier IIT located in the capital city of India.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['IIT Delhi', 'Premier Engineering Institution', 'Delhi Location'],
    image: '',
    website: 'https://home.iitd.ac.in/',
    phone: '+91 11 2659 7135',
    email: 'director@admin.iitd.ac.in',
    status: 'active'
  },
  {
    _id: 'iit-madras',
    name: 'Indian Institute of Technology Madras',
    slug: 'iit-madras',
    category: 'Engineering',
    location: 'Chennai',
    state: 'Tamil Nadu',
    rating: 4.8,
    established: 1959,
    students: 10000,
    courses: 120,
    description: 'Premier IIT known for its excellent research and academic programs.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['IIT Madras', 'Premier Engineering Institution', 'Chennai Location'],
    image: '',
    website: 'https://www.iitm.ac.in/',
    phone: '+91 44 2257 8000',
    email: 'director@iitm.ac.in',
    status: 'active'
  },
  {
    _id: 'iit-kanpur',
    name: 'Indian Institute of Technology Kanpur',
    slug: 'iit-kanpur',
    category: 'Engineering',
    location: 'Kanpur',
    state: 'Uttar Pradesh',
    rating: 4.7,
    established: 1959,
    students: 8000,
    courses: 100,
    description: 'Premier IIT known for its strong engineering programs.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['IIT Kanpur', 'Premier Engineering Institution', 'Kanpur Location'],
    image: '',
    website: 'https://www.iitk.ac.in/',
    phone: '+91 512 259 7000',
    email: 'director@iitk.ac.in',
    status: 'active'
  },
  {
    _id: 'iit-kharagpur',
    name: 'Indian Institute of Technology Kharagpur',
    slug: 'iit-kharagpur',
    category: 'Engineering',
    location: 'Kharagpur',
    state: 'West Bengal',
    rating: 4.7,
    established: 1951,
    students: 8000,
    courses: 100,
    description: 'First IIT established in India, known for its heritage and excellence.',
    facilities: ['Research Labs', 'Library', 'Computer Center', 'Hostel', 'Sports Complex'],
    highlights: ['First IIT', 'Premier Engineering Institution', 'Kharagpur Location'],
    image: '',
    website: 'https://www.iitkgp.ac.in/',
    phone: '+91 3222 255 221',
    email: 'director@iitkgp.ac.in',
    status: 'active'
  },
  // Add more comprehensive colleges here...
  ...completeCollegeList
];

// Export the comprehensive list as the main list
export const allCollegesList = comprehensiveCollegeList;

// Also export the comprehensive list as the default export for maximum coverage
export default allCollegesList;

// Create a function to get colleges by category
export const getCollegesByCategory = (category) => {
  if (category === 'all' || !category) {
    return allCollegesList;
  }
  return allCollegesList.filter(college => 
    college.category && college.category.toLowerCase() === category.toLowerCase()
  );
};

// Create a function to search colleges by name, category, or location
export const searchColleges = (searchTerm, category = 'all', location = 'all') => {
  let filteredColleges = allCollegesList;
  
  // Filter by category first
  if (category && category !== 'all') {
    filteredColleges = filteredColleges.filter(college => 
      college.category && college.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Filter by location if specified
  if (location && location !== 'all') {
    filteredColleges = filteredColleges.filter(college => 
      college.location && college.location.toLowerCase() === location.toLowerCase()
    );
  }
  
  // Search by name, description, or highlights
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredColleges = filteredColleges.filter(college => 
      college.name.toLowerCase().includes(term) ||
      (college.description && college.description.toLowerCase().includes(term)) ||
      (college.highlights && college.highlights.some(h => h.toLowerCase().includes(term)))
    );
  }
  
  return filteredColleges;
};

// Get all available categories
export const getAllCategories = () => {
  const categories = [...new Set(allCollegesList.map(college => college.category))];
  return categories.filter(Boolean).sort();
};

// Get all available locations
export const getAllLocations = () => {
  const locations = [...new Set(allCollegesList.map(college => college.location))];
  return locations.filter(Boolean).sort();
};

// Get all available states
export const getAllStates = () => {
  const states = [...new Set(allCollegesList.map(college => college.state))];
  return states.filter(Boolean).sort();
};
