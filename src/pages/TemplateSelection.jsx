import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaChartLine,
  FaBullhorn,
  FaPlay,
  FaPause,
  FaCircle
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { templatesAPI } from '../services/api';
import TemplatePreview from '../components/TemplatePreview';

const TemplateSelection = () => {
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
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

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

  useEffect(() => {
    filterTemplates();
  }, [selectedCategory, debouncedSearchQuery, allTemplates]);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying && !isHovered && filteredTemplates.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(12, filteredTemplates.length));
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, isHovered, filteredTemplates.length]);

  // Get featured templates (first 12 with unique designs)
  const featuredTemplates = filteredTemplates.slice(0, 12);

  const filterTemplates = () => {
    let templates = allTemplates;
    
    // Category filter
    if (selectedCategory) {
      templates = templates.filter(t => t.category === selectedCategory);
    }
    
    // Enhanced search functionality
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      templates = templates.filter(template => {
        // Search in multiple fields
        const searchableFields = [
          template.name,
          template.description,
          template.category,
          template.layout || '',
          template.focus || '',
          // Search in job roles if they exist in the template
          ...(template.name.includes('Engineer') ? ['engineer', 'engineering', 'technical'] : []),
          ...(template.name.includes('Manager') ? ['manager', 'management', 'leadership'] : []),
          ...(template.name.includes('Designer') ? ['designer', 'design', 'creative'] : []),
          ...(template.name.includes('Developer') ? ['developer', 'programming', 'coding'] : []),
          ...(template.name.includes('Analyst') ? ['analyst', 'analysis', 'data'] : []),
          ...(template.name.includes('Consultant') ? ['consultant', 'consulting', 'advisor'] : []),
          ...(template.name.includes('Director') ? ['director', 'executive', 'leadership'] : []),
          ...(template.name.includes('Specialist') ? ['specialist', 'expert', 'professional'] : [])
        ];
        
        return searchableFields.some(field => 
          field.toLowerCase().includes(query)
        );
      });
    }
    
    setFilteredTemplates(templates);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleUseTemplate = async () => {
    if (selectedTemplate) {
      try {
        // Increment usage count
        await templatesAPI.use(selectedTemplate._id);
        navigate(`/resume-builder?template=${selectedTemplate._id}`);
      } catch (error) {
        console.error('Error using template:', error);
        // Still navigate even if usage count fails
        navigate(`/resume-builder?template=${selectedTemplate._id}`);
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTemplates.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTemplates.length) % featuredTemplates.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const hasActiveFilters = debouncedSearchQuery.trim() || selectedCategory;

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
      case 'financial':
        return 'bg-emerald-100 text-emerald-800';
      case 'marketing':
        return 'bg-pink-100 text-pink-800';
      case 'healthcare':
        return 'bg-red-100 text-red-800';
      case 'education':
        return 'bg-indigo-100 text-indigo-800';
      case 'engineering':
        return 'bg-cyan-100 text-cyan-800';
      case 'design':
        return 'bg-violet-100 text-violet-800';
      case 'business':
        return 'bg-slate-100 text-slate-800';
      case 'sales':
        return 'bg-amber-100 text-amber-800';
      case 'management':
        return 'bg-teal-100 text-teal-800';
      case 'consulting':
        return 'bg-rose-100 text-rose-800';
      case 'research':
        return 'bg-lime-100 text-lime-800';
      case 'media':
        return 'bg-fuchsia-100 text-fuchsia-800';
      case 'entertainment':
        return 'bg-yellow-100 text-yellow-800';
      case 'sports':
        return 'bg-orange-100 text-orange-800';
      case 'legal':
        return 'bg-stone-100 text-stone-800';
      case 'real estate':
        return 'bg-emerald-100 text-emerald-800';
      case 'hospitality':
        return 'bg-amber-100 text-amber-800';
      case 'retail':
        return 'bg-cyan-100 text-cyan-800';
      case 'manufacturing':
        return 'bg-gray-100 text-gray-800';
      case 'technology':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
                onClick={() => navigate('/resume-builder')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="h-4 w-4" />
                <span>Back to Resume Builder</span>
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Choose Your Resume Template</h1>
              <p className="text-gray-600">Select from {allTemplates.length}+ professional templates</p>
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
                <option value="">All Templates</option>
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

        {/* Moving Template Carousel */}
        <div className="max-w-7xl mx-auto px-4">
          <div 
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carousel Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Templates</h2>
                <p className="text-gray-600">Handpicked professional designs</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleAutoPlay}
                  className={`p-2 rounded-full transition-colors ${
                    isAutoPlaying 
                      ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
                >
                  {isAutoPlaying ? <FaPause className="h-4 w-4" /> : <FaPlay className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
              >
                <FaChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
              >
                <FaChevronRight className="h-5 w-5 text-gray-700" />
              </button>

              {/* Carousel Track */}
              <div 
                ref={carouselRef}
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * (100 / Math.min(4, featuredTemplates.length))}%)`
                }}
              >
                {featuredTemplates.map((template, index) => (
                  <div
                    key={template._id}
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-6"
                  >
                    <div
                      className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl cursor-pointer overflow-hidden transition-all duration-300 transform hover:scale-105"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      {/* Template Preview */}
                      <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl p-2 overflow-hidden relative">
                        <TemplatePreview 
                          template={template} 
                          className="h-full w-full rounded-lg"
                        />
                        
                        {/* Template Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                            {template.category}
                          </span>
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm">{template.name}</h3>
                          <div className="flex items-center space-x-1">
                            {getLayoutIcon(template.layout)}
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">{template.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            <div 
                              className="w-3 h-3 rounded-full border border-gray-300"
                              style={{backgroundColor: template.accentColor}}
                              title={`Accent: ${template.accentColor}`}
                            ></div>
                            <div 
                              className="w-3 h-3 rounded-full border border-gray-300"
                              style={{backgroundColor: template.secondaryColor}}
                              title={`Secondary: ${template.secondaryColor}`}
                            ></div>
                            {template.tertiaryColor && (
                              <div 
                                className="w-3 h-3 rounded-full border border-gray-300"
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
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2 p-6">
              {featuredTemplates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-200 ${
                    index === currentSlide
                      ? 'text-orange-500 scale-125'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <FaCircle className="h-2 w-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Show All Templates Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate('/all-templates')}
            className="group relative px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-orange-600 hover:to-orange-700"
          >
            <span className="flex items-center space-x-3">
              <FaStar className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Show All Templates</span>
              <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
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
        {hasActiveFilters && (
          <div className="mt-8 text-center">
            <div className="space-y-2">
              <p className="text-gray-600">
                Showing {filteredTemplates.length} of {allTemplates.length} templates
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
          </div>
        )}
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