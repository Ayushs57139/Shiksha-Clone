import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Award, Users, BookOpen, Globe, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Build the search URL with parameters
      let searchUrl = '/colleges?';
      const params = new URLSearchParams();
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      if (selectedCategory !== 'All Categories') {
        params.append('category', selectedCategory);
      }
      if (selectedLocation !== 'All Locations') {
        params.append('location', selectedLocation);
      }
      
      navigate(`/colleges?${params.toString()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const popularCategories = [
    { name: 'Engineering', icon: '⚙️', count: '5000+', category: 'Engineering' },
    { name: 'MBA', icon: '💼', count: '3000+', category: 'MBA' },
    { name: 'Medical', icon: '🏥', count: '2000+', category: 'Medical' },
    { name: 'Law', icon: '⚖️', count: '1500+', category: 'Law' },
    { name: 'Arts', icon: '🎨', count: '2500+', category: 'Arts' },
    { name: 'Science', icon: '🔬', count: '1800+', category: 'Science' },
    { name: 'Research', icon: '🔬', count: '20+', category: 'Research' },
    { name: 'Agriculture', icon: '🌾', count: '40+', category: 'Agriculture' },
    { name: 'Architecture', icon: '🏛️', count: '20+', category: 'Architecture' },
    { name: 'Innovation', icon: '💡', count: '20+', category: 'Innovation' },
    { name: 'Open University', icon: '📚', count: '15+', category: 'OpenUniversity' },
    { name: 'Skill University', icon: '🎯', count: '15+', category: 'SkillUniversity' }
  ];

  const topColleges = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi',
      rating: 4.8,
      fees: '₹2.5 Lakhs',
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Indian Institute of Management Ahmedabad',
      location: 'Ahmedabad',
      rating: 4.9,
      fees: '₹25 Lakhs',
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'All India Institute of Medical Sciences',
      location: 'New Delhi',
      rating: 4.7,
      fees: '₹1.5 Lakhs',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const upcomingExams = [
    { name: 'JEE Main 2024', date: 'Jan 24-31, 2024', registrations: '12L+' },
    { name: 'NEET 2024', date: 'May 5, 2024', registrations: '18L+' },
    { name: 'CAT 2024', date: 'Nov 26, 2024', registrations: '3L+' },
    { name: 'GATE 2024', date: 'Feb 3-11, 2024', registrations: '9L+' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-20"
        style={{ backgroundImage: "url('2.jpg')" }} // Change to your image name
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative container mx-auto px-4 text-center z-10"></div>
        
        {/* Dark overlay to enhance text visibility */}
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>

  <div className="relative container mx-auto px-4 text-center z-10">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
      Find Your Perfect College
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md">
      Discover the best colleges, courses, and career opportunities
    </p>
          
          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-2 shadow-lg">
            <div className="flex flex-col md:flex-row gap-2">
              <select 
                className="flex-1 px-4 py-3 rounded-lg text-gray-700 border-0 focus:outline-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                <option>Engineering</option>
                <option>MBA</option>
                <option>Medical</option>
                <option>Law</option>
                <option>Arts</option>
                <option>Science</option>
                <option>Commerce</option>
                <option>University</option>
                <option>College</option>
                <option>Research</option>
                <option>Architecture</option>
                <option>Agriculture</option>
                <option>Innovation</option>
                <option>OpenUniversity</option>
                <option>SkillUniversity</option>
                <option>StatePublicUniversity</option>
              </select>
              <input
                type="text"
                placeholder="Search colleges, courses, exams..."
                className="flex-2 px-4 py-3 rounded-lg text-gray-700 border-0 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <select 
                className="flex-1 px-4 py-3 rounded-lg text-gray-700 border-0 focus:outline-none"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option>All Locations</option>
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Kolkata</option>
                <option>Hyderabad</option>
                <option>Pune</option>
                <option>Ahmedabad</option>
                <option>Jaipur</option>
                <option>Lucknow</option>
                <option>Chandigarh</option>
                <option>Bhopal</option>
                <option>Indore</option>
                <option>Patna</option>
                <option>Ranchi</option>
                <option>Bhubaneswar</option>
                <option>Guwahati</option>
                <option>Shillong</option>
                <option>Imphal</option>
                <option>Aizawl</option>
                <option>Kohima</option>
                <option>Agartala</option>
                <option>Gangtok</option>
                <option>Itanagar</option>
                <option>Dispur</option>
                <option>Shimla</option>
                <option>Dehradun</option>
                <option>Panaji</option>
                <option>Thiruvananthapuram</option>
                <option>Kochi</option>
                <option>Kozhikode</option>
                <option>Thrissur</option>
                <option>Kannur</option>
                <option>Kollam</option>
                <option>Alappuzha</option>
                <option>Palakkad</option>
                <option>Malappuram</option>
                <option>Kottayam</option>
                <option>Pathanamthitta</option>
                <option>Idukki</option>
                <option>Wayanad</option>
                <option>Kasaragod</option>
              </select>
              <button 
                className="btn-primary"
                onClick={handleSearch}
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Popular Search Suggestions */}
          <div className="mt-6 text-center">
            <p className="text-white text-sm mb-3 opacity-90">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'IIT Delhi',
                'Anna University',
                'Symbiosis',
                'IGNOU',
                'Jadavpur University',
                'Chennai',
                'Engineering',
                'Medical'
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    handleSearch();
                  }}
                  className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-30"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold">50,000+</div>
              <div className="opacity-90">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">1000+</div>
              <div className="opacity-90">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="opacity-90">Exams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10M+</div>
              <div className="opacity-90">Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {popularCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.category);
                  setSearchQuery('');
                  navigate(`/colleges?category=${category.category}`);
                }}
                className="bg-gray-50 hover:bg-teal-50 p-4 rounded-xl text-center transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-teal-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">{category.name}</h3>
                <p className="text-xs text-gray-600">{category.count}</p>
                <div className="text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1">
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Top Colleges */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Top Colleges</h2>
            <Link to="/colleges" className="btn-secondary">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topColleges.map((college) => (
              <Link key={college.id} to={`/colleges/${college.id}`} className="card overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{college.name}</h3>
                  <p className="text-gray-600 mb-2">{college.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="font-medium">{college.rating}</span>
                    </div>
                    <span className="text-primary font-semibold">{college.fees}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Exams */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Upcoming Exams</h2>
            <Link to="/exams" className="btn-secondary">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingExams.map((exam) => (
              <div key={exam.name} className="card p-6">
                <h3 className="font-semibold text-lg mb-2">{exam.name}</h3>
                <p className="text-gray-600 mb-2">{exam.date}</p>
                <p className="text-primary font-medium">{exam.registrations} Registrations</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Shiksha?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Comprehensive Database</h3>
              <p className="opacity-90">Access to 50,000+ colleges and universities</p>
            </div>
            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
              <p className="opacity-90">Get advice from education counselors</p>
            </div>
            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Reviews</h3>
              <p className="opacity-90">Read authentic student reviews and ratings</p>
            </div>
            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Study Abroad</h3>
              <p className="opacity-90">Explore international education opportunities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;