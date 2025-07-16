import React, { useState } from 'react';
import { Plus, X, Star, MapPin, Users, Award, DollarSign } from 'lucide-react';

const Compare = () => {
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock colleges data
  const availableColleges = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi',
      rating: 4.8,
      fees: '₹2.5 Lakhs',
      established: 1961,
      students: 8000,
      courses: 45,
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
      highlights: ['NIRF Ranking #2', 'Top Placements', 'Research Excellence'],
      placements: {
        averagePackage: '₹18 LPA',
        highestPackage: '₹1.2 Crore',
        placementRate: '95%'
      },
      facilities: ['Central Library', 'Research Labs', 'Sports Complex', 'Hostels'],
      admissions: {
        entrance: 'JEE Advanced',
        cutoff: '250+',
        seats: 1200
      }
    },
    {
      id: 2,
      name: 'Indian Institute of Management Ahmedabad',
      location: 'Ahmedabad',
      rating: 4.9,
      fees: '₹25 Lakhs',
      established: 1961,
      students: 1200,
      courses: 8,
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      highlights: ['NIRF Ranking #1', 'Global Recognition', 'Industry Connect'],
      placements: {
        averagePackage: '₹28 LPA',
        highestPackage: '₹70 Lakhs',
        placementRate: '100%'
      },
      facilities: ['Business Library', 'Case Study Rooms', 'Auditorium', 'Guest House'],
      admissions: {
        entrance: 'CAT',
        cutoff: '99+ percentile',
        seats: 400
      }
    },
    {
      id: 3,
      name: 'All India Institute of Medical Sciences',
      location: 'New Delhi',
      rating: 4.7,
      fees: '₹1.5 Lakhs',
      established: 1956,
      students: 3000,
      courses: 12,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      highlights: ['Premier Medical Institute', 'Research Hospital', 'Government College'],
      placements: {
        averagePackage: '₹12 LPA',
        highestPackage: '₹25 Lakhs',
        placementRate: '98%'
      },
      facilities: ['Medical Library', 'Hospital', 'Research Labs', 'Hostels'],
      admissions: {
        entrance: 'NEET',
        cutoff: '650+',
        seats: 100
      }
    }
  ];

  const addCollege = (college) => {
    if (selectedColleges.length < 3 && !selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const removeCollege = (collegeId) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== collegeId));
  };

  const filteredColleges = availableColleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedColleges.find(c => c.id === college.id)
  );

  const comparisonCategories = [
    {
      title: 'Basic Information',
      fields: [
        { key: 'established', label: 'Established', format: (value) => value },
        { key: 'location', label: 'Location', format: (value) => value },
        { key: 'students', label: 'Total Students', format: (value) => value.toLocaleString() },
        { key: 'courses', label: 'Courses Offered', format: (value) => value },
        { key: 'rating', label: 'Rating', format: (value) => `${value}/5` }
      ]
    },
    {
      title: 'Fees & Admissions',
      fields: [
        { key: 'fees', label: 'Annual Fees', format: (value) => value },
        { key: 'admissions.entrance', label: 'Entrance Exam', format: (value) => value },
        { key: 'admissions.cutoff', label: 'Cutoff', format: (value) => value },
        { key: 'admissions.seats', label: 'Total Seats', format: (value) => value }
      ]
    },
    {
      title: 'Placements',
      fields: [
        { key: 'placements.averagePackage', label: 'Average Package', format: (value) => value },
        { key: 'placements.highestPackage', label: 'Highest Package', format: (value) => value },
        { key: 'placements.placementRate', label: 'Placement Rate', format: (value) => value }
      ]
    }
  ];

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Compare Colleges</h1>
          <p className="text-gray-600">Compare up to 3 colleges side by side to make an informed decision</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* College Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Colleges to Compare</h2>
          
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search colleges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Available Colleges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredColleges.map((college) => (
              <div key={college.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-sm mb-2">{college.name}</h3>
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <MapPin size={12} className="mr-1" />
                  <span>{college.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current" size={12} />
                    <span className="text-xs ml-1">{college.rating}</span>
                  </div>
                  <button
                    onClick={() => addCollege(college)}
                    disabled={selectedColleges.length >= 3}
                    className="bg-primary text-white px-3 py-1 rounded text-xs hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Plus size={12} className="inline mr-1" />
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedColleges.length >= 3 && (
            <p className="text-orange-600 text-sm mt-4">
              Maximum 3 colleges can be compared at once. Remove a college to add another.
            </p>
          )}
        </div>

        {/* Comparison Table */}
        {selectedColleges.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">College Comparison</h2>
            </div>

            {/* College Headers */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-medium text-gray-600 w-48">Criteria</th>
                    {selectedColleges.map((college) => (
                      <th key={college.id} className="text-center p-4 min-w-64">
                        <div className="relative">
                          <button
                            onClick={() => removeCollege(college.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={12} />
                          </button>
                          <img
                            src={college.image}
                            alt={college.name}
                            className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                          />
                          <h3 className="font-semibold text-sm">{college.name}</h3>
                          <div className="flex items-center justify-center text-xs text-gray-600 mt-1">
                            <MapPin size={12} className="mr-1" />
                            <span>{college.location}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                    {/* Empty slots */}
                    {Array.from({ length: 3 - selectedColleges.length }).map((_, index) => (
                      <th key={`empty-${index}`} className="text-center p-4 min-w-64">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-gray-400">
                          <Plus size={24} className="mx-auto mb-2" />
                          <span className="text-sm">Add College</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {comparisonCategories.map((category) => (
                    <React.Fragment key={category.title}>
                      <tr className="bg-gray-100">
                        <td colSpan={4} className="p-4 font-semibold text-gray-800">
                          {category.title}
                        </td>
                      </tr>
                      {category.fields.map((field) => (
                        <tr key={field.key} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-700">{field.label}</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              {field.format(getNestedValue(college, field.key))}
                            </td>
                          ))}
                          {Array.from({ length: 3 - selectedColleges.length }).map((_, index) => (
                            <td key={`empty-${index}`} className="p-4 text-center text-gray-400">
                              -
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}

                  {/* Highlights */}
                  <tr className="bg-gray-100">
                    <td colSpan={4} className="p-4 font-semibold text-gray-800">
                      Key Highlights
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium text-gray-700">Highlights</td>
                    {selectedColleges.map((college) => (
                      <td key={college.id} className="p-4">
                        <div className="space-y-1">
                          {college.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="block bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedColleges.length }).map((_, index) => (
                      <td key={`empty-${index}`} className="p-4 text-center text-gray-400">
                        -
                      </td>
                    ))}
                  </tr>

                  {/* Facilities */}
                  <tr className="border-b">
                    <td className="p-4 font-medium text-gray-700">Facilities</td>
                    {selectedColleges.map((college) => (
                      <td key={college.id} className="p-4">
                        <div className="space-y-1">
                          {college.facilities.map((facility, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              • {facility}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedColleges.length }).map((_, index) => (
                      <td key={`empty-${index}`} className="p-4 text-center text-gray-400">
                        -
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex flex-wrap gap-4 justify-center">
                {selectedColleges.map((college) => (
                  <button
                    key={college.id}
                    className="btn-primary"
                  >
                    Apply to {college.name.split(' ').slice(0, 2).join(' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedColleges.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Award size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No colleges selected</h3>
            <p className="text-gray-500">
              Add colleges from the list above to start comparing them side by side.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;