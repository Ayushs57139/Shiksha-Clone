import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import mockData from './mockData';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [openMainMenu, setOpenMainMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMainMenu = (key) => {
    setOpenMainMenu(openMainMenu === key ? null : key);
    setOpenSubMenu(null);
    setHoveredSubMenu(null);
  };

  const toggleSubMenu = (key) => {
    setOpenSubMenu(openSubMenu === key ? null : key);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMainMenu(null);
        setOpenSubMenu(null);
        setHoveredSubMenu(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#007075] text-white fixed top-0 left-0 right-0 z-[1003] shadow" ref={menuRef}>
      <div className="flex items-center justify-center px-6 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          {/* <img src="/shiksha-logo.svg" alt="Shiksha" className="h-8" /> */}
          <span className="text-xl md:text-2xl font-semibold">shiksha</span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-3xl mx-6 hidden lg:flex"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Colleges, Courses, Exams, QnA, & Articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[4px] text-black px-4 py-2 pr-20"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-5 bg-orange-500 text-white font-semibold rounded-r"
            >
              Search
            </button>
          </div>
        </form>

        {/* Login/Signup */}
        <div className="space-x-4 text-sm font-medium hidden md:flex">
          {isAuthenticated ? (
            <>
              <span>{user?.firstName}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Sign Up</Link>
            </>
          )}
          <Link to="/admin/login" className="text-orange-300 hover:text-orange-200">Admin</Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
        >
          {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Desktop Navigation Bar */}
      <div className="hidden md:flex justify-center items-center px-6 py-2 space-x-4 text-xs font-semibold relative max-w-7xl mx-auto">
        {mockData.map((menu, index) => (
          <div key={menu.key} className="relative group">
            <button
              onClick={() => toggleMainMenu(menu.key)}
              onMouseEnter={() => {
                setOpenMainMenu(menu.key);
                setHoveredSubMenu(null);
              }}
              className="flex items-center gap-1 px-2 py-1 hover:underline transition-colors duration-200"
            >
              {menu.title}
              <FaChevronDown
                className={`transition-transform duration-200 ${openMainMenu === menu.key ? 'rotate-180' : ''
                  }`}
                size={10}
              />
            </button>

            {openMainMenu === menu.key && (
              <>
                {/* Semi-transparent overlay */}
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-[1000]"
                  onClick={() => {
                    setOpenMainMenu(null);
                    setHoveredSubMenu(null);
                  }}
                  style={{ top: '120px' }}
                />
                
                {/* Dropdown menu */}
                <div 
                  className="fixed bg-white text-black border rounded shadow-xl z-[1002] flex"
                  onMouseLeave={() => {
                    setOpenMainMenu(null);
                    setHoveredSubMenu(null);
                  }}
                  style={{
                    width: '900px',
                    height: '500px',
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    position: 'fixed'
                  }}
                >
                  {/* Left side - Categories */}
                  <div className="w-1/3 border-r bg-gray-50 overflow-y-auto" style={{ height: '500px' }}>
                    {menu.submenus.map((submenu) => (
                      <div
                        key={submenu.key}
                        onMouseEnter={() => setHoveredSubMenu(submenu.key)}
                        className={`cursor-pointer p-3 text-sm border-b hover:bg-teal-50 transition-colors duration-200 ${
                          hoveredSubMenu === submenu.key ? 'bg-teal-50 text-teal-600' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {submenu.title}
                          <FaChevronRight className="text-xs text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right side - Links */}
                  <div className="w-2/3 p-4 overflow-y-auto" style={{ height: '500px' }}>
                    {hoveredSubMenu && (
                      <div>
                        {(() => {
                          const activeSubmenu = menu.submenus.find(sub => sub.key === hoveredSubMenu);
                          return (
                            <div>
                              <h3 className="font-semibold text-teal-600 mb-3">
                                {activeSubmenu?.title}
                              </h3>
                              <div className="space-y-1">
                                {activeSubmenu?.links.map((link, index) => (
                                  <a
                                    key={index}
                                    href={link.to}
                                    className="block px-2 py-1 text-sm text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded transition-colors duration-200"
                                    onClick={() => {
                                      setOpenMainMenu(null);
                                      setHoveredSubMenu(null);
                                    }}
                                  >
                                    {link.label}
                                  </a>
                                ))}
                                {activeSubmenu?.links.length === 0 && (
                                  <p className="text-gray-500 text-sm">No links available</p>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                    {!hoveredSubMenu && (
                      <div className="text-gray-500 text-sm">
                        Hover over a category to see links
                      </div>
                    )}
                    
                    {/* Featured Colleges section for first submenu */}
                    {menu.key === 'mba' && hoveredSubMenu === 'mba-ranked' && (
                      <div className="mt-6 pt-4 border-t">
                        <h4 className="font-semibold text-gray-700 mb-2">Featured Colleges</h4>
                        <p className="text-sm text-gray-600">
                          International Institute of Management Studies (IIMS Pune)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#007075] border-t">
          <div className="px-4 py-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded text-black px-4 py-2 pr-20"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-5 bg-orange-500 text-white font-semibold rounded-r"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Mobile Menu Items */}
            <div className="space-y-2">
              {mockData.map((menu) => (
                <div key={menu.key} className="border-b border-gray-600">
                  <button
                    onClick={() => toggleMainMenu(menu.key)}
                    className="flex items-center justify-between w-full p-3 text-left hover:bg-[#005a5f] transition-colors duration-200"
                  >
                    {menu.title}
                    <FaChevronDown
                      className={`transition-transform duration-200 ${openMainMenu === menu.key ? 'rotate-180' : ''}`}
                      size={12}
                    />
                  </button>
                  
                  {openMainMenu === menu.key && (
                    <div className="bg-[#005a5f] pl-4">
                      {menu.submenus.map((submenu) => (
                        <div key={submenu.key} className="border-b border-gray-600">
                          <button
                            onClick={() => toggleSubMenu(submenu.key)}
                            className="flex items-center justify-between w-full p-3 text-left hover:bg-[#004a4f] transition-colors duration-200"
                          >
                            {submenu.title}
                            <FaChevronRight
                              className={`transition-transform duration-200 ${openSubMenu === submenu.key ? 'rotate-90' : ''}`}
                              size={10}
                            />
                          </button>
                          
                          {openSubMenu === submenu.key && (
                            <div className="bg-[#004a4f] pl-4">
                              {submenu.links.map((link, index) => (
                                <a
                                  key={index}
                                  href={link.to}
                                  className="block p-2 text-sm hover:bg-[#003a3f] transition-colors duration-200"
                                  onClick={() => {
                                    setOpenMainMenu(null);
                                    setOpenSubMenu(null);
                                    setMobileMenuOpen(false);
                                  }}
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Login/Signup */}
            <div className="mt-4 pt-4 border-t border-gray-600">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <span className="block p-2">{user?.firstName}</span>
                  <button 
                    onClick={() => { logout(); navigate('/'); setMobileMenuOpen(false); }} 
                    className="block w-full text-left p-2 hover:bg-[#005a5f] transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link 
                    to="/login" 
                    className="block p-2 hover:bg-[#005a5f] transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block p-2 hover:bg-[#005a5f] transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;