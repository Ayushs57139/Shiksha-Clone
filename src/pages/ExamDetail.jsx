import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, Clock, Award, Download, BookOpen, CheckCircle } from 'lucide-react';

const ExamDetail = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockExam = {
      id: parseInt(id),
      name: 'JEE Main 2024',
      fullName: 'Joint Entrance Examination Main',
      field: 'Engineering',
      level: 'Undergraduate',
      mode: 'Online',
      date: 'January 24-31, 2024',
      applicationDeadline: 'December 15, 2023',
      registrations: '12,00,000+',
      status: 'Registration Open',
      description: 'JEE Main is a national level entrance examination conducted by NTA for admission to undergraduate engineering programs in NITs, IIITs, and other centrally funded technical institutions.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      conductingBody: 'National Testing Agency (NTA)',
      frequency: 'Twice a year (January & April)',
      applicationFee: '₹650 (General), ₹325 (SC/ST/PwD)',
      eligibility: {
        qualification: '12th with Physics, Chemistry, Mathematics',
        percentage: '75% in 12th or top 20 percentile',
        ageLimit: 'No age limit',
        attempts: 'No limit on attempts'
      },
      examPattern: {
        mode: 'Computer Based Test (CBT)',
        duration: '3 hours',
        totalQuestions: 90,
        totalMarks: 300,
        sections: [
          { subject: 'Physics', questions: 30, marks: 100 },
          { subject: 'Chemistry', questions: 30, marks: 100 },
          { subject: 'Mathematics', questions: 30, marks: 100 }
        ],
        markingScheme: '+4 for correct, -1 for incorrect'
      },
      syllabus: {
        Physics: [
          'Mechanics',
          'Thermodynamics',
          'Waves and Optics',
          'Electricity and Magnetism',
          'Modern Physics'
        ],
        Chemistry: [
          'Physical Chemistry',
          'Inorganic Chemistry',
          'Organic Chemistry',
          'Environmental Chemistry'
        ],
        Mathematics: [
          'Algebra',
          'Trigonometry',
          'Coordinate Geometry',
          'Calculus',
          'Statistics and Probability'
        ]
      },
      importantDates: [
        { event: 'Application Start', date: 'November 1, 2023' },
        { event: 'Application Deadline', date: 'December 15, 2023' },
        { event: 'Admit Card Release', date: 'January 15, 2024' },
        { event: 'Exam Dates', date: 'January 24-31, 2024' },
        { event: 'Result Declaration', date: 'February 15, 2024' }
      ],
      preparationTips: [
        'Create a structured study plan covering all subjects',
        'Practice previous year question papers regularly',
        'Take mock tests to improve time management',
        'Focus on NCERT books for conceptual clarity',
        'Solve numerical problems daily for Physics and Chemistry',
        'Regular revision is key to retention'
      ],
      topColleges: [
        'NIT Trichy',
        'NIT Warangal',
        'IIIT Hyderabad',
        'NIT Surathkal',
        'IIIT Allahabad'
      ]
    };
    setExam(mockExam);
  }, [id]);

  if (!exam) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'eligibility', name: 'Eligibility' },
    { id: 'pattern', name: 'Exam Pattern' },
    { id: 'syllabus', name: 'Syllabus' },
    { id: 'dates', name: 'Important Dates' },
    { id: 'preparation', name: 'Preparation' }
  ];

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
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img
                src={exam.image}
                alt={exam.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold">{exam.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(exam.status)}`}>
                  {exam.status}
                </span>
              </div>
              
              <h2 className="text-xl text-gray-600 mb-6">{exam.fullName}</h2>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Award size={20} className="mr-2" />
                  <span>{exam.level}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen size={20} className="mr-2" />
                  <span>{exam.field}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={20} className="mr-2" />
                  <span>{exam.mode}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{exam.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{exam.registrations}</div>
                  <div className="text-sm text-gray-600">Registrations</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{exam.examPattern.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{exam.examPattern.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{exam.examPattern.totalMarks}</div>
                  <div className="text-sm text-gray-600">Total Marks</div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exam Date:</span>
                    <span className="font-medium">{exam.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Deadline:</span>
                    <span className="font-medium">{exam.applicationDeadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conducting Body:</span>
                    <span className="font-medium">{exam.conductingBody}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Fee:</span>
                    <span className="font-medium">{exam.applicationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium">{exam.frequency}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {exam.status === 'Registration Open' && (
                  <button className="w-full btn-primary">Register Now</button>
                )}
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <Download size={16} />
                  <span>Download Syllabus</span>
                </button>
                <button className="w-full btn-secondary">Previous Year Papers</button>
                <button className="w-full btn-secondary">Mock Tests</button>
              </div>

              {/* Top Colleges */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Top Colleges</h3>
                <div className="space-y-2">
                  {exam.topColleges.slice(0, 5).map((college, index) => (
                    <div key={index} className="text-sm text-gray-700 py-1">
                      • {college}
                    </div>
                  ))}
                </div>
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
            <h3 className="text-xl font-semibold mb-6">Exam Overview</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {exam.description} The exam is conducted in multiple sessions to accommodate the large number of candidates. 
                It serves as a gateway to some of the most prestigious engineering institutions in India.
              </p>
              
              <h4 className="font-semibold mb-3">Key Features</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>National level entrance examination</li>
                <li>Computer-based test format</li>
                <li>Multiple sessions for better accessibility</li>
                <li>Normalization process for fair evaluation</li>
                <li>Gateway to top engineering colleges</li>
                <li>No negative marking for numerical answer type questions</li>
              </ul>
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
                  <div className="flex items-start">
                    <CheckCircle size={16} className="mr-3 text-green-500 mt-1" />
                    <div>
                      <div className="font-medium">Qualification</div>
                      <div className="text-sm text-gray-600">{exam.eligibility.qualification}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="mr-3 text-green-500 mt-1" />
                    <div>
                      <div className="font-medium">Minimum Percentage</div>
                      <div className="text-sm text-gray-600">{exam.eligibility.percentage}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="mr-3 text-green-500 mt-1" />
                    <div>
                      <div className="font-medium">Age Limit</div>
                      <div className="text-sm text-gray-600">{exam.eligibility.ageLimit}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={16} className="mr-3 text-green-500 mt-1" />
                    <div>
                      <div className="font-medium">Number of Attempts</div>
                      <div className="text-sm text-gray-600">{exam.eligibility.attempts}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Additional Information</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>• Candidates must have studied Physics and Mathematics as compulsory subjects</p>
                  <p>• Chemistry/Biotechnology/Biology/Technical Vocational subject as optional</p>
                  <p>• Reserved category students have relaxed percentage criteria</p>
                  <p>• Candidates appearing in 12th can also apply</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pattern' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Exam Pattern</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3">General Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mode:</span>
                    <span className="font-medium">{exam.examPattern.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{exam.examPattern.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-medium">{exam.examPattern.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Marks:</span>
                    <span className="font-medium">{exam.examPattern.totalMarks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marking Scheme:</span>
                    <span className="font-medium">{exam.examPattern.markingScheme}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Subject-wise Distribution</h4>
                <div className="space-y-3">
                  {exam.examPattern.sections.map((section, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <div className="font-medium">{section.subject}</div>
                      <div className="text-sm text-gray-600">
                        {section.questions} Questions • {section.marks} Marks
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'syllabus' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Detailed Syllabus</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(exam.syllabus).map(([subject, topics]) => (
                <div key={subject}>
                  <h4 className="font-semibold text-lg mb-3 text-primary">{subject}</h4>
                  <div className="space-y-2">
                    {topics.map((topic, index) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                        <BookOpen size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dates' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Important Dates</h3>
            <div className="space-y-4">
              {exam.importantDates.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-3 text-primary" />
                    <span className="font-medium">{item.event}</span>
                  </div>
                  <span className="text-primary font-semibold">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'preparation' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Preparation Tips</h3>
            <div className="space-y-4">
              {exam.preparationTips.map((tip, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <CheckCircle size={20} className="mr-3 text-green-500 mt-1" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-3">Recommended Study Resources</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>NCERT Books for Classes 11 and 12</li>
                <li>Previous year question papers (last 10 years)</li>
                <li>Online mock test series</li>
                <li>Reference books by renowned authors</li>
                <li>Video lectures and online courses</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamDetail;