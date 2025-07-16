import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Users, Award } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    rating: ''
  });

  // Mock search results
  const mockResults = {
    colleges: [
      {
        id: 1,
        type: 'college',
        name: 'Indian Institute of Technology Delhi',
        location: 'New Delhi',
        rating: 4.8,
        fees: '₹2.5 Lakhs',
        image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
        highlights: ['NIRF Ranking #2', 'Top Placements']
      },
      {
        id: 2,
        type: 'college',
        name: 'Indian Institute of Management Ahmedabad',
        location: 'Ahmedabad',
        rating: 4.9,
        fees: '₹25 Lakhs',
        image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
        highlights: ['NIRF Ranking #1', 'Global Recognition']
      }
    ],
    courses: [
      {
        id: 1,
        type: 'course',
        name: 'Bachelor of Technology (B.Tech)',
        field: 'Engineering',
        duration: '4 years',
        colleges: 2500,
        averageFees: '₹3-8 Lakhs',
        image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        type: 'course',
        name: 'Master of Business Administration (MBA)',
        field: 'Management',
        duration: '2 years',
        colleges: 1200,
        averageFees: '₹8-25 Lakhs',
        image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    exams: [
      {
        id: 1,
        type: 'exam',
        name: 'JEE Main 2024',
        field: 'Engineering',
        date: 'January 24-31, 2024',
        registrations: '12,00,000+',
        status: 'Registration Open',
        image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  };

  useEffect(() => {
    // Simulate search API call
    const searchResults = [];
    
    if (query) {
      // Add colleges that match the query
      const matchingColleges = mockResults.colleges.filter(college =>
        college.name.toLowerCase().includes(query.toLowerCase()) ||
        college.location.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.push(...matchingColleges);

      // Add courses that match the query
      const matchingCourses = mockResults.courses.filter(course =>
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.field.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.push(...matchingCourses);

      // Add exams that match the query
      const matchingExams = mockResults.exams.filter(exam =>
        exam.name.toLowerCase().includes(query.toLowerCase()) ||
        exam.field.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.push(...matchingExams);
    }

    setResults(searchResults);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with search query
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`);
  };

  const getFilteredResults = () => {
    let filtered = results;

    if (activeTab !== 'all') {
      filtered = filtered.filter(result => result.type === activeTab);
    }

    if (filters.type) {
      filtered = filtered.filter(result => result.type === filters.type);
    }

    if (filters.location) {
      filtered = filtered.filter(result => 
        result.location && result.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(result => 
        result.rating && result.rating >= parseFloat(filters.rating)
      );
    }

    return filtered;
  };

  const filteredResults = getFilteredResults();

  const tabs = [
    { id: 'all', name: 'All Results', count: results.length },
    { id: 'college', name: 'Colleges', count: results.filter(r => r.type === 'college').length },
    { id: 'course', name: 'Courses', count: results.filter(r => r.type === 'course').length },
    { id: 'exam', name: 'Exams', count: results.filter(r => r.type === 'exam').length }
  ];

  const renderResult = (result) => {
    switch (result.type) {
      case 'college':
        return (
          <div key={`${result.type}-${result.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link
                      to={`/colleges/${result.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors"
                    >
                      {result.name}
                    </Link>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin size={16} className="mr-1" />
                      <span>{result.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="font-medium">{result.rating}</span>
                    </div>
                    <div className="text-primary font-semibold">{result.fees}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {result.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <Link to={`/colleges/${result.id}`} className="btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );

      case 'course':
        return (
          <div key={`${result.type}-${result.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link
                      to={`/courses/${result.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors"
                    >
                      {result.name}
                    </Link>
                    <div className="text-gray-600 mt-1">{result.field}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-semibold">{result.averageFees}</div>
                    <div className="text-sm text-gray-600">Average Fees</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div>Duration: {result.duration}</div>
                  <div>{result.colleges} Colleges</div>
                </div>
                <Link to={`/courses/${result.id}`} className="btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );

      case 'exam':
        return (
          <div key={`${result.type}-${result.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link
                      to={`/exams/${result.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors"
                    >
                      {result.name}
                    </Link>
                    <div className="text-gray-600 mt-1">{result.field}</div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mt-2 inline-block">
                      {result.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div>Exam Date: {result.date}</div>
                  <div>Registrations: {result.registrations}</div>
                </div>
                <Link to={`/exams/${result.id}`} className="btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colleges, courses, exams..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>
          
          {query && (
            <p className="text-gray-600">
              Showing results for "<span className="font-medium">{query}</span>"
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {query ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter size={20} className="mr-2" />
                  Filters
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">All Types</option>
                      <option value="college">Colleges</option>
                      <option value="course">Courses</option>
                      <option value="exam">Exams</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Any Rating</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="flex border-b overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.name} ({tab.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Results List */}
              {filteredResults.length > 0 ? (
                <div className="space-y-6">
                  {filteredResults.map(renderResult)}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Start Your Search</h2>
            <p className="text-gray-500">
              Enter keywords to search for colleges, courses, or exams
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;