import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt, FaUsers, FaGraduationCap, FaEye, FaHeart, FaTrophy } from 'react-icons/fa';
import { nirfResearchData, getTop10Institutions, getIITs, getInstitutionsByState } from '../data/nirfResearchData';
import { nirfAgricultureData, getTop10AgricultureInstitutions, getICARInstitutions, getStateAgricultureUniversities } from '../data/nirfAgricultureData';
import { nirfArchitectureData, getTop10ArchitectureInstitutions, getIITArchitectureInstitutions, getNITArchitectureInstitutions } from '../data/nirfArchitectureData';
import { nirfInnovationData, getTop10InnovationInstitutions, getIITInnovationInstitutions, getNITInnovationInstitutions } from '../data/nirfInnovationData';
import { nirfOpenUniversityData, getTop10OpenUniversityInstitutions, getIGNOUInstitutions, getStateOpenUniversities } from '../data/nirfOpenUniversityData';
import { nirfSkillUniversityData, getTop10SkillUniversities, getSkillUniversitiesByState, getSkillUniversitiesByCity } from '../data/nirfSkillUniversityData';
import { nirfStatePublicUniversityData, getTop10StatePublicUniversities, getStatePublicUniversitiesByState, getStatePublicUniversitiesByCity } from '../data/nirfStatePublicUniversityData';

