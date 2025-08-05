import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaStar, FaThumbsUp, FaThumbsDown, FaTimes } from 'react-icons/fa';
import api from '../../services/api';

const ReviewForm = ({ collegeId, collegeName, onReviewSubmit, onClose }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if user has already reviewed this college
    if (user) {
      fetchExistingReview();
    }
  }, [collegeId, user]);

  const fetchExistingReview = async () => {
    try {
      const response = await api.get(`/reviews/college/${collegeId}/user`);
      if (response.data.review) {
        setExistingReview(response.data.review);
        setRating(response.data.review.rating);
        setTitle(response.data.review.title);
        setReview(response.data.review.review);
        setPros(response.data.review.pros || '');
        setCons(response.data.review.cons || '');
      }
    } catch (error) {
      // User hasn't reviewed this college yet
      console.log('No existing review found');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setErrors({ general: 'Please login to submit a review' });
      return;
    }

    if (rating === 0) {
      setErrors({ rating: 'Please select a rating' });
      return;
    }

    if (!title.trim()) {
      setErrors({ title: 'Please enter a title' });
      return;
    }

    if (!review.trim()) {
      setErrors({ review: 'Please enter a review' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const reviewData = {
        rating,
        title: title.trim(),
        review: review.trim(),
        pros: pros.trim(),
        cons: cons.trim()
      };

      console.log('📝 Submitting review data:', reviewData);
      console.log('📝 API URL:', `/reviews/college/${collegeId}`);
      console.log('🔑 Auth token:', localStorage.getItem('token'));
      
      const response = await api.post(`/reviews/college/${collegeId}`, reviewData);
      
      console.log('✅ Review submitted successfully:', response.data);
      
      if (onReviewSubmit) {
        onReviewSubmit(response.data.review);
      }
      
      // Reset form
      if (!existingReview) {
        setRating(0);
        setTitle('');
        setReview('');
        setPros('');
        setCons('');
      }
      
    } catch (error) {
      console.error('❌ Error submitting review:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      
      if (error.response?.data?.errors) {
        const validationErrors = {};
        error.response.data.errors.forEach(err => {
          validationErrors[err.param] = err.msg;
        });
        setErrors(validationErrors);
      } else {
        setErrors({ general: error.response?.data?.message || 'Error submitting review' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (starRating) => {
    setRating(starRating);
    setErrors({ ...errors, rating: '' });
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
          <p className="text-gray-600 mb-4">Please login to write a review for {collegeName}</p>
          <button
            onClick={onClose}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {existingReview ? 'Edit Your Review' : 'Write a Review'}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* College Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            College
          </label>
          <p className="text-gray-900 font-medium">{collegeName}</p>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className={`text-2xl transition-colors ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400`}
              >
                <FaStar />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 && `${rating} out of 5`}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: '' });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Summarize your experience"
            maxLength={100}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Review */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
              setErrors({ ...errors, review: '' });
            }}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Share your detailed experience with this college..."
            maxLength={1000}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{review.length}/1000 characters</span>
            <span>Minimum 10 characters</span>
          </div>
          {errors.review && (
            <p className="text-red-500 text-sm mt-1">{errors.review}</p>
          )}
        </div>

        {/* Pros */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaThumbsUp className="inline mr-1 text-green-500" />
            Pros (Optional)
          </label>
          <textarea
            value={pros}
            onChange={(e) => setPros(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="What did you like about this college?"
            maxLength={500}
          />
          <div className="text-sm text-gray-500 mt-1">
            {pros.length}/500 characters
          </div>
        </div>

        {/* Cons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaThumbsDown className="inline mr-1 text-red-500" />
            Cons (Optional)
          </label>
          <textarea
            value={cons}
            onChange={(e) => setCons(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="What could be improved?"
            maxLength={500}
          />
          <div className="text-sm text-gray-500 mt-1">
            {cons.length}/500 characters
          </div>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm; 