import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const EngineeringByLocation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  const locations = [
    { name: 'India', value: 'india' },
    { name: 'Chennai', value: 'chennai' },
    { name: 'New Delhi', value: 'new delhi' },
    { name: 'Mumbai', value: 'mumbai' },
    { name: 'Kanpur', value: 'kanpur' },
    { name: 'Kharagpur', value: 'kharagpur' },
    { name: 'Roorkee', value: 'roorkee' },
    { name: 'Guwahati', value: 'guwahati' },
    { name: 'Hyderabad', value: 'hyderabad' },
    { name: 'Tiruchirappalli', value: 'tiruchirappalli' },
    { name: 'Varanasi', value: 'varanasi' },
    { name: 'Vellore', value: 'vellore' },
    { name: 'Kolkata', value: 'kolkata' },
    { name: 'Dhanbad', value: 'dhanbad' },
    { name: 'Indore', value: 'indore' },
    { name: 'Surathkal', value: 'surathkal' },
    { name: 'Gandhinagar', value: 'gandhinagar' },
    { name: 'Rourkela', value: 'rourkela' },
    { name: 'Pilani', value: 'pilani' },
    { name: 'Warangal', value: 'warangal' },
    { name: 'Calicut', value: 'calicut' },
    { name: 'Durgapur', value: 'durgapur' },
    { name: 'Silchar', value: 'silchar' },
    { name: 'Hamirpur', value: 'hamirpur' },
    { name: 'Jamshedpur', value: 'jamshedpur' },
    { name: 'Kurukshetra', value: 'kurukshetra' },
    { name: 'Patna', value: 'patna' },
    { name: 'Raipur', value: 'raipur' },
    { name: 'Srinagar', value: 'srinagar' },
    { name: 'Agartala', value: 'agartala' },
    { name: 'Goa', value: 'goa' },
    { name: 'Imphal', value: 'imphal' },
    { name: 'Shillong', value: 'shillong' },
    { name: 'Aizawl', value: 'aizawl' },
    { name: 'Dimapur', value: 'dimapur' },
    { name: 'Karaikal', value: 'karaikal' },
    { name: 'Gangtok', value: 'gangtok' },
    { name: 'Delhi', value: 'delhi' },
    { name: 'Jalandhar', value: 'jalandhar' },
    { name: 'Tadepalligudem', value: 'tadepalligudem' },
    { name: 'Yupia', value: 'yupia' },
    { name: 'Ponda', value: 'ponda' },
    // Medical College Locations
    { name: 'Chandigarh', value: 'chandigarh' },
    { name: 'Bengaluru', value: 'bengaluru' },
    { name: 'Puducherry', value: 'puducherry' },
    { name: 'Lucknow', value: 'lucknow' },
    { name: 'Coimbatore', value: 'coimbatore' },
    { name: 'Manipal', value: 'manipal' },
    { name: 'Pune', value: 'pune' },
    { name: 'Thiruvananthapuram', value: 'thiruvananthapuram' },
    { name: 'Jodhpur', value: 'jodhpur' },
    { name: 'Bhubaneswar', value: 'bhubaneswar' },
    { name: 'Rishikesh', value: 'rishikesh' },
    { name: 'Bhopal', value: 'bhopal' },
    { name: 'Nagpur', value: 'nagpur' },
    { name: 'Mangalagiri', value: 'mangalagiri' },
    { name: 'Bibinagar', value: 'bibinagar' },
    { name: 'Deoghar', value: 'deoghar' },
    { name: 'Kalyani', value: 'kalyani' },
    { name: 'Darbhanga', value: 'darbhanga' },
    { name: 'Bilaspur', value: 'bilaspur' },
    { name: 'Gorakhpur', value: 'gorakhpur' },
    { name: 'Vijaypur', value: 'vijaypur' },
    { name: 'Mysuru', value: 'mysuru' },
    { name: 'Jalandhar', value: 'jalandhar' },
    { name: 'Jaipur', value: 'jaipur' },
    { name: 'Ahmadabad', value: 'ahmadabad' },
    { name: 'Rohtak', value: 'rohtak' }
  ];

  useEffect(() => {
    if (selectedLocation) {
      fetchEngineeringColleges(selectedLocation);
    }
  }, [selectedLocation]);

  const fetchEngineeringColleges = async (location) => {
    setLoading(true);
    try {
      // First, get all colleges
      const response = await fetch(`http://localhost:5000/api/colleges?limit=1000`);
      const data = await response.json();
      
      if (data.success) {
        console.log('All colleges data:', data.data);
        console.log('Available categories:', [...new Set(data.data.map(college => college.category))]);
        
        // Filter engineering colleges by location
        const filteredColleges = data.data.filter(college => {
          // Check if it's an engineering college (more specific check)
          const isEngineering = college.category && 
            (college.category.toLowerCase() === 'engineering' || 
             college.category.toLowerCase() === 'engineer' ||
             college.name.toLowerCase().includes('institute of technology') ||
             college.name.toLowerCase().includes('iit') ||
             college.name.toLowerCase().includes('nit'));
          
          // If location is "india", show all engineering colleges
          if (location.toLowerCase() === 'india') {
            return isEngineering;
          }
          
          // For specific locations, check if location matches
          const matchesLocation = college.location && 
            college.location.toLowerCase().includes(location.toLowerCase());
          
          return isEngineering && matchesLocation;
        });
        
        console.log('Filtered engineering colleges:', filteredColleges);
        setColleges(filteredColleges);
      } else {
        setColleges([]);
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.value);
    setIsOpen(false);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Engineering Colleges by Location
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Find engineering colleges across different cities in India
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Dropdown */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Select Location</h2>
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
                >
                  <MapPin className="h-5 w-5" />
                  <span>
                    {selectedLocation 
                      ? locations.find(loc => loc.value === selectedLocation)?.name 
                      : 'Choose Location'
                    }
                  </span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      {locations.map((location) => (
                        <button
                          key={location.value}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                        >
                          <MapPin className="h-4 w-4 text-teal-600" />
                          <span className="font-medium text-gray-800">
                            {location.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedLocation && (
              <div className="text-gray-600">
                {colleges.length} colleges found
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {selectedLocation && (
          <div>
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg font-medium">Loading colleges...</p>
              </div>
            ) : colleges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {colleges.map((college) => (
                  <div key={college._id} className="group">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                      {/* College Image */}
                      <div className="relative h-48 bg-gradient-to-br from-teal-400 to-blue-500 overflow-hidden">
                        {college.image ? (
                          <img
                            src={college.image}
                            alt={college.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="text-white text-6xl opacity-80" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                            Engineering
                          </span>
                        </div>
                      </div>

                      {/* College Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-teal-600 transition-colors">
                          {college.name}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="text-red-500 mr-2 h-4 w-4" />
                          <span className="text-sm">{college.location}</span>
                        </div>
                        
                        <div className="mb-4">
                          {renderStars(college.rating)}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                            </svg>
                            <span>{college.students?.toLocaleString() || 'N/A'} students</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                            <span>{college.courses || 'N/A'} courses</span>
                          </div>
                        </div>
                        
                        {college.fees && (
                          <div className="mb-4">
                            <span className="text-lg font-bold text-teal-600">
                              ₹{college.fees?.toLocaleString() || 'N/A'}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">per year</span>
                          </div>
                        )}
                        
                        <Link
                          to={`/college/${college.slug}`}
                          className="block w-full text-center py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                 <h3 className="text-2xl font-bold text-gray-800 mb-2">No colleges found</h3>
                 <p className="text-gray-600 mb-6">No colleges found in {locations.find(loc => loc.value === selectedLocation)?.name}</p>
                <button
                  onClick={() => setSelectedLocation('')}
                  className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                >
                  Try Another Location
                </button>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!selectedLocation && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Select a Location</h3>
                         <p className="text-gray-600">Choose a location from the dropdown above to view colleges in that area</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineeringByLocation; 