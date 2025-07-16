import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin, DollarSign, Clock, Users, Award, Plane, BookOpen } from 'lucide-react';

const StudyAbroad = () => {
  const [selectedCountry, setSelectedCountry] = useState('all');

  const countries = [
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      universities: 4000,
      averageFees: '$20,000-60,000',
      popularCourses: ['Engineering', 'Business', 'Computer Science', 'Medicine'],
      intakeSeasons: ['Fall (Sep)', 'Spring (Jan)', 'Summer (May)'],
      description: 'Home to world-renowned universities and cutting-edge research facilities.',
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      requirements: {
        tests: ['TOEFL/IELTS', 'SAT/ACT', 'GRE/GMAT'],
        documents: ['Transcripts', 'SOP', 'LOR', 'Financial Proof']
      }
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: '🇬🇧',
      universities: 150,
      averageFees: '£15,000-35,000',
      popularCourses: ['Business', 'Engineering', 'Arts', 'Law'],
      intakeSeasons: ['September', 'January'],
      description: 'Rich academic heritage with globally recognized degrees.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      requirements: {
        tests: ['IELTS', 'TOEFL', 'PTE'],
        documents: ['Academic Records', 'Personal Statement', 'References']
      }
    },
    {
      id: 'canada',
      name: 'Canada',
      flag: '🇨🇦',
      universities: 100,
      averageFees: 'CAD 15,000-40,000',
      popularCourses: ['Engineering', 'Business', 'Healthcare', 'IT'],
      intakeSeasons: ['Fall (Sep)', 'Winter (Jan)', 'Summer (May)'],
      description: 'High quality education with excellent post-study work opportunities.',
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
      requirements: {
        tests: ['IELTS', 'TOEFL', 'PTE'],
        documents: ['Transcripts', 'SOP', 'LOR', 'Financial Proof']
      }
    },
    {
      id: 'australia',
      name: 'Australia',
      flag: '🇦🇺',
      universities: 43,
      averageFees: 'AUD 20,000-45,000',
      popularCourses: ['Engineering', 'Business', 'Medicine', 'IT'],
      intakeSeasons: ['February', 'July'],
      description: 'World-class education system with beautiful campuses.',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      requirements: {
        tests: ['IELTS', 'TOEFL', 'PTE'],
        documents: ['Academic Transcripts', 'Statement of Purpose', 'CV']
      }
    },
    {
      id: 'germany',
      name: 'Germany',
      flag: '🇩🇪',
      universities: 400,
      averageFees: '€0-20,000',
      popularCourses: ['Engineering', 'Business', 'Science', 'Arts'],
      intakeSeasons: ['Winter (Oct)', 'Summer (Apr)'],
      description: 'Affordable education with strong focus on research and innovation.',
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400',
      requirements: {
        tests: ['IELTS/TOEFL', 'TestDaF/DSH'],
        documents: ['Academic Records', 'Motivation Letter', 'CV']
      }
    },
    {
      id: 'ireland',
      name: 'Ireland',
      flag: '🇮🇪',
      universities: 35,
      averageFees: '€10,000-25,000',
      popularCourses: ['IT', 'Business', 'Pharmacy', 'Engineering'],
      intakeSeasons: ['September', 'January'],
      description: 'English-speaking country with strong industry connections.',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400',
      requirements: {
        tests: ['IELTS', 'TOEFL'],
        documents: ['Transcripts', 'Personal Statement', 'References']
      }
    }
  ];

  const services = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: 'Course Selection',
      description: 'Expert guidance to choose the right course and university'
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: 'Application Support',
      description: 'Complete assistance with university applications'
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: 'Test Preparation',
      description: 'IELTS, TOEFL, GRE, GMAT preparation courses'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: 'Scholarship Guidance',
      description: 'Help finding and applying for scholarships'
    },
    {
      icon: <Plane className="w-8 h-8 text-primary" />,
      title: 'Visa Assistance',
      description: 'Complete visa application and interview preparation'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Pre-departure Support',
      description: 'Orientation and preparation for studying abroad'
    }
  ];

  const filteredCountries = selectedCountry === 'all' 
    ? countries 
    : countries.filter(country => country.id === selectedCountry);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Study Abroad
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Explore global education opportunities and transform your future
          </p>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 shadow-lg">
            <div className="flex flex-col md:flex-row gap-2">
              <select className="flex-1 px-4 py-3 rounded-lg text-gray-700 border-0 focus:outline-none">
                <option>Select Country</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Germany</option>
                <option>Ireland</option>
              </select>
              <select className="flex-1 px-4 py-3 rounded-lg text-gray-700 border-0 focus:outline-none">
                <option>Select Course</option>
                <option>Engineering</option>
                <option>Business</option>
                <option>Computer Science</option>
                <option>Medicine</option>
              </select>
              <button className="btn-primary">
                Search Programs
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="opacity-90">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">5000+</div>
              <div className="opacity-90">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10000+</div>
              <div className="opacity-90">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">95%</div>
              <div className="opacity-90">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Country Filter */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCountry('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCountry === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Countries
            </button>
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors flex items-center space-x-2 ${
                  selectedCountry === country.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCountries.map((country) => (
              <div key={country.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{country.flag}</span>
                    <h3 className="text-xl font-semibold">{country.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{country.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Universities:</span>
                      <span className="font-medium">{country.universities}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Fees:</span>
                      <span className="font-medium text-primary">{country.averageFees}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Popular Courses:</h4>
                    <div className="flex flex-wrap gap-1">
                      {country.popularCourses.slice(0, 3).map((course, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Intake Seasons:</h4>
                    <div className="flex flex-wrap gap-1">
                      {country.intakeSeasons.map((season, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {season}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 btn-primary text-sm">
                      Explore Programs
                    </button>
                    <button className="flex-1 btn-secondary text-sm">
                      Get Counseling
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">General Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Academic Records</h3>
              <p className="text-gray-600 text-sm">Transcripts, certificates, and academic achievements</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">English Proficiency</h3>
              <p className="text-gray-600 text-sm">IELTS, TOEFL, or PTE scores</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Standardized Tests</h3>
              <p className="text-gray-600 text-sm">SAT, GRE, GMAT as required</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Financial Proof</h3>
              <p className="text-gray-600 text-sm">Bank statements and financial documents</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get personalized guidance from our expert counselors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Book Free Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors">
              Download Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyAbroad;