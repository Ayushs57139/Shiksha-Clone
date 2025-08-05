import React, { useState, useEffect } from 'react';
import { FaEye, FaDownload, FaTrash, FaUser, FaEnvelope, FaCalendar, FaFileAlt } from 'react-icons/fa';

const AdminResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resumes/all');
      if (response.ok) {
        const data = await response.json();
        setResumes(data.data);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResumePDF = async (resumeData) => {
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
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeData.personalInfo.name || 'resume'}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const viewResume = (resume) => {
    setSelectedResume(resume);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Resume Management</h1>
            <p className="text-xl text-teal-100">View and manage all user resumes</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaFileAlt className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FaUser className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(resumes.map(r => r.userId?._id)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaCalendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {resumes.filter(r => {
                    const resumeDate = new Date(r.createdAt);
                    const now = new Date();
                    return resumeDate.getMonth() === now.getMonth() && 
                           resumeDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FaEnvelope className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Updated Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {resumes.filter(r => {
                    const updateDate = new Date(r.updatedAt);
                    const today = new Date();
                    return updateDate.toDateString() === today.toDateString();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumes List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">All Resumes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resumes.map((resume) => (
                  <tr key={resume._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                          <FaUser className="h-5 w-5 text-teal-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {resume.userId?.firstName} {resume.userId?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {resume.userId?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {resume.personalInfo?.name || 'Not specified'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {resume.personalInfo?.email || 'Not specified'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(resume.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(resume.updatedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewResume(resume)}
                          className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded-lg"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => downloadResumePDF(resume)}
                          className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded-lg"
                        >
                          <FaDownload className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Resume Preview Modal */}
      {showModal && selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">Resume Preview</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTrash className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <div className="text-center border-b-2 border-teal-500 pb-4 mb-6">
                  <h1 className="text-3xl font-bold text-teal-600 mb-2">
                    {selectedResume.personalInfo?.name || 'Name Not Specified'}
                  </h1>
                  <p className="text-gray-600">
                    {selectedResume.personalInfo?.email} | {selectedResume.personalInfo?.phone}
                    {selectedResume.personalInfo?.address && ` | ${selectedResume.personalInfo.address}`}
                  </p>
                  {selectedResume.personalInfo?.linkedin && (
                    <p className="text-gray-600">LinkedIn: {selectedResume.personalInfo.linkedin}</p>
                  )}
                  {selectedResume.personalInfo?.website && (
                    <p className="text-gray-600">Website: {selectedResume.personalInfo.website}</p>
                  )}
                </div>

                {selectedResume.summary && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-teal-600 mb-2">Professional Summary</h2>
                    <p className="text-gray-700">{selectedResume.summary}</p>
                  </div>
                )}

                {selectedResume.education && selectedResume.education.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-teal-600 mb-2">Education</h2>
                    {selectedResume.education.map((edu, index) => (
                      <div key={index} className="mb-3">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-gray-600">
                          {edu.institution} | {edu.year} {edu.gpa && `| GPA: ${edu.gpa}`}
                        </p>
                        {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {selectedResume.experience && selectedResume.experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-teal-600 mb-2">Work Experience</h2>
                    {selectedResume.experience.map((exp, index) => (
                      <div key={index} className="mb-3">
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-gray-600">{exp.company} | {exp.duration}</p>
                        <p className="text-gray-700 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {selectedResume.skills && selectedResume.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-teal-600 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedResume.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedResume.projects && selectedResume.projects.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-teal-600 mb-2">Projects</h2>
                    {selectedResume.projects.map((project, index) => (
                      <div key={index} className="mb-3">
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-gray-600">{project.technologies}</p>
                        <p className="text-gray-700 mt-1">{project.description}</p>
                        {project.link && <p className="text-blue-600 mt-1">Link: {project.link}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {selectedResume.certifications && selectedResume.certifications.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-teal-600 mb-2">Certifications</h2>
                    {selectedResume.certifications.map((cert, index) => (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResumes; 