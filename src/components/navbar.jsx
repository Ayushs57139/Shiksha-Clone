import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaGraduationCap, FaBuilding, FaUsers, FaChartLine, FaMapMarkerAlt, FaStar, FaBook, FaFlask, FaBalanceScale, FaPills, FaPalette, FaCalculator, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaCog, FaBars, FaTimes, FaUniversity, FaMicroscope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
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

  const collegeCategories = [
    {
      name: 'Universities',
      icon: <FaUniversity />,
      items: [
        { name: 'All Universities', link: '/colleges?category=University' },
        { name: 'State Universities', link: '/colleges?category=University&filter=state' },
        { name: 'Private Universities', link: '/colleges?category=University&filter=private' },
        { name: 'Universities by Location', link: '/colleges/university-by-location' }
      ]
    },
    {
      name: 'Colleges',
      icon: <FaGraduationCap />,
      items: [
        { name: 'All Colleges', link: '/colleges?category=College' },
        { name: 'Government Colleges', link: '/colleges?category=College&filter=government' },
        { name: 'Private Colleges', link: '/colleges?category=College&filter=private' },
        { name: 'Colleges by Location', link: '/colleges/college-by-location' }
      ]
    },
    {
      name: 'Engineering Colleges',
      icon: <FaGraduationCap />,
      items: [
        { name: 'Top Engineering Colleges', link: '/colleges?category=Engineering' },
        { name: 'IITs', link: '/colleges?category=IIT' },
        { name: 'NITs', link: '/colleges?category=NIT' },
        { name: 'Private Engineering Colleges', link: '/colleges?category=Private' },
        { name: 'Engineering by Location', link: '/colleges/engineering-by-location' }
      ]
    },
    {
      name: 'Medical Colleges',
      icon: <FaFlask />,
      items: [
        { name: 'Top Medical Colleges', link: '/colleges?category=Medical' },
        { name: 'AIIMS', link: '/colleges?category=Medical&filter=aiims' },
        { name: 'Medical Colleges by Location', link: '/colleges/medical-by-location' },
        { name: 'Dental Colleges', link: '/colleges?category=Dental' },
        { name: 'Pharmacy Colleges', link: '/colleges?category=Pharmacy' }
      ]
    },
    {
      name: 'Law Colleges',
      icon: <FaBalanceScale />,
      items: [
        { name: 'Top Law Colleges', link: '/colleges?category=Law' },
        { name: 'National Law Schools', link: '/colleges?category=Law&filter=nls' },
        { name: 'Law Colleges by Location', link: '/colleges/law-by-location' },
        { name: 'Corporate Law', link: '/colleges?category=Law&filter=corporate' },
        { name: 'Criminal Law', link: '/colleges?category=Law&filter=criminal' }
      ]
    },
    {
      name: 'Management Colleges',
      icon: <FaChartLine />,
      items: [
        { name: 'Top MBA Colleges', link: '/colleges?category=MBA' },
        { name: 'IIMs', link: '/colleges?category=MBA&filter=iim' },
        { name: 'Private MBA Colleges', link: '/colleges?category=MBA&filter=private' },
        { name: 'MBA by Location', link: '/colleges/mba-by-location' }
      ]
    },
    {
      name: 'Research Institutions',
      icon: <FaMicroscope />,
      items: [
        { name: 'All Research Institutions', link: '/colleges?category=Research' },
        { name: 'IITs & NITs', link: '/colleges?category=Research&filter=iit-nit' },
        { name: 'Research Institutions by Location', link: '/colleges/research-by-location' }
      ]
    },
    {
      name: 'Other Categories',
      icon: <FaBuilding />,
      items: [
        { name: 'Arts & Design', link: '/colleges?category=Arts' },
        { name: 'Science Colleges', link: '/colleges?category=Science' },
        { name: 'Commerce Colleges', link: '/colleges?category=Commerce' },
        { name: 'Architecture Colleges', link: '/colleges?category=Architecture' }
      ]
    }
  ];

  const toolsAndResources = [
    {
      name: 'College Tools',
      icon: <FaCalculator />,
      items: [
        { name: 'College Predictor', link: '/predictor' },
        { name: 'Compare Colleges', link: '/compare' },
        { name: 'College Reviews', link: '/reviews' },
        { name: 'Admission Guide', link: '/admission-guide' },
        { name: 'Scholarship Info', link: '/scholarships' }
      ]
    },
    {
      name: 'Exams & Admissions',
      icon: <FaBook />,
      items: [
        { name: 'JEE Main', link: '/exams/jee-main' },
        { name: 'JEE Advanced', link: '/exams/jee-advanced' },
        { name: 'NEET', link: '/exams/neet' },
        { name: 'CAT', link: '/exams/cat' },
        { name: 'CLAT', link: '/exams/clat' }
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

            {/* Tools & Resources Dropdown */}
            <div className="relative">
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
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen max-w-4xl bg-white border border-gray-200 rounded-lg shadow-xl z-[1002]">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Link to="/about" className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm w-48"
              />
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
                />
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
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
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