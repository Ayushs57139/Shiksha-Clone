import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Award, Users, BookOpen, Globe, Star } from 'lucide-react';

const Home = () => {
  const popularCategories = [
    { name: 'Engineering', icon: '⚙️', count: '5000+', path: '/colleges?category=engineering' },
    { name: 'MBA', icon: '💼', count: '3000+', path: '/colleges?category=mba' },
    { name: 'Medical', icon: '🏥', count: '2000+', path: '/colleges?category=medical' },
    { name: 'Law', icon: '⚖️', count: '1500+', path: '/colleges?category=law' },
    { name: 'Arts', icon: '🎨', count: '2500+', path: '/colleges?category=arts' },
    { name: 'Science', icon: '🔬', count: '1800+', path: '/colleges?category=science' }
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
              <select className="flex-1 px-4 py-3 rounded-lg text-gray-700 border-0 focus:outline-none">
                <option>All Categories</option>
                <option>Engineering</option>
                <option>MBA</option>
                <option>Medical</option>
                <option>Law</option>
              </select>
              <input
                type="text"
                placeholder="Search colleges, courses, exams..."
                className="flex-2 px-4 py-3 rounded-lg text-gray-700 border-0 focus:outline-none"
              />
              <select className="flex-1 px-4 py-3 rounded-lg text-gray-700 border-0 focus:outline-none">
                <option>All Locations</option>
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Chennai</option>
              </select>
              <button className="btn-primary">
                <Search size={20} />
              </button>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="card p-6 text-center hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} Colleges</p>
              </Link>
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