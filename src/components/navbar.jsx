import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaGraduationCap, FaBuilding, FaUsers, FaChartLine, FaMapMarkerAlt, FaStar, FaBook, FaFlask, FaBalanceScale, FaPills, FaPalette, FaCalculator, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      name: 'Engineering Colleges',
      icon: <FaGraduationCap />,
      items: [
        { name: 'Top Engineering Colleges', link: '/colleges/top-engineering' },
        { name: 'IITs', link: '/colleges/iits' },
        { name: 'NITs', link: '/colleges/nits' },
        { name: 'Private Engineering Colleges', link: '/colleges/private' },
        { name: 'Engineering by Location', link: '/colleges' }
      ]
    },
    {
      name: 'Medical Colleges',
      icon: <FaFlask />,
      items: [
        { name: 'Top Medical Colleges', link: '/colleges?category=Medical' },
        { name: 'AIIMS', link: '/colleges?category=Medical&filter=aiims' },
        { name: 'Medical Colleges by Location', link: '/colleges?category=Medical' },
        { name: 'Dental Colleges', link: '/colleges?category=Medical&filter=dental' },
        { name: 'Pharmacy Colleges', link: '/colleges?category=Pharmacy' }
      ]
    },
    {
      name: 'Management Colleges',
      icon: <FaChartLine />,
      items: [
        { name: 'Top MBA Colleges', link: '/colleges?category=Management' },
        { name: 'IIMs', link: '/colleges?category=Management&filter=iim' },
        { name: 'Private MBA Colleges', link: '/colleges?category=Management&filter=private' },
        { name: 'MBA by Location', link: '/colleges?category=Management' },
        { name: 'Executive MBA', link: '/colleges?category=Management&filter=executive' }
      ]
    },
    {
      name: 'Law Colleges',
      icon: <FaBalanceScale />,
      items: [
        { name: 'Top Law Colleges', link: '/colleges?category=Law' },
        { name: 'National Law Schools', link: '/colleges?category=Law&filter=nls' },
        { name: 'Law Colleges by Location', link: '/colleges?category=Law' },
        { name: 'Corporate Law', link: '/colleges?category=Law&filter=corporate' },
        { name: 'Criminal Law', link: '/colleges?category=Law&filter=criminal' }
      ]
    },
    {
      name: 'Other Categories',
      icon: <FaBuilding />,
      items: [
        { name: 'Pharmacy Colleges', link: '/colleges?category=Pharmacy' },
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
            <div className="relative">
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
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen max-w-4xl bg-white border border-gray-200 rounded-lg shadow-xl z-[1002]">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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