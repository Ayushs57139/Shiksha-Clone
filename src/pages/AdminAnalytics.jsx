import React, { useState, useEffect } from 'react';
import { 
  FaChartBar, 
  FaUsers, 
  FaGraduationCap, 
  FaEye,
  FaDownload,
  FaCalendar,
  FaMapMarkerAlt,
  FaStar
} from 'react-icons/fa';

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Mock analytics data
  const mockAnalyticsData = {
    overview: {
      totalVisitors: 125000,
      totalPageViews: 450000,
      avgSessionDuration: '4m 32s',
      bounceRate: '23.5%'
    },
    topColleges: [
      { name: 'IIT Delhi', views: 15420, rating: 4.8 },
      { name: 'IIM Ahmedabad', views: 12850, rating: 4.9 },
      { name: 'AIIMS Delhi', views: 11230, rating: 4.7 },
      { name: 'NID Ahmedabad', views: 9850, rating: 4.6 },
      { name: 'IIT Bombay', views: 8760, rating: 4.8 }
    ],
    topLocations: [
      { city: 'Mumbai', colleges: 45, students: 12500 },
      { city: 'Delhi', colleges: 38, students: 10800 },
      { city: 'Bangalore', colleges: 32, students: 9200 },
      { city: 'Chennai', colleges: 28, students: 7800 },
      { city: 'Kolkata', colleges: 25, students: 6500 }
    ],
    categoryStats: [
      { category: 'Engineering', colleges: 450, students: 125000 },
      { category: 'MBA', colleges: 280, students: 85000 },
      { category: 'Medical', colleges: 180, students: 65000 },
      { category: 'Design', colleges: 120, students: 35000 },
      { category: 'Arts', colleges: 95, students: 28000 }
    ],
    monthlyTrends: [
      { month: 'Jan', visitors: 85000, colleges: 1200 },
      { month: 'Feb', visitors: 92000, colleges: 1220 },
      { month: 'Mar', visitors: 98000, colleges: 1240 },
      { month: 'Apr', visitors: 105000, colleges: 1260 },
      { month: 'May', visitors: 112000, colleges: 1280 },
      { month: 'Jun', visitors: 118000, colleges: 1290 },
      { month: 'Jul', visitors: 125000, colleges: 1300 }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalyticsData(mockAnalyticsData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Website performance and insights</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <FaDownload />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaEye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalVisitors.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaChartBar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalPageViews.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaCalendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Session</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.avgSessionDuration}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FaUsers className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.bounceRate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Colleges */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Colleges by Views</h3>
          <div className="space-y-4">
            {analyticsData.topColleges.map((college, index) => (
              <div key={college.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900">{college.name}</p>
                    <p className="text-sm text-gray-600">{college.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(college.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{college.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h3>
          <div className="space-y-4">
            {analyticsData.topLocations.map((location, index) => (
              <div key={location.city} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="h-4 w-4 text-red-500" />
                    <span className="font-medium text-gray-900">{location.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{location.colleges} colleges</p>
                  <p className="text-sm text-gray-600">{location.students.toLocaleString()} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Statistics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {analyticsData.categoryStats.map((category) => (
            <div key={category.category} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <FaGraduationCap className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900">{category.category}</h4>
              <p className="text-2xl font-bold text-teal-600">{category.colleges}</p>
              <p className="text-sm text-gray-600">colleges</p>
              <p className="text-lg font-semibold text-gray-900">{category.students.toLocaleString()}</p>
              <p className="text-sm text-gray-600">students</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
        <div className="space-y-4">
          {analyticsData.monthlyTrends.map((trend) => (
            <div key={trend.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">{trend.month}</span>
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-sm text-gray-600">Visitors</p>
                    <p className="font-semibold text-gray-900">{trend.visitors.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Colleges</p>
                    <p className="font-semibold text-gray-900">{trend.colleges}</p>
                  </div>
                </div>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${(trend.visitors / 125000) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Growth Rate</h4>
          <p className="text-3xl font-bold">+15.2%</p>
          <p className="text-blue-100">vs last month</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Engagement</h4>
          <p className="text-3xl font-bold">76.8%</p>
          <p className="text-green-100">user retention</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Conversion</h4>
          <p className="text-3xl font-bold">8.4%</p>
          <p className="text-purple-100">visitor to user</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics; 