import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import mockData from './mockData';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [openMainMenu, setOpenMainMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMainMenu = (key) => {
    setOpenMainMenu(openMainMenu === key ? null : key);
    setOpenSubMenu(null);
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
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#007075] text-white relative z-[1000] shadow" ref={menuRef}>
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 ml-32">
          {/* <img src="/shiksha-logo.svg" alt="Shiksha" className="h-8" /> */}
          <span className="text-2xl font-semibold">shiksha</span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-3xl mx-6 hidden md:flex"
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
        <div className="space-x-4 text-sm font-medium hidden md:flex ">
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
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex justify-center items-center px-6 py-2 space-x-4 text-xs font-semibold ">
        {mockData.map((menu) => (
          <div key={menu.key} className="">
            <button
              onClick={() => toggleMainMenu(menu.key)}
              onMouseEnter={() => toggleMainMenu(menu.key)}
              className="flex items-center gap-1 px-2 py-1 hover:underline"
            >
              {menu.title}
              <FaChevronDown
                className={`transition-transform duration-200 ${openMainMenu === menu.key ? 'rotate-180' : ''
                  }`}
                size={10}
              />
            </button>

            {openMainMenu === menu.key && (
              <div 
                className="absolute top-[92%] left-[26%] mt-2 w-[800px] bg-white text-black border rounded shadow-xl z-[1000] flex"
                onMouseLeave={() => setOpenMainMenu(null)}
              >
                {/* Left side - Categories */}
                <div className="w-1/3 border-r bg-gray-50">
                  {menu.submenus.map((submenu) => (
                    <div
                      key={submenu.key}
                      onMouseEnter={() => setHoveredSubMenu(submenu.key)}
                      className={`cursor-pointer p-3 text-sm border-b hover:bg-teal-50 ${
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
                <div className="w-2/3 p-4">
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
                                  className="block px-2 py-1 text-sm text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded"
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
            )}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Navbar;