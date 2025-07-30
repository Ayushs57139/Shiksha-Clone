import React from 'react';
import { TrendingUp, Users, Star, MapPin, Award, BookOpen } from 'lucide-react';

const CollegeStats = ({ stats }) => {
  const defaultStats = {
    totalColleges: 0,
    totalStudents: 0,
    averageRating: 0,
    topCategories: [],
    topLocations: [],
    recentAdditions: 0
  };

  const { 
    totalColleges = 0,
    totalStudents = 0,
    averageRating = 0,
    topCategories = [],
    topLocations = [],
    recentAdditions = 0
  } = stats || defaultStats;

  const statCards = [
    {
      title: 'Total Colleges',
      value: totalColleges.toLocaleString(),
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+12% from last month'
    },
    {
      title: 'Total Students',
      value: totalStudents.toLocaleString(),
      icon: Users,
      color: 'bg-green-500',
      change: '+8% from last month'
    },
    {
      title: 'Average Rating',
      value: averageRating.toFixed(1),
      icon: Star,
      color: 'bg-yellow-500',
      change: '+0.2 from last month'
    },
    {
      title: 'Recent Additions',
      value: recentAdditions,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: 'This month'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Categories and Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Categories
          </h3>
          <div className="space-y-3">
            {topCategories.length > 0 ? (
              topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{category.count} colleges</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">No category data available</div>
            )}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Top Locations
          </h3>
          <div className="space-y-3">
            {topLocations.length > 0 ? (
              topLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-medium text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900">{location.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{location.count} colleges</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">No location data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 p-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
            <BookOpen className="h-4 w-4" />
            Add New College
          </button>
          <button className="flex items-center justify-center gap-2 p-3 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors">
            <TrendingUp className="h-4 w-4" />
            View Analytics
          </button>
          <button className="flex items-center justify-center gap-2 p-3 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors">
            <Award className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeStats; 