import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const mockData = [
  {
    title: 'MBA',
    key: 'mba',
    submenus: [
      { title: 'Top Ranked Colleges', key: 'mba-ranked', links: [
        { label: 'Top MBA Colleges in India', to: '/top-mba-india' },
        { label: 'Top Private MBA Colleges in India', to: '/top-private-mba' },
        { label: 'Top MBA Colleges in Bangalore', to: '/top-mba-bangalore' },
        { label: 'Top MBA Colleges in Mumbai', to: '/top-mba-mumbai' },
        { label: 'Top MBA Colleges in Hyderabad', to: '/top-mba-hyderabad' },
        { label: 'Top MBA Colleges in Delhi', to: '/top-mba-delhi' },
        { label: 'Top MBA Colleges in Chennai', to: '/top-mba-chennai' },
        { label: 'Top MBA Colleges in Maharashtra', to: '/top-mba-maharashtra' }
      ]},
      { title: 'Popular Courses', key: 'mba-courses', links: [
        { label: 'MBA/PGDM', to: '/mba-pgdm' },
        { label: 'MBA in HR', to: '/mba-hr' },
        { label: 'Distance MBA', to: '/distance-mba' },
        { label: 'Online MBA', to: '/online-mba' },
        { label: 'Part-Time MBA', to: '/part-time-mba' }
      ]},
      { title: 'Popular Specializations', key: 'mba-specializations', links: [
        { label: 'MBA in Finance', to: '/mba-finance' },
        { label: 'MBA in Healthcare Management', to: '/mba-healthcare' },
        { label: 'MBA in HR', to: '/mba-hr' },
        { label: 'MBA in IT', to: '/mba-it' }
      ]},
      { title: 'Exams', key: 'mba-exams', links: [
        { label: 'CAT', to: '/cat' },
        { label: 'CMAT', to: '/cmat' },
        { label: 'SNAP', to: '/snap' }
      ]},
      { title: 'College By Location', key: 'mba-location', links: [
        { label: 'MBA Colleges in India', to: '/mba-colleges-india' },
        { label: 'MBA Colleges in Bangalore', to: '/mba-colleges-bangalore' },
        { label: 'MBA Colleges in Chennai', to: '/mba-colleges-chennai' }
      ]},
      { title: 'Compare Colleges', key: 'mba-compare', links: [
        { label: 'IIM Ahmedabad Vs IIM Bangalore', to: '/iim-ahmedabad-vs-bangalore' }
      ]},
      { title: 'College Reviews', key: 'mba-reviews', links: [
        { label: 'IIM Ahmedabad Reviews', to: '/iim-ahmedabad-reviews' }
      ]},
      { title: 'CAT Percentile Predictor', key: 'mba-predictor', links: [
        { label: 'CAT College Predictor', to: '/cat-college-predictor' }
      ]},
      { title: 'Ask Current MBA Students', key: 'mba-ask', links: [
        { label: 'Popular Colleges', to: '/popular-colleges' }
      ]},
      { title: 'Resources', key: 'mba-resources', links: [
        { label: 'MBA Alumni Salary Data', to: '/mba-alumni-salary' }
      ]}
    ]
  },
  {
    title: 'ENGINEERING',
    key: 'engineering',
    submenus: [
      { title: 'Top Ranked Colleges', key: 'engg-ranked', links: [
        { label: 'Top Engineering Colleges in India', to: '/top-engg-india' },
        { label: 'Top Private Engineering Colleges in India', to: '/top-private-engg-india' },
        { label: 'Top IITs in India', to: '/top-iits-india' }
      ]},
      { title: 'Popular Courses', key: 'engg-courses', links: [
        { label: 'B.Tech/B.E', to: '/btech-be' },
        { label: 'M.Tech/M.E', to: '/mtech-me' }
      ]},
      { title: 'Popular Specializations', key: 'engg-specializations', links: [
        { label: 'Computer Science Engineering', to: '/cse' },
        { label: 'Mechanical Engineering', to: '/mechanical' }
      ]},
      { title: 'Exams', key: 'engg-exams', links: [
        { label: 'JEE Main', to: '/jee-main' },
        { label: 'JEE Advanced', to: '/jee-advanced' }
      ]},
      { title: 'Colleges By Location', key: 'engg-location', links: [
        { label: 'Engineering Colleges in Bangalore', to: '/engg-bangalore' }
      ]},
      { title: 'Compare Colleges', key: 'engg-compare', links: [
        { label: 'IIT Bombay vs IIT Delhi', to: '/iit-bombay-vs-delhi' }
      ]},
      { title: 'Rank Predictors', key: 'engg-rank-predictors', links: [
        { label: 'JEE Main Rank Predictor', to: '/jee-main-rank-predictor' }
      ]},
      { title: 'College Predictors', key: 'engg-college-predictors', links: [
        { label: 'JEE Main College Predictor', to: '/jee-main-college-predictor' }
      ]},
      { title: 'College Reviews', key: 'engg-reviews', links: [
        { label: 'IIT Bombay Reviews', to: '/iit-bombay-reviews' }
      ]},
      { title: 'Resources', key: 'engg-resources', links: [
        { label: 'Engineering Salary Data', to: '/engineering-salary-data' }
      ]}
    ]
  },
  {
    title: 'MEDICAL',
    key: 'medical',
    submenus: [
      { title: 'Top Ranked Colleges', key: 'medical-top', links: [
        { label: 'Top Medical Colleges in India', to: '/top-medical-colleges-india' }
      ]},
      { title: 'Popular Courses', key: 'medical-courses', links: [
        { label: 'MBBS', to: '/mbbs' }
      ]},
      { title: 'Popular Specializations', key: 'medical-specializations', links: [
        { label: 'Alternative Medicine', to: '/alternative-medicine' }
      ]},
      { title: 'Exams', key: 'medical-exams', links: [
        { label: 'NEET UG', to: '/neet-ug' }
      ]},
      { title: 'Colleges By Location', key: 'medical-location', links: [
        { label: 'Medical Colleges in India', to: '/medical-colleges-india' }
      ]},
      { title: 'College Predictors', key: 'medical-predictors', links: [
        { label: 'NEET 2022 College Predictor', to: '/neet-2022-college-predictor' }
      ]},
      { title: 'Resources', key: 'medical-resources', links: [
        { label: 'Ask a Question', to: '/ask-a-question' }
      ]}
    ]
  },
  {
    title: 'DESIGN',
    key: 'design',
    submenus: [
      { title: 'Top Ranked Colleges', key: 'design-courses', links: [
        { label: 'Top Fashion Designing Colleges in India', to: '/top-fashion-designing-colleges-india' }
      ]},
      { title: 'Popular Specializations', key: 'design-specializations', links: [
        { label: 'Fashion Designing', to: '/fashion-designing' }
      ]},
      { title: 'Popular Courses', key: 'design-courses', links: [
        { label: 'B.Des', to: '/bdes' }
      ]},
      { title: 'Exams', key: 'design-exams', links: [
        { label: 'NIFT Entrance Exam', to: '/nift-entrance-exam' }
      ]},
      { title: 'College Predictors', key: 'design-predictors', links: [
        { label: 'NIFT College Predictor', to: '/nift-college-predictor' }
      ]},
      { title: 'Colleges By Location', key: 'design-location', links: [
        { label: 'Design Colleges in India', to: '/design-colleges-india' }
      ]},
      { title: 'Resources', key: 'design-resources', links: [
        { label: 'Ask a Question', to: '/ask-a-question' }
      ]}
    ]
  },
  {
    title: 'STUDY ABROAD',
    key: 'abroad',
    submenus: [
      { title: 'By Country', key: 'abroad-country', links: [
        { label: 'Top Universities in USA', to: '/top-universities-usa' }
      ]},
      { title: 'Exams', key: 'abroad-exams', links: [
        { label: 'IELTS', to: '/ielts' }
      ]},
      { title: 'Popular Programs', key: 'abroad-programs', links: [
        { label: 'MS in USA', to: '/ms-usa' }
      ]},
      { title: 'Popular Specialization', key: 'abroad-specializations', links: [
        { label: 'MS in Computer Science', to: '/ms-computer-science' }
      ]},
      { title: 'Student Visas', key: 'abroad-visas', links: [
        { label: 'Student Visa Canada', to: '/student-visa-canada' }
      ]},
      { title: 'SOP/LOR', key: 'abroad-soplor', links: [
        { label: 'What is SOP?', to: '/what-is-sop' }
      ]},
      { title: 'Scholarships', key: 'abroad-scholarships', links: [
        { label: 'Scholarships for Bachelors', to: '/scholarships-bachelors' }
      ]},
      { title: 'Services', key: 'abroad-services', links: [
        { label: 'Consultants in Delhi', to: '/consultants-delhi' }
      ]}
    ]
  },
  {
    title: 'COUNSELING',
    key: 'counseling',
    submenus: [
      { title: 'Get Expert Guidance', key: 'counsel-guidance', links: [
        { label: 'Ask a Question', to: '/career-counsel' }
      ]},
      { title: 'Careers After 12th', key: 'counsel-careers', links: [
        { label: 'Science', to: '/careers-science' }
      ]},
      { title: 'Courses After 12th', key: 'counsel-courses', links: [
        { label: 'Science Stream', to: '/science-stream' }
      ]},
      { title: 'Free Prep Material', key: 'counsel-prep', links: [
        { label: 'NCERT Solutions', to: '/ncert-solutions' }
      ]},
      { title: 'National Boards', key: 'counsel-boards', links: [
        { label: 'CBSE', to: '/cbse' }
      ]},
      { title: 'State Boards', key: 'counsel-state-boards', links: [
        { label: 'UPMSP', to: '/upmsp' }
      ]},
      { title: 'Abroad Counseling Service', key: 'counsel-abroad', links: [
        { label: 'Career Counseling', to: '/career-counsel' }
      ]},
      { title: 'Get Free Counselling', key: 'counsel-free', links: [] }
    ]
  },
  {
    title: 'SHIKSHA ONLINE',
    key: 'online',
    submenus: [
      { title: 'Technology', key: 'online-technology', links: [
        { label: 'Big Data', to: '/technology/big-data' }
      ]},
      { title: 'Data Science', key: 'online-data-science', links: [
        { label: 'Data Science Basics', to: '/data-science/basics' }
      ]},
      { title: 'Management', key: 'online-management', links: [
        { label: 'Business Analytics', to: '/management/business-analytics' }
      ]},
      { title: 'Finance', key: 'online-finance', links: [
        { label: 'Accounting', to: '/finance-law/accounting' }
      ]},
      { title: 'Creativity & Design', key: 'online-creativity-design', links: [
        { label: 'Architecture', to: '/design-creative/architecture' }
      ]},
      { title: 'Emerging Technologies', key: 'online-emerging-tech', links: [
        { label: 'AR VR and Gaming', to: '/emerging-technologies/ar-vr-gaming' }
      ]},
      { title: 'Engineering-Non CS', key: 'online-engineering-noncs', links: [
        { label: 'Aviation', to: '/engineering/aviation' }
      ]},
      { title: 'Healthcare', key: 'online-healthcare', links: [
        { label: 'Fitness and Nutrition', to: '/healthcare/fitness-nutrition' }
      ]},
      { title: 'Energy And Environment', key: 'online-energy-env', links: [
        { label: 'Energy', to: '/energy-environment/energy' }
      ]},
      { title: 'Social Sciences', key: 'online-social-sciences', links: [
        { label: 'Education', to: '/education/education' }
      ]},
      { title: 'Personal Development', key: 'online-personal-development', links: [
        { label: 'Career Growth', to: '/career-growth/career-growth' }
      ]},
      { title: 'Degree Programs', key: 'online-degree-programs', links: [
        { label: 'Bachelors Program', to: '/courses/bachelors-program' }
      ]},
      { title: 'Blog', key: 'online-blog', links: [] }
    ]
  }
];


const ShikshaStyleNavbar = () => {
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
                className="absolute top-[92%] left-[24%] mt-2 w-[800px] bg-white text-black border rounded shadow-xl z-[1000] flex"
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

export default ShikshaStyleNavbar;
