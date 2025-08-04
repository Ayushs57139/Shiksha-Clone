import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaStar, FaDownload, FaEye, FaEdit, FaTrash, FaSave, FaPalette } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const ResumeBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  // Load existing resume data when component mounts
  useEffect(() => {
    if (user) {
      loadResumeData();
    }
  }, [user]);

  const loadResumeData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/resumes/user/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setResumeData(data.data);
        }
      }
    } catch (error) {
      console.error('Error loading resume data:', error);
    }
  };

  const saveResume = async () => {
    if (!user) {
      setMessage('Please login to save your resume');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/resumes/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          resumeData
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Resume saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving resume');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      setMessage('Error saving resume');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!user) {
      setMessage('Please login to download your resume');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/resumes/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        
        // Check if the blob is actually a PDF
        if (blob.type !== 'application/pdf') {
          console.error('Response is not a PDF:', blob.type);
          setMessage('Error: Generated file is not a valid PDF');
          return;
        }
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume_${user.firstName}_${user.lastName}.pdf`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setMessage('PDF downloaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('PDF generation failed:', errorData);
        setMessage(`Error generating PDF: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      setMessage('Error generating PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const previewResume = () => {
    setShowPreview(!showPreview);
  };

  const handleTemplateSelection = () => {
    navigate('/templates');
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        institution: '',
        year: '',
        gpa: '',
        description: ''
      }]
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: '',
        company: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        name: '',
        description: '',
        technologies: '',
        link: ''
      }]
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        issuer: '',
        date: '',
        link: ''
      }]
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateEducation = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const updateExperience = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const updateSkill = (index, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const updateProject = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const updateCertification = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
            <p className="text-xl text-teal-100">Create a professional resume in minutes</p>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`p-4 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Resume Sections</h2>
              <nav className="space-y-2">
                {[
                  { id: 'personal', name: 'Personal Info', icon: FaUser },
                  { id: 'summary', name: 'Summary', icon: FaStar },
                  { id: 'education', name: 'Education', icon: FaGraduationCap },
                  { id: 'experience', name: 'Experience', icon: FaBriefcase },
                  { id: 'skills', name: 'Skills', icon: FaStar },
                  { id: 'projects', name: 'Projects', icon: FaStar },
                  { id: 'certifications', name: 'Certifications', icon: FaStar }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-teal-100 text-teal-700 border-l-4 border-teal-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={previewResume}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <FaEye className="h-4 w-4" />
                  <span>{showPreview ? 'Hide Preview' : 'Preview Resume'}</span>
                </button>
                <button
                  onClick={downloadPDF}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <FaDownload className="h-4 w-4" />
                  <span>{loading ? 'Generating...' : 'Download PDF'}</span>
                </button>
                <button
                  onClick={saveResume}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  <FaSave className="h-4 w-4" />
                  <span>{loading ? 'Saving...' : 'Save Resume'}</span>
                </button>
                <button
                  onClick={handleTemplateSelection}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  <FaPalette className="h-4 w-4" />
                  <span>Select Template</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {showPreview ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Resume Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaEdit className="h-5 w-5" />
                  </button>
                </div>
                <div className="prose max-w-none">
                  <div className="text-center border-b-2 border-teal-500 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-teal-600 mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
                    <p className="text-gray-600">
                      {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
                      {resumeData.personalInfo.address && ` | ${resumeData.personalInfo.address}`}
                    </p>
                    {resumeData.personalInfo.linkedin && <p className="text-gray-600">LinkedIn: {resumeData.personalInfo.linkedin}</p>}
                    {resumeData.personalInfo.website && <p className="text-gray-600">Website: {resumeData.personalInfo.website}</p>}
                  </div>

                  {resumeData.summary && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-teal-600 mb-2">Professional Summary</h2>
                      <p className="text-gray-700">{resumeData.summary}</p>
                    </div>
                  )}

                  {resumeData.education && resumeData.education.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-teal-600 mb-2">Education</h2>
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="mb-3">
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-gray-600">{edu.institution} | {edu.year} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                          {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.experience && resumeData.experience.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-teal-600 mb-2">Work Experience</h2>
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="mb-3">
                          <h3 className="font-semibold">{exp.title}</h3>
                          <p className="text-gray-600">{exp.company} | {exp.duration}</p>
                          <p className="text-gray-700 mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.skills && resumeData.skills.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-teal-600 mb-2">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {resumeData.projects && resumeData.projects.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-teal-600 mb-2">Projects</h2>
                      {resumeData.projects.map((project, index) => (
                        <div key={index} className="mb-3">
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-gray-600">{project.technologies}</p>
                          <p className="text-gray-700 mt-1">{project.description}</p>
                          {project.link && <p className="text-blue-600 mt-1">Link: {project.link}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {resumeData.certifications && resumeData.certifications.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-teal-600 mb-2">Certifications</h2>
                      {resumeData.certifications.map((cert, index) => (
                        <div key={index} className="mb-3">
                          <h3 className="font-semibold">{cert.name}</h3>
                          <p className="text-gray-600">{cert.issuer} | {cert.date}</p>
                          {cert.link && <p className="text-blue-600 mt-1">Link: {cert.link}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Personal Information */}
                {activeSection === 'personal' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.name}
                          onChange={(e) => updatePersonalInfo('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.address}
                          onChange={(e) => updatePersonalInfo('address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                        <input
                          type="url"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your LinkedIn profile"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          value={resumeData.personalInfo.website}
                          onChange={(e) => updatePersonalInfo('website', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your website"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary */}
                {activeSection === 'summary' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Professional Summary</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                      <textarea
                        value={resumeData.summary}
                        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Write a compelling professional summary..."
                      />
                    </div>
                  </div>
                )}

                {/* Education */}
                {activeSection === 'education' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Education</h3>
                      <button
                        onClick={addEducation}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Education
                      </button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">Education #{index + 1}</h4>
                            <button
                              onClick={() => removeItem('education', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Bachelor of Technology"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., IIT Delhi"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                              <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., 2020-2024"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                              <input
                                type="text"
                                value={edu.gpa}
                                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., 8.5/10"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={edu.description}
                              onChange={(e) => updateEducation(index, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Brief description of your education..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {activeSection === 'experience' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Work Experience</h3>
                      <button
                        onClick={addExperience}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Experience
                      </button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">Experience #{index + 1}</h4>
                            <button
                              onClick={() => removeItem('experience', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                              <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Software Engineer"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Google"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                              <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Jan 2023 - Present"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(index, 'description', e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Describe your responsibilities and achievements..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {activeSection === 'skills' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Skills</h3>
                      <button
                        onClick={addSkill}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Skill
                      </button>
                    </div>
                    <div className="space-y-4">
                      {resumeData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Enter a skill"
                          />
                          <button
                            onClick={() => removeItem('skills', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {activeSection === 'projects' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Projects</h3>
                      <button
                        onClick={addProject}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Project
                      </button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.projects.map((project, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">Project #{index + 1}</h4>
                            <button
                              onClick={() => removeItem('projects', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                              <input
                                type="text"
                                value={project.name}
                                onChange={(e) => updateProject(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., E-commerce Website"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                              <input
                                type="text"
                                value={project.technologies}
                                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., React, Node.js, MongoDB"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                              <input
                                type="url"
                                value={project.link}
                                onChange={(e) => updateProject(index, 'link', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., https://github.com/username/project"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={project.description}
                              onChange={(e) => updateProject(index, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Describe your project..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {activeSection === 'certifications' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Certifications</h3>
                      <button
                        onClick={addCertification}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Certification
                      </button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.certifications.map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">Certification #{index + 1}</h4>
                            <button
                              onClick={() => removeItem('certifications', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                              <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., AWS Certified Solutions Architect"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Amazon Web Services"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                              <input
                                type="text"
                                value={cert.date}
                                onChange={(e) => updateCertification(index, 'date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., December 2023"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Link</label>
                              <input
                                type="url"
                                value={cert.link}
                                onChange={(e) => updateCertification(index, 'link', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., https://aws.amazon.com/certification"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder; 