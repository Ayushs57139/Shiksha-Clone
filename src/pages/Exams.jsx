import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, BookOpen, Award, Clock, Users } from 'lucide-react';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with actual API call
        // const response = await examAPI.getAll();
        // setExams(response.data);
        
        // For now, show empty state
        setExams([]);
      } catch (err) {
        setError('Failed to load exams. Please try again.');
        console.error('Error fetching exams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || exam.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Exams</h2>
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

  if (exams.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Exams Available</h2>
          <p className="text-gray-600 mb-4">There are currently no exams in our database.</p>
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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ level: '', field: '', mode: '', status: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Registration Open':
        return 'bg-green-100 text-green-800';
      case 'Registration Closed':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Entrance Exams</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search exams by name, field, or level..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline text-sm"
                >
                  Clear All
                </button>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Level</label>
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Levels</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              {/* Field Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Field</label>
                <input
                  type="text"
                  placeholder="Enter field"
                  value={filters.field}
                  onChange={(e) => handleFilterChange('field', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Mode Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Exam Mode</label>
                <select
                  value={filters.mode}
                  onChange={(e) => handleFilterChange('mode', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Any Mode</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Any Status</option>
                  <option value="Registration Open">Registration Open</option>
                  <option value="Registration Closed">Registration Closed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {exams.length} exams
              </p>
              <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Sort by Relevance</option>
                <option>Sort by Date</option>
                <option>Sort by Popularity</option>
                <option>Sort by Registration Status</option>
              </select>
            </div>

            <div className="space-y-6">
              {exams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={exam.image}
                        alt={exam.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Link
                            to={`/exams/${exam.id}`}
                            className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors"
                          >
                            {exam.name}
                          </Link>
                          <div className="text-gray-600 mt-1">{exam.fullName}</div>
                          <div className="flex items-center mt-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                              {exam.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-primary font-semibold">{exam.field}</div>
                          <div className="text-sm text-gray-600">{exam.level}</div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{exam.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-1" />
                          <span>{exam.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-1" />
                          <span>{exam.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users size={16} className="mr-1" />
                          <span>{exam.registrations}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Award size={16} className="mr-1" />
                          <span>{exam.mode}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Exam Subjects:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exam.subjects.slice(0, 3).map((subject, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                              {subject}
                            </span>
                          ))}
                          {exam.subjects.length > 3 && (
                            <span className="text-gray-500 text-sm">
                              +{exam.subjects.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Link
                          to={`/exams/${exam.id}`}
                          className="btn-primary"
                        >
                          View Details
                        </Link>
                        {exam.status === 'Registration Open' && (
                          <button className="btn-secondary">
                            Register Now
                          </button>
                        )}
                        <button className="btn-secondary">
                          Download Syllabus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;