import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, Award, Search, Filter } from 'lucide-react';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [filters, setFilters] = useState({
    level: '',
    field: '',
    mode: '',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const mockExams = [
    {
      id: 1,
      name: 'JEE Main 2024',
      fullName: 'Joint Entrance Examination Main',
      field: 'Engineering',
      level: 'Undergraduate',
      mode: 'Online',
      date: 'January 24-31, 2024',
      applicationDeadline: 'December 15, 2023',
      registrations: '12,00,000+',
      status: 'Registration Open',
      description: 'National level entrance exam for admission to NITs, IIITs, and other engineering colleges',
      eligibility: '12th with PCM, 75% marks',
      examPattern: 'Computer Based Test (CBT)',
      duration: '3 hours',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'NEET 2024',
      fullName: 'National Eligibility cum Entrance Test',
      field: 'Medical',
      level: 'Undergraduate',
      mode: 'Offline',
      date: 'May 5, 2024',
      applicationDeadline: 'March 15, 2024',
      registrations: '18,00,000+',
      status: 'Registration Open',
      description: 'National level medical entrance exam for MBBS, BDS, and other medical courses',
      eligibility: '12th with PCB, 50% marks',
      examPattern: 'Pen and Paper Based Test',
      duration: '3 hours 20 minutes',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'CAT 2024',
      fullName: 'Common Admission Test',
      field: 'Management',
      level: 'Postgraduate',
      mode: 'Online',
      date: 'November 26, 2024',
      applicationDeadline: 'September 20, 2024',
      registrations: '3,00,000+',
      status: 'Registration Closed',
      description: 'MBA entrance exam for admission to IIMs and other top B-schools',
      eligibility: 'Graduation with 50% marks',
      examPattern: 'Computer Based Test (CBT)',
      duration: '2 hours',
      subjects: ['Verbal Ability', 'Data Interpretation', 'Quantitative Ability'],
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'GATE 2024',
      fullName: 'Graduate Aptitude Test in Engineering',
      field: 'Engineering',
      level: 'Postgraduate',
      mode: 'Online',
      date: 'February 3-11, 2024',
      applicationDeadline: 'October 12, 2023',
      registrations: '9,00,000+',
      status: 'Completed',
      description: 'National level exam for M.Tech admissions and PSU recruitments',
      eligibility: 'B.Tech/B.E. or equivalent',
      examPattern: 'Computer Based Test (CBT)',
      duration: '3 hours',
      subjects: ['Engineering Mathematics', 'General Aptitude', 'Subject Specific'],
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      name: 'CLAT 2024',
      fullName: 'Common Law Admission Test',
      field: 'Law',
      level: 'Undergraduate',
      mode: 'Online',
      date: 'December 3, 2023',
      applicationDeadline: 'November 15, 2023',
      registrations: '75,000+',
      status: 'Completed',
      description: 'National level law entrance exam for admission to NLUs',
      eligibility: '12th with 45% marks',
      examPattern: 'Computer Based Test (CBT)',
      duration: '2 hours',
      subjects: ['English', 'Current Affairs', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      name: 'UPSC CSE 2024',
      fullName: 'Civil Services Examination',
      field: 'Government',
      level: 'Postgraduate',
      mode: 'Offline',
      date: 'June 16, 2024',
      applicationDeadline: 'March 28, 2024',
      registrations: '10,00,000+',
      status: 'Registration Open',
      description: 'Premier examination for recruitment to various Civil Services',
      eligibility: 'Graduation from recognized university',
      examPattern: 'Pen and Paper Based Test',
      duration: 'Varies by stage',
      subjects: ['General Studies', 'Optional Subject', 'Essay'],
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  useEffect(() => {
    let filteredExams = mockExams;

    if (filters.level) {
      filteredExams = filteredExams.filter(exam => exam.level === filters.level);
    }
    if (filters.field) {
      filteredExams = filteredExams.filter(exam => 
        exam.field.toLowerCase().includes(filters.field.toLowerCase())
      );
    }
    if (filters.mode) {
      filteredExams = filteredExams.filter(exam => exam.mode === filters.mode);
    }
    if (filters.status) {
      filteredExams = filteredExams.filter(exam => exam.status === filters.status);
    }

    setExams(filteredExams);
  }, [filters]);

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