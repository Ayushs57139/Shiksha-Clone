import React, { useState } from 'react';
import { Filter, X, MapPin, Star, DollarSign, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollegeFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: 'mba', label: 'MBA', icon: '🎓' },
    { value: 'engineering', label: 'Engineering', icon: '⚙️' },
    { value: 'engineering-by-location', label: 'Engineering by Location', icon: '📍' },
    { value: 'medical-by-location', label: 'Medical by Location', icon: '🏥' },
    { value: 'law-by-location', label: 'Law by Location', icon: '⚖️' },
    { value: 'mba-by-location', label: 'MBA by Location', icon: '🎓' },
    { value: 'medical', label: 'Medical', icon: '🏥' },
    { value: 'law', label: 'Law', icon: '⚖️' },
    { value: 'arts', label: 'Arts & Humanities', icon: '🎨' },
    { value: 'science', label: 'Science', icon: '🔬' },
    { value: 'commerce', label: 'Commerce', icon: '💼' },
    { value: 'agriculture', label: 'Agriculture', icon: '🌾' }
  ];

  const locations = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore'
  ];

  const feeRanges = [
    { value: '0-50000', label: 'Under ₹50,000' },
    { value: '50000-200000', label: '₹50,000 - ₹2 Lakhs' },
    { value: '200000-500000', label: '₹2 Lakhs - ₹5 Lakhs' },
    { value: '500000-1000000', label: '₹5 Lakhs - ₹10 Lakhs' },
    { value: '1000000+', label: 'Above ₹10 Lakhs' }
  ];

  const ratingRanges = [
    { value: '4.5-5.0', label: '4.5+ Stars' },
    { value: '4.0-4.5', label: '4.0+ Stars' },
    { value: '3.5-4.0', label: '3.5+ Stars' },
    { value: '3.0-3.5', label: '3.0+ Stars' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange(key, value);
  };

  const clearAllFilters = () => {
    onClearFilters();
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">Filters</span>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
        </button>
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Category
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => {
                const locationCategories = ['engineering-by-location', 'medical-by-location', 'law-by-location', 'mba-by-location'];
                
                if (locationCategories.includes(category.value)) {
                  const route = `/colleges/${category.value}`;
                  return (
                    <Link
                      key={category.value}
                      to={route}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm">{category.icon} {category.label}</span>
                    </Link>
                  );
                } else {
                  return (
                    <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={filters.category === category.value}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{category.icon} {category.label}</span>
                    </label>
                  );
                }
              })}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h3>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Fees Range Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Fees Range
            </h3>
            <select
              value={filters.fees}
              onChange={(e) => handleFilterChange('fees', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Fee Ranges</option>
              {feeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rating
            </h3>
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Ratings</option>
              {ratingRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {getActiveFiltersCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CollegeFilters; 