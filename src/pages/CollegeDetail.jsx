import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Users, Award, Phone, Mail, Globe, Calendar, DollarSign, BookOpen } from 'lucide-react';

const CollegeDetail = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockCollege = {
      id: parseInt(id),
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
      courses: [
        { name: 'B.Tech Computer Science', duration: '4 years', fees: '₹2.5 Lakhs' },
        { name: 'B.Tech Mechanical', duration: '4 years', fees: '₹2.5 Lakhs' },
        { name: 'M.Tech', duration: '2 years', fees: '₹2 Lakhs' },
        { name: 'PhD', duration: '3-5 years', fees: '₹1 Lakh' }
      ]
    };
    setCollege(mockCollege);
  }, [id]);

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
                <button className="w-full btn-primary">Apply Now</button>
                <button className="w-full btn-secondary">Download Brochure</button>
                <button className="w-full btn-secondary">Compare College</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About the College</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {college.description} The institute offers undergraduate, postgraduate, and doctoral programs in various engineering disciplines. With state-of-the-art facilities and world-class faculty, IIT Delhi continues to be at the forefront of technological innovation and research.
              </p>
              
              <h4 className="font-semibold mb-3">Key Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{college.students.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{college.courses}</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Photo Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                {college.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Available Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {college.courses.map((course, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="font-semibold text-lg mb-2">{course.name}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fees:</span>
                      <span className="text-primary font-medium">{course.fees}</span>
                    </div>
                  </div>
                  <button className="mt-4 btn-primary w-full">View Details</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admissions' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Admission Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Admission Process</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium">Entrance Exam</div>
                      <div className="text-sm text-gray-600">{college.admissions.process}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium">Application Deadline</div>
                      <div className="text-sm text-gray-600">{college.admissions.deadline}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium">Total Seats</div>
                      <div className="text-sm text-gray-600">{college.admissions.seats}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Eligibility Criteria</h4>
                <p className="text-gray-700">{college.admissions.eligibility}</p>
                <button className="mt-4 btn-primary">Apply Now</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'placements' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Placement Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{college.placements.averagePackage}</div>
                <div className="text-gray-600">Average Package</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{college.placements.highestPackage}</div>
                <div className="text-gray-600">Highest Package</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{college.placements.placementRate}</div>
                <div className="text-gray-600">Placement Rate</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Top Recruiters</h4>
              <div className="flex flex-wrap gap-3">
                {college.placements.topRecruiters.map((recruiter, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-4 py-2 rounded-lg text-sm"
                  >
                    {recruiter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Campus Facilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {college.facilities.map((facility, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <BookOpen size={20} className="mr-3 text-primary" />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Student Reviews</h3>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1 mr-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  <span className="font-medium">Excellent College</span>
                </div>
                <p className="text-gray-700 mb-2">
                  Great faculty, excellent infrastructure, and amazing placement opportunities. 
                  The research facilities are world-class.
                </p>
                <div className="text-sm text-gray-500">- Rahul Sharma, B.Tech CSE 2023</div>
              </div>
              <div className="border-b pb-6">
                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1 mr-4">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="text-yellow-400 fill-current" size={16} />
                    ))}
                    <Star className="text-gray-300" size={16} />
                  </div>
                  <span className="font-medium">Good Experience</span>
                </div>
                <p className="text-gray-700 mb-2">
                  The academic environment is very competitive and challenging. 
                  Hostel facilities could be better.
                </p>
                <div className="text-sm text-gray-500">- Priya Patel, M.Tech 2022</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeDetail;