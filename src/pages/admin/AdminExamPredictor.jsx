import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../services/api';

const AdminExamPredictor = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('exams');
  const [exams, setExams] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [formData, setFormData] = useState({
    examName: '',
    examType: '',
    category: '',
    description: '',
    eligibility: {
      minAge: '',
      maxAge: '',
      education: [''],
      nationality: ['']
    },
    examPattern: {
      totalQuestions: '',
      totalMarks: '',
      duration: '',
      sections: [{ name: '', questions: '', marks: '', time: '' }]
    },
    importantDates: {
      registrationStart: '',
      registrationEnd: '',
      examDate: '',
      resultDate: ''
    },
    cutoffs: {
      general: '',
      obc: '',
      sc: '',
      st: '',
      ews: ''
    },
    colleges: [{ name: '', location: '', branch: '', seats: '', lastRank: '' }],
    preparationTips: [''],
    studyMaterial: [{ title: '', type: '', link: '', description: '' }],
    mockTests: [{ title: '', questions: '', duration: '', difficulty: '', link: '' }]
  });

  const examTypes = ['JEE', 'NEET', 'CAT', 'GATE', 'UPSC', 'SSC', 'Banking', 'Other'];
  const categories = ['Engineering', 'Medical', 'Management', 'Civil Services', 'Banking', 'Other'];
  const materialTypes = ['Book', 'Video', 'Online Course', 'Mock Test'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      loadData();
    }
  }, [isAuthenticated, user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, predictionsRes] = await Promise.all([
        adminAPI.examPredictorStats(),
        adminAPI.examPredictorPredictions()
      ]);

      if (statsRes.data) setStats(statsRes.data);
      if (predictionsRes.data) setPredictions(predictionsRes.data.predictions);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.createExam(formData);
      if (response.data) {
        alert('Exam created successfully!');
        setShowCreateForm(false);
        resetForm();
        loadData();
      }
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Failed to create exam. Please try again.');
    }
  };

  const handleUpdateExam = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.updateExam(editingExam._id, formData);
      if (response.data) {
        alert('Exam updated successfully!');
        setEditingExam(null);
        resetForm();
        loadData();
      }
    } catch (error) {
      console.error('Error updating exam:', error);
      alert('Failed to update exam. Please try again.');
    }
  };

  const handleDeleteExam = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam? This will also delete all related predictions.')) {
      try {
        await adminAPI.deleteExam(examId);
        alert('Exam deleted successfully!');
        loadData();
      } catch (error) {
        console.error('Error deleting exam:', error);
        alert('Failed to delete exam. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      examName: '',
      examType: '',
      category: '',
      description: '',
      eligibility: {
        minAge: '',
        maxAge: '',
        education: [''],
        nationality: ['']
      },
      examPattern: {
        totalQuestions: '',
        totalMarks: '',
        duration: '',
        sections: [{ name: '', questions: '', marks: '', time: '' }]
      },
      importantDates: {
        registrationStart: '',
        registrationEnd: '',
        examDate: '',
        resultDate: ''
      },
      cutoffs: {
        general: '',
        obc: '',
        sc: '',
        st: '',
        ews: ''
      },
      colleges: [{ name: '', location: '', branch: '', seats: '', lastRank: '' }],
      preparationTips: [''],
      studyMaterial: [{ title: '', type: '', link: '', description: '' }],
      mockTests: [{ title: '', questions: '', duration: '', difficulty: '', link: '' }]
    });
  };

  const addArrayItem = (field, item = {}) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], item]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field, index, key, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Exam Predictor Admin</h1>
          <p className="text-gray-600 mt-2">Manage exams, view predictions, and monitor system statistics</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { key: 'exams', name: 'Manage Exams', count: stats.totalExams },
                { key: 'predictions', name: 'User Predictions', count: stats.totalPredictions },
                { key: 'stats', name: 'Statistics', count: null }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  {tab.count !== null && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'exams' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Manage Exams</h2>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Exam
                </button>
              </div>

              {/* Exams List */}
              <div className="space-y-4">
                {exams.map((exam) => (
                  <div key={exam._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exam.examName}</h3>
                        <p className="text-sm text-gray-600">{exam.examType} • {exam.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingExam(exam);
                            setFormData(exam);
                            setShowCreateForm(true);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExam(exam._id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'predictions' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">User Predictions</h2>
              
              {/* Predictions List */}
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{prediction.examName}</h3>
                        <p className="text-sm text-gray-600">{prediction.examType}</p>
                        <p className="text-sm text-gray-500">User: {prediction.userName}</p>
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Current Score:</span> {prediction.predictionData.currentScore}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Target Score:</span> {prediction.predictionData.targetScore}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Expected Rank:</span> {prediction.predictionData.expectedRank}
                        </p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          prediction.status === 'Active' ? 'bg-green-100 text-green-800' :
                          prediction.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {prediction.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(prediction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">System Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900">{stats.totalExams || 0}</h3>
                  <p className="text-blue-600">Total Exams</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900">{stats.totalPredictions || 0}</h3>
                  <p className="text-green-600">Total Predictions</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900">{stats.activePredictions || 0}</h3>
                  <p className="text-yellow-600">Active Predictions</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900">{stats.recentPredictions || 0}</h3>
                  <p className="text-purple-600">Recent (7 days)</p>
                </div>
              </div>

              {/* Exam Type Distribution */}
              {stats.examTypeStats && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictions by Exam Type</h3>
                  <div className="space-y-2">
                    {stats.examTypeStats.map((stat) => (
                      <div key={stat._id} className="flex items-center justify-between">
                        <span className="text-gray-700">{stat._id}</span>
                        <span className="font-medium text-gray-900">{stat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Exam Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingExam ? 'Edit Exam' : 'Create New Exam'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingExam(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={editingExam ? handleUpdateExam : handleCreateExam} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exam Name</label>
                    <input
                      type="text"
                      value={formData.examName}
                      onChange={(e) => setFormData({...formData, examName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                    <select
                      value={formData.examType}
                      onChange={(e) => setFormData({...formData, examType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Type</option>
                      {examTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      required
                    />
                  </div>
                </div>

                {/* Exam Pattern */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Exam Pattern</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
                      <input
                        type="number"
                        value={formData.examPattern.totalQuestions}
                        onChange={(e) => setFormData({
                          ...formData,
                          examPattern: {...formData.examPattern, totalQuestions: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                      <input
                        type="number"
                        value={formData.examPattern.totalMarks}
                        onChange={(e) => setFormData({
                          ...formData,
                          examPattern: {...formData.examPattern, totalMarks: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                      <input
                        type="number"
                        value={formData.examPattern.duration}
                        onChange={(e) => setFormData({
                          ...formData,
                          examPattern: {...formData.examPattern, duration: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Sections */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Sections</label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('examPattern.sections', { name: '', questions: '', marks: '', time: '' })}
                        className="px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Add Section
                      </button>
                    </div>
                    {formData.examPattern.sections.map((section, index) => (
                      <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Section Name"
                          value={section.name}
                          onChange={(e) => updateArrayItem('examPattern.sections', index, 'name', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Questions"
                          value={section.questions}
                          onChange={(e) => updateArrayItem('examPattern.sections', index, 'questions', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Marks"
                          value={section.marks}
                          onChange={(e) => updateArrayItem('examPattern.sections', index, 'marks', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="flex space-x-1">
                          <input
                            type="number"
                            placeholder="Time (min)"
                            value={section.time}
                            onChange={(e) => updateArrayItem('examPattern.sections', index, 'time', e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('examPattern.sections', index)}
                            className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingExam(null);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingExam ? 'Update Exam' : 'Create Exam'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminExamPredictor;
