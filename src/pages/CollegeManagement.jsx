import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import CollegeCard from '../components/college/CollegeCard';
import CollegeFilters from '../components/college/CollegeFilters';
import CollegeStats from '../components/college/CollegeStats';

const CollegeManagement = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with actual API call
        // const response = await collegeAPI.getAll();
        // setColleges(response.data);
        
        // For now, show empty state
        setColleges([]);
      } catch (err) {
        setError('Failed to load colleges. Please try again.');
        console.error('Error fetching colleges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || college.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: colleges.length,
    active: colleges.filter(c => c.status === 'active').length,
    pending: colleges.filter(c => c.status === 'pending').length,
    inactive: colleges.filter(c => c.status === 'inactive').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading college management...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Colleges</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">College Management</h1>
          <p className="text-gray-600">Manage and organize college data efficiently</p>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <CollegeStats stats={stats} />
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add New College
              </button>
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                {/* <Upload className="h-4 w-4" /> */}
                Import CSV
              </button>
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                {/* <Download className="h-4 w-4" /> */}
                Export Data
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {filteredColleges.length} colleges
              </span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
            <CollegeFilters
              filters={{ search: searchTerm, status: selectedStatus }}
              onFilterChange={(key, value) => {
                if (key === 'search') setSearchTerm(value);
                if (key === 'status') setSelectedStatus(value);
              }}
              onClearFilters={() => {
                setSearchTerm('');
                setSelectedStatus('all');
              }}
            />
          </div>
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search colleges by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Colleges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => (
                <div key={college._id} className="relative group">
                  <CollegeCard college={college} />
                  {/* Action Overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingCollege(college)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCollege(college._id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredColleges.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg font-medium mb-2">No colleges found</div>
                <div className="text-gray-400">Try adjusting your search criteria or add a new college</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit College Modal */}
      {(showAddModal || editingCollege) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingCollege ? 'Edit College' : 'Add New College'}
            </h2>
            <CollegeForm
              college={editingCollege}
              onSubmit={editingCollege ? handleEditCollege : handleAddCollege}
              onCancel={() => {
                setShowAddModal(false);
                setEditingCollege(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// College Form Component
const CollegeForm = ({ college, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: college?.name || '',
    location: college?.location || '',
    category: college?.category || '',
    rating: college?.rating || '',
    fees: college?.fees || '',
    established: college?.established || '',
    students: college?.students || '',
    courses: college?.courses || '',
    image: college?.image || '',
    highlights: college?.highlights?.join(', ') || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      rating: parseFloat(formData.rating),
      established: parseInt(formData.established),
      students: parseInt(formData.students),
      courses: parseInt(formData.courses),
      highlights: formData.highlights.split(',').map(h => h.trim()).filter(h => h)
    };
    
    if (college) {
      onSubmit(college._id, data);
    } else {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Category</option>
            <option value="mba">MBA</option>
            <option value="engineering">Engineering</option>
            <option value="medical">Medical</option>
            <option value="law">Law</option>
            <option value="arts">Arts & Humanities</option>
            <option value="science">Science</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
          <input
            type="text"
            value={formData.fees}
            onChange={(e) => setFormData(prev => ({ ...prev, fees: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., ₹2.5 Lakhs"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
          <input
            type="number"
            value={formData.established}
            onChange={(e) => setFormData(prev => ({ ...prev, established: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Students</label>
          <input
            type="number"
            value={formData.students}
            onChange={(e) => setFormData(prev => ({ ...prev, students: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Courses</label>
          <input
            type="number"
            value={formData.courses}
            onChange={(e) => setFormData(prev => ({ ...prev, courses: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (comma-separated)</label>
        <input
          type="text"
          value={formData.highlights}
          onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="NIRF Ranking #1, Top Placements, Research Excellence"
        />
      </div>
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {college ? 'Update College' : 'Add College'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CollegeManagement; 