import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaBriefcase, 
  FaChartLine, 
  FaGraduationCap,
  FaArrowLeft,
  FaCheckCircle,
  FaStar,
  FaMoneyBillWave,
  FaLightbulb,
  FaBook,
  FaUserGraduate,
  FaBrain,
  FaHandshake
} from 'react-icons/fa';
import { careerResources } from '../data/toolsData';

const CareerResources = () => {
  const navigate = useNavigate();
  const [activeResource, setActiveResource] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const getResourceIcon = (resourceKey) => {
    switch (resourceKey) {
      case 'careerCounseling': return <FaUsers className="h-6 w-6 text-blue-600" />;
      case 'jobProspects': return <FaBriefcase className="h-6 w-6 text-green-600" />;
      case 'industryTrends': return <FaChartLine className="h-6 w-6 text-purple-600" />;
      case 'skillDevelopment': return <FaGraduationCap className="h-6 w-6 text-orange-600" />;
      default: return <FaUsers className="h-6 w-6 text-gray-600" />;
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
              <h1 className="text-2xl font-bold text-gray-900">Career Resources</h1>
              <p className="text-gray-600">Professional guidance and career development tools</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(careerResources).map(([key, resource]) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setActiveResource(key)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {getResourceIcon(key)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resource Content */}
        {activeResource && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{careerResources[activeResource].title}</h2>
              <button
                onClick={() => setActiveResource(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Career Counseling */}
            {activeResource === 'careerCounseling' && (
              <div className="space-y-6">
                {careerResources.careerCounseling.data.map((service) => (
                  <div key={service.id} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    {service.options && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {service.options.map((option, index) => (
                          <div key={index} className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{option.stream}</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Careers:</strong> {option.careers.join(', ')}</p>
                              <p><strong>Subjects:</strong> {option.subjects.join(', ')}</p>
                              <p><strong>Duration:</strong> {option.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {service.assessments && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {service.assessments.map((assessment, index) => (
                          <div key={index} className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{assessment.name}</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Questions:</strong> {assessment.questions}</p>
                              <p><strong>Duration:</strong> {assessment.duration}</p>
                              <p><strong>Areas:</strong> {assessment.areas.join(', ')}</p>
                            </div>
                            <button className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              Start Assessment
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Job Prospects */}
            {activeResource === 'jobProspects' && (
              <div className="space-y-6">
                {careerResources.jobProspects.data.map((category) => (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.fields.map((field, index) => (
                        <div key={index} className="bg-white rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">{field.field}</h4>
                          <div className="space-y-2 text-sm">
                            <p><strong>Job Roles:</strong></p>
                            <ul className="list-disc list-inside ml-2">
                              {field.jobRoles.map((role, idx) => (
                                <li key={idx}>{role}</li>
                              ))}
                            </ul>
                            <p><strong>Avg Salary:</strong> {field.avgSalary}</p>
                            <p><strong>Growth Rate:</strong> {field.growthRate}</p>
                            <p><strong>Top Companies:</strong></p>
                            <ul className="list-disc list-inside ml-2">
                              {field.companies?.map((company, idx) => (
                                <li key={idx}>{company}</li>
                              ))}
                              {field.organizations?.map((org, idx) => (
                                <li key={idx}>{org}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Industry Trends */}
            {activeResource === 'industryTrends' && (
              <div className="space-y-6">
                {careerResources.industryTrends.data.map((category) => (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.trends.map((trend, index) => (
                        <div key={index} className="bg-white rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{trend.trend}</h4>
                          <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span><strong>Impact:</strong></span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                trend.impact === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {trend.impact}
                              </span>
                            </div>
                            <p><strong>Growth Rate:</strong> {trend.growthRate}</p>
                            <p><strong>Job Opportunities:</strong></p>
                            <ul className="list-disc list-inside ml-2">
                              {trend.jobOpportunities.map((job, idx) => (
                                <li key={idx}>{job}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skill Development */}
            {activeResource === 'skillDevelopment' && (
              <div className="space-y-6">
                {careerResources.skillDevelopment.data.map((category) => (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.skills.map((skill, index) => (
                        <div key={index} className="bg-white rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">{skill.skill}</h4>
                          <div className="space-y-3 text-sm">
                            {skill.languages && (
                              <div>
                                <p><strong>Languages:</strong></p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {skill.languages.map((lang, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                      {lang}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {skill.tools && (
                              <div>
                                <p><strong>Tools:</strong></p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {skill.tools.map((tool, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {skill.aspects && (
                              <div>
                                <p><strong>Aspects:</strong></p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {skill.aspects.map((aspect, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                      {aspect}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            <p><strong>Learning Time:</strong> {skill.learningTime}</p>
                            <p><strong>Resources:</strong> {skill.resources.join(', ')}</p>
                            <p><strong>Certifications:</strong></p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {skill.certification.map((cert, idx) => (
                                <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerResources; 