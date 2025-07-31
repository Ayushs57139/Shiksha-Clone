import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaMapMarkerAlt,
  FaUsers,
  FaGraduationCap,
  FaEye,
  FaHeart,
  FaTrophy,
  FaAward
} from 'react-icons/fa';

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get URL parameters
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  useEffect(() => {
    // Set initial filters from URL parameters
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/colleges');
      if (response.ok) {
        const data = await response.json();
        setColleges(data.data || []);
      } else {
        setError('Failed to fetch colleges');
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
      setError('Failed to load colleges');
    } finally {
      setLoading(false);
    }
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
      'Management': 'bg-green-100 text-green-800',
      'Medical': 'bg-red-100 text-red-800',
      'Law': 'bg-indigo-100 text-indigo-800',
      'Pharmacy': 'bg-purple-100 text-purple-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Science': 'bg-cyan-100 text-cyan-800',
      'Commerce': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Filter colleges based on search, category, and location
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || college.category === selectedCategory;
    
    const matchesLocation = selectedLocation === 'all' || college.location === selectedLocation;

    // Apply additional filters from URL
    let matchesFilter = true;
    if (filterParam) {
      const collegeName = college.name.toLowerCase();
      if (filterParam === 'iit') {
        matchesFilter = collegeName.includes('iit') || collegeName.includes('indian institute of technology');
      } else if (filterParam === 'iim') {
        matchesFilter = collegeName.includes('iim') || collegeName.includes('indian institute of management');
      } else if (filterParam === 'aiims') {
        matchesFilter = collegeName.includes('aiims') || collegeName.includes('all india institute of medical sciences');
      } else if (filterParam === 'nls') {
        matchesFilter = collegeName.includes('nls') || collegeName.includes('national law school');
      } else if (filterParam === 'private') {
        matchesFilter = !collegeName.includes('iit') && !collegeName.includes('iim') && !collegeName.includes('aiims') && !collegeName.includes('government');
      }
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesFilter;
  });

  // Get unique categories and locations
  const categories = [...new Set(colleges.map(college => college.category))];
  const locations = [...new Set(colleges.map(college => college.location))];

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
              Discover Your Perfect College
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Find the best colleges across India with detailed information and ratings
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
                {/* College Header */}
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

                  {/* NIRF Ranking Badge */}
                  {college.nirf_ranking && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-500 text-yellow-900 rounded-full text-xs font-semibold flex items-center gap-1">
                        <FaTrophy className="text-xs" />
                        #{college.nirf_ranking}
                      </span>
                    </div>
                  )}

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