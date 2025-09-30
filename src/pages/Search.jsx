import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Users, GraduationCap, BookOpen, Calendar } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState({ colleges: [], courses: [], exams: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (searchTerm.trim()) {
      performSearch();
    }
  }, [searchTerm]);

  const performSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API calls
      // const [collegesRes, coursesRes, examsRes] = await Promise.all([
      //   collegeAPI.search(searchTerm),
      //   courseAPI.search(searchTerm),
      //   examAPI.search(searchTerm)
      // ]);
      // setResults({
      //   colleges: collegesRes.data,
      //   courses: coursesRes.data,
      //   exams: examsRes.data
      // });
      
      // For now, show empty results
      setResults({ colleges: [], courses: [], exams: [] });
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  const totalResults = results.colleges.length + results.courses.length + results.exams.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Search Error</h2>
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

  if (searchTerm && !loading && totalResults === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for colleges, courses, or exams..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white px-4 py-1.5 rounded-md hover:bg-teal-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* No Results */}
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h2>
            <p className="text-gray-600 mb-4">
              We couldn't find any results for "{searchTerm}". Try different keywords or check your spelling.
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search colleges, courses, exams..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>
          
          {searchTerm && (
            <p className="text-gray-600">
              Showing results for "<span className="font-medium">{searchTerm}</span>"
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {searchTerm ? (
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
                      value={activeTab}
                      onChange={(e) => setActiveTab(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">All Results</option>
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
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                    <select
                      value=""
                      onChange={(e) => {}}
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
                  <button
                    key="all"
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'all'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All Results ({totalResults})
                  </button>
                  <button
                    key="college"
                    onClick={() => setActiveTab('college')}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'college'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Colleges ({results.colleges.length})
                  </button>
                  <button
                    key="course"
                    onClick={() => setActiveTab('course')}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'course'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Courses ({results.courses.length})
                  </button>
                  <button
                    key="exam"
                    onClick={() => setActiveTab('exam')}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'exam'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Exams ({results.exams.length})
                  </button>
                </div>
              </div>

              {/* Results List */}
              {totalResults > 0 ? (
                <div className="space-y-6">
                  {results[activeTab].map(renderResult)}
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

export default Search;