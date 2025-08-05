import React, { useState, useEffect } from 'react';
import { 
  FaCalculator, 
  FaBook, 
  FaUsers, 
  FaGlobe,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes
} from 'react-icons/fa';

const AdminTools = () => {
  const [activeTab, setActiveTab] = useState('college-tools');
  const [tools, setTools] = useState({
    collegeTools: [],
    examPreparation: [],
    careerResources: [],
    studyAbroad: []
  });
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const tabs = [
    { id: 'college-tools', name: 'College Tools', icon: <FaCalculator /> },
    { id: 'exam-preparation', name: 'Exam Preparation', icon: <FaBook /> },
    { id: 'career-resources', name: 'Career Resources', icon: <FaUsers /> },
    { id: 'study-abroad', name: 'Study Abroad', icon: <FaGlobe /> }
  ];

  const getTabData = () => {
    switch (activeTab) {
      case 'college-tools':
        return {
          title: 'College Tools',
          items: tools.collegeTools,
          fields: ['name', 'description', 'type', 'data']
        };
      case 'exam-preparation':
        return {
          title: 'Exam Preparation',
          items: tools.examPreparation,
          fields: ['name', 'exam', 'syllabus', 'tips']
        };
      case 'career-resources':
        return {
          title: 'Career Resources',
          items: tools.careerResources,
          fields: ['name', 'type', 'description', 'data']
        };
      case 'study-abroad':
        return {
          title: 'Study Abroad',
          items: tools.studyAbroad,
          fields: ['name', 'country', 'programs', 'requirements']
        };
      default:
        return { title: '', items: [], fields: [] };
    }
  };

  const handleAddItem = () => {
    setShowAddForm(true);
    setEditingItem(null);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setTools(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(item => item.id !== id)
      }));
    }
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      // Update existing item
      setTools(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(item => 
          item.id === editingItem.id ? { ...item, ...itemData } : item
        )
      }));
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...itemData
      };
      setTools(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newItem]
      }));
    }
    setShowAddForm(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Tools & Resources Management</h1>
              <button
                onClick={handleAddItem}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus className="h-4 w-4" />
                <span>Add New</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{getTabData().title}</h2>
              
              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getTabData().items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="text-xs text-gray-500">
                      ID: {item.id}
                    </div>
                  </div>
                ))}
              </div>

              {getTabData().items.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No items found. Click "Add New" to create one.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingItem ? 'Edit Item' : 'Add New Item'}
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-4">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const itemData = {};
                  formData.forEach((value, key) => {
                    itemData[key] = value;
                  });
                  handleSaveItem(itemData);
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={editingItem?.name || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        defaultValue={editingItem?.description || ''}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    {activeTab === 'college-tools' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          name="type"
                          defaultValue={editingItem?.type || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="predictor">College Predictor</option>
                          <option value="calculator">Fee Calculator</option>
                          <option value="ranking">Ranking Compare</option>
                          <option value="guide">Admission Guide</option>
                        </select>
                      </div>
                    )}
                    {activeTab === 'exam-preparation' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Exam
                        </label>
                        <select
                          name="exam"
                          defaultValue={editingItem?.exam || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Exam</option>
                          <option value="jee-main">JEE Main</option>
                          <option value="neet">NEET</option>
                          <option value="cat">CAT</option>
                          <option value="gate">GATE</option>
                        </select>
                      </div>
                    )}
                    {activeTab === 'study-abroad' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          name="country"
                          defaultValue={editingItem?.country || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Country</option>
                          <option value="us">United States</option>
                          <option value="uk">United Kingdom</option>
                          <option value="australia">Australia</option>
                          <option value="canada">Canada</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <FaSave className="h-4 w-4" />
                      <span>{editingItem ? 'Update' : 'Save'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTools; 