const CollegeList = ({ category, title, locationFilter }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(category || searchParams.get('category') || 'all');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Engineering', 'MBA', 'Medical', 'Design', 'Arts', 'Law', 'Science', 'Commerce', 'Research', 'Architecture', 'Agriculture', 'Innovation', 'OpenUniversity', 'SkillUniversity', 'StatePublicUniversity'];
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune', 'Hyderabad'];

  // Sample data for when no colleges are found
  const sampleColleges = {
    'State Universities': [
      {
        _id: 'state-uni-1',
        name: 'Anna University',
        slug: 'anna-university',
        category: 'University',
        location: 'Chennai',
        rating: 4.2,
        fees: 50000,
        established: 1978,
        students: 45000,
        courses: 250,
        description: 'A premier state university in Tamil Nadu offering engineering and technology programs.',
        facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel'],
        highlights: ['NAAC A++', 'State University', 'Engineering Excellence'],
        image: '',
        website: 'https://www.annauniv.edu/',
        phone: '+91 44 2235 7070',
        email: 'info@annauniv.edu',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'state-uni-2',
        name: 'Visvesvaraya Technological University',
        slug: 'vtu',
        category: 'University',
        location: 'Belgaum',
        rating: 4.0,
        fees: 45000,
        established: 1998,
        students: 35000,
        courses: 200,
        description: 'A state university in Karnataka focusing on technical education.',
        facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel'],
        highlights: ['NAAC A', 'State University', 'Technical Education'],
        image: '',
        website: 'https://vtu.ac.in/',
        phone: '+91 831 249 8500',
        email: 'info@vtu.ac.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'state-uni-3',
        name: 'Gujarat University',
        slug: 'gujarat-university',
        category: 'University',
        location: 'Ahmedabad',
        rating: 4.1,
        fees: 48000,
        established: 1949,
        students: 40000,
        courses: 180,
        description: 'A state university in Gujarat offering diverse academic programs.',
        facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel'],
        highlights: ['NAAC A', 'State University', 'Diverse Programs'],
        image: '',
        website: 'https://www.gujaratuniversity.ac.in/',
        phone: '+91 79 2630 1341',
        email: 'info@gujaratuniversity.ac.in',
        status: 'active',
        source: 'sample'
      }
    ],
    'Government Colleges': [
      {
        _id: 'gov-col-1',
        name: 'Hindu College',
        slug: 'hindu-college',
        category: 'College',
        location: 'Delhi',
        rating: 4.5,
        fees: 15000,
        established: 1899,
        students: 3000,
        courses: 25,
        description: 'A prestigious government college affiliated with Delhi University.',
        facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel'],
        highlights: ['NAAC A++', 'Government College', 'Delhi University'],
        image: '',
        website: 'https://hinducollege.ac.in/',
        phone: '+91 11 2766 7771',
        email: 'principal@hinducollege.ac.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'gov-col-2',
        name: 'Miranda House',
        slug: 'miranda-house',
        category: 'College',
        location: 'Delhi',
        rating: 4.6,
        fees: 12000,
        established: 1948,
        students: 2500,
        courses: 20,
        description: 'A women\'s college affiliated with Delhi University.',
        facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel'],
        highlights: ['NAAC A++', 'Government College', 'Women\'s College'],
        image: '',
        website: 'https://www.mirandahouse.ac.in/',
        phone: '+91 11 2766 7771',
        email: 'principal@mirandahouse.ac.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'gov-col-3',
        name: 'St. Stephen\'s College',
        slug: 'st-stephens-college',
        category: 'College',
        location: 'Delhi',
        rating: 4.7,
        fees: 18000,
        established: 1881,
        students: 1200,
        courses: 15,
        description: 'A prestigious government college with Christian minority status.',
        facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel'],
        highlights: ['NAAC A++', 'Government College', 'Christian Minority'],
        image: '',
        website: 'https://www.ststephens.edu/',
        phone: '+91 11 2766 7771',
        email: 'principal@ststephens.edu',
        status: 'active',
        source: 'sample'
      }
    ],
    'State Colleges': [
      {
        _id: 'state-col-1',
        name: 'Presidency College',
        slug: 'presidency-college',
        category: 'College',
        location: 'Chennai',
        rating: 4.3,
        fees: 8000,
        established: 1840,
        students: 3500,
        courses: 30,
        description: 'A state government college in Tamil Nadu.',
        facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel'],
        highlights: ['NAAC A+', 'State College', 'Heritage Institution'],
        image: '',
        website: 'https://presidencycollege.ac.in/',
        phone: '+91 44 2852 1234',
        email: 'principal@presidencycollege.ac.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'state-col-2',
        name: 'Fergusson College',
        slug: 'fergusson-college',
        category: 'College',
        location: 'Pune',
        rating: 4.2,
        fees: 10000,
        established: 1885,
        students: 4000,
        courses: 35,
        description: 'A state government college in Maharashtra.',
        facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel'],
        highlights: ['NAAC A+', 'State College', 'Heritage Institution'],
        image: '',
        website: 'https://www.fergusson.edu/',
        phone: '+91 20 2565 1234',
        email: 'principal@fergusson.edu',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'state-col-3',
        name: 'Madras Christian College',
        slug: 'madras-christian-college',
        category: 'College',
        location: 'Chennai',
        rating: 4.4,
        fees: 12000,
        established: 1837,
        students: 5000,
        courses: 40,
        description: 'A state government college with Christian minority status.',
        facilities: ['Library', 'Computer Lab', 'Sports Complex', 'Hostel'],
        highlights: ['NAAC A++', 'State College', 'Christian Minority'],
        image: '',
        website: 'https://www.mcc.edu.in/',
        phone: '+91 44 2235 1234',
        email: 'principal@mcc.edu.in',
        status: 'active',
        source: 'sample'
      }
    ],
    'Architecture and Planning': [
      {
        _id: 'arch-1',
        name: 'School of Planning and Architecture Delhi',
        slug: 'spa-delhi',
        category: 'Architecture',
        location: 'Delhi',
        rating: 4.5,
        fees: 120000,
        established: 1941,
        students: 800,
        courses: 15,
        description: 'Premier architecture and planning institution in Delhi.',
        facilities: ['Design Studios', 'Model Making Lab', 'Computer Lab', 'Library', 'Hostel'],
        highlights: ['NAAC A++', 'Premier Architecture School', 'Government Institution'],
        image: '',
        website: 'https://spa.ac.in/',
        phone: '+91 11 2370 2375',
        email: 'director@spa.ac.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'arch-2',
        name: 'CEPT University',
        slug: 'cept-university',
        category: 'Architecture',
        location: 'Ahmedabad',
        rating: 4.4,
        fees: 150000,
        established: 1962,
        students: 1200,
        courses: 20,
        description: 'Leading architecture and planning university in Gujarat.',
        facilities: ['Design Studios', 'Model Making Lab', 'Computer Lab', 'Library', 'Hostel'],
        highlights: ['NAAC A++', 'Private University', 'Architecture Excellence'],
        image: '',
        website: 'https://cept.ac.in/',
        phone: '+91 79 2630 2470',
        email: 'info@cept.ac.in',
        status: 'active',
        source: 'sample'
      }
    ],
    'Agriculture': [
      {
        _id: 'agri-1',
        name: 'Indian Agricultural Research Institute',
        slug: 'iari-delhi',
        category: 'Agriculture',
        location: 'Delhi',
        rating: 4.3,
        fees: 25000,
        established: 1905,
        students: 2000,
        courses: 25,
        description: 'Premier agricultural research and education institution.',
        facilities: ['Research Farms', 'Laboratories', 'Library', 'Hostel', 'Sports Complex'],
        highlights: ['ICAR Institution', 'Agricultural Research', 'Government Institution'],
        image: '',
        website: 'https://www.iari.res.in/',
        phone: '+91 11 2584 7777',
        email: 'director@iari.res.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'agri-2',
        name: 'Punjab Agricultural University',
        slug: 'pau-ludhiana',
        category: 'Agriculture',
        location: 'Ludhiana',
        rating: 4.2,
        fees: 30000,
        established: 1962,
        students: 15000,
        courses: 50,
        description: 'Leading agricultural university in Punjab.',
        facilities: ['Research Farms', 'Laboratories', 'Library', 'Hostel', 'Sports Complex'],
        highlights: ['State University', 'Agricultural Excellence', 'Research Focus'],
        image: '',
        website: 'https://www.pau.edu/',
        phone: '+91 161 240 1960',
        email: 'vc@pau.edu',
        status: 'active',
        source: 'sample'
      }
    ],
    'Innovation': [
      {
        _id: 'innovation-1',
        name: 'Indian Institute of Technology Bombay',
        slug: 'iit-bombay-innovation',
        category: 'Innovation',
        location: 'Mumbai',
        rating: 4.6,
        fees: 200000,
        established: 1958,
        students: 8000,
        courses: 100,
        description: 'Premier innovation and technology institution.',
        facilities: ['Innovation Labs', 'Startup Incubator', 'Research Centers', 'Library', 'Hostel'],
        highlights: ['IIT Bombay', 'Innovation Hub', 'Technology Excellence'],
        image: '',
        website: 'https://www.iitb.ac.in/',
        phone: '+91 22 2572 2545',
        email: 'director@iitb.ac.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'innovation-2',
        name: 'National Institute of Design',
        slug: 'nid-ahmedabad',
        category: 'Innovation',
        location: 'Ahmedabad',
        rating: 4.4,
        fees: 180000,
        established: 1961,
        students: 500,
        courses: 15,
        description: 'Premier design and innovation institution.',
        facilities: ['Design Studios', 'Innovation Labs', 'Computer Lab', 'Library', 'Hostel'],
        highlights: ['NID', 'Design Innovation', 'Creative Excellence'],
        image: '',
        website: 'https://www.nid.edu/',
        phone: '+91 79 2662 3462',
        email: 'director@nid.edu',
        status: 'active',
        source: 'sample'
      }
    ],
    'Open University': [
      {
        _id: 'open-1',
        name: 'Indira Gandhi National Open University',
        slug: 'ignou-delhi',
        category: 'OpenUniversity',
        location: 'Delhi',
        rating: 4.0,
        fees: 15000,
        established: 1985,
        students: 4000000,
        courses: 200,
        description: 'World\'s largest open university with distance learning programs.',
        facilities: ['Study Centers', 'Digital Library', 'Online Learning', 'Regional Centers'],
        highlights: ['IGNOU', 'Distance Learning', 'Open University'],
        image: '',
        website: 'https://ignou.ac.in/',
        phone: '+91 11 2957 1000',
        email: 'vc@ignou.ac.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'open-2',
        name: 'Dr. B.R. Ambedkar Open University',
        slug: 'braou-hyderabad',
        category: 'OpenUniversity',
        location: 'Hyderabad',
        rating: 3.8,
        fees: 12000,
        established: 1982,
        students: 500000,
        courses: 150,
        description: 'State open university in Telangana.',
        facilities: ['Study Centers', 'Digital Library', 'Online Learning', 'Regional Centers'],
        highlights: ['BRAOU', 'State Open University', 'Distance Learning'],
        image: '',
        website: 'https://www.braou.ac.in/',
        phone: '+91 40 2354 4800',
        email: 'vc@braou.ac.in',
        status: 'active',
        source: 'sample'
      }
    ],
    'Skill University': [
      {
        _id: 'skill-1',
        name: 'Delhi Skill and Entrepreneurship University',
        slug: 'dseu-delhi',
        category: 'SkillUniversity',
        location: 'Delhi',
        rating: 4.1,
        fees: 80000,
        established: 2020,
        students: 5000,
        courses: 50,
        description: 'First skill university in India focusing on skill development.',
        facilities: ['Skill Labs', 'Industry Partnerships', 'Training Centers', 'Library'],
        highlights: ['DSEU', 'Skill Development', 'Industry Focus'],
        image: '',
        website: 'https://dseu.ac.in/',
        phone: '+91 11 2347 8000',
        email: 'vc@dseu.ac.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'skill-2',
        name: 'Uttar Pradesh Skill University',
        slug: 'upsu-lucknow',
        category: 'SkillUniversity',
        location: 'Lucknow',
        rating: 3.9,
        fees: 60000,
        established: 2021,
        students: 3000,
        courses: 30,
        description: 'State skill university in Uttar Pradesh.',
        facilities: ['Skill Labs', 'Industry Partnerships', 'Training Centers', 'Library'],
        highlights: ['UPSU', 'State Skill University', 'Industry Focus'],
        image: '',
        website: 'https://www.upskilluniversity.ac.in/',
        phone: '+91 522 234 5000',
        email: 'vc@upskilluniversity.ac.in',
        status: 'active',
        source: 'sample'
      }
    ],
    'State Public University': [
      {
        _id: 'state-1',
        name: 'University of Delhi',
        slug: 'du-delhi',
        category: 'StatePublicUniversity',
        location: 'Delhi',
        rating: 4.3,
        fees: 15000,
        established: 1922,
        students: 50000,
        courses: 300,
        description: 'Premier state public university in Delhi.',
        facilities: ['Colleges', 'Research Centers', 'Library', 'Hostel', 'Sports Complex'],
        highlights: ['DU', 'Central University', 'Public Institution'],
        image: '',
        website: 'https://www.du.ac.in/',
        phone: '+91 11 2766 7771',
        email: 'info@du.ac.in',
        status: 'active',
        source: 'sample'
      },
      {
        _id: 'state-2',
        name: 'Banaras Hindu University',
        slug: 'bhu-varanasi',
        category: 'StatePublicUniversity',
        location: 'Varanasi',
        rating: 4.2,
        fees: 12000,
        established: 1916,
        students: 30000,
        courses: 200,
        description: 'Premier state public university in Uttar Pradesh.',
        facilities: ['Colleges', 'Research Centers', 'Library', 'Hostel', 'Sports Complex'],
        highlights: ['BHU', 'Central University', 'Public Institution'],
        image: '',
        website: 'https://www.bhu.ac.in/',
        phone: '+91 542 236 8558',
        email: 'info@bhu.ac.in',
        status: 'active',
        source: 'sample'
      }
    ]
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    // Handle URL query parameters
    const urlCategory = searchParams.get('category');
    const urlFilter = searchParams.get('filter');
    
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
    
    if (urlFilter) {
      // Handle specific filters
      if (urlFilter === 'aiims') {
        setSearchQuery('AIIMS');
      } else if (urlFilter === 'iim') {
        setSearchQuery('Indian Institute of Management');
      } else if (urlFilter === 'nls') {
        setSearchQuery('National Law');
      } else if (urlFilter === 'dental') {
        setSelectedCategory('Dental');
      } else if (urlFilter === 'private') {
        setSearchQuery('private');
      } else if (urlFilter === 'executive') {
        setSearchQuery('executive');
      } else if (urlFilter === 'central') {
        setSearchQuery('central university');
      } else if (urlFilter === 'state') {
        setSearchQuery('state university');
      } else if (urlFilter === 'government') {
        setSearchQuery('government');
      } else if (urlFilter === 'state-college') {
        setSearchQuery('state college');
      } else if (urlFilter === 'autonomous') {
        setSearchQuery('autonomous college');
      } else if (urlFilter === 'iit-nit') {
        setSearchQuery('indian institute of technology');
      } else if (urlFilter === 'csir') {
        setSearchQuery('csir');
      } else if (urlFilter === 'drdo') {
        setSearchQuery('drdo');
      } else if (urlFilter === 'top10') {
        setSearchQuery('top 10');
      } else if (urlFilter === 'iits') {
        setSearchQuery('indian institute of technology');
      }
    }
  }, [searchParams]);

  useEffect(() => {
    filterColleges();
  }, [searchQuery, selectedCategory, selectedLocation, colleges]);

  // Handle URL parameter changes
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category');
    const urlLocation = searchParams.get('location');
    
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
    if (urlCategory !== null) {
      setSelectedCategory(urlCategory);
    }
    if (urlLocation !== null) {
      setSelectedLocation(urlLocation);
    }
  }, [searchParams]);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      // Request all colleges by setting a high limit
      const response = await fetch('http://localhost:5000/api/colleges?limit=1000');
      const data = await response.json();
      
      if (data.success) {
        setColleges(data.data);
        setFilteredColleges(data.data);
      } else {
        setError('Failed to fetch colleges');
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
      setError('Failed to fetch colleges');
    } finally {
      setLoading(false);
    }
  };

  const filterColleges = () => {
    let filtered = colleges;

    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      
      // Enhanced search functionality that includes all data sources
      filtered = filtered.filter(college => {
        const collegeName = college.name.toLowerCase();
        const collegeLocation = college.location.toLowerCase();
        const collegeCategory = college.category.toLowerCase();
        const collegeState = (college.state || '').toLowerCase();
        const collegeCity = (college.city || '').toLowerCase();
        
        // Handle specific search terms
        if (searchTerm === 'indian institute of management' || searchTerm === 'iim') {
          return collegeName.includes('indian institute of management') || 
                 collegeName.includes('iim');
        } else if (searchTerm === 'aiims') {
          return collegeName.includes('aiims') || 
                 collegeName.includes('all india institute');
        } else if (searchTerm === 'national law') {
          return collegeName.includes('national law') || 
                 collegeName.includes('law school');
        } else if (searchTerm === 'anna university') {
          return collegeName.includes('anna university');
        } else if (searchTerm === 'jadavpur') {
          return collegeName.includes('jadavpur');
        } else if (searchTerm === 'symbiosis') {
          return collegeName.includes('symbiosis');
        } else if (searchTerm === 'vishwakarma') {
          return collegeName.includes('vishwakarma');
        } else if (searchTerm === 'ignou') {
          return collegeName.includes('ignou');
        } else if (searchTerm === 'braou') {
          return collegeName.includes('braou');
        } else if (searchTerm === 'private') {
          // For private filter, we'll handle it in the category-specific logic
          return true; // Let the category logic handle it
        } else if (searchTerm === 'executive') {
          // For executive filter, we'll handle it in the category-specific logic
          return true; // Let the category logic handle it
        } else {
          // Comprehensive search across all fields
          return collegeName.includes(searchTerm) ||
                 collegeLocation.includes(searchTerm) ||
                 collegeCategory.includes(searchTerm) ||
                 collegeState.includes(searchTerm) ||
                 collegeCity.includes(searchTerm) ||
                 (college.description && college.description.toLowerCase().includes(searchTerm)) ||
                 (college.specializations && college.specializations.some(spec => 
                   spec.toLowerCase().includes(searchTerm)
                 ));
        }
      });
      
      // If no results found in main colleges, search in NIRF data
      if (filtered.length === 0) {
        const nirfData = [
          ...nirfResearchData,
          ...nirfAgricultureData,
          ...nirfArchitectureData,
          ...nirfInnovationData,
          ...nirfOpenUniversityData,
          ...nirfSkillUniversityData,
          ...nirfStatePublicUniversityData
        ];
        
        const nirfResults = nirfData.filter(college => {
          const collegeName = college.name.toLowerCase();
          const collegeLocation = college.location.toLowerCase();
          const collegeCategory = college.category.toLowerCase();
          const collegeState = (college.state || '').toLowerCase();
          const collegeCity = (college.city || '').toLowerCase();
          
          return collegeName.includes(searchTerm) ||
                 collegeLocation.includes(searchTerm) ||
                 collegeCategory.includes(searchTerm) ||
                 collegeState.includes(searchTerm) ||
                 collegeCity.includes(searchTerm) ||
                 (college.description && college.description.toLowerCase().includes(searchTerm)) ||
                 (college.specializations && college.specializations.some(spec => 
                   spec.toLowerCase().includes(searchTerm)
                 ));
        });
        
        if (nirfResults.length > 0) {
          filtered = nirfResults;
        }
      }
    }

    // Handle specific category filtering
    if (selectedCategory === 'IIT') {
      filtered = filtered.filter(college => 
        college.name.toLowerCase().includes('indian institute of technology') ||
        college.name.toLowerCase().includes('iit')
      );
    } else if (selectedCategory === 'NIT') {
      filtered = filtered.filter(college => 
        college.name.toLowerCase().includes('national institute of technology') ||
        college.name.toLowerCase().includes('nit')
      );
    } else if (selectedCategory === 'Private') {
      filtered = filtered.filter(college => 
        !college.name.toLowerCase().includes('indian institute of technology') &&
        !college.name.toLowerCase().includes('national institute of technology') &&
        !college.name.toLowerCase().includes('iit') &&
        !college.name.toLowerCase().includes('nit')
      );
    } else if (selectedCategory === 'engineering-by-location') {
      // Redirect to the engineering by location page
      navigate('/colleges/engineering-by-location');
      return;
    } else if (selectedCategory === 'Dental') {
      filtered = filtered.filter(college => college.category === 'Dental');
    } else if (selectedCategory === 'Pharmacy') {
      filtered = filtered.filter(college => college.category === 'Pharmacy');
    } else if (selectedCategory === 'Law') {
      filtered = filtered.filter(college => college.category === 'Law');
    } else if (selectedCategory === 'MBA') {
      // Handle MBA category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'private') {
        // Filter for private MBA colleges (exclude IIMs and government institutions)
        filtered = filtered.filter(college => 
          college.category === 'MBA' && 
          !college.name.toLowerCase().includes('indian institute of management') &&
          !college.name.toLowerCase().includes('iim') &&
          !college.name.toLowerCase().includes('government')
        );
      } else if (searchQuery && searchQuery.toLowerCase() === 'executive') {
        // Filter for executive MBA programs
        filtered = filtered.filter(college => 
          college.category === 'MBA' && 
          (college.name.toLowerCase().includes('executive') ||
           college.name.toLowerCase().includes('part time'))
        );
      } else {
        // Show all MBA colleges
        filtered = filtered.filter(college => college.category === 'MBA');
      }
    } else if (selectedCategory === 'University') {
      // Handle University category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'central university') {
        // Filter for Central Universities (government-funded, established by central government)
        filtered = filtered.filter(college => 
          college.category === 'University' && 
          (college.name.toLowerCase().includes('central university') ||
           college.name.toLowerCase().includes('jawaharlal nehru university') ||
           college.name.toLowerCase().includes('banaras hindu university') ||
           college.name.toLowerCase().includes('university of delhi') ||
           college.name.toLowerCase().includes('aligarh muslim university') ||
           college.name.toLowerCase().includes('jamia millia islamia') ||
           college.name.toLowerCase().includes('university of hyderabad') ||
           college.name.toLowerCase().includes('panjab university') ||
           college.name.toLowerCase().includes('university of calcutta') ||
           college.name.toLowerCase().includes('university of mumbai') ||
           college.name.toLowerCase().includes('university of madras') ||
           college.name.toLowerCase().includes('osmania university') ||
           college.name.toLowerCase().includes('guru nanak dev university') ||
           college.name.toLowerCase().includes('karnataka university') ||
           college.name.toLowerCase().includes('mahatma gandhi university') ||
           college.name.toLowerCase().includes('university of mysore') ||
           college.name.toLowerCase().includes('kerala university') ||
           college.name.toLowerCase().includes('andhra university') ||
           college.name.toLowerCase().includes('university of pune'))
        );
      } else if (searchQuery && searchQuery.toLowerCase() === 'state university') {
        // Filter for State Universities (established by state governments)
        filtered = filtered.filter(college => 
          college.category === 'University' && 
          (college.name.toLowerCase().includes('state university') ||
           college.name.toLowerCase().includes('anna university') ||
           college.name.toLowerCase().includes('visvesvaraya technological university') ||
           college.name.toLowerCase().includes('gujarat university') ||
           college.name.toLowerCase().includes('mizoram university') ||
           college.name.toLowerCase().includes('bangalore university') ||
           college.name.toLowerCase().includes('birla institute of technology') ||
           college.name.toLowerCase().includes('central university of punjab') ||
           college.name.toLowerCase().includes('tamil nadu agricultural university') ||
           college.name.toLowerCase().includes('sant longowal institute of engineering and technology') ||
           college.name.toLowerCase().includes('sri venkateswara university') ||
           college.name.toLowerCase().includes('g.b. pant university of agriculture and technology') ||
           college.name.toLowerCase().includes('calicut university') ||
           college.name.toLowerCase().includes('university of agricultural sciences') ||
           college.name.toLowerCase().includes('manonmaniam sundaranar university') ||
           college.name.toLowerCase().includes('madan mohan malaviya university of technology') ||
           college.name.toLowerCase().includes('university of lucknow') ||
           college.name.toLowerCase().includes('avinashilingam institute for home science') ||
           college.name.toLowerCase().includes('central university of tamil nadu'))
        );
      } else if (searchQuery && searchQuery.toLowerCase() === 'private') {
        // Filter for Private Universities (privately owned and managed)
        filtered = filtered.filter(college => 
          college.category === 'University' && 
          (college.name.toLowerCase().includes('manipal academy of higher education') ||
           college.name.toLowerCase().includes('amrita vishwa vidyapeetham') ||
           college.name.toLowerCase().includes('vellore institute of technology') ||
           college.name.toLowerCase().includes('saveetha institute of medical and technical sciences') ||
           college.name.toLowerCase().includes('s.r.m. institute of science and technology') ||
           college.name.toLowerCase().includes('siksha o anusandhan') ||
           college.name.toLowerCase().includes('kalinga institute of industrial technology') ||
           college.name.toLowerCase().includes('thapar institute of engineering and technology') ||
           college.name.toLowerCase().includes('birla institute of technology and science') ||
           college.name.toLowerCase().includes('amity university') ||
           college.name.toLowerCase().includes('shanmugha arts science technology and research academy') ||
           college.name.toLowerCase().includes('kalasalingam academy of research and education') ||
           college.name.toLowerCase().includes('sathyabama institute of science and technology') ||
           college.name.toLowerCase().includes('vit university') ||
           college.name.toLowerCase().includes('lovely professional university') ||
           college.name.toLowerCase().includes('srm university') ||
           college.name.toLowerCase().includes('manipal university') ||
           college.name.toLowerCase().includes('symbiosis international university') ||
           college.name.toLowerCase().includes('bharathiar university') ||
           college.name.toLowerCase().includes('pondicherry university') ||
           college.name.toLowerCase().includes('banasthali vidyapith') ||
           college.name.toLowerCase().includes('sri balaji vidyapeeth') ||
           college.name.toLowerCase().includes('tezpur university') ||
           college.name.toLowerCase().includes('shoolini university of biotechnology') ||
           college.name.toLowerCase().includes('maharishi markandeshwar') ||
           college.name.toLowerCase().includes('vignan\'s foundation for science') ||
           college.name.toLowerCase().includes('bharath institute of higher education') ||
           college.name.toLowerCase().includes('international institute of information technology') ||
           college.name.toLowerCase().includes('bharati vidyapeeth') ||
           college.name.toLowerCase().includes('chettinad academy of research and education') ||
           college.name.toLowerCase().includes('guru gobind singh indraprastha university') ||
           college.name.toLowerCase().includes('birla institute of technology') ||
           college.name.toLowerCase().includes('sant longowal institute of engineering and technology') ||
           college.name.toLowerCase().includes('sharda university') ||
           college.name.toLowerCase().includes('sri venkateswara university') ||
           college.name.toLowerCase().includes('g.b. pant university of agriculture and technology') ||
           college.name.toLowerCase().includes('calicut university') ||
           college.name.toLowerCase().includes('university of agricultural sciences') ||
           college.name.toLowerCase().includes('chitkara university') ||
           college.name.toLowerCase().includes('manav rachna international institute') ||
           college.name.toLowerCase().includes('manonmaniam sundaranar university') ||
           college.name.toLowerCase().includes('madan mohan malaviya university of technology') ||
           college.name.toLowerCase().includes('yenepoya university') ||
           college.name.toLowerCase().includes('vel tech rangarajan dr. sagunthala') ||
           college.name.toLowerCase().includes('university of lucknow') ||
           college.name.toLowerCase().includes('avinashilingam institute for home science') ||
           college.name.toLowerCase().includes('central university of tamil nadu'))
        );
      } else {
        // Show all universities
        filtered = filtered.filter(college => college.category === 'University');
      }
    } else if (selectedCategory === 'College') {
      // Handle College category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'government') {
        // Filter for Government Colleges (government-funded colleges)
        // Only include the first 20 unique government colleges to avoid duplicates
        const governmentCollegeNames = [
          'Hindu College',
          'Miranda House', 
          'St. Stephens College',
          'Rama Krishna Mission Vivekananda Centenary College',
          'Atma Ram Sanatan Dharm College',
          'St. Xavier\'s College',
          'PSGR Krishnammal College for Women',
          'Loyola College',
          'Kirori Mal College',
          'Lady Shri Ram College for Women',
          'PSG College of Arts and Science',
          'Hans Raj College',
          'Presidency College',
          'Sri Ram College of Commerce',
          'Madras Christian College',
          'St. Joseph\'s College',
          'Fergusson College',
          'Christ University',
          'St. Stephen\'s College',
          'Ramakrishna Mission Vidyamandira'
        ];
        
        // Get unique government colleges (avoid duplicates)
        const seenNames = new Set();
        filtered = filtered.filter(college => {
          if (college.category === 'College' && governmentCollegeNames.includes(college.name)) {
            if (!seenNames.has(college.name)) {
              seenNames.add(college.name);
              return true;
            }
          }
          return false;
        });
      } else if (searchQuery && searchQuery.toLowerCase() === 'autonomous college') {
        filtered = filtered.filter(college => 
          college.category === 'College' && 
          college.name.toLowerCase().includes('autonomous')
        );
      } else if (searchQuery && searchQuery.toLowerCase() === 'private') {
        // Filter for Private Colleges (privately owned colleges)
        const governmentCollegeNames = [
          'Hindu College',
          'Miranda House', 
          'St. Stephens College',
          'Rama Krishna Mission Vivekananda Centenary College',
          'Atma Ram Sanatan Dharm College',
          'St. Xavier\'s College',
          'PSGR Krishnammal College for Women',
          'Loyola College',
          'Kirori Mal College',
          'Lady Shri Ram College for Women',
          'PSG College of Arts and Science',
          'Hans Raj College',
          'Presidency College',
          'Sri Ram College of Commerce',
          'Madras Christian College',
          'St. Joseph\'s College',
          'Fergusson College',
          'Christ University',
          'St. Stephen\'s College',
          'Ramakrishna Mission Vidyamandira'
        ];
        
        // Get unique private colleges (avoid duplicates)
        const seenNames = new Set();
        filtered = filtered.filter(college => {
          if (college.category === 'College' && !governmentCollegeNames.includes(college.name)) {
            if (!seenNames.has(college.name)) {
              seenNames.add(college.name);
              return true;
            }
          }
          return false;
        });
      } else {
        // Show all colleges
        filtered = filtered.filter(college => college.category === 'College');
      }
    } else if (selectedCategory === 'Research') {
      // Handle Research category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'indian institute of technology') {
        // Use NIRF data for IITs
        filtered = getIITs();
      } else if (searchQuery && searchQuery.toLowerCase() === 'top 10') {
        // Use NIRF data for top 10
        filtered = getTop10Institutions();
      } else if (searchQuery && searchQuery.toLowerCase() === 'csir') {
        filtered = filtered.filter(college => 
          college.category === 'Research' && 
          college.name.toLowerCase().includes('csir')
        );
      } else if (searchQuery && searchQuery.toLowerCase() === 'drdo') {
        filtered = filtered.filter(college => 
          college.category === 'Research' && 
          college.name.toLowerCase().includes('drdo')
        );
      } else {
        // Show all NIRF research institutions
        filtered = nirfResearchData;
      }
    } else if (selectedCategory === 'Architecture') {
      // Handle Architecture category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'architecture') {
        // Use NIRF data for Architecture
        filtered = nirfArchitectureData;
      } else if (searchQuery && searchQuery.toLowerCase() === 'top 10 architecture') {
        // Use NIRF data for top 10 Architecture
        filtered = getTop10ArchitectureInstitutions();
      } else if (searchQuery && searchQuery.toLowerCase() === 'iit architecture') {
        // Use NIRF data for IIT Architecture
        filtered = getIITArchitectureInstitutions();
      } else if (searchQuery && searchQuery.toLowerCase() === 'nit architecture') {
        // Use NIRF data for NIT Architecture
        filtered = getNITArchitectureInstitutions();
      } else {
        // Show all Architecture institutions
        filtered = nirfArchitectureData;
      }
    } else if (selectedCategory === 'Agriculture') {
      // Handle Agriculture category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'agriculture') {
        // Use NIRF data for Agriculture
        filtered = nirfAgricultureData;
      } else if (searchQuery && searchQuery.toLowerCase() === 'top 10 agriculture') {
        // Use NIRF data for top 10 Agriculture
        filtered = getTop10AgricultureInstitutions();
      } else if (searchQuery && searchQuery.toLowerCase() === 'icar') {
        // Use NIRF data for ICAR
        filtered = getICARInstitutions();
      } else if (searchQuery && searchQuery.toLowerCase() === 'state agriculture') {
        // Use NIRF data for State Agriculture Universities
        filtered = getStateAgricultureUniversities();
      } else {
        // Show all Agriculture institutions
        filtered = nirfAgricultureData;
      }
    } else if (selectedCategory === 'Innovation') {
      // Handle Innovation category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'innovation') {
        // Use NIRF data for Innovation
        filtered = nirfInnovationData;
      } else if (searchQuery && searchQuery.toLowerCase() === 'top 10 innovation') {
        // Use NIRF data for top 10 Innovation
        filtered = getTop10InnovationInstitutions();
      } else if (searchQuery && searchQuery.toLowerCase() === 'nid') {
        // Use NIRF data for NID
        filtered = getIITInnovationInstitutions();
      } else if (searchQuery && searchQuery.toLowerCase() === 'iit innovation') {
        // Use NIRF data for IIT Innovation
        filtered = getIITInnovationInstitutions();
      } else {
        // Show all Innovation institutions
        filtered = nirfInnovationData;
      }
    } else if (selectedCategory === 'OpenUniversity') {
      // Handle OpenUniversity category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'open university') {
        // Use NIRF data for Open Universities
        filtered = nirfOpenUniversityData;
      } else if (searchQuery && searchQuery.toLowerCase() === 'top 10 open university') {
        // Use NIRF data for top 10 Open Universities
        filtered = nirfOpenUniversityData.slice(0, 10);
      } else if (searchQuery && searchQuery.toLowerCase() === 'ignou') {
        // Use NIRF data for IGNOU
        filtered = nirfOpenUniversityData.filter(college => college.name.toLowerCase().includes('ignou'));
      } else if (searchQuery && searchQuery.toLowerCase() === 'braou') {
        // Use NIRF data for BRAOU
        filtered = nirfOpenUniversityData.filter(college => college.name.toLowerCase().includes('braou'));
      } else {
        // Show all Open University institutions
        filtered = nirfOpenUniversityData;
      }
    } else if (selectedCategory === 'SkillUniversity') {
      // Handle SkillUniversity category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'skill university') {
        // Use NIRF data for Skill Universities
        filtered = nirfSkillUniversityData;
      } else if (searchQuery && searchQuery.toLowerCase() === 'top 10 skill university') {
        // Use NIRF data for top 10 Skill Universities
        filtered = getTop10SkillUniversities();
      } else if (searchQuery && searchQuery.toLowerCase() === 'symbiosis') {
        // Use NIRF data for Symbiosis
        filtered = nirfSkillUniversityData.filter(college => college.name.toLowerCase().includes('symbiosis'));
      } else if (searchQuery && searchQuery.toLowerCase() === 'vishwakarma') {
        // Use NIRF data for Vishwakarma
        filtered = nirfSkillUniversityData.filter(college => college.name.toLowerCase().includes('vishwakarma'));
      } else {
        // Show all Skill University institutions
        filtered = nirfSkillUniversityData;
      }
    } else if (selectedCategory === 'StatePublicUniversity') {
      // Handle StatePublicUniversity category with specific filters
      if (searchQuery && searchQuery.toLowerCase() === 'state public university') {
        // Use NIRF data for State Public Universities
        filtered = nirfStatePublicUniversityData;
      } else if (searchQuery && searchQuery.toLowerCase() === 'top 10 state public university') {
        // Use NIRF data for top 10 State Public Universities
        filtered = getTop10StatePublicUniversities();
      } else if (searchQuery && searchQuery.toLowerCase() === 'anna university') {
        // Use NIRF data for Anna University
        filtered = nirfStatePublicUniversityData.filter(college => college.name.toLowerCase().includes('anna university'));
      } else if (searchQuery && searchQuery.toLowerCase() === 'jadavpur') {
        // Use NIRF data for Jadavpur University
        filtered = nirfStatePublicUniversityData.filter(college => college.name.toLowerCase().includes('jadavpur'));
      } else {
        // Show all State Public University institutions
        filtered = nirfStatePublicUniversityData;
      }
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(college => college.category === selectedCategory);
    }

    // If browsing all colleges (no specific category), include NIRF data
    if (selectedCategory === 'all' && !searchQuery) {
      const allNirfData = [
        ...nirfResearchData,
        ...nirfAgricultureData,
        ...nirfArchitectureData,
        ...nirfInnovationData,
        ...nirfOpenUniversityData,
        ...nirfSkillUniversityData,
        ...nirfStatePublicUniversityData
      ];
      
      // Combine main colleges with NIRF data, avoiding duplicates
      const allColleges = [...filtered];
      const existingNames = new Set(filtered.map(college => college.name.toLowerCase()));
      
      allNirfData.forEach(nirfCollege => {
        if (!existingNames.has(nirfCollege.name.toLowerCase())) {
          allColleges.push(nirfCollege);
          existingNames.add(nirfCollege.name.toLowerCase());
        }
      });
      
      filtered = allColleges;
    }

    if (selectedLocation !== 'all' && selectedCategory !== 'engineering-by-location') {
      filtered = filtered.filter(college => college.location === selectedLocation);
    }

    // If no colleges found and we have specific filters, use sample data
    if (filtered.length === 0) {
      if (searchQuery && searchQuery.toLowerCase() === 'state university') {
        filtered = sampleColleges['State Universities'];
      } else if (searchQuery && searchQuery.toLowerCase() === 'government') {
        filtered = sampleColleges['Government Colleges'];
      } else if (searchQuery && searchQuery.toLowerCase() === 'state college') {
        filtered = sampleColleges['State Colleges'];
      } else if (selectedCategory === 'Architecture') {
        filtered = sampleColleges['Architecture and Planning'];
      } else if (selectedCategory === 'Agriculture') {
        filtered = sampleColleges['Agriculture'];
      } else if (selectedCategory === 'Innovation') {
        filtered = sampleColleges['Innovation'];
      } else if (selectedCategory === 'OpenUniversity') {
        filtered = sampleColleges['Open University'];
      } else if (selectedCategory === 'SkillUniversity') {
        filtered = nirfSkillUniversityData;
      } else if (selectedCategory === 'StatePublicUniversity') {
        filtered = nirfStatePublicUniversityData;
      } else if (selectedCategory === 'Agriculture') {
        filtered = nirfAgricultureData;
      } else if (selectedCategory === 'Architecture') {
        filtered = nirfArchitectureData;
      } else if (selectedCategory === 'Innovation') {
        filtered = nirfInnovationData;
      } else if (selectedCategory === 'OpenUniversity') {
        filtered = nirfOpenUniversityData;
      }
    }

    setFilteredColleges(filtered);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 font-medium">({rating})</span>
      </div>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'MBA': 'bg-green-100 text-green-800',
      'Medical': 'bg-red-100 text-red-800',
      'Dental': 'bg-purple-100 text-purple-800',
      'Pharmacy': 'bg-teal-100 text-teal-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Law': 'bg-indigo-100 text-indigo-800',
      'Science': 'bg-cyan-100 text-cyan-800',
      'Commerce': 'bg-orange-100 text-orange-800',
      'University': 'bg-purple-100 text-purple-800',
      'College': 'bg-orange-100 text-orange-800',
      'Research': 'bg-indigo-100 text-indigo-800',
      'Architecture': 'bg-emerald-100 text-emerald-800',
      'Agriculture': 'bg-lime-100 text-lime-800',
      'Innovation': 'bg-violet-100 text-violet-800',
      'OpenUniversity': 'bg-amber-100 text-amber-800',
      'SkillUniversity': 'bg-rose-100 text-rose-800',
      'StatePublicUniversity': 'bg-sky-100 text-sky-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading colleges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchColleges}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {title || 'Discover Your Perfect College'}
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              {category === 'IIT' ? 'Explore the prestigious Indian Institutes of Technology' :
               category === 'NIT' ? 'Discover National Institutes of Technology across India' :
               category === 'Private' ? 'Find top private engineering colleges' :
               selectedCategory === 'engineering-by-location' ? 'Find engineering colleges by location across India' :
               selectedCategory === 'Research' ? 'Discover top research institutions from NIRF Rankings 2024' :
               selectedCategory === 'Architecture' ? 'Discover top architecture and planning institutions from NIRF Architecture Rankings 2024' :
               selectedCategory === 'Innovation' ? 'Discover top innovation institutions from NIRF Innovation Rankings 2024' :
               selectedCategory === 'OpenUniversity' ? 'Discover top open universities from NIRF Open University Rankings 2024' :
               selectedCategory === 'SkillUniversity' ? 'Discover skill universities focused on industry training' :
               selectedCategory === 'StatePublicUniversity' ? 'Explore state public universities across India' :
               selectedCategory === 'Agriculture' ? 'Discover top agricultural institutions from NIRF Agriculture Rankings 2024' :
               selectedCategory === 'all' ? 'Explore all colleges and universities including NIRF ranked institutions' :
               'Discover the best colleges, courses, and career opportunities'}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search colleges, locations, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-800 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-teal-300 focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaFilter className="text-lg" />
                <span className="font-medium">Filters</span>
              </button>
              <span className="text-gray-600">
                {filteredColleges.length} colleges found
              </span>
            </div>
            
            {showFilters && (
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-300 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-300 focus:outline-none"
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Colleges Grid */}
        {filteredColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredColleges.map((college) => (
              <div key={college._id} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  {/* College Image */}
                  <div className="relative h-48 bg-gradient-to-br from-teal-400 to-blue-500 overflow-hidden">
                    {college.image ? (
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaGraduationCap className="text-white text-6xl opacity-80" />
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(college.category)}`}>
                        {college.category}
                      </span>
                      {college.nirfRank && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center gap-1">
                          <FaTrophy className="text-xs" />
                          NIRF #{college.nirfRank}
                        </span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                        <FaHeart className="text-red-500 text-lg" />
                      </button>
                      <Link to={`/college/${college.slug}`} className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                        <FaEye className="text-blue-600 text-lg" />
                      </Link>
                    </div>
                  </div>

                  {/* College Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-teal-600 transition-colors">
                      {college.name}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <FaMapMarkerAlt className="text-red-500 mr-2" />
                      <span className="text-sm">{college.location}</span>
                    </div>
                    
                    <div className="mb-4">
                      {college.rating && renderStars(college.rating)}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <FaUsers className="mr-1" />
                        <span>{college.students ? `${college.students}+ students` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center">
                        <FaGraduationCap className="mr-1" />
                        <span>{college.courses ? `${college.courses}+ courses` : 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-teal-600">
                        ₹{college.fees ? college.fees.toLocaleString() : 'N/A'}
                      </span>
                      <Link
                        to={`/college/${college.slug}`}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No colleges found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? `No colleges found matching "${searchQuery}". Try adjusting your search terms or filters.` : 'No colleges match your current filters.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                }}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Clear Filters
              </button>
              <Link
                to="/colleges"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Browse All Colleges
              </Link>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredColleges.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No colleges found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLocation('all');
              }}
              className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeList; 