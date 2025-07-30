import { useState, useEffect } from 'react';
import { collegesAPI } from '../services/api';
import CollegeCard from './CollegeCard';

const CollegeList = ({ category = '', location = '', limit = 20, searchQuery = '' }) => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    page: 1,
    limit: 20
  });

  useEffect(() => {
    fetchColleges();
  }, [category, location, page, limit, searchQuery]);

  const fetchColleges = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      const params = { 
        page, 
        limit,
        ...(searchQuery && { search: searchQuery })
      };

      if (category) {
        response = await collegesAPI.getByCategory(category, params);
      } else if (location) {
        response = await collegesAPI.getByLocation(location, params);
      } else if (searchQuery) {
        response = await collegesAPI.search(searchQuery, params);
      } else {
        response = await collegesAPI.getAll(params);
      }

      if (response.data.success) {
        setColleges(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError('Failed to load colleges');
        setColleges([]);
      }
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
      const response = await collegesAPI.triggerScrape();
      if (response.data.success) {
        alert('Scraper started! Data will be updated in the background.');
        // Refresh the data after a delay
        setTimeout(() => {
          fetchColleges();
        }, 5000);
      }
    } catch (err) {
      console.error('Error triggering scraper:', err);
      alert('Failed to start scraper. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-2">Error loading colleges</div>
        <div className="text-gray-600 mb-4">{error}</div>
        <button
          onClick={fetchColleges}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {category ? `${category.toUpperCase()} Colleges` : 
           location ? `Colleges in ${location}` : 
           searchQuery ? `Search Results for "${searchQuery}"` :
           'All Colleges'}
        </h2>
        <button
          onClick={triggerScrape}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Update Data
        </button>
      </div>

      {colleges.length === 0 ? (
        <div className="text-center p-8 border rounded bg-gray-50">
          <div className="text-gray-500 text-lg font-medium mb-2">No colleges found</div>
          <div className="text-gray-400 mb-4">
            {searchQuery ? `No results found for "${searchQuery}"` : 
             'Try different filters or update the data'}
          </div>
          <button
            onClick={triggerScrape}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Update Data
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {colleges.length} of {pagination.total} colleges
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {colleges.map((college) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        pageNum === pagination.page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CollegeList;