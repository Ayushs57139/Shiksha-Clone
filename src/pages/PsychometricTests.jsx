import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { psychometricsAPI } from '../services/api';
import psychometricTestsData from '../data/psychometricTests';

const PsychometricTests = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // No authentication check needed - psychometric tests are now open to all users

  useEffect(() => {
    const loadTests = async () => {
      try {
        console.log('Fetching tests from API...');
        const response = await psychometricsAPI.getTests();
        console.log('API Response:', response);
        if (response.data && response.data.length > 0) {
          console.log('Setting tests from API:', response.data);
          setTests(response.data);
        } else {
          console.log('No tests in API response, using local data');
          setTests(psychometricTestsData.tests);
        }
      } catch (error) {
        console.error('API Error:', error);
        console.log('Using local data for psychometric tests');
        setTests(psychometricTestsData.tests);
      } finally {
        setLoading(false);
      }
    };

    // Load tests for all users (no authentication required)
    // For now, use local data to ensure tests are displayed
    console.log('Using local data for immediate display');
    setTests(psychometricTestsData.tests);
    setLoading(false);
    
    // Try API call in background
    loadTests();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  const filteredTests = selectedCategory === 'all' 
    ? tests 
    : tests.filter(test => test.category.toLowerCase() === selectedCategory.toLowerCase());

  const categories = ['all', ...Array.from(new Set(tests.map(test => test.category)))];

  // No authentication check - tests are open to all users

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading psychometric tests...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Psychometric Tests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Assess your cognitive abilities, personality traits, and professional skills with our comprehensive psychometric testing platform.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg shadow-sm p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div key={test._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                {/* Test Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{test.icon}</div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {test.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Test Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{test.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{test.description}</p>

                {/* Statistics */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{test.numTests} tests</span>
                    <span>|</span>
                    <span>{test.numQuestions} questions</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(test.rating)}
                    <span className="text-sm text-gray-600 ml-2">({test.rating})</span>
                  </div>
                </div>

                {/* Test Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span>Time: {test.timeLimitMinutes} min</span>
                  <span>Questions: {test.numQuestions}</span>
                </div>

                {/* Start Button */}
                <button
                  onClick={() => navigate(`/psychometrics/${test.key}`)}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Start Test</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🧠</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychometricTests;


