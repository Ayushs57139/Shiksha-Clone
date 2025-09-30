import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaStar,
  FaFileAlt,
  FaChartLine,
  FaGraduationCap,
  FaBuilding,
  FaEdit,
  FaEye,
  FaDownload,
  FaTrash,
  FaPlus,
  FaHistory,
  FaTrophy,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaInbox,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaShare,
  FaRedo
} from 'react-icons/fa';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Real data state - will be populated from API calls
  const [userData, setUserData] = useState({
    profile: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
      location: '',
      joinDate: user?.createdAt || new Date().toISOString(),
      avatar: null,
      education: '',
      experience: '',
      skills: []
    },
    reviews: [],
    resume: null,
    testResults: [],
    savedColleges: [],
    notifications: [],
    activity: []
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API calls
      // const reviewsRes = await reviewsAPI.getUserReviews(user.id);
      // const testRes = await psychometricsAPI.getUserResults(user.id);
      // const collegesRes = await collegesAPI.getSavedColleges(user.id);
      
      // For now, set empty data
      setUserData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          joinDate: user?.createdAt || new Date().toISOString()
        }
      }));
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Button handlers
  const handleCreateResume = () => {
    navigate('/resume-builder');
  };

  const handleTakeTest = () => {
    navigate('/psychometrics');
  };

  const handleBrowseColleges = () => {
    navigate('/colleges');
  };

  const handleUpdateProfile = () => {
    // For now, show an alert since there's no dedicated profile edit page
    alert('Profile editing feature coming soon! You can update your profile information here.');
  };

  const handleWriteReview = () => {
    // Navigate to colleges page where they can write reviews
    navigate('/colleges');
  };

  const handleEditReview = (reviewId) => {
    // For now, show an alert since there's no dedicated review edit page
    alert(`Editing review: ${reviewId}. This feature will be available soon!`);
  };

  const handleDeleteReview = (reviewId) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setUserData(prev => ({
        ...prev,
        reviews: prev.reviews.filter(review => review.id !== reviewId)
      }));
      alert('Review deleted successfully!');
    }
  };

  const handleEditResume = () => {
    navigate('/resume-builder');
  };

  const handlePreviewResume = () => {
    // Navigate to resume builder to preview
    navigate('/resume-builder');
  };

  const handleDownloadResume = () => {
    // Navigate to resume builder to download
    navigate('/resume-builder');
  };

  const handleViewTestResult = (testId) => {
    // Navigate to psychometric results page
    navigate('/psychometrics');
  };

  const handleDownloadTestResult = (testId) => {
    // For now, show an alert since there's no dedicated test result download functionality
    alert(`Downloading test result: ${testId}. This feature will be available soon!`);
  };

  const handleViewCollege = (collegeId) => {
    // Navigate to colleges page where they can view college details
    navigate('/colleges');
  };

  const handleRemoveSavedCollege = (collegeId) => {
    if (confirm('Are you sure you want to remove this college from your saved list?')) {
      setUserData(prev => ({
        ...prev,
        savedColleges: prev.savedColleges.filter(college => college.id !== collegeId)
      }));
      alert('College removed from saved list!');
    }
  };

  const handleViewAllReviews = () => {
    navigate('/colleges');
  };

  const handleViewAllTestResults = () => {
    navigate('/psychometrics');
  };

  const handleViewAllSavedColleges = () => {
    // Stay on current tab since we're already viewing saved colleges
    setActiveTab('colleges');
  };

  const handleViewAllActivity = () => {
    // Stay on current tab since we're already viewing activity
    setActiveTab('activity');
  };

  const handleRefreshData = () => {
    loadUserData();
    alert('Data refreshed successfully!');
  };

  const handleExportData = () => {
    // For now, show an alert since there's no dedicated data export functionality
    alert('Data export feature coming soon! You will be able to export your dashboard data soon.');
  };

  const handleSettings = () => {
    // For now, show an alert since there's no dedicated settings page
    alert('Settings page coming soon! You will be able to customize your dashboard preferences.');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user?.firstName || 'User'}'s Profile`,
        text: 'Check out my profile on Diksha Buddy',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const handleViewActivity = (activityId) => {
    // For now, show an alert since there's no dedicated activity view page
    alert(`Viewing activity: ${activityId}. This feature will be available soon!`);
  };

  const handleShareActivity = (activityId) => {
    // For now, show an alert since there's no dedicated activity share functionality
    alert(`Sharing activity: ${activityId}. This feature will be available soon!`);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Average';
    return 'Below Average';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {userData.profile.firstName || 'User'}! 👋
                </h1>
                <p className="text-gray-600">Here's what's happening with your account</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Member since</p>
              <p className="text-lg font-semibold text-gray-900">{formatDate(userData.profile.joinDate)}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'profile', label: 'Profile', icon: '👤' },
                { id: 'reviews', label: 'Reviews', icon: '⭐' },
                { id: 'resume', label: 'Resume', icon: '📄' },
                { id: 'tests', label: 'Test Results', icon: '🧠' },
                { id: 'colleges', label: 'Saved Colleges', icon: '🏫' },
                { id: 'activity', label: 'Activity', icon: '📈' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <FaStar className="text-white h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600">Total Reviews</p>
                      <p className="text-2xl font-bold text-blue-900">{userData.reviews.length}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="mt-3 w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All →
                  </button>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <FaChartLine className="text-white h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600">Tests Completed</p>
                      <p className="text-2xl font-bold text-green-900">{userData.testResults.length}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('tests')}
                    className="mt-3 w-full text-sm text-green-600 hover:text-green-800 font-medium"
                  >
                    View All →
                  </button>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <FaBuilding className="text-white h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-600">Saved Colleges</p>
                      <p className="text-2xl font-bold text-purple-900">{userData.savedColleges.length}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('colleges')}
                    className="mt-3 w-full text-sm text-purple-600 hover:text-purple-800 font-medium"
                  >
                    View All →
                  </button>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-600 rounded-lg">
                      <FaFileAlt className="text-white h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-orange-600">Resume Status</p>
                      <p className="text-2xl font-bold text-orange-900">{userData.resume ? 'Active' : 'None'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('resume')}
                    className="mt-3 w-full text-sm text-orange-600 hover:text-orange-800 font-medium"
                  >
                    {userData.resume ? 'View Resume' : 'Create Resume'} →
                  </button>
                </div>
              </div>

              {/* Empty State for No Data */}
              {userData.reviews.length === 0 && userData.testResults.length === 0 && !userData.resume && (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <div className="text-gray-400 text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to your dashboard!</h3>
                  <p className="text-gray-600 mb-6">Start exploring to see your activity here</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleBrowseColleges}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Browse Colleges
                    </button>
                    <button
                      onClick={handleTakeTest}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Take a Test
                    </button>
                    <button
                      onClick={handleCreateResume}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Create Resume
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={handleCreateResume}
                    className="flex items-center justify-center p-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <FaFileAlt className="mr-2" />
                    Create Resume
                  </button>
                  <button
                    onClick={handleTakeTest}
                    className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaChartLine className="mr-2" />
                    Take New Test
                  </button>
                  <button
                    onClick={handleBrowseColleges}
                    className="flex items-center justify-center p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <FaBuilding className="mr-2" />
                    Browse Colleges
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <button 
                  onClick={handleUpdateProfile}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg">
                      {userData.profile.firstName || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg">
                      {userData.profile.lastName || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg flex items-center">
                      <FaEnvelope className="mr-2 text-gray-400" />
                      {userData.profile.email || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Education</label>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg flex items-center">
                      <FaGraduationCap className="mr-2 text-gray-400" />
                      {userData.profile.education || 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg flex items-center">
                      <FaPhone className="mr-2 text-gray-400" />
                      {userData.profile.phone || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-400" />
                      {userData.profile.location || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg flex items-center">
                      <FaClock className="mr-2 text-gray-400" />
                      {userData.profile.experience || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      {formatDate(userData.profile.joinDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Skills</label>
                {userData.profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userData.profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No skills added yet</p>
                )}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
                <button 
                  onClick={handleWriteReview}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FaPlus className="mr-2" />
                  Write New Review
                </button>
              </div>
              
              {userData.reviews.length > 0 ? (
                <div className="space-y-4">
                  {userData.reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{review.collegeName}</h3>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{review.comment}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{formatDate(review.date)}</span>
                            <span>{review.helpful} people found this helpful</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditReview(review.id)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">⭐</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-4">Start sharing your college experiences with others</p>
                  <button 
                    onClick={handleWriteReview}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Write Your First Review
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Resume Tab */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Resume</h2>
                <button
                  onClick={handleEditResume}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FaEdit className="mr-2" />
                  {userData.resume ? 'Edit Resume' : 'Create Resume'}
                </button>
              </div>
              
              {userData.resume ? (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{userData.resume.title}</h3>
                      <p className="text-gray-600">Last updated: {formatDate(userData.resume.lastUpdated)}</p>
                      <p className="text-sm text-gray-500">Status: <span className="text-green-600 font-medium">{userData.resume.status}</span></p>
                      <p className="text-sm text-gray-500">Downloads: {userData.resume.downloads}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={handlePreviewResume}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaEye className="mr-2" />
                        Preview
                      </button>
                      <button 
                        onClick={handleDownloadResume}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FaDownload className="mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📄</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resume created yet</h3>
                  <p className="text-gray-600 mb-4">Create a professional resume to showcase your skills and experience</p>
                  <button
                    onClick={handleCreateResume}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Create Resume
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Test Results Tab */}
          {activeTab === 'tests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Test Results</h2>
                <button
                  onClick={handleTakeTest}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FaPlus className="mr-2" />
                  Take New Test
                </button>
              </div>
              
              {userData.testResults.length > 0 ? (
                <div className="space-y-4">
                  {userData.testResults.map((test) => (
                    <div key={test.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">{test.testName}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getScoreColor(test.score)}`}>
                              {test.score}% - {getScoreLabel(test.score)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Questions:</span> {test.totalQuestions}
                            </div>
                            <div>
                              <span className="font-medium">Time Spent:</span> {formatTime(test.timeSpent)}
                            </div>
                            <div>
                              <span className="font-medium">Completed:</span> {formatDate(test.completedAt)}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span> 
                              <span className="ml-1 text-green-600">{test.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewTestResult(test.id)}
                            className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </button>
                          <button 
                            onClick={() => handleDownloadTestResult(test.id)}
                            className="px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <FaDownload />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🧠</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No test results yet</h3>
                  <p className="text-gray-600 mb-4">Take psychometric tests to assess your skills and get detailed results</p>
                  <button
                    onClick={handleTakeTest}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Take Your First Test
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Saved Colleges Tab */}
          {activeTab === 'colleges' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Saved Colleges</h2>
                <button
                  onClick={handleBrowseColleges}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FaPlus className="mr-2" />
                  Browse Colleges
                </button>
              </div>
              
              {userData.savedColleges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.savedColleges.map((college) => (
                    <div key={college.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{college.name}</h3>
                          <p className="text-gray-600 flex items-center mt-1">
                            <FaMapMarkerAlt className="mr-2 text-gray-400" />
                            {college.location}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaStar className="text-yellow-400" />
                          <span className="text-sm font-medium">{college.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Saved on {formatDate(college.savedDate)}</p>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewCollege(college.id)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => handleRemoveSavedCollege(college.id)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🏫</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No saved colleges yet</h3>
                  <p className="text-gray-600 mb-4">Save colleges you're interested in to easily access them later</p>
                  <button
                    onClick={handleBrowseColleges}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Browse Colleges
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Activity Timeline</h2>
              
              {userData.activity.length > 0 ? (
                <div className="space-y-4">
                  {userData.activity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewActivity(activity.id)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleShareActivity(activity.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full hover:bg-green-200 transition-colors"
                        >
                          Share
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📈</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
                  <p className="text-gray-600 mb-4">Your activity will appear here as you use the platform</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleBrowseColleges}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Start Exploring
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
