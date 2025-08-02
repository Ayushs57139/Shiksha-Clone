import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, MapPin, Star, Users, Award, Search } from 'lucide-react';
import CollegeList from '../components/CollegeList';

const Colleges = () => {
  const [searchParams] = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    location: '',
    fees: '',
    rating: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // We'll use the CollegeList component which fetches data from API
  // This mock data is kept for reference but won't be used
  const mockColleges = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi',
      category: 'engineering',
      rating: 4.8,
      fees: '₹2.5 Lakhs',
      established: 1961,
      students: 8000,
      courses: 45,
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
      highlights: ['NIRF Ranking #2', 'Top Placements', 'Research Excellence']
    },
    {
      id: 2,
      name: 'Indian Institute of Management Ahmedabad',
      location: 'Ahmedabad',
      category: 'mba',
      rating: 4.9,
      fees: '₹25 Lakhs',
      established: 1961,
      students: 1200,
      courses: 8,
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      highlights: ['NIRF Ranking #1', 'Global Recognition', 'Industry Connect']
    },
    {
      id: 3,
      name: 'All India Institute of Medical Sciences',
      location: 'New Delhi',
      category: 'medical',
      rating: 4.7,
      fees: '₹1.5 Lakhs',
      established: 1956,
      students: 3000,
      courses: 12,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      highlights: ['Premier Medical Institute', 'Research Hospital', 'Government College']
    },
    {
      id: 4,
      name: 'National Law School of India University',
      location: 'Bangalore',
      category: 'law',
      rating: 4.6,
      fees: '₹3 Lakhs',
      established: 1987,
      students: 800,
      courses: 6,
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400',
      highlights: ['Top Law School', 'Moot Court Champions', 'Legal Research']
    },
    {
      id: 5,
      name: 'Delhi University',
      location: 'New Delhi',
      category: 'arts',
      rating: 4.4,
      fees: '₹50,000',
      established: 1922,
      students: 300000,
      courses: 200,
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400',
      highlights: ['Central University', 'Multiple Colleges', 'Diverse Courses']
    },
    {
      id: 6,
      name: 'Indian Institute of Science',
      location: 'Bangalore',
      category: 'science',
      rating: 4.8,
      fees: '₹2 Lakhs',
      established: 1909,
      students: 4000,
      courses: 25,
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      highlights: ['Research Institute', 'NIRF Ranking #1', 'Innovation Hub']
    }
  ];

  useEffect(() => {
    // Filter colleges based on current filters
    let filteredColleges = mockColleges;

    // Handle engineering-by-location filter
    if (filters.category === 'engineering-by-location') {
      filteredColleges = filteredColleges.filter(college => 
        college.category === 'engineering' && 
        filters.location && 
        college.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    } else if (filters.category) {
      filteredColleges = filteredColleges.filter(college => 
        college.category === filters.category
      );
    }

    if (filters.location && filters.category !== 'engineering-by-location') {
      filteredColleges = filteredColleges.filter(college => 
        college.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.rating) {
      filteredColleges = filteredColleges.filter(college => 
        college.rating >= parseFloat(filters.rating)
      );
    }

    setColleges(filteredColleges);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', location: '', fees: '', rating: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect College</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search colleges by name, location, or course..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline text-sm"
                >
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Categories</option>
                  <option value="engineering">Engineering</option>
                  <option value="engineering-by-location">Engineering by Location</option>
                  <option value="mba">MBA</option>
                  <option value="medical">Medical</option>
                  <option value="law">Law</option>
                  <option value="arts">Arts</option>
                  <option value="science">Science</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter city or state"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3.0">3.0+ Stars</option>
                </select>
              </div>

              {/* Fees Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Fees Range</label>
                <select
                  value={filters.fees}
                  onChange={(e) => handleFilterChange('fees', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Any Range</option>
                  <option value="low">Under ₹1 Lakh</option>
                  <option value="medium">₹1-5 Lakhs</option>
                  <option value="high">₹5-20 Lakhs</option>
                  <option value="premium">Above ₹20 Lakhs</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {colleges.length} colleges
              </p>
              <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Sort by Relevance</option>
                <option>Sort by Rating</option>
                <option>Sort by Fees (Low to High)</option>
                <option>Sort by Fees (High to Low)</option>
              </select>
            </div>

            <CollegeList 
              category={filters.category} 
              location={filters.location} 
              limit={12} 
            />

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleges;