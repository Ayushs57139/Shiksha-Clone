import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaStar,
  FaMapMarkerAlt,
  FaUsers,
  FaGraduationCap,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaBuilding,
  FaCheckCircle,
  FaHeart,
  FaShare,
  FaDownload,
  FaTrophy,
  FaAward,
  FaChartLine,
  FaBook,
  FaFlask,
  FaBalanceScale,
  FaPills,
  FaPen,
  FaComments
} from 'react-icons/fa';
import ReviewForm from '../components/ReviewForm';
import ReviewsList from '../components/ReviewsList';
import { useAuth } from '../context/AuthContext';

const CollegeDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/colleges/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setCollege(data.data);
          // Fetch review statistics
          fetchReviewStats(data.data._id);
        } else {
          setError('College not found');
        }
      } catch (error) {
        console.error('Error fetching college:', error);
        setError('Failed to load college details');
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [slug]);

  const fetchReviewStats = async (collegeId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/college/${collegeId}`);
      if (response.ok) {
        const data = await response.json();
        setTotalReviews(data.total);
        
        // Calculate average rating
        if (data.reviews.length > 0) {
          const totalRating = data.reviews.reduce((sum, review) => sum + review.rating, 0);
          setAverageRating(totalRating / data.reviews.length);
        }
      }
    } catch (error) {
      console.error('Error fetching review stats:', error);
    }
  };

  const handleReviewSubmit = (newReview) => {
    setShowReviewForm(false);
    // Refresh review statistics
    if (college) {
      fetchReviewStats(college._id);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 font-medium">({rating})</span>
      </div>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Management': 'bg-green-100 text-green-800',
      'Medical': 'bg-red-100 text-red-800',
      'Law': 'bg-indigo-100 text-indigo-800',
      'Pharmacy': 'bg-purple-100 text-purple-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Science': 'bg-cyan-100 text-cyan-800',
      'Commerce': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Engineering': <FaGraduationCap />,
      'Management': <FaChartLine />,
      'Medical': <FaFlask />,
      'Law': <FaBalanceScale />,
      'Pharmacy': <FaPills />,
      'Arts': <FaBook />,
      'Science': <FaFlask />,
      'Commerce': <FaChartLine />
    };
    return icons[category] || <FaBuilding />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">College Not Found</h3>
          <p className="text-gray-600 mb-6">{error || 'The college you are looking for does not exist.'}</p>
          <Link
            to="/colleges"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg"
          >
            <FaArrowLeft className="mr-2" />
            Back to Colleges
          </Link>x
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-teal-600 to-blue-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <Link
              to="/colleges"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Colleges
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(college.category)}`}>
                {getCategoryIcon(college.category)}
                <span className="ml-2">{college.category}</span>
              </span>
              {college.nirf_ranking && (
                <span className="px-4 py-2 bg-yellow-500 text-yellow-900 rounded-full text-sm font-semibold">
                  <FaTrophy className="inline mr-1" />
                  NIRF Rank {college.nirf_ranking}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{college.name}</h1>

            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-300" />
                <span>{college.location}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-300" />
                <span>Est. {college.established}</span>
              </div>
              {renderStars(college.rating)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg">
                <FaDownload className="text-lg" />
                Download Brochure
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 border border-gray-200 transition-all duration-200 font-medium">
                <FaHeart className="text-red-500 text-lg" />
                Save
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 border border-gray-200 transition-all duration-200 font-medium">
                <FaShare className="text-blue-500 text-lg" />
                Share
              </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {['overview', 'courses', 'facilities', 'admissions', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">About {college.name}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {college.description || 'No description available for this college.'}
                      </p>
                    </div>

                    {college.highlights && college.highlights.length > 0 && (
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Highlights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {college.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                              <FaCheckCircle className="text-green-500 text-lg" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {college.facilities && college.facilities.length > 0 && (
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Facilities</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {college.facilities.map((facility, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                              <FaBuilding className="text-blue-500 text-lg" />
                              <span className="text-gray-700">{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Available Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {college.courses ? (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <FaGraduationCap className="text-teal-500 text-xl" />
                            <span className="font-semibold text-gray-800">Total Courses</span>
                          </div>
                          <p className="text-3xl font-bold text-teal-600">{college.courses}</p>
                        </div>
                      ) : (
                        <p className="text-gray-500">Course information not available.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'facilities' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Campus Facilities</h3>
                    {college.facilities && college.facilities.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {college.facilities.map((facility, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FaBuilding className="text-teal-500 text-lg" />
                              <span className="font-medium text-gray-800">{facility}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Facility information not available.</p>
                    )}
                  </div>
                )}

                {activeTab === 'admissions' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Admission Information</h3>
                    <div className="space-y-4">
                      {college.admissionProcess && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Admission Process</h4>
                          <p className="text-gray-600">{college.admissionProcess}</p>
                        </div>
                      )}

                      {college.examsAccepted && college.examsAccepted.length > 0 && (
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Exams Accepted</h4>
                          <div className="flex flex-wrap gap-2">
                            {college.examsAccepted.map((exam, index) => (
                              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {exam}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h3>
                      {user && (
                        <button
                          onClick={() => setShowReviewForm(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          <FaPen className="text-sm" />
                          Write a Review
                        </button>
                      )}
                    </div>

                    {/* Review Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                            <div className="flex items-center justify-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{totalReviews} reviews</div>
                          </div>
                          <div className="text-gray-600">
                            <p>Based on {totalReviews} student reviews</p>
                            <p className="text-sm">Share your experience to help others!</p>
                          </div>
                        </div>
                        {!user && (
                          <div className="text-center">
                            <p className="text-gray-600 mb-2">Want to review this college?</p>
                            <Link
                              to="/login"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                            >
                              <FaComments className="text-sm" />
                              Login to Review
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Reviews List */}
                    <ReviewsList collegeId={college._id} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-semibold text-gray-800">{college.students?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Courses</span>
                  <span className="font-semibold text-gray-800">{college.courses || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Established</span>
                  <span className="font-semibold text-gray-800">{college.established || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    {renderStars(college.rating)}
                  </div>
                </div>
                {college.nirf_ranking && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">NIRF Rank</span>
                    <span className="font-semibold text-yellow-600">#{college.nirf_ranking}</span>
                  </div>
                )}
                {college.nirf_score && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">NIRF Score</span>
                    <span className="font-semibold text-blue-600">{college.nirf_score}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {college.website && (
                  <div className="flex items-center gap-3">
                    <FaGlobe className="text-teal-500 text-lg" />
                    <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700">
                      Visit Website
                    </a>
                  </div>
                )}
                {college.phone && (
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-teal-500 text-lg" />
                    <a href={`tel:${college.phone}`} className="text-gray-700 hover:text-teal-600">
                      {college.phone}
                    </a>
                  </div>
                )}
                {college.email && (
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-teal-500 text-lg" />
                    <a href={`mailto:${college.email}`} className="text-gray-700 hover:text-teal-600">
                      {college.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Fees Information */}
            {college.fees && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Fee Structure</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    ₹{college.fees.toLocaleString()}
                  </div>
                  <p className="text-gray-600">per year</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && college && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ReviewForm
              collegeId={college._id}
              collegeName={college.name}
              onReviewSubmit={handleReviewSubmit}
              onClose={() => setShowReviewForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeDetail;