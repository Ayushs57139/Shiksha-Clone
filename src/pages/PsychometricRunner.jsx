import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { psychometricsAPI } from '../services/api';
import psychometricTestsData from '../data/psychometricTests';

const PsychometricRunner = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);

  // No authentication check needed - psychometric tests are now open to all users

  // Load test data
  useEffect(() => {
    const loadTest = async () => {
      try {
        // Try to fetch from API first
        const apiResponse = await psychometricsAPI.getTests();
        if (apiResponse.data && apiResponse.data.length > 0) {
          const foundTest = apiResponse.data.find(t => t.key === key);
          if (foundTest) {
            setTest(foundTest);
            // Fetch questions with pagination
            const questionsResponse = await psychometricsAPI.getQuestions(key, { page: 1, limit: 100 });
            if (questionsResponse.data && questionsResponse.data.questions) {
              setQuestions(questionsResponse.data.questions);
            }
          }
        }
      } catch (error) {
        console.log('Using local data for psychometric test');
      }

      // Fallback to local data
      if (!test) {
        const localTest = psychometricTestsData.tests.find(t => t.key === key);
        if (localTest) {
          setTest(localTest);
          setQuestions(psychometricTestsData.questions[key] || []);
        }
      }

      setLoading(false);
    };

    // Load test for all users (no authentication required)
    loadTest();
  }, [key]);

  // Timer countdown
  useEffect(() => {
    if (test && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [test, timeLeft]);

  // Initialize timer when test loads
  useEffect(() => {
    if (test) {
      setTimeLeft(test.timeLimitMinutes * 60);
    }
  }, [test]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // Calculate local results
      const totalQuestions = questions.length;
      const answeredQuestions = Object.keys(answers).length;
      const score = Math.round((answeredQuestions / totalQuestions) * 100);
      
      const localResults = {
        testKey: key,
        testName: test.name,
        userId: user?._id || null,
        userName: user?.name || 'Anonymous User',
        totalQuestions,
        answeredQuestions,
        score,
        answers,
        completedAt: new Date().toISOString(),
        timeSpent: (test.timeLimitMinutes * 60) - timeLeft
      };

      // Try to save to backend if API is available
      try {
        const apiResponse = await psychometricsAPI.submit(key, {
          answers,
          timeSpent: (test.timeLimitMinutes * 60) - timeLeft,
          userId: user?._id || null,
          userName: user?.name || 'Anonymous User'
        });
        if (apiResponse.data) {
          localResults._id = apiResponse.data._id;
          localResults.apiSaved = true;
        }
      } catch (error) {
        console.log('Results saved locally only');
        localResults.apiSaved = false;
      }

      setResults(localResults);
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const closeResults = () => {
    setShowResults(false);
    navigate('/psychometrics');
  };

  // No authentication check - tests are open to all users

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Not Found</h2>
          <p className="text-gray-600 mb-6">The requested psychometric test could not be found.</p>
          <button
            onClick={() => navigate('/psychometrics')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{test.name}</h1>
              <p className="text-gray-600">{test.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-600">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-500">Time Remaining</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{Object.keys(answers).length} of {questions.length} questions answered</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        {/* Question */}
        {questions[currentQuestion] && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <h3 className="text-lg font-medium text-gray-800">
                {questions[currentQuestion].text}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {questions[currentQuestion].options ? (
                // Use specific options for the question
                questions[currentQuestion].options.map((option) => (
                  <label key={option.value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestion]._id}`}
                      value={option.value}
                      checked={answers[questions[currentQuestion]._id] === option.value}
                      onChange={() => handleAnswer(questions[currentQuestion]._id, option.value)}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))
              ) : (
                // Fallback to generic scale if no specific options
                test.scale?.labels?.map((option) => (
                  <label key={option.value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestion]._id}`}
                      value={option.value}
                      checked={answers[questions[currentQuestion]._id] === option.value}
                      onChange={() => handleAnswer(questions[currentQuestion]._id, option.value)}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                )) || (
                  // Default options if no scale is defined
                  [1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name={`question-${questions[currentQuestion]._id}`}
                        value={value}
                        checked={answers[questions[currentQuestion]._id] === value}
                        onChange={() => handleAnswer(questions[currentQuestion]._id, value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Option {value}</span>
                    </label>
                  ))
                )
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex space-x-2">
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || Object.keys(answers).length === 0}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? 'Submitting...' : 'Submit Test'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Question Navigation</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`p-2 text-sm rounded ${
                  answers[questions[index]?._id] 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                } hover:bg-blue-100 hover:text-blue-800 transition-colors`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Popup Modal */}
      {showResults && results && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-800">Test Results</h2>
              <button
                onClick={closeResults}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Results Content */}
            <div className="p-6 space-y-6">
              {/* Test Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">{results.testName}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-blue-600 font-medium">Completed:</span>
                    <span className="ml-2 text-blue-800">
                      {new Date(results.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600 font-medium">Time Spent:</span>
                    <span className="ml-2 text-blue-800">
                      {Math.floor(results.timeSpent / 60)}m {results.timeSpent % 60}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Score Summary */}
              <div className="text-center py-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">{results.score}%</div>
                <div className="text-xl text-gray-600 mb-2">Overall Score</div>
                <div className="text-sm text-gray-500">
                  {results.answeredQuestions} out of {results.totalQuestions} questions answered
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Performance Breakdown</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{results.answeredQuestions}</div>
                      <div className="text-gray-600">Questions Answered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{results.totalQuestions}</div>
                      <div className="text-gray-600">Total Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round((results.answeredQuestions / results.totalQuestions) * 100)}%
                      </div>
                      <div className="text-gray-600">Completion Rate</div>
                    </div>
                  </div>
                </div>

                {/* Score Interpretation */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Score Interpretation</h4>
                  <div className="text-center">
                    {results.score >= 90 && (
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Excellent! Outstanding performance.</span>
                      </div>
                    )}
                    {results.score >= 80 && results.score < 90 && (
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Very Good! Strong performance.</span>
                      </div>
                    )}
                    {results.score >= 70 && results.score < 80 && (
                      <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-800 font-medium">Good! Above average performance.</span>
                      </div>
                    )}
                    {results.score >= 60 && results.score < 70 && (
                      <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Average performance.</span>
                      </div>
                    )}
                    {results.score < 60 && (
                      <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Below average. Consider retaking the test.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Status */}
                {results.userId && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-800 font-medium">
                        Results saved to your account
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-center p-6 border-t bg-gray-50">
              <button
                onClick={closeResults}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychometricRunner;


