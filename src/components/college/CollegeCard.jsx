import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Award, ExternalLink, BookOpen, Calendar } from 'lucide-react';

const CollegeCard = ({ college }) => {
  const {
    _id,
    name,
    location,
    category,
    rating = 0,
    fees,
    established,
    students,
    courses,
    image,
    highlights = [],
    slug,
    url
  } = college;

  const getCategoryColor = (cat) => {
    const colors = {
      'mba': 'bg-blue-100 text-blue-800',
      'engineering': 'bg-green-100 text-green-800',
      'medical': 'bg-red-100 text-red-800',
      'law': 'bg-purple-100 text-purple-800',
      'arts': 'bg-yellow-100 text-yellow-800',
      'science': 'bg-indigo-100 text-indigo-800'
    };
    return colors[cat?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const formatFees = (fees) => {
    if (!fees) return 'Not Available';
    return fees;
  };

  const formatEstablished = (year) => {
    if (!year) return 'N/A';
    return year;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
            {category?.toUpperCase() || 'GENERAL'}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* College Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{location || 'Location not specified'}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{students ? `${students.toLocaleString()}+` : 'N/A'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>{courses || 'N/A'} courses</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Est. {formatEstablished(established)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Award className="h-4 w-4 mr-2" />
            <span>{formatFees(fees)}</span>
          </div>
        </div>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Link
            to={`/college/${slug || _id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Details
          </Link>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeCard; 