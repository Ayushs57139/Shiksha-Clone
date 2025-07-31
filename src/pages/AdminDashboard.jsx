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
  FaFilter
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalColleges: 1250,
    totalStudents: 50000,
    totalCourses: 150,
    totalExams: 75
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUserData = localStorage.getItem('adminUser');
    
    if (!adminToken || !adminUserData) {
      navigate('/admin/login');
      return;
    }

    setAdminUser(JSON.parse(adminUserData));
  }, [navigate]);

  useEffect(() => {
    // Set active tab based on current route
    const path = location.pathname;
    if (path.includes('/admin/colleges')) setActiveTab('colleges');
    else if (path.includes('/admin/users')) setActiveTab('users');
    else if (path.includes('/admin/analytics')) setActiveTab('analytics');
    else if (path.includes('/admin/settings')) setActiveTab('settings');
    else setActiveTab('overview');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaTachometerAlt, path: '/admin/dashboard' },
    { id: 'colleges', label: 'Colleges', icon: FaGraduationCap, path: '/admin/colleges' },
    { id: 'users', label: 'Users', icon: FaUsers, path: '/admin/users' },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar, path: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: FaCog, path: '/admin/settings' }
  ];

  if (!adminUser) {
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
                Welcome, {adminUser.name}
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
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FaGraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Colleges</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalColleges.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <FaUsers className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Students</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <FaTachometerAlt className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Courses</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <FaChartBar className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Exams</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalExams}</p>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">New college "ABC University" added</span>
                      <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Updated course information for MBA</span>
                      <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">New user registration: john@example.com</span>
                      <span className="text-xs text-gray-400 ml-auto">6 hours ago</span>
                    </div>
                  </div>
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