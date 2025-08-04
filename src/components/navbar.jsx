import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaChevronDown, 
  FaGraduationCap, 
  FaBuilding, 
  FaUsers, 
  FaChartLine, 
  FaMapMarkerAlt, 
  FaStar, 
  FaBook, 
  FaFlask, 
  FaBalanceScale, 
  FaPills, 
  FaPalette, 
  FaCalculator, 
  FaUser, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaUserPlus, 
  FaCog, 
  FaBars, 
  FaTimes, 
  FaUniversity, 
  FaMicroscope, 
  FaFileAlt,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaGlobe
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query, isMobile = false) => {
    if (query.trim()) {
      // Navigate to college list with search query
      navigate(`/colleges?search=${encodeURIComponent(query.trim())}`);
      // Clear search after navigation
      if (isMobile) {
        setMobileSearchQuery('');
      } else {
        setSearchQuery('');
      }
    }
  };

  const handleSearchKeyPress = (e, isMobile = false) => {
    if (e.key === 'Enter') {
      const query = isMobile ? mobileSearchQuery : searchQuery;
      handleSearch(query, isMobile);
    }
  };

  const collegeCategories = [
    {
      name: 'Universities',
      icon: <FaUniversity className="text-blue-600" />,
      items: [
        { name: 'All Universities', link: '/colleges?category=University', icon: <FaUniversity /> },
        { name: 'State Universities', link: '/colleges?category=University&filter=state', icon: <FaBuilding /> },
        { name: 'Private Universities', link: '/colleges?category=University&filter=private', icon: <FaGraduationCap /> },
        { name: 'Universities by Location', link: '/colleges/university-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Colleges',
      icon: <FaGraduationCap className="text-green-600" />,
      items: [
        { name: 'All Colleges', link: '/colleges?category=College', icon: <FaGraduationCap /> },
        { name: 'Government Colleges', link: '/colleges?category=College&filter=government', icon: <FaBuilding /> },
        { name: 'State Colleges', link: '/colleges?category=College&filter=state-college', icon: <FaUniversity /> },
        { name: 'Private Colleges', link: '/colleges?category=College&filter=private', icon: <FaGraduationCap /> },
        { name: 'Colleges by Location', link: '/colleges/college-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Engineering Colleges',
      icon: <FaGraduationCap className="text-orange-600" />,
      items: [
        { name: 'All Engineering Colleges', link: '/colleges?category=Engineering', icon: <FaGraduationCap /> },
        { name: 'IITs', link: '/colleges?category=Engineering&filter=iit', icon: <FaUniversity /> },
        { name: 'NITs', link: '/colleges?category=Engineering&filter=nit', icon: <FaBuilding /> },
        { name: 'Private Engineering Colleges', link: '/colleges?category=Engineering&filter=private', icon: <FaGraduationCap /> },
        { name: 'Engineering by Location', link: '/colleges/engineering-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Medical Colleges',
      icon: <FaPills className="text-red-600" />,
      items: [
        { name: 'All Medical Colleges', link: '/colleges?category=Medical', icon: <FaPills /> },
        { name: 'AIIMS', link: '/colleges?category=Medical&filter=aiims', icon: <FaUniversity /> },
        { name: 'Government Medical Colleges', link: '/colleges?category=Medical&filter=government', icon: <FaBuilding /> },
        { name: 'Private Medical Colleges', link: '/colleges?category=Medical&filter=private', icon: <FaPills /> },
        { name: 'Medical by Location', link: '/colleges/medical-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Management Colleges',
      icon: <FaUsers className="text-purple-600" />,
      items: [
        { name: 'All Management Colleges', link: '/colleges?category=Management', icon: <FaUsers /> },
        { name: 'IIMs', link: '/colleges?category=Management&filter=iim', icon: <FaUniversity /> },
        { name: 'Government B-Schools', link: '/colleges?category=Management&filter=government', icon: <FaBuilding /> },
        { name: 'Private B-Schools', link: '/colleges?category=Management&filter=private', icon: <FaUsers /> },
        { name: 'Management by Location', link: '/colleges/management-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Law Colleges',
      icon: <FaBalanceScale className="text-indigo-600" />,
      items: [
        { name: 'All Law Colleges', link: '/colleges?category=Law', icon: <FaBalanceScale /> },
        { name: 'NLUs', link: '/colleges?category=Law&filter=nlu', icon: <FaUniversity /> },
        { name: 'Government Law Colleges', link: '/colleges?category=Law&filter=government', icon: <FaBuilding /> },
        { name: 'Private Law Colleges', link: '/colleges?category=Law&filter=private', icon: <FaBalanceScale /> },
        { name: 'Law by Location', link: '/colleges/law-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Arts & Design',
      icon: <FaPalette className="text-pink-600" />,
      items: [
        { name: 'All Arts Colleges', link: '/colleges?category=Arts', icon: <FaPalette /> },
        { name: 'Design Institutes', link: '/colleges?category=Arts&filter=design', icon: <FaPalette /> },
        { name: 'Fine Arts Colleges', link: '/colleges?category=Arts&filter=fine-arts', icon: <FaPalette /> },
        { name: 'Arts by Location', link: '/colleges/arts-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Research Institutes',
      icon: <FaMicroscope className="text-teal-600" />,
      items: [
        { name: 'All Research Institutes', link: '/colleges?category=Research', icon: <FaMicroscope /> },
        { name: 'CSIR Labs', link: '/colleges?category=Research&filter=csir', icon: <FaUniversity /> },
        { name: 'DRDO Labs', link: '/colleges?category=Research&filter=drdo', icon: <FaBuilding /> },
        { name: 'Research by Location', link: '/colleges/research-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Agriculture & Planning',
      icon: <FaFlask className="text-green-600" />,
      items: [
        { name: 'All Agriculture Colleges', link: '/colleges?category=Agriculture', icon: <FaFlask /> },
        { name: 'Agricultural Universities', link: '/colleges?category=Agriculture&filter=university', icon: <FaUniversity /> },
        { name: 'Planning Institutes', link: '/colleges?category=Planning', icon: <FaBuilding /> },
        { name: 'Agriculture by Location', link: '/colleges/agriculture-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Innovation',
      icon: <FaStar className="text-yellow-600" />,
      items: [
        { name: 'All Innovation Institutes', link: '/colleges?category=Innovation', icon: <FaStar /> },
        { name: 'Innovation Universities', link: '/colleges?category=Innovation&filter=university', icon: <FaUniversity /> },
        { name: 'Innovation by Location', link: '/colleges/innovation-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Open University',
      icon: <FaBook className="text-blue-600" />,
      items: [
        { name: 'All Open Universities', link: '/colleges?category=OpenUniversity', icon: <FaBook /> },
        { name: 'Open Universities by State', link: '/colleges?category=OpenUniversity&filter=state', icon: <FaUniversity /> },
        { name: 'Open University by Location', link: '/colleges/open-university-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'Skill University',
      icon: <FaGraduationCap className="text-orange-600" />,
      items: [
        { name: 'All Skill Universities', link: '/colleges?category=SkillUniversity', icon: <FaGraduationCap /> },
        { name: 'Skill Universities by State', link: '/colleges?category=SkillUniversity&filter=state', icon: <FaUniversity /> },
        { name: 'Skill University by Location', link: '/colleges/skill-university-by-location', icon: <FaMapMarkerAlt /> }
      ]
    },
    {
      name: 'State Public University',
      icon: <FaUniversity className="text-purple-600" />,
      items: [
        { name: 'All State Public Universities', link: '/colleges?category=StatePublicUniversity', icon: <FaUniversity /> },
        { name: 'State Public Universities by State', link: '/colleges?category=StatePublicUniversity&filter=state', icon: <FaBuilding /> },
        { name: 'State Public University by Location', link: '/colleges/state-public-university-by-location', icon: <FaMapMarkerAlt /> }
      ]
    }
  ];

  // Add new tools section
  const toolsSection = {
    name: 'Tools & Resources',
    icon: <FaCalculator className="text-indigo-600" />,
    items: [
      { name: 'College Tools', link: '/college-tools', icon: <FaCalculator /> },
      { name: 'Exam Preparation', link: '/exam-preparation', icon: <FaBook /> },
      { name: 'Career Resources', link: '/career-resources', icon: <FaUsers /> },
      { name: 'Study Abroad', link: '/study-abroad', icon: <FaGlobe /> }
    ]
  };

  const toolsAndResources = [
    {
      name: 'College Tools',
      icon: <FaCalculator className="text-blue-600" />,
      items: [
        { name: 'College Predictor', link: '/college-tools', icon: <FaChartLine /> },
        { name: 'Fee Calculator', link: '/college-tools', icon: <FaCalculator /> },
        { name: 'Ranking Compare', link: '/college-tools', icon: <FaStar /> },
        { name: 'Admission Guide', link: '/college-tools', icon: <FaBook /> }
      ]
    },
    {
      name: 'Career Resources',
      icon: <FaUsers className="text-green-600" />,
      items: [
        { name: 'Career Counseling', link: '/career-resources', icon: <FaUsers /> },
        { name: 'Job Prospects', link: '/career-resources', icon: <FaChartLine /> },
        { name: 'Industry Trends', link: '/career-resources', icon: <FaChartLine /> },
        { name: 'Skill Development', link: '/career-resources', icon: <FaBook /> }
      ]
    },
    {
      name: 'Exam Preparation',
      icon: <FaBook className="text-purple-600" />,
      items: [
        { name: 'JEE Main', link: '/exam-preparation', icon: <FaBook /> },
        { name: 'NEET', link: '/exam-preparation', icon: <FaBook /> },
        { name: 'CAT', link: '/exam-preparation', icon: <FaBook /> },
        { name: 'GATE', link: '/exam-preparation', icon: <FaBook /> }
      ]
    },
    {
      name: 'Study Abroad',
      icon: <FaMapMarkerAlt className="text-orange-600" />,
      items: [
        { name: 'US Universities', link: '/study-abroad', icon: <FaUniversity /> },
        { name: 'UK Universities', link: '/study-abroad', icon: <FaUniversity /> },
        { name: 'Australia', link: '/study-abroad', icon: <FaUniversity /> },
        { name: 'Canada', link: '/study-abroad', icon: <FaUniversity /> }
      ]
    }
  ];

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleMobileDropdownClick = (dropdownName) => {
    setMobileDropdownOpen(mobileDropdownOpen === dropdownName ? null : dropdownName);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-[1003]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-teal-600 text-white p-2 rounded-lg">
                <FaGraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">CollegeInfo</span>
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Colleges Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => handleDropdownClick('colleges')}
                className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <FaBuilding className="h-4 w-4" />
                <span>Colleges</span>
                <FaChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === 'colleges' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'colleges' && (
                <>
                  {/* Overlay */}
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]" onClick={() => setActiveDropdown(null)} />
                  
                  {/* Dropdown */}
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen max-w-6xl bg-white border border-gray-200 rounded-lg shadow-xl z-[1002] max-h-[80vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collegeCategories.map((section, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center space-x-2 text-teal-600 font-semibold">
                              {section.icon}
                              <span>{section.name}</span>
                            </div>
                            <ul className="space-y-2">
                              {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link
                                    to={item.link}
                                    className="block text-gray-600 hover:text-teal-600 hover:bg-gray-50 px-2 py-1 rounded text-sm transition-colors cursor-pointer"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setActiveDropdown(null);
                                      console.log('Navigating to:', item.link);
                                      navigate(item.link);
                                    }}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Tools & Resources Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => handleDropdownClick('tools')}
                className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <FaCalculator className="h-4 w-4" />
                <span>Tools</span>
                <FaChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'tools' && (
                <>
                  {/* Overlay */}
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]" onClick={() => setActiveDropdown(null)} />
                  
                  {/* Dropdown */}
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen max-w-6xl bg-white border border-gray-200 rounded-lg shadow-xl z-[1002]">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Tools & Resources</h3>
                        <button
                          onClick={() => setActiveDropdown(null)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <FaTimes className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-8">
                        {toolsAndResources.map((section, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center space-x-2 text-teal-600 font-semibold">
                              {section.icon}
                              <span>{section.name}</span>
                            </div>
                            <ul className="space-y-2">
                              {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link
                                    to={item.link}
                                    className="block text-gray-600 hover:text-teal-600 hover:bg-gray-50 px-2 py-1 rounded text-sm transition-colors"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Direct Links */}
            <Link to="/colleges" className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Browse All Colleges
            </Link>
            <Link to="/resume-builder" className="flex items-center space-x-1 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
              <FaFileAlt className="h-4 w-4" />
              <span className="hidden sm:block">Resume Builder</span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search colleges..."
                className="pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => handleSearchKeyPress(e)}
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-700"
              >
                <FaSearch className="h-4 w-4" />
              </button>
            </div>

            {/* Conditional rendering based on authentication */}
            {user ? (
              // Logged in user
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaUser className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:block">{user.firstName || user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <FaSignOutAlt className="h-4 w-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              // Not logged in
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                >
                  <FaSignInAlt className="h-4 w-4" />
                  <span className="hidden sm:block">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                >
                  <FaUserPlus className="h-4 w-4" />
                  <span className="hidden sm:block">Sign Up</span>
                </Link>
              </div>
            )}

            {/* Admin Link */}
            <Link
              to="/admin/login"
              className="flex items-center space-x-1 bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
            >
              <FaCog className="h-4 w-4" />
              <span className="hidden sm:block">Admin</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search colleges..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  onKeyPress={(e) => handleSearchKeyPress(e, true)}
                />
                <button
                  onClick={() => handleSearch(mobileSearchQuery, true)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-700"
                >
                  <FaSearch className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile Colleges Dropdown */}
              <div className="mb-4">
                <button
                  onClick={() => handleMobileDropdownClick('colleges')}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md text-sm font-medium"
                >
                  <div className="flex items-center space-x-2">
                    <FaBuilding className="h-4 w-4" />
                    <span>Colleges</span>
                  </div>
                  <FaChevronDown className={`h-3 w-3 transition-transform ${mobileDropdownOpen === 'colleges' ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileDropdownOpen === 'colleges' && (
                  <div className="mt-2 ml-4 space-y-2">
                    {collegeCategories.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center space-x-2 text-teal-600 font-semibold text-sm">
                          {section.icon}
                          <span>{section.name}</span>
                        </div>
                        <div className="ml-4 space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <button
                              key={itemIndex}
                              className="block w-full text-left text-gray-600 hover:text-teal-600 px-2 py-1 rounded text-sm cursor-pointer"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileDropdownOpen(null);
                                console.log('Mobile navigating to:', item.link);
                                navigate(item.link);
                              }}
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Tools Dropdown */}
              <div className="mb-4">
                <button
                  onClick={() => handleMobileDropdownClick('tools')}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md text-sm font-medium"
                >
                  <div className="flex items-center space-x-2">
                    <FaCalculator className="h-4 w-4" />
                    <span>Tools</span>
                  </div>
                  <FaChevronDown className={`h-3 w-3 transition-transform ${mobileDropdownOpen === 'tools' ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileDropdownOpen === 'tools' && (
                  <div className="mt-2 ml-4 space-y-2">
                    {toolsAndResources.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center space-x-2 text-teal-600 font-semibold text-sm">
                          {section.icon}
                          <span>{section.name}</span>
                        </div>
                        <div className="ml-4 space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={item.link}
                              className="block text-gray-600 hover:text-teal-600 px-2 py-1 rounded text-sm"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileDropdownOpen(null);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              <Link
                to="/colleges"
                className="block px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse All Colleges
              </Link>

              {/* Mobile Auth Links */}
              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center px-3 py-2 text-gray-700">
                    <FaUser className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{user.firstName || user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md text-sm font-medium"
                  >
                    <FaSignOutAlt className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-md text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaSignInAlt className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-md text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Admin Link */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/admin/login"
                  className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-md text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaCog className="h-4 w-4 mr-2" />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;