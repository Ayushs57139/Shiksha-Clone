import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaGraduationCap, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaFileAlt,
  FaClock,
  FaMapMarkerAlt,
  FaComments,
  FaBrain
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../services/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalColleges: 0,
    totalUsers: 0,
    totalResumes: 0,
    totalCourses: 0,
    totalExams: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in and is admin
    if (!user) {
      navigate('/admin/login');
      return;
    }
    
    if (user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    fetchDashboardData();
  }, [user, navigate]);

  useEffect(() => {
    // Set active tab based on current route
    const path = location.pathname;
    if (path.includes('/admin/colleges')) setActiveTab('colleges');
    else if (path.includes('/admin/users')) setActiveTab('users');
    else if (path.includes('/admin/resumes')) setActiveTab('resumes');
    else if (path.includes('/admin/reviews')) setActiveTab('reviews');
    else if (path.includes('/admin/psychometrics')) setActiveTab('psychometrics');
    else if (path.includes('/admin/tools')) setActiveTab('tools');
    else if (path.includes('/admin/analytics')) setActiveTab('analytics');
    else if (path.includes('/admin/settings')) setActiveTab('settings');
    else setActiveTab('overview');
  }, [location]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsResponse, activityResponse] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getRecentActivity()
      ]);

      if (statsResponse.data.success) {
        setStats(statsResponse.data.data.overview);
      }

      if (activityResponse.data.success) {
        setRecentActivity(activityResponse.data.data);
      }
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'college':
        return <FaGraduationCap className="h-4 w-4 text-blue-600" />;
      case 'user':
        return <FaUsers className="h-4 w-4 text-green-600" />;
      case 'resume':
        return <FaFileAlt className="h-4 w-4 text-purple-600" />;
      default:
        return <FaClock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'college':
        return 'bg-blue-500';
      case 'user':
        return 'bg-green-500';
      case 'resume':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaTachometerAlt, path: '/admin/dashboard' },
    { id: 'colleges', label: 'Colleges', icon: FaGraduationCap, path: '/admin/colleges' },
    { id: 'users', label: 'Users', icon: FaUsers, path: '/admin/users' },
    { id: 'resumes', label: 'Resumes', icon: FaFileAlt, path: '/admin/resumes' },
    { id: 'reviews', label: 'Reviews', icon: FaComments, path: '/admin/reviews' },
    { id: 'psychometrics', label: 'Psychometrics', icon: FaBrain, path: '/admin/psychometrics' },
    { id: 'exam-predictor', label: 'Exam Predictor', icon: FaChartBar, path: '/admin/exam-predictor' },
    { id: 'tools', label: 'Tools', icon: FaCog, path: '/admin/tools' },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar, path: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: FaCog, path: '/admin/settings' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.name || 'Admin User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-6">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FaGraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Colleges</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {loading ? '...' : stats.totalColleges.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <FaUsers className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {loading ? '...' : stats.totalUsers.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <FaFileAlt className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {loading ? '...' : stats.totalResumes.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <FaChartBar className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Courses</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {loading ? '...' : stats.totalCourses.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                      to="/admin/colleges"
                      className="flex items-center justify-center space-x-2 px-4 py-3 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors duration-200"
                    >
                      <FaPlus className="h-4 w-4" />
                      <span>Manage Colleges</span>
                    </Link>
                    <Link
                      to="/admin/users"
                      className="flex items-center justify-center space-x-2 px-4 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      <FaEye className="h-4 w-4" />
                      <span>Manage Users</span>
                    </Link>
                    <Link
                      to="/admin/analytics"
                      className="flex items-center justify-center space-x-2 px-4 py-3 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                    >
                      <FaChartBar className="h-4 w-4" />
                      <span>View Analytics</span>
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <button
                      onClick={fetchDashboardData}
                      className="text-sm text-teal-600 hover:text-teal-700"
                    >
                      Refresh
                    </button>
                  </div>
                  
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                            <div className="w-16 h-3 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : recentActivity.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivity.slice(0, 10).map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`}></div>
                          <div className="flex items-center space-x-2 flex-1">
                            {getActivityIcon(activity.type)}
                            <span className="text-sm text-gray-600">{activity.title}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {formatTimeAgo(activity.time)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FaClock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No recent activity</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;