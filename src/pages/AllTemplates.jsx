import React, { useState, useEffect, useCallback } from 'react';
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
  FaCheck,
  FaChartLine,
  FaBullhorn,
  FaChevronLeft,
  FaChevronRight,
  FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { templatesAPI } from '../services/api';
import TemplatePreview from '../components/TemplatePreview';

const AllTemplates = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24); // 24 templates per page (4x6 grid)

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await templatesAPI.list();
        if (data.success) {
          setAllTemplates(data.data);
          setFilteredTemplates(data.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter templates based on search and category
  const filterTemplates = useCallback(() => {
    let filtered = allTemplates;

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(template => 
        template.name?.toLowerCase().includes(query) ||
        template.description?.toLowerCase().includes(query) ||
        template.category?.toLowerCase().includes(query) ||
        template.layout?.toLowerCase().includes(query) ||
        template.focus?.toLowerCase().includes(query) ||
        // Smart job role detection
        (template.name?.toLowerCase().includes('engineer') && query.includes('engineer')) ||
        (template.name?.toLowerCase().includes('developer') && query.includes('developer')) ||
        (template.name?.toLowerCase().includes('manager') && query.includes('manager')) ||
        (template.name?.toLowerCase().includes('designer') && query.includes('designer')) ||
        (template.name?.toLowerCase().includes('analyst') && query.includes('analyst'))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    setFilteredTemplates(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allTemplates, debouncedSearchQuery, selectedCategory]);

  useEffect(() => {
    filterTemplates();
  }, [filterTemplates]);

  // Pagination logic - moved before useEffects that depend on it
  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / itemsPerPage));
  const startIndex = Math.max(0, (currentPage - 1) * itemsPerPage);
  const endIndex = Math.min(filteredTemplates.length, startIndex + itemsPerPage);
  const currentTemplates = filteredTemplates.slice(startIndex, endIndex);

  // Ensure current page is valid when filteredTemplates changes
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredTemplates.length / itemsPerPage));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [filteredTemplates.length, currentPage, itemsPerPage]);

  // Debug log for pagination (safe version)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Pagination Update:', {
        currentPage,
        totalPages,
        filteredTemplatesLength: filteredTemplates.length,
        currentTemplatesLength: currentTemplates.length
      });
    }
  }, [currentPage, totalPages, filteredTemplates.length, currentTemplates.length]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleUseTemplate = async () => {
    if (selectedTemplate && user) {
      try {
        await templatesAPI.use(selectedTemplate._id);
        navigate(`/resume-builder?template=${selectedTemplate._id}`);
      } catch (error) {
        console.error('Error using template:', error);
        navigate(`/resume-builder?template=${selectedTemplate._id}`);
      }
    } else if (selectedTemplate) {
      navigate(`/resume-builder?template=${selectedTemplate._id}`);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  // Pagination functions
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const hasActiveFilters = debouncedSearchQuery.trim() || selectedCategory;

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'professional': return <FaBriefcase className="h-4 w-4" />;
      case 'creative': return <FaPalette className="h-4 w-4" />;
      case 'technical': return <FaLaptopCode className="h-4 w-4" />;
      case 'academic': return <FaGraduationCap className="h-4 w-4" />;
      case 'financial': return <FaChartLine className="h-4 w-4" />;
      case 'marketing': return <FaBullhorn className="h-4 w-4" />;
      default: return <FaStar className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Professional': 'bg-blue-100 text-blue-800',
      'Creative': 'bg-purple-100 text-purple-800',
      'Technical': 'bg-green-100 text-green-800',
      'Academic': 'bg-indigo-100 text-indigo-800',
      'Financial': 'bg-yellow-100 text-yellow-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Education': 'bg-teal-100 text-teal-800',
      'Engineering': 'bg-orange-100 text-orange-800',
      'Design': 'bg-rose-100 text-rose-800',
      'Business': 'bg-slate-100 text-slate-800',
      'Sales': 'bg-emerald-100 text-emerald-800',
      'Management': 'bg-cyan-100 text-cyan-800',
      'Consulting': 'bg-violet-100 text-violet-800',
      'Research': 'bg-amber-100 text-amber-800',
      'Media': 'bg-fuchsia-100 text-fuchsia-800',
      'Entertainment': 'bg-lime-100 text-lime-800',
      'Sports': 'bg-sky-100 text-sky-800',
      'Legal': 'bg-stone-100 text-stone-800',
      'Real Estate': 'bg-zinc-100 text-zinc-800',
      'Hospitality': 'bg-neutral-100 text-neutral-800',
      'Retail': 'bg-gray-100 text-gray-800',
      'Manufacturing': 'bg-slate-100 text-slate-800',
      'Technology': 'bg-blue-100 text-blue-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getLayoutIcon = (layout) => {
    const icons = {
      'executive': <FaBriefcase className="h-8 w-8 text-white" />,
      'creative': <FaPalette className="h-8 w-8 text-white" />,
      'technical': <FaLaptopCode className="h-8 w-8 text-white" />,
      'academic': <FaGraduationCap className="h-8 w-8 text-white" />,
      'financial': <FaChartLine className="h-8 w-8 text-white" />,
      'marketing': <FaBullhorn className="h-8 w-8 text-white" />,
      'minimalist': <FaStar className="h-8 w-8 text-white" />,
      'modern': <FaStar className="h-8 w-8 text-white" />,
      'classic': <FaStar className="h-8 w-8 text-white" />,
      'bold': <FaStar className="h-8 w-8 text-white" />,
      'elegant': <FaStar className="h-8 w-8 text-white" />,
      'dynamic': <FaStar className="h-8 w-8 text-white" />
    };
    return icons[layout] || <FaStar className="h-8 w-8 text-white" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/templates')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="h-4 w-4" />
                <span>Back to Template Selection</span>
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Resume Templates</h1>
              <p className="text-gray-600">Browse through all {allTemplates.length} professional templates</p>
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
                  placeholder="Search templates by name, category, or job role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">All Categories</option>
                <option value="Professional">Professional</option>
                <option value="Creative">Creative</option>
                <option value="Technical">Technical</option>
                <option value="Academic">Academic</option>
                <option value="Financial">Financial</option>
                <option value="Marketing">Marketing</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Sales">Sales</option>
                <option value="Management">Management</option>
                <option value="Consulting">Consulting</option>
                <option value="Research">Research</option>
                <option value="Media">Media</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Legal">Legal</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <div className="flex items-center">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm">
            <strong>Debug:</strong> Page {currentPage} of {totalPages} | 
            Showing templates {startIndex + 1} to {Math.min(endIndex, filteredTemplates.length)} | 
            Total filtered: {filteredTemplates.length} | 
            Current templates: {currentTemplates.length}
            <br />
            <strong>First template on this page:</strong> {currentTemplates[0]?.name || 'None'}
          </div>
        )}

        {/* Template Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div key={`page-${currentPage}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {currentTemplates.map((template) => (
            <div
              key={template._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden relative z-10"
              onClick={() => handleTemplateSelect(template)}
            >
              {/* Template Preview */}
              <div className="aspect-[4/5] bg-gray-100 rounded-t-lg p-1 overflow-hidden relative z-10">
                <TemplatePreview 
                  template={template} 
                  className="h-full"
                />
              </div>

              {/* Template Info */}
              <div className="p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getLayoutIcon(template.layout)}
                    <span className="text-xs text-gray-600 ml-1">
                      {template.layout || 'executive'}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{template.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{template.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <div 
                      className="w-2 h-2 rounded-full border border-gray-300"
                      style={{backgroundColor: template.accentColor}}
                      title={`Accent: ${template.accentColor}`}
                    ></div>
                    <div 
                      className="w-2 h-2 rounded-full border border-gray-300"
                      style={{backgroundColor: template.secondaryColor}}
                      title={`Secondary: ${template.secondaryColor}`}
                    ></div>
                    {template.tertiaryColor && (
                      <div 
                        className="w-2 h-2 rounded-full border border-gray-300"
                        style={{backgroundColor: template.tertiaryColor}}
                        title={`Tertiary: ${template.tertiaryColor}`}
                      ></div>
                    )}
                  </div>
                  {template.usageCount > 0 && (
                    <span className="text-xs text-gray-500">
                      {template.usageCount} uses
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Pagination Controls */}
        {filteredTemplates.length > itemsPerPage && (
          <div className="mt-12 flex flex-col items-center space-y-4">
            {/* Pagination Info */}
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredTemplates.length)} of {filteredTemplates.length} templates
            </div>
            
            {/* Pagination Buttons */}
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <FaChevronLeft className="h-3 w-3" />
                <span>Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && goToPage(page)}
                    disabled={page === '...'}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-orange-500 text-white'
                        : page === '...'
                        ? 'text-gray-400 cursor-default'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <span>Next</span>
                <FaChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Quick Jump */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Go to page:</span>
              <select
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

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
          {hasActiveFilters ? (
            <div className="space-y-2">
              <p className="text-gray-600">
                Found {filteredTemplates.length} of {allTemplates.length} templates
                {filteredTemplates.length > itemsPerPage && (
                  <span className="ml-2 text-sm">
                    (Page {currentPage} of {totalPages})
                  </span>
                )}
              </p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                {debouncedSearchQuery && (
                  <span>Search: "{debouncedSearchQuery}"</span>
                )}
                {selectedCategory && (
                  <span>Category: {selectedCategory}</span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">
              Showing all {allTemplates.length} templates
              {allTemplates.length > itemsPerPage && (
                <span className="ml-2 text-sm">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </p>
          )}
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

export default AllTemplates;
