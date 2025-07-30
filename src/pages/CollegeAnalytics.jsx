import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Star, MapPin, Award, BookOpen, BarChart3, PieChart, Activity } from 'lucide-react';

const CollegeAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalColleges: 156,
      totalStudents: 250000,
      averageRating: 4.2,
      growthRate: 12.5
    },
    categoryDistribution: [
      { name: 'Engineering', count: 45, percentage: 28.8 },
      { name: 'MBA', count: 32, percentage: 20.5 },
      { name: 'Medical', count: 28, percentage: 17.9 },
      { name: 'Law', count: 15, percentage: 9.6 },
      { name: 'Arts', count: 12, percentage: 7.7 },
      { name: 'Science', count: 10, percentage: 6.4 },
      { name: 'Others', count: 14, percentage: 9.1 }
    ],
    locationDistribution: [
      { name: 'Delhi', count: 25, percentage: 16.0 },
      { name: 'Mumbai', count: 22, percentage: 14.1 },
      { name: 'Bangalore', count: 18, percentage: 11.5 },
      { name: 'Chennai', count: 15, percentage: 9.6 },
      { name: 'Kolkata', count: 12, percentage: 7.7 },
      { name: 'Hyderabad', count: 10, percentage: 6.4 },
      { name: 'Others', count: 54, percentage: 34.7 }
    ],
    ratingDistribution: [
      { range: '4.5-5.0', count: 25, percentage: 16.0 },
      { range: '4.0-4.5', count: 45, percentage: 28.8 },
      { range: '3.5-4.0', count: 52, percentage: 33.3 },
      { range: '3.0-3.5', count: 24, percentage: 15.4 },
      { range: 'Below 3.0', count: 10, percentage: 6.4 }
    ],
    monthlyGrowth: [
      { month: 'Jan', colleges: 140, students: 220000 },
      { month: 'Feb', colleges: 142, students: 225000 },
      { month: 'Mar', colleges: 145, students: 230000 },
      { month: 'Apr', colleges: 148, students: 235000 },
      { month: 'May', colleges: 150, students: 240000 },
      { month: 'Jun', colleges: 152, students: 245000 },
      { month: 'Jul', colleges: 154, students: 248000 },
      { month: 'Aug', colleges: 156, students: 250000 }
    ],
    topColleges: [
      { name: 'IIM Ahmedabad', rating: 4.9, students: 1200, category: 'MBA' },
      { name: 'IIT Delhi', rating: 4.8, students: 8000, category: 'Engineering' },
      { name: 'AIIMS Delhi', rating: 4.7, students: 3000, category: 'Medical' },
      { name: 'NLSIU Bangalore', rating: 4.6, students: 800, category: 'Law' },
      { name: 'IISc Bangalore', rating: 4.8, students: 4000, category: 'Science' }
    ]
  };

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-xs text-green-600 mt-1">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} text-white`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  const CategoryChart = () => (
    <div className="space-y-3">
      {analyticsData.categoryDistribution.map((category, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getCategoryColor(category.name) }}></div>
            <span className="font-medium text-gray-900">{category.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${category.percentage}%`,
                  backgroundColor: getCategoryColor(category.name)
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-12 text-right">{category.count}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const LocationChart = () => (
    <div className="space-y-3">
      {analyticsData.locationDistribution.map((location, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getLocationColor(location.name) }}></div>
            <span className="font-medium text-gray-900">{location.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${location.percentage}%`,
                  backgroundColor: getLocationColor(location.name)
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-12 text-right">{location.count}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const RatingChart = () => (
    <div className="space-y-3">
      {analyticsData.ratingDistribution.map((rating, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="font-medium text-gray-900">{rating.range}</span>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-yellow-500" 
                style={{ width: `${rating.percentage}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-12 text-right">{rating.count}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const GrowthChart = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Monthly Growth</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded text-sm ${
              timeRange === 'month' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-3 py-1 rounded text-sm ${
              timeRange === 'quarter' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {analyticsData.monthlyGrowth.map((data, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-16">{data.month}</span>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-green-500" 
                  style={{ width: `${(data.colleges / 160) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="text-sm text-gray-900 w-20 text-right">{data.colleges}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const TopCollegesTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 font-medium text-gray-900">College</th>
            <th className="text-left py-2 font-medium text-gray-900">Rating</th>
            <th className="text-left py-2 font-medium text-gray-900">Students</th>
            <th className="text-left py-2 font-medium text-gray-900">Category</th>
          </tr>
        </thead>
        <tbody>
          {analyticsData.topColleges.map((college, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-3 font-medium text-gray-900">{college.name}</td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{college.rating}</span>
                </div>
              </td>
              <td className="py-3 text-gray-600">{college.students.toLocaleString()}</td>
              <td className="py-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {college.category}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const getCategoryColor = (category) => {
    const colors = {
      'Engineering': '#3B82F6',
      'MBA': '#10B981',
      'Medical': '#EF4444',
      'Law': '#8B5CF6',
      'Arts': '#F59E0B',
      'Science': '#6366F1'
    };
    return colors[category] || '#6B7280';
  };

  const getLocationColor = (location) => {
    const colors = {
      'Delhi': '#3B82F6',
      'Mumbai': '#10B981',
      'Bangalore': '#F59E0B',
      'Chennai': '#EF4444',
      'Kolkata': '#8B5CF6',
      'Hyderabad': '#6366F1'
    };
    return colors[location] || '#6B7280';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">College Analytics</h1>
          <p className="text-gray-600">Comprehensive insights and data visualization</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Colleges"
            value={analyticsData.overview.totalColleges.toLocaleString()}
            icon={BookOpen}
            color="bg-blue-500"
            change="+12% from last month"
          />
          <StatCard
            title="Total Students"
            value={analyticsData.overview.totalStudents.toLocaleString()}
            icon={Users}
            color="bg-green-500"
            change="+8% from last month"
          />
          <StatCard
            title="Average Rating"
            value={analyticsData.overview.averageRating.toFixed(1)}
            icon={Star}
            color="bg-yellow-500"
            change="+0.2 from last month"
          />
          <StatCard
            title="Growth Rate"
            value={`${analyticsData.overview.growthRate}%`}
            icon={TrendingUp}
            color="bg-purple-500"
            change="This month"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Category Distribution" icon={PieChart}>
            <CategoryChart />
          </ChartCard>
          <ChartCard title="Location Distribution" icon={MapPin}>
            <LocationChart />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Rating Distribution" icon={Star}>
            <RatingChart />
          </ChartCard>
          <ChartCard title="Growth Trends" icon={Activity}>
            <GrowthChart />
          </ChartCard>
        </div>

        {/* Top Colleges */}
        <ChartCard title="Top Rated Colleges" icon={Award}>
          <TopCollegesTable />
        </ChartCard>
      </div>
    </div>
  );
};

export default CollegeAnalytics; 