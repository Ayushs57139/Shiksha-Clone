import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Award, BookOpen, Search, Filter } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    level: '',
    field: '',
    duration: '',
    mode: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const mockCourses = [
    {
      id: 1,
      name: 'Bachelor of Technology (B.Tech)',
      field: 'Engineering',
      level: 'Undergraduate',
      duration: '4 years',
      mode: 'Full-time',
      description: 'Comprehensive engineering program covering various specializations',
      colleges: 2500,
      averageFees: '₹3-8 Lakhs',
      averageSalary: '₹6-12 LPA',
      specializations: ['Computer Science', 'Mechanical', 'Electrical', 'Civil'],
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Master of Business Administration (MBA)',
      field: 'Management',
      level: 'Postgraduate',
      duration: '2 years',
      mode: 'Full-time',
      description: 'Advanced business management program for leadership roles',
      colleges: 1200,
      averageFees: '₹8-25 Lakhs',
      averageSalary: '₹12-25 LPA',
      specializations: ['Finance', 'Marketing', 'HR', 'Operations'],
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Bachelor of Medicine (MBBS)',
      field: 'Medical',
      level: 'Undergraduate',
      duration: '5.5 years',
      mode: 'Full-time',
      description: 'Medical degree program to become a licensed doctor',
      colleges: 600,
      averageFees: '₹5-50 Lakhs',
      averageSalary: '₹8-15 LPA',
      specializations: ['General Medicine', 'Surgery', 'Pediatrics', 'Cardiology'],
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Bachelor of Laws (LLB)',
      field: 'Law',
      level: 'Undergraduate',
      duration: '3 years',
      mode: 'Full-time',
      description: 'Legal education program for aspiring lawyers',
      colleges: 800,
      averageFees: '₹2-10 Lakhs',
      averageSalary: '₹5-12 LPA',
      specializations: ['Corporate Law', 'Criminal Law', 'Constitutional Law', 'International Law'],
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      name: 'Bachelor of Computer Applications (BCA)',
      field: 'Computer Science',
      level: 'Undergraduate',
      duration: '3 years',
      mode: 'Full-time',
      description: 'Computer applications and programming focused degree',
      colleges: 1500,
      averageFees: '₹1-5 Lakhs',
      averageSalary: '₹4-8 LPA',
      specializations: ['Software Development', 'Web Development', 'Database Management', 'Networking'],
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      name: 'Master of Science (M.Sc)',
      field: 'Science',
      level: 'Postgraduate',
      duration: '2 years',
      mode: 'Full-time',
      description: 'Advanced scientific research and study program',
      colleges: 2000,
      averageFees: '₹1-8 Lakhs',
      averageSalary: '₹5-10 LPA',
      specializations: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  useEffect(() => {
    let filteredCourses = mockCourses;

    if (filters.level) {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }
    if (filters.field) {
      filteredCourses = filteredCourses.filter(course => 
        course.field.toLowerCase().includes(filters.field.toLowerCase())
      );
    }
    if (filters.duration) {
      filteredCourses = filteredCourses.filter(course => course.duration === filters.duration);
    }
    if (filters.mode) {
      filteredCourses = filteredCourses.filter(course => course.mode === filters.mode);
    }

    setCourses(filteredCourses);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ level: '', field: '', duration: '', mode: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Explore Courses</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search courses by name, field, or specialization..."
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
                  <option value="Diploma">Diploma</option>
                  <option value="Certificate">Certificate</option>
                </select>
              </div>

              {/* Field Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Field</label>
                <input
                  type="text"
                  placeholder="Enter field of study"
                  value={filters.field}
                  onChange={(e) => handleFilterChange('field', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Any Duration</option>
                  <option value="1 year">1 Year</option>
                  <option value="2 years">2 Years</option>
                  <option value="3 years">3 Years</option>
                  <option value="4 years">4 Years</option>
                  <option value="5.5 years">5.5 Years</option>
                </select>
              </div>

              {/* Mode Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Mode</label>
                <select
                  value={filters.mode}
                  onChange={(e) => handleFilterChange('mode', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Any Mode</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Online">Online</option>
                  <option value="Distance">Distance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {courses.length} courses
              </p>
              <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Sort by Relevance</option>
                <option>Sort by Popularity</option>
                <option>Sort by Duration</option>
                <option>Sort by Fees</option>
              </select>
            </div>

            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Link
                            to={`/courses/${course.id}`}
                            className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors"
                          >
                            {course.name}
                          </Link>
                          <div className="text-gray-600 mt-1">{course.field}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-primary font-semibold">{course.averageFees}</div>
                          <div className="text-sm text-gray-600">Average Fees</div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{course.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Award size={16} className="mr-1" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BookOpen size={16} className="mr-1" />
                          <span>{course.colleges} Colleges</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users size={16} className="mr-1" />
                          <span>{course.averageSalary}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Popular Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          {course.specializations.slice(0, 3).map((spec, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                              {spec}
                            </span>
                          ))}
                          {course.specializations.length > 3 && (
                            <span className="text-gray-500 text-sm">
                              +{course.specializations.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Link
                          to={`/courses/${course.id}`}
                          className="btn-primary"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/colleges?course=${course.id}`}
                          className="btn-secondary"
                        >
                          Find Colleges
                        </Link>
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

export default Courses;