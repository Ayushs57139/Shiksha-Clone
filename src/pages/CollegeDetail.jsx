import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Award, Phone, Mail, Globe, Users, Calendar, DollarSign } from 'lucide-react';

const CollegeDetail = () => {
  const { slug } = useParams();
  const [college, setCollege] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock data - replace with API call
    const mockCollege = {
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi',
      rating: 4.8,
      fees: '₹2.5 Lakhs',
      established: 1961,
      students: 8000,
      courses: 45,
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800',
      gallery: [
        'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      highlights: ['NIRF Ranking #2', 'Top Placements', 'Research Excellence'],
      description: 'Indian Institute of Technology Delhi is one of the premier engineering institutions in India. Established in 1961, IIT Delhi has been a leader in engineering education and research.',
      contact: {
        phone: '+91-11-2659-1000',
        email: 'info@iitd.ac.in',
        website: 'https://home.iitd.ac.in'
      },
      admissions: {
        process: 'JEE Advanced',
        deadline: 'June 30, 2024',
        seats: 1200,
        eligibility: '75% in 12th or top 20 percentile'
      },
      placements: {
        averagePackage: '₹18 LPA',
        highestPackage: '₹1.2 Crore',
        placementRate: '95%',
        topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs']
      },
      facilities: [
        'Central Library',
        'Research Labs',
        'Sports Complex',
        'Hostels',
        'Medical Center',
        'Cafeteria'
      ],
      courseList: [
        { name: 'B.Tech Computer Science', duration: '4 years', fees: '₹2.5 Lakhs' },
        { name: 'B.Tech Mechanical', duration: '4 years', fees: '₹2.5 Lakhs' },
        { name: 'M.Tech', duration: '2 years', fees: '₹2 Lakhs' },
        { name: 'PhD', duration: '3-5 years', fees: '₹1 Lakh' }
      ]
    };
    setCollege(mockCollege);
  }, [slug]);

  if (!college) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'courses', name: 'Courses' },
    { id: 'admissions', name: 'Admissions' },
    { id: 'placements', name: 'Placements' },
    { id: 'facilities', name: 'Facilities' },
    { id: 'reviews', name: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <h1 className="text-3xl font-bold mb-4">{college.name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={20} className="mr-2" />
                  <span>{college.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-current mr-1" size={20} />
                  <span className="font-medium">{college.rating}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award size={20} className="mr-2" />
                  <span>Est. {college.established}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {college.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">{college.description}</p>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Fees</span>
                    <span className="font-medium text-primary">{college.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students</span>
                    <span className="font-medium">{college.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Courses</span>
                    <span className="font-medium">{college.courses}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone size={16} className="mr-3 text-gray-400" />
                    <span className="text-sm">{college.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-3 text-gray-400" />
                    <span className="text-sm">{college.contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe size={16} className="mr-3 text-gray-400" />
                    <a href={college.contact.website} className="text-sm text-primary hover:underline">
                      Official Website
                    </a>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Apply Now
                </button>
                <button className="w-full border border-primary text-primary py-3 px-4 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">About {college.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{college.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Users className="text-primary mr-2" size={20} />
                      <span className="font-medium">Students</span>
                    </div>
                    <p className="text-2xl font-bold">{college.students.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar className="text-primary mr-2" size={20} />
                      <span className="font-medium">Established</span>
                    </div>
                    <p className="text-2xl font-bold">{college.established}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DollarSign className="text-primary mr-2" size={20} />
                      <span className="font-medium">Annual Fees</span>
                    </div>
                    <p className="text-2xl font-bold">{college.fees}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Available Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {college.courseList.map((course, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{course.name}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Duration: {course.duration}</p>
                        <p>Fees: {course.fees}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'admissions' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Admission Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Admission Process</h4>
                      <p className="text-gray-700">{college.admissions.process}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Application Deadline</h4>
                      <p className="text-gray-700">{college.admissions.deadline}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Total Seats</h4>
                      <p className="text-gray-700">{college.admissions.seats.toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Eligibility</h4>
                      <p className="text-gray-700">{college.admissions.eligibility}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'placements' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Placement Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">{college.placements.averagePackage}</p>
                    <p className="text-sm text-gray-600">Average Package</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">{college.placements.highestPackage}</p>
                    <p className="text-sm text-gray-600">Highest Package</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">{college.placements.placementRate}</p>
                    <p className="text-sm text-gray-600">Placement Rate</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Top Recruiters</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.placements.topRecruiters.map((recruiter, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {recruiter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'facilities' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Campus Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {college.facilities.map((facility, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium">{facility}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
                <p className="text-gray-600">Reviews will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;