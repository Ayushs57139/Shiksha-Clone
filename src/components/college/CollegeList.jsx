import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, MapPin, Users, GraduationCap, DollarSign } from 'lucide-react';
import { 
  allCollegesList, 
  getCollegesByCategory, 
  searchColleges, 
  getAllCategories, 
  getAllLocations 
} from '../../data/collegeData';

const CollegeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get all available categories and locations
        const categories = getAllCategories();
        const locations = getAllLocations();
        setAvailableCategories(categories);
        setAvailableLocations(locations);
        
        // Load all colleges initially
        setColleges(allCollegesList);
        console.log('Loaded colleges:', allCollegesList.length);
        console.log('Available categories:', categories);
        console.log('Available locations:', locations);
      } catch (err) {
        setError('Failed to load colleges. Please try again.');
        console.error('Error fetching colleges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Update colleges when filters change
  useEffect(() => {
    if (colleges.length > 0) {
      const filteredColleges = searchColleges(searchTerm, selectedField, selectedLevel);
      setColleges(filteredColleges);
    }
  }, [searchTerm, selectedField, selectedLevel]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedField(category);
    setSearchParams({ category: category === 'all' ? '' : category });
  };

  // Handle location filter
  const handleLocationChange = (location) => {
    setSelectedLevel(location);
    setSearchParams({ location: location === 'all' ? '' : location });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedField('all');
    setSelectedLevel('all');
    setSearchParams({});
    setColleges(allCollegesList);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading colleges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Colleges</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🏫</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Colleges Available</h2>
          <p className="text-gray-600 mb-4">There are currently no colleges in our database.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {colleges.length} colleges found
              </span>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search colleges, locations, or categories..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-4 text-gray-800 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-teal-300 focus:outline-none text-lg"
                />
              </div>
            </div>
            
            {/* Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedField}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {availableLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        {colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {colleges.map((college) => (
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
                        <GraduationCap className="text-white text-6xl opacity-80" />
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                        {college.category || 'University'}
                      </span>
                      {college.nirfRank && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center gap-1">
                          <DollarSign className="text-xs" />
                          NIRF #{college.nirfRank}
                        </span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                        <Star className="text-red-500 text-lg" />
                      </button>
                      <Link to={`/college/${college.slug}`} className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                        <GraduationCap className="text-blue-600 text-lg" />
                      </Link>
                    </div>
                  </div>

                  {/* College Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-teal-600 transition-colors">
                      {college.name}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="text-red-500 mr-2" />
                      <span className="text-sm">{college.location}</span>
                    </div>
                    
                    <div className="mb-4">
                      {college.rating && (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(college.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600 font-medium">({college.rating})</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Users className="mr-1" />
                        <span>{college.students ? `${college.students}+ students` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="mr-1" />
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
              {searchTerm ? `No colleges found matching "${searchTerm}". Try adjusting your search terms or filters.` : 'No colleges match your current filters.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearFilters}
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
        {colleges.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No colleges found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={clearFilters}
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