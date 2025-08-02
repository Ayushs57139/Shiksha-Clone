import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt, FaUsers, FaGraduationCap, FaEye, FaHeart } from 'react-icons/fa';

const CollegeList = ({ category, title, locationFilter }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Engineering', 'MBA', 'Medical', 'Design', 'Arts', 'Law', 'Science', 'Commerce'];
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune', 'Hyderabad'];

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
      } else if (urlFilter === 'autonomous') {
        setSearchQuery('autonomous college');
      } else if (urlFilter === 'iit-nit') {
        setSearchQuery('indian institute of technology');
      } else if (urlFilter === 'csir') {
        setSearchQuery('csir');
      } else if (urlFilter === 'drdo') {
        setSearchQuery('drdo');
      }
    }
  }, [searchParams]);

  useEffect(() => {
    filterColleges();
  }, [searchQuery, selectedCategory, selectedLocation, colleges]);

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
      filtered = filtered.filter(college => {
        const collegeName = college.name.toLowerCase();
        const searchTerm = searchQuery.toLowerCase();
        
        // Handle specific search terms
        if (searchTerm === 'indian institute of management') {
          return collegeName.includes('indian institute of management') || 
                 collegeName.includes('iim');
        } else if (searchTerm === 'aiims') {
          return collegeName.includes('aiims') || 
                 collegeName.includes('all india institute');
        } else if (searchTerm === 'national law') {
          return collegeName.includes('national law') || 
                 collegeName.includes('law school');
        } else if (searchTerm === 'private') {
          // For private filter, we'll handle it in the category-specific logic
          return true; // Let the category logic handle it
        } else if (searchTerm === 'executive') {
          // For executive filter, we'll handle it in the category-specific logic
          return true; // Let the category logic handle it
        } else {
          return collegeName.includes(searchTerm) ||
                 college.location.toLowerCase().includes(searchTerm) ||
                 college.category.toLowerCase().includes(searchTerm);
        }
      });
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
        filtered = filtered.filter(college => 
          college.category === 'Research' && 
          (college.name.toLowerCase().includes('indian institute of technology') ||
           college.name.toLowerCase().includes('national institute of technology'))
        );
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
        // Show all research institutions
        filtered = filtered.filter(college => college.category === 'Research');
      }
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(college => college.category === selectedCategory);
    }

    if (selectedLocation !== 'all' && selectedCategory !== 'engineering-by-location') {
      filtered = filtered.filter(college => college.location === selectedLocation);
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
      'Research': 'bg-indigo-100 text-indigo-800'
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
               'Find the best colleges across India with detailed information and ratings'}
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
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(college.category)}`}>
                      {college.category}
                    </span>
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
                    {renderStars(college.rating)}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      <span>{college.students?.toLocaleString() || 'N/A'} students</span>
                    </div>
                    <div className="flex items-center">
                      <FaGraduationCap className="mr-1" />
                      <span>{college.courses || 'N/A'} courses</span>
                    </div>
                  </div>
                  
                  {college.fees && (
                    <div className="mb-4">
                      <span className="text-lg font-bold text-teal-600">
                        ₹{college.fees?.toLocaleString() || 'N/A'}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">per year</span>
                    </div>
                  )}
                  
                  <Link
                    to={`/college/${college.slug}`}
                    className="block w-full text-center py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

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