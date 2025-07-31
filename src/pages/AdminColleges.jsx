import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaSearch, 
  FaFilter,
  FaDownload,
  FaUpload,
  FaGraduationCap,
  FaUsers,
  FaChartBar,
  FaTachometerAlt,
  FaTimes,
  FaSave,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const AdminColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    established: '',
    rating: '',
    students: '',
    courses: '',
    description: '',
    facilities: '',
    highlights: '',
    image: '',
    website: '',
    phone: '',
    email: ''
  });

  const categories = ['Engineering', 'MBA', 'Medical', 'Design', 'Arts', 'Law', 'Science', 'Commerce'];
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune', 'Hyderabad'];

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    filterColleges();
  }, [searchQuery, selectedCategory, selectedLocation, colleges]);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/colleges');
      const data = await response.json();
      
      if (data.success) {
        setColleges(data.data);
        setFilteredColleges(data.data);
      } else {
        setError('Failed to fetch colleges');
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
      setError('Failed to fetch colleges');
    } finally {
      setLoading(false);
    }
  };

  const filterColleges = () => {
    let filtered = colleges;

    if (searchQuery) {
      filtered = filtered.filter(college =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(college => college.category === selectedCategory);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(college => college.location === selectedLocation);
    }

    setFilteredColleges(filtered);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      location: '',
      established: '',
      rating: '',
      students: '',
      courses: '',
      description: '',
      facilities: '',
      highlights: '',
      image: '',
      website: '',
      phone: '',
      email: ''
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const url = editingCollege 
        ? `http://localhost:5000/api/admin/colleges/${editingCollege._id}`
        : 'http://localhost:5000/api/admin/colleges';
      
      const method = editingCollege ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          facilities: formData.facilities.split(',').map(f => f.trim()).filter(f => f),
          highlights: formData.highlights.split(',').map(h => h.trim()).filter(h => h),
          established: parseInt(formData.established),
          rating: parseFloat(formData.rating),
          students: parseInt(formData.students),
          courses: parseInt(formData.courses)
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(editingCollege ? 'College updated successfully!' : 'College added successfully!');
        setShowAddModal(false);
        setEditingCollege(null);
        resetForm();
        fetchColleges(); // Refresh the list
      } else {
        setError(data.message || 'Failed to save college');
      }
    } catch (error) {
      console.error('Error saving college:', error);
      setError('Failed to save college');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (college) => {
    setEditingCollege(college);
    setFormData({
      name: college.name || '',
      category: college.category || '',
      location: college.location || '',
      established: college.established?.toString() || '',
      rating: college.rating?.toString() || '',
      students: college.students?.toString() || '',
      courses: college.courses?.toString() || '',
      description: college.description || '',
      facilities: college.facilities?.join(', ') || '',
      highlights: college.highlights?.join(', ') || '',
      image: college.image || '',
      website: college.website || '',
      phone: college.phone || '',
      email: college.email || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/colleges/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
          setSuccess('College deleted successfully!');
          fetchColleges(); // Refresh the list
        } else {
          setError('Failed to delete college');
        }
      } catch (error) {
        console.error('Error deleting college:', error);
        setError('Failed to delete college');
      }
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'MBA': 'bg-green-100 text-green-800',
      'Medical': 'bg-red-100 text-red-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Law': 'bg-indigo-100 text-indigo-800',
      'Science': 'bg-cyan-100 text-cyan-800',
      'Commerce': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">College Management</h1>
              <p className="text-gray-600 mt-1">Manage all colleges in your database</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <FaDownload className="text-lg" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <FaUpload className="text-lg" />
                Import
              </button>
              <button
                onClick={() => {
                  setEditingCollege(null);
                  resetForm();
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg"
              >
                <FaPlus className="text-lg" />
                Add College
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaGraduationCap className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Colleges</p>
                <p className="text-2xl font-bold text-gray-900">{colleges.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaUsers className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {colleges.reduce((sum, college) => sum + (college.students || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaChartBar className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(colleges.map(c => c.category)).size}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FaTachometerAlt className="text-orange-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(colleges.reduce((sum, college) => sum + (college.rating || 0), 0) / colleges.length || 0).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLocation('all');
              }}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <FaCheckCircle className="text-green-500 text-lg" />
            <span className="text-green-800 font-medium">{success}</span>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <FaExclamationTriangle className="text-red-500 text-lg" />
            <span className="text-red-800 font-medium">{error}</span>
          </div>
        )}

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <div key={college._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* College Header */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                {college.image ? (
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaGraduationCap className="text-white text-6xl opacity-80" />
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(college.category)}`}>
                    {college.category}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(college)}
                    className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <FaEdit className="text-blue-600 text-lg" />
                  </button>
                  <button
                    onClick={() => handleDelete(college._id)}
                    className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <FaTrash className="text-red-500 text-lg" />
                  </button>
                </div>
              </div>

              {/* College Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {college.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  <span className="text-sm">{college.location}</span>
                </div>
                
                <div className="mb-4">
                  {renderStars(college.rating)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FaUsers className="mr-2" />
                    <span>{college.students?.toLocaleString() || 'N/A'} students</span>
                  </div>
                  <div className="flex items-center">
                    <FaGraduationCap className="mr-2" />
                    <span>{college.courses || 'N/A'} courses</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>Est. {college.established}</span>
                  </div>
                  {college.fees && (
                    <div className="font-semibold text-blue-600">
                      ₹{college.fees?.toLocaleString()}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Link
                    to={`/college/${college.slug}`}
                    className="flex-1 text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <FaEye className="inline mr-1" />
                    View
                  </Link>
                  <button
                    onClick={() => handleEdit(college)}
                    className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <FaEdit className="inline mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredColleges.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No colleges found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or add a new college</p>
            <button
              onClick={() => {
                setEditingCollege(null);
                resetForm();
                setShowAddModal(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg"
            >
              <FaPlus className="inline mr-2" />
              Add First College
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCollege ? 'Edit College' : 'Add New College'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCollege(null);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes className="text-gray-500 text-xl" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter college name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Established Year *</label>
                  <input
                    type="number"
                    name="established"
                    value={formData.established}
                    onChange={handleFormChange}
                    required
                    min="1900"
                    max="2030"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleFormChange}
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 4.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Students Count *</label>
                  <input
                    type="number"
                    name="students"
                    value={formData.students}
                    onChange={handleFormChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Courses Count *</label>
                  <input
                    type="number"
                    name="courses"
                    value={formData.courses}
                    onChange={handleFormChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 10"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter college description"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facilities (comma-separated)</label>
                  <input
                    type="text"
                    name="facilities"
                    value={formData.facilities}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Library, Sports Complex, Computer Lab"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Highlights (comma-separated)</label>
                  <input
                    type="text"
                    name="highlights"
                    value={formData.highlights}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Top ranked, Industry partnerships"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="info@college.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCollege(null);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaSave className="mr-2" />
                      {editingCollege ? 'Update College' : 'Add College'}
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminColleges; 