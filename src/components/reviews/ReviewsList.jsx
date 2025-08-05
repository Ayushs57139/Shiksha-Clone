import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaCalendarAlt, FaUser, FaCheckCircle } from 'react-icons/fa';
import api from '../../services/api';

const ReviewsList = ({ collegeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('createdAt');

  useEffect(() => {
    fetchReviews();
  }, [collegeId, page, sortBy]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/reviews/college/${collegeId}`, {
        params: {
          page,
          limit: 10,
          sort: sortBy
        }
      });
      
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-sm ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}/5</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchReviews}
          className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No reviews yet. Be the first to review this college!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Reviews ({reviews.length})
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="createdAt">Latest</option>
          <option value="rating">Highest Rated</option>
          <option value="helpfulCount">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{review.title}</h4>
                  {review.isVerified && (
                    <FaCheckCircle className="text-green-500 text-sm" title="Verified Review" />
                  )}
                </div>
                {renderStars(review.rating)}
              </div>
              <div className="text-sm text-gray-500">
                <FaCalendarAlt className="inline mr-1" />
                {formatDate(review.createdAt)}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{review.review}</p>
            </div>

            {/* Pros and Cons */}
            {(review.pros || review.cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {review.pros && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <FaThumbsUp className="text-green-500 mr-2" />
                      <span className="font-medium text-green-800">Pros</span>
                    </div>
                    <p className="text-green-700 text-sm">{review.pros}</p>
                  </div>
                )}
                {review.cons && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <FaThumbsDown className="text-red-500 mr-2" />
                      <span className="font-medium text-red-800">Cons</span>
                    </div>
                    <p className="text-red-700 text-sm">{review.cons}</p>
                  </div>
                )}
              </div>
            )}

            {/* Review Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  {review.userId?.firstName} {review.userId?.lastName}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {review.helpfulCount > 0 && (
                  <span>{review.helpfulCount} found this helpful</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-2 border rounded-lg text-sm ${
                pageNum === page
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}
          
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsList; 