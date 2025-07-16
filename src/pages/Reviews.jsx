import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Filter, Search, User } from 'lucide-react';

const Reviews = () => {
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      collegeName: 'Indian Institute of Technology Delhi',
      studentName: 'Rahul Sharma',
      course: 'B.Tech Computer Science',
      year: '2023',
      rating: 5,
      title: 'Excellent College with Great Faculty',
      review: 'IIT Delhi has been an amazing experience. The faculty is world-class, infrastructure is top-notch, and the placement opportunities are excellent. The research facilities are outstanding and the campus life is vibrant.',
      likes: 45,
      dislikes: 2,
      date: '2023-10-15',
      verified: true,
      pros: ['Excellent Faculty', 'Great Placements', 'Research Opportunities', 'Campus Life'],
      cons: ['High Competition', 'Stressful Environment']
    },
    {
      id: 2,
      collegeName: 'Indian Institute of Management Ahmedabad',
      studentName: 'Priya Patel',
      course: 'MBA',
      year: '2022',
      rating: 4,
      title: 'Great for Career Growth',
      review: 'IIMA provides excellent exposure to industry and has a strong alumni network. The case study method is very effective. However, the academic pressure is quite high and the fees are expensive.',
      likes: 32,
      dislikes: 5,
      date: '2023-10-10',
      verified: true,
      pros: ['Industry Exposure', 'Alumni Network', 'Case Study Method', 'Brand Value'],
      cons: ['High Fees', 'Academic Pressure', 'Limited Diversity']
    },
    {
      id: 3,
      collegeName: 'All India Institute of Medical Sciences',
      studentName: 'Dr. Amit Kumar',
      course: 'MBBS',
      year: '2021',
      rating: 5,
      title: 'Premier Medical Institution',
      review: 'AIIMS is the best medical college in India. The clinical exposure is unmatched, faculty is highly experienced, and the hospital facilities are world-class. Great place for medical education.',
      likes: 67,
      dislikes: 1,
      date: '2023-10-08',
      verified: true,
      pros: ['Clinical Exposure', 'Experienced Faculty', 'Hospital Facilities', 'Research'],
      cons: ['High Workload', 'Limited Seats']
    },
    {
      id: 4,
      collegeName: 'National Law School of India University',
      studentName: 'Sneha Reddy',
      course: 'BA LLB',
      year: '2023',
      rating: 4,
      title: 'Good Law School with Strong Academics',
      review: 'NLSIU has excellent academic standards and good faculty. The moot court competitions are great for practical learning. However, the infrastructure could be better and the location is not ideal.',
      likes: 28,
      dislikes: 8,
      date: '2023-10-05',
      verified: true,
      pros: ['Academic Standards', 'Moot Courts', 'Faculty Quality', 'Legal Research'],
      cons: ['Infrastructure', 'Location', 'Limited Extracurriculars']
    },
    {
      id: 5,
      collegeName: 'Delhi University',
      studentName: 'Vikash Singh',
      course: 'B.Com Honours',
      year: '2022',
      rating: 3,
      title: 'Average Experience',
      review: 'DU has a good brand name and diverse student community. However, the infrastructure in many colleges is outdated and the administration can be slow. The fest culture is good though.',
      likes: 15,
      dislikes: 12,
      date: '2023-10-02',
      verified: false,
      pros: ['Brand Name', 'Diversity', 'Fest Culture', 'Location'],
      cons: ['Infrastructure', 'Administration', 'Overcrowding', 'Limited Resources']
    }
  ];

  const colleges = [
    'Indian Institute of Technology Delhi',
    'Indian Institute of Management Ahmedabad',
    'All India Institute of Medical Sciences',
    'National Law School of India University',
    'Delhi University'
  ];

  const getFilteredReviews = () => {
    let filtered = reviews;

    if (selectedCollege !== 'all') {
      filtered = filtered.filter(review => review.collegeName === selectedCollege);
    }

    if (selectedRating !== 'all') {
      filtered = filtered.filter(review => review.rating >= parseInt(selectedRating));
    }

    // Sort reviews
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'rating-high':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredReviews = getFilteredReviews();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">College Reviews</h1>
          <p className="text-gray-600">Read authentic reviews from students and alumni</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter size={20} className="mr-2" />
                Filters
              </h3>

              {/* College Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">College</label>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Colleges</option>
                  {colleges.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="recent">Most Recent</option>
                  <option value="rating-high">Highest Rating</option>
                  <option value="rating-low">Lowest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>

              {/* Write Review Button */}
              <button className="w-full btn-primary">
                Write a Review
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredReviews.length} reviews
              </p>
            </div>

            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                  {/* Review Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{review.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {review.rating}/5
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{review.collegeName}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mt-1 inline-block">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="flex items-center mb-4 text-sm text-gray-600">
                    <User size={16} className="mr-2" />
                    <span>{review.studentName}</span>
                    <span className="mx-2">•</span>
                    <span>{review.course}</span>
                    <span className="mx-2">•</span>
                    <span>Batch {review.year}</span>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">Pros</h4>
                      <ul className="space-y-1">
                        {review.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-600 mb-2">Cons</h4>
                      <ul className="space-y-1">
                        {review.cons.map((con, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors">
                        <ThumbsUp size={16} />
                        <span className="text-sm">{review.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                        <ThumbsDown size={16} />
                        <span className="text-sm">{review.dislikes}</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-sm text-gray-600 hover:text-primary transition-colors">
                        Report
                      </button>
                      <button className="text-sm text-gray-600 hover:text-primary transition-colors">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Star size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No reviews found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters to see more reviews.
                </p>
              </div>
            )}

            {/* Load More */}
            {filteredReviews.length > 0 && (
              <div className="text-center mt-8">
                <button className="btn-secondary">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;