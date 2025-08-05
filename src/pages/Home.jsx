import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Award, Users, BookOpen, Globe, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (selectedCategory !== 'All Categories') params.append('category', selectedCategory);
    if (selectedLocation !== 'All Locations') params.append('location', selectedLocation);
    
    navigate(`/colleges?${params.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const popularCategories = [
    { name: 'Engineering', icon: '⚙️', count: '500+', link: '/colleges?category=Engineering' },
    { name: 'Medical', icon: '🏥', count: '200+', link: '/colleges?category=Medical' },
    { name: 'MBA', icon: '💼', count: '300+', link: '/colleges?category=MBA' },
    { name: 'Law', icon: '⚖️', count: '150+', link: '/colleges?category=Law' },
    { name: 'Arts', icon: '🎨', count: '400+', link: '/colleges?category=Arts' },
    { name: 'Science', icon: '🔬', count: '350+', link: '/colleges?category=Science' },
    { name: 'Commerce', icon: '📊', count: '250+', link: '/colleges?category=Commerce' },
    { name: 'University', icon: '🏛️', count: '100+', link: '/colleges?category=University' },
    { name: 'College', icon: '🎓', count: '800+', link: '/colleges?category=College' },
    { name: 'Research', icon: '🔬', count: '50+', link: '/colleges?category=Research' },
    { name: 'Architecture', icon: '🏗️', count: '80+', link: '/colleges?category=Architecture' },
    { name: 'Agriculture', icon: '🌾', count: '120+', link: '/colleges?category=Agriculture' },
    { name: 'Innovation', icon: '💡', count: '30+', link: '/colleges?category=Innovation' },
    { name: 'OpenUniversity', icon: '🌐', count: '15+', link: '/colleges?category=OpenUniversity' },
    { name: 'SkillUniversity', icon: '🛠️', count: '15+', link: '/colleges?category=SkillUniversity' },
    { name: 'StatePublicUniversity', icon: '🏛️', count: '50+', link: '/colleges?category=StatePublicUniversity' }
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Explore colleges by category and find your perfect match
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {popularCategories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose CollegeInfo?
            </h2>
            <p className="text-gray-600 text-lg">
              Your trusted partner in finding the perfect college
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-teal-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Search</h3>
              <p className="text-gray-600">Find colleges based on location, course, and preferences</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Data</h3>
              <p className="text-gray-600">Accurate and up-to-date information from official sources</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Reviews</h3>
              <p className="text-gray-600">Real experiences from current and former students</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Course Details</h3>
              <p className="text-gray-600">Comprehensive information about courses and curriculum</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect College?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Start your journey towards a successful career today
          </p>
          <Link
            to="/colleges"
            className="inline-block bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse All Colleges
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;