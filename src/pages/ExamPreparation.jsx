import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBook, 
  FaClock, 
  FaCalculator, 
  FaCheckCircle,
  FaArrowLeft,
  FaGraduationCap,
  FaLightbulb,
  FaBookOpen,
  FaChartLine,
  FaCalendarAlt,
  FaClipboardList
} from 'react-icons/fa';
import { examPreparation } from '../data/toolsData';

const ExamPreparation = () => {
  const navigate = useNavigate();
  const [activeExam, setActiveExam] = useState(null);

  const handleExamClick = (exam) => {
    setActiveExam(exam);
  };

  const getExamIcon = (examKey) => {
    switch (examKey) {
      case 'jeeMain': return <FaGraduationCap className="h-6 w-6 text-blue-600" />;
      case 'neet': return <FaBook className="h-6 w-6 text-green-600" />;
      case 'cat': return <FaCalculator className="h-6 w-6 text-purple-600" />;
      case 'gate': return <FaChartLine className="h-6 w-6 text-orange-600" />;
      default: return <FaBook className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Exam Preparation</h1>
              <p className="text-gray-600">Complete preparation guides for competitive exams</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Exam Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(examPreparation).map(([key, exam]) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleExamClick(key)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {getExamIcon(key)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{exam.title}</h3>
                <p className="text-sm text-gray-600">{exam.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Exam Content */}
        {activeExam && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{examPreparation[activeExam].title}</h2>
              <button
                onClick={() => setActiveExam(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Exam Pattern */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaClipboardList className="h-5 w-5 mr-2" />
                  Exam Pattern
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Subjects/Sections:</span>
                      <span className="text-sm text-gray-900">
                        {Array.isArray(examPreparation[activeExam].data.examPattern.subjects) 
                          ? examPreparation[activeExam].data.examPattern.subjects.join(', ')
                          : examPreparation[activeExam].data.examPattern.sections.join(', ')
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Total Questions:</span>
                      <span className="text-sm text-gray-900">{examPreparation[activeExam].data.examPattern.totalQuestions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Duration:</span>
                      <span className="text-sm text-gray-900">{examPreparation[activeExam].data.examPattern.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Marking Scheme:</span>
                      <span className="text-sm text-gray-900">{examPreparation[activeExam].data.examPattern.markingScheme}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Syllabus */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaBookOpen className="h-5 w-5 mr-2" />
                  Syllabus
                </h3>
                <div className="space-y-4">
                  {Object.entries(examPreparation[activeExam].data.syllabus).map(([subject, topics]) => (
                    <div key={subject} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2 capitalize">{subject}</h4>
                      <ul className="space-y-1">
                        {topics.map((topic, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-700">
                            <FaCheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preparation Tips */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaLightbulb className="h-5 w-5 mr-2" />
                Preparation Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examPreparation[activeExam].data.preparationTips.map((tip, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Materials */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaBook className="h-5 w-5 mr-2" />
                Study Materials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {examPreparation[activeExam].data.studyMaterials.map((material, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <FaCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">{material}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Dates */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaCalendarAlt className="h-5 w-5 mr-2" />
                Important Dates
              </h3>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Application Period</h4>
                    <p className="text-sm text-gray-700">December 2024 - January 2025</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Exam Date</h4>
                    <p className="text-sm text-gray-700">January 2025</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Result Declaration</h4>
                    <p className="text-sm text-gray-700">February 2025</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Counselling Start</h4>
                    <p className="text-sm text-gray-700">June 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPreparation; 