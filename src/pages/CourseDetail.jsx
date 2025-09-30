import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Users, MapPin, GraduationCap, BookOpen, CheckCircle, DollarSign } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with actual API call
        // const response = await courseAPI.getCourseById(id);
        // setCourse(response.data);
        
        // For now, show empty state
        setCourse(null);
      } catch (err) {
        setError('Failed to load course details. Please try again.');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Course</h2>
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

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'curriculum', name: 'Curriculum' },
    { id: 'eligibility', name: 'Eligibility' },
    { id: 'colleges', name: 'Top Colleges' },
    { id: 'careers', name: 'Career Options' },
    { id: 'exams', name: 'Entrance Exams' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <GraduationCap size={20} className="mr-2" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={20} className="mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen size={20} className="mr-2" />
                  <span>{course.field}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{course.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{course.colleges}</div>
                  <div className="text-sm text-gray-600">Colleges Offering</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{course.averageFees}</div>
                  <div className="text-sm text-gray-600">Average Fees</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{course.averageSalary}</div>
                  <div className="text-sm text-gray-600">Average Salary</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{course.specializations.length}</div>
                  <div className="text-sm text-gray-600">Specializations</div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/colleges" className="w-full btn-primary block text-center">
                    Find Colleges
                  </Link>
                  <button className="w-full btn-secondary">Download Brochure</button>
                  <button className="w-full btn-secondary">Compare Courses</button>
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Popular Specializations</h3>
                <div className="space-y-2">
                  {course.specializations.slice(0, 4).map((spec, index) => (
                    <div key={index} className="text-sm text-gray-700 py-1">
                      • {spec}
                    </div>
                  ))}
                  {course.specializations.length > 4 && (
                    <div className="text-sm text-primary">
                      +{course.specializations.length - 4} more specializations
                    </div>
                  )}
                </div>
              </div>

              {/* Exam Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Entrance Exam</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exam:</span>
                    <span className="font-medium">{course.examInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{course.examInfo.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium">{course.examInfo.applicationDeadline}</span>
                  </div>
                </div>
                <button className="w-full btn-primary mt-4">Register Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Course Overview</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {course.description} This program is designed to provide students with comprehensive knowledge 
                and practical skills in their chosen engineering discipline. Students will learn through a 
                combination of theoretical coursework, laboratory sessions, and hands-on projects.
              </p>
              
              <h4 className="font-semibold mb-3">Key Highlights</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Industry-relevant curriculum designed with input from leading companies</li>
                <li>State-of-the-art laboratories and research facilities</li>
                <li>Internship opportunities with top companies</li>
                <li>Strong placement support and career guidance</li>
                <li>Research opportunities for interested students</li>
                <li>International exchange programs available</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Curriculum Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Core Subjects</h4>
                <div className="space-y-2">
                  {course.curriculum.map((subject, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <BookOpen size={16} className="mr-3 text-primary" />
                      <span className="text-sm">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Semester Breakdown</h4>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium">Year 1-2: Foundation</div>
                    <div className="text-sm text-gray-600">Basic sciences, mathematics, and engineering fundamentals</div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium">Year 3: Specialization</div>
                    <div className="text-sm text-gray-600">Core subjects in chosen engineering discipline</div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="font-medium">Year 4: Advanced & Project</div>
                    <div className="text-sm text-gray-600">Advanced topics, electives, and final year project</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eligibility' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Eligibility Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Academic Requirements</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <GraduationCap size={16} className="mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium">Qualification</div>
                      <div className="text-sm text-gray-600">{course.eligibility.qualification}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium">Minimum Percentage</div>
                      <div className="text-sm text-gray-600">{course.eligibility.percentage}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium">Entrance Exams</div>
                      <div className="text-sm text-gray-600">{course.eligibility.entrance}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Additional Information</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>• Age limit: Generally 17-25 years (varies by institution)</p>
                  <p>• Some colleges may have state domicile requirements</p>
                  <p>• Reserved category students may have relaxed criteria</p>
                  <p>• International students may have different requirements</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'colleges' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Top Colleges Offering This Course</h3>
            <div className="space-y-4">
              {course.topColleges.map((college, index) => (
                <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-semibold">{college.name}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-600 mr-4">Rating: {college.rating}/5</span>
                      <span className="text-primary font-medium">{college.fees}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">View Details</button>
                    <button className="btn-primary text-sm">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/colleges" className="btn-primary">View All Colleges</Link>
            </div>
          </div>
        )}

        {activeTab === 'careers' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Career Opportunities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.careerOptions.map((career, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <Users size={16} className="mr-2 text-primary" />
                    <span className="font-medium">{career}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Average Salary: ₹{Math.floor(Math.random() * 10) + 5}-{Math.floor(Math.random() * 15) + 15} LPA
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Entrance Exam Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3">{course.examInfo.name}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exam Date:</span>
                    <span className="font-medium">{course.examInfo.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Deadline:</span>
                    <span className="font-medium">{course.examInfo.applicationDeadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exam Pattern:</span>
                    <span className="font-medium">{course.examInfo.examPattern}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Exam Subjects</h4>
                <div className="space-y-2">
                  {course.examInfo.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                      <BookOpen size={16} className="mr-2 text-primary" />
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full btn-primary mt-4">Register for Exam</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;