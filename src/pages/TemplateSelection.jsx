import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaDownload, 
  FaStar,
  FaPalette,
  FaBriefcase,
  FaLaptopCode,
  FaGraduationCap,
  FaArrowLeft,
  FaCheck
} from 'react-icons/fa';
import { resumeTemplates, templateCategories, getTemplatesByCategory } from '../data/resumeTemplates';

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState(resumeTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    filterTemplates();
  }, [selectedCategory, searchQuery]);

  const filterTemplates = () => {
    let templates = getTemplatesByCategory(selectedCategory);
    
    if (searchQuery) {
      templates = templates.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredTemplates(templates);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      navigate(`/resume-builder?template=${selectedTemplate.id}`);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'professional':
        return <FaBriefcase className="h-4 w-4" />;
      case 'creative':
        return <FaPalette className="h-4 w-4" />;
      case 'technical':
        return <FaLaptopCode className="h-4 w-4" />;
      case 'academic':
        return <FaGraduationCap className="h-4 w-4" />;
      default:
        return <FaStar className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'professional':
        return 'bg-blue-100 text-blue-800';
      case 'creative':
        return 'bg-purple-100 text-purple-800';
      case 'technical':
        return 'bg-green-100 text-green-800';
      case 'academic':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/resume-builder')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="h-4 w-4" />
                <span>Back to Resume Builder</span>
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Choose Your Resume Template</h1>
              <p className="text-gray-600">Select from {resumeTemplates.length}+ professional templates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {templateCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gray-100 rounded-t-lg flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <FaStar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <FaStar className="h-3 w-3 text-yellow-400" />
                    <span className="text-xs text-gray-600">4.8</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Template #{template.id}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template);
                    }}
                    className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    <FaEye className="h-3 w-3" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing {filteredTemplates.length} of {resumeTemplates.length} templates
          </p>
        </div>
      </div>

      {/* Template Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                  <p className="text-gray-600">{selectedTemplate.description}</p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Template Preview */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
                  <div className="text-center mb-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <FaStar className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{selectedTemplate.name}</h3>
                    <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-teal-500 pl-4">
                      <h4 className="font-medium text-gray-900">Template Features</h4>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Professional layout and typography</li>
                        <li>• Optimized for ATS systems</li>
                        <li>• Clean and modern design</li>
                        <li>• Easy to customize</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedTemplate.category)}`}>
                        {selectedTemplate.category}
                      </span>
                      <span className="text-sm text-gray-600">Template #{selectedTemplate.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUseTemplate}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2"
                >
                  <FaCheck className="h-4 w-4" />
                  <span>Use This Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelection; 