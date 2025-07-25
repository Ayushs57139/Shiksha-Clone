import { useState, useEffect } from 'react';
import { collegesAPI } from '../services/api';

const CollegeList = ({ category = '', location = '', limit = 10 }) => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    page: 1,
    limit: 10
  });

  useEffect(() => {
    fetchColleges();
  }, [category, location, page, limit]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      let response;
      const params = { page, limit };

      if (category) {
        response = await collegesAPI.getByCategory(category, params);
      } else if (location) {
        response = await collegesAPI.getByLocation(location, params);
      } else {
        response = await collegesAPI.getAll(params);
      }

      setColleges(response.data.data);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      console.error('Error fetching colleges:', err);
      setError('Failed to load colleges. Please try again later.');
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      setPage(newPage);
    }
  };

  const triggerScrape = async () => {
    try {
      await collegesAPI.triggerScrape();
      alert('Scraper started! Data will be updated in the background.');
    } catch (err) {
      console.error('Error triggering scraper:', err);
      alert('Failed to start scraper. Please try again later.');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading colleges...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {category ? `${category.toUpperCase()} Colleges` : 
           location ? `Colleges in ${location}` : 'All Colleges'}
        </h2>
        <button
          onClick={triggerScrape}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Update Data
        </button>
      </div>

      {colleges.length === 0 ? (
        <div className="text-center p-8 border rounded bg-gray-50">
          No colleges found. Try different filters or update the data.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div key={college._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{college.location?.city}{college.location?.state ? `, ${college.location.state}` : ''}</span>
                </div>
                
                {college.ratings?.overall > 0 && (
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.round(college.ratings.overall) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-gray-600">{college.ratings.overall.toFixed(1)}</span>
                    </div>
                  </div>
                )}
                
                {college.fees?.amount > 0 && (
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>₹{college.fees.amount.toLocaleString()} {college.fees.duration}</span>
                  </div>
                )}
                
                {college.description && (
                  <p className="text-gray-600 mt-2 line-clamp-2">{college.description}</p>
                )}
              </div>
              
              <div className="bg-gray-50 px-4 py-3 border-t">
                <a 
                  href={`/colleges/${college.slug || college._id}`} 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Previous
            </button>
            
            {[...Array(pagination.pages)].map((_, i) => {
              const pageNum = i + 1;
              // Show limited page numbers
              if (
                pageNum === 1 ||
                pageNum === pagination.pages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded ${pageNum === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                (pageNum === page - 2 && pageNum > 1) ||
                (pageNum === page + 2 && pageNum < pagination.pages)
              ) {
                return <span key={pageNum}>...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === pagination.pages}
              className={`px-3 py-1 rounded ${page === pagination.pages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default CollegeList;