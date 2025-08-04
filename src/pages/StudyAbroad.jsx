import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaGlobe, 
  FaUniversity, 
  FaMapMarkerAlt, 
  FaGraduationCap,
  FaArrowLeft,
  FaStar,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaFileAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaFlag
} from 'react-icons/fa';
import { studyAbroad } from '../data/toolsData';

const StudyAbroad = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const getCountryIcon = (countryKey) => {
    switch (countryKey) {
      case 'usUniversities': return <FaFlag className="h-6 w-6 text-blue-600" />;
      case 'ukUniversities': return <FaFlag className="h-6 w-6 text-red-600" />;
      case 'australia': return <FaFlag className="h-6 w-6 text-green-600" />;
      case 'canada': return <FaFlag className="h-6 w-6 text-red-500" />;
      default: return <FaGlobe className="h-6 w-6 text-gray-600" />;
    }
  };

  const getCountryName = (countryKey) => {
    switch (countryKey) {
      case 'usUniversities': return 'United States';
      case 'ukUniversities': return 'United Kingdom';
      case 'australia': return 'Australia';
      case 'canada': return 'Canada';
      default: return 'Unknown';
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
              <h1 className="text-2xl font-bold text-gray-900">Study Abroad</h1>
              <p className="text-gray-600">Explore top universities around the world</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(studyAbroad).map(([key, country]) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedCountry(key)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {getCountryIcon(key)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{country.title}</h3>
                <p className="text-sm text-gray-600">{country.description}</p>
                <div className="mt-3 text-sm text-gray-500">
                  {country.data.length} universities
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Country Content */}
        {selectedCountry && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{studyAbroad[selectedCountry].title}</h2>
                <p className="text-gray-600">{studyAbroad[selectedCountry].description}</p>
              </div>
              <button
                onClick={() => setSelectedCountry(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyAbroad[selectedCountry].data.map((university) => (
                <div
                  key={university.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => setSelectedUniversity(university)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">{university.name}</h3>
                    <div className="flex items-center space-x-1">
                      <FaStar className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium">{university.ranking}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="h-4 w-4 mr-2" />
                      <span>{university.location}</span>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-700">Programs:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {university.programs.map((program, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaMoneyBillWave className="h-4 w-4 mr-2" />
                      <span>{university.tuitionFee}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaGraduationCap className="h-4 w-4 mr-2" />
                      <span>Acceptance Rate: {university.acceptanceRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* University Details Modal */}
        {selectedUniversity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedUniversity.name}</h2>
                    <p className="text-gray-600">{selectedUniversity.location}</p>
                  </div>
                  <button
                    onClick={() => setSelectedUniversity(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* University Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaUniversity className="h-5 w-5 mr-2" />
                      University Information
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-700">World Ranking</span>
                          <span className="text-lg font-semibold text-gray-900">{selectedUniversity.ranking}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-700">Acceptance Rate</span>
                          <span className="text-lg font-semibold text-gray-900">{selectedUniversity.acceptanceRate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">Tuition Fee</span>
                          <span className="text-lg font-semibold text-gray-900">{selectedUniversity.tuitionFee}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Available Programs</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedUniversity.programs.map((program, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaFileAlt className="h-5 w-5 mr-2" />
                      Admission Requirements
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {selectedUniversity.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start">
                            <FaCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Application Process */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaCalendarAlt className="h-5 w-5 mr-2" />
                    Application Process
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Application Deadlines</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Fall Semester: January 15</li>
                          <li>• Spring Semester: September 15</li>
                          <li>• Summer Semester: March 15</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Required Documents</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Academic Transcripts</li>
                          <li>• Standardized Test Scores</li>
                          <li>• Letters of Recommendation</li>
                          <li>• Statement of Purpose</li>
                          <li>• Resume/CV</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaMoneyBillWave className="h-5 w-5 mr-2" />
                    Cost Breakdown
                  </h3>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Tuition & Fees</h4>
                        <p className="text-lg font-semibold text-gray-900">{selectedUniversity.tuitionFee}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Living Expenses</h4>
                        <p className="text-lg font-semibold text-gray-900">$15,000 - $25,000/year</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Other Costs</h4>
                        <p className="text-lg font-semibold text-gray-900">$5,000 - $8,000/year</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-center space-x-4">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Download Brochure
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyAbroad;