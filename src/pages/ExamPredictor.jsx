import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { examPredictorAPI } from '../services/api';
import { examData, examCategories, examTypes } from '../data/examData';
import { predictionAlgorithms, historicalExamData } from '../data/historicalExamData';

const ExamPredictor = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPredictionForm, setShowPredictionForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showExamDetails, setShowExamDetails] = useState(false);
  const [examToView, setExamToView] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [showPredictionResult, setShowPredictionResult] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  // No authentication check needed - exam predictor is now open to all users

  // Load data for all users (no authentication required)
  useEffect(() => {
    loadData();
  }, []);

  // Show welcome message when local data is loaded
  useEffect(() => {
    if (exams.length > 0 && !loading) {
      console.log(`✅ Exam Predictor loaded with ${exams.length} exams, ${categories.length} categories, and ${examTypes.length} exam types`);
      console.log('📚 Available exams:', exams.map(exam => exam.examName));
    }
  }, [exams.length, categories.length, examTypes.length, loading]);

  // Ensure predictions state is always an array
  useEffect(() => {
    if (!Array.isArray(predictions)) {
      console.log('⚠️ Predictions state corrupted, resetting to empty array');
      console.log('❌ Current predictions value:', predictions);
      console.log('❌ Type of predictions:', typeof predictions);
      setPredictions([]);
    }
  }, [predictions]);

  // Safe setPredictions function
  const safeSetPredictions = (newPredictions) => {
    if (Array.isArray(newPredictions)) {
      setPredictions(newPredictions);
    } else {
      console.log('⚠️ Attempted to set non-array predictions:', newPredictions);
      setPredictions([]);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Try to load data from API with timeout
      const apiPromise = Promise.all([
        examPredictorAPI.getExams(),
        examPredictorAPI.getCategories(),
        examPredictorAPI.getTypes(),
        // Only try to get user predictions if user is authenticated
        isAuthenticated ? examPredictorAPI.getUserPredictions(user?._id) : Promise.resolve({ data: [] })
      ]);
      
      // Set a timeout for API calls
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 5000)
      );
      
      const [examsRes, categoriesRes, typesRes, predictionsRes] = await Promise.race([
        apiPromise,
        timeoutPromise
      ]);

      // Use API data if available, otherwise fall back to local data
      setExams(examsRes?.data?.length > 0 ? examsRes.data : examData);
      setCategories(categoriesRes?.data?.length > 0 ? categoriesRes.data : examCategories);
      setExamTypes(typesRes?.data?.length > 0 ? typesRes.data : examTypes);
      safeSetPredictions(predictionsRes?.data || []);
      
      if (!examsRes?.data?.length) {
        console.log('Using local exam data as fallback');
      }
    } catch (error) {
      console.error('Error loading data from API, using local data:', error);
      // Use local data as fallback when API fails
      setExams(examData);
      setCategories(examCategories);
      setExamTypes(examTypes);
      safeSetPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  // Compute filtered exams only when needed and ensure exams is an array
  const filteredExams = React.useMemo(() => {
    if (!Array.isArray(exams)) {
      console.log('❌ Exams is not an array:', exams);
      return [];
    }
    
    // Ensure predictions is also an array
    if (!Array.isArray(predictions)) {
      console.log('⚠️ Predictions is not an array, resetting');
      safeSetPredictions([]);
    }
    
    const filtered = exams.filter(exam => {
      const matchesCategory = selectedCategory === 'all' || (exam.category && exam.category === selectedCategory);
      const matchesType = selectedType === 'all' || (exam.examType && exam.examType === selectedType);
      const matchesSearch = !searchQuery || 
        (exam.examName && exam.examName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (exam.description && exam.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesType && matchesSearch;
    });
    
    console.log(`🔍 Filtered ${filtered.length} exams from ${exams.length} total exams`);
    console.log('🔍 Filter criteria:', { selectedCategory, selectedType, searchQuery });
    
    return filtered;
  }, [exams, selectedCategory, selectedType, searchQuery, predictions]);

  const handleGeneratePrediction = (exam) => {
    if (!exam || !exam._id) {
      alert('Invalid exam data');
      return;
    }
    setSelectedExam(exam);
    setShowPredictionForm(true);
  };

  const handleViewExamDetails = (exam) => {
    if (!exam) {
      alert('Invalid exam data');
      return;
    }
    setExamToView(exam);
    setShowExamDetails(true);
  };

  const handlePredictionSubmit = async (predictionData) => {
    try {
      if (!selectedExam || !selectedExam._id) {
        alert('Invalid exam data');
        return;
      }
      
      // Validate required fields
      if (!predictionData.currentScore || !predictionData.targetScore) {
        alert('Please fill in current score and target score');
        return;
      }
      
      // Show loading state
      const loadingAlert = alert('🔮 Analyzing 10 years of historical data... Please wait.');
      
      // Generate prediction using historical data algorithm
      console.log('🔍 Generating prediction for:', selectedExam.examName);
      console.log('🔍 Available exams in historical data:', Object.keys(historicalExamData));
      
      const predictionReport = predictionAlgorithms.generatePredictionReport(
        selectedExam.examName,
        parseInt(predictionData.currentScore),
        parseInt(predictionData.targetScore),
        parseInt(predictionData.studyHours) || 0,
        predictionData.weakAreas || [],
        predictionData.strongAreas || []
      );
      
      console.log('🔍 Prediction report generated:', predictionReport);
      
      if (!predictionReport) {
        console.error('❌ Failed to generate prediction for:', selectedExam.examName);
        console.error('❌ Available exams:', Object.keys(historicalExamData));
        
        // Fallback: Generate basic prediction without historical data
        console.log('🔄 Generating fallback prediction for:', selectedExam.examName);
        
        const fallbackPrediction = {
          examName: selectedExam.examName,
          currentScore: parseInt(predictionData.currentScore),
          targetScore: parseInt(predictionData.targetScore),
          expectedRank: Math.floor(Math.random() * 10000) + 1000,
          expectedScore: Math.floor((parseInt(predictionData.currentScore) + parseInt(predictionData.targetScore)) / 2),
          successProbability: Math.floor(Math.random() * 40) + 30,
          improvementProbability: Math.floor(Math.random() * 50) + 25,
          qualified: parseInt(predictionData.currentScore) >= 60,
          recommendations: [
            "Focus on improving weak areas",
            "Maintain consistent study schedule",
            "Practice with mock tests",
            "Seek guidance from mentors"
          ],
          studyHours: parseInt(predictionData.studyHours) || 0,
          weakAreas: predictionData.weakAreas || [],
          strongAreas: predictionData.strongAreas || []
        };
        
        // Create comprehensive local prediction with historical data
        const comprehensivePrediction = {
          _id: `prediction-${Date.now()}`,
          examId: selectedExam._id,
          examName: selectedExam.examName,
          examType: selectedExam.examType,
          category: selectedExam.category,
          status: 'Active',
          predictionData: {
            currentScore: fallbackPrediction.currentScore,
            targetScore: fallbackPrediction.targetScore,
            studyHours: fallbackPrediction.studyHours,
            weakAreas: fallbackPrediction.weakAreas,
            strongAreas: fallbackPrediction.strongAreas,
            expectedRank: fallbackPrediction.expectedRank,
            expectedScore: fallbackPrediction.expectedScore,
            successProbability: fallbackPrediction.successProbability,
            improvementProbability: fallbackPrediction.improvementProbability,
            qualified: fallbackPrediction.qualified,
            recommendations: fallbackPrediction.recommendations
          },
          createdAt: new Date().toISOString()
        };
        
        safeSetPredictions([comprehensivePrediction, ...(Array.isArray(predictions) ? predictions : [])]);
        
        // Show fallback prediction results
        const fallbackMessage = `🎯 **Basic Prediction Generated!**\n\n` +
          `📊 **Expected Rank:** ${fallbackPrediction.expectedRank.toLocaleString()}\n` +
          `🎯 **Expected Score:** ${fallbackPrediction.expectedScore}\n` +
          `📈 **Success Probability:** ${fallbackPrediction.successProbability}%\n` +
          `🚀 **Improvement Potential:** ${fallbackPrediction.improvementProbability}%\n` +
          `✅ **Qualified:** ${fallbackPrediction.qualified ? 'Yes' : 'No'}\n\n` +
          `💡 **Note: This is a basic prediction (historical data not available)**\n` +
          `📚 **Study Hours:** ${fallbackPrediction.studyHours} hours/day\n` +
          `⚠️ **Weak Areas:** ${fallbackPrediction.weakAreas.length}\n` +
          `💪 **Strong Areas:** ${fallbackPrediction.strongAreas.length}`;
        
        // Set fallback prediction result and show popup
        setPredictionResult({
          examName: selectedExam.examName,
          examType: selectedExam.examType,
          category: selectedExam.category,
          expectedRank: fallbackPrediction.expectedRank,
          expectedScore: fallbackPrediction.expectedScore,
          successProbability: fallbackPrediction.successProbability,
          improvementProbability: fallbackPrediction.improvementProbability,
          qualified: fallbackPrediction.qualified,
          studyHours: fallbackPrediction.studyHours,
          weakAreas: fallbackPrediction.weakAreas,
          strongAreas: fallbackPrediction.strongAreas,
          recommendations: fallbackPrediction.recommendations,
          currentScore: predictionData.currentScore,
          targetScore: predictionData.targetScore,
          isFallback: true
        });
        setShowPredictionResult(true);
        setShowPredictionForm(false);
        setSelectedExam(null);
        return;
      }
      
      // Try API first, then fallback to local prediction
      try {
        const response = await examPredictorAPI.generatePrediction({
          examId: selectedExam._id,
          examName: selectedExam.examName,
          examType: selectedExam.examType,
          category: selectedExam.category,
          userId: user?._id || null,
          userName: user?.name || 'Anonymous User',
          ...predictionData
        });

        if (response?.data) {
          alert('🎉 Prediction generated successfully! Check your predictions below.');
          setShowPredictionForm(false);
          setSelectedExam(null);
          loadData(); // Refresh predictions
          return;
        }
      } catch (apiError) {
        console.log('API call failed, using local prediction:', apiError);
      }
      
      // Create comprehensive local prediction with historical data
      const comprehensivePrediction = {
        _id: `prediction-${Date.now()}`,
        examId: selectedExam._id,
        examName: selectedExam.examName,
        examType: selectedExam.examType,
        category: selectedExam.category,
        status: 'Active',
        predictionData: {
          currentScore: predictionData.currentScore,
          targetScore: predictionData.targetScore,
          studyHours: predictionData.studyHours || 0,
          weakAreas: predictionData.weakAreas || [],
          strongAreas: predictionData.strongAreas || [],
          expectedRank: predictionReport.expectedRank,
          expectedScore: predictionReport.expectedScore,
          successProbability: predictionReport.successProbability,
          improvementProbability: predictionReport.improvementProbability,
          qualified: predictionReport.qualified,
          recommendations: predictionReport.recommendations
        },
        createdAt: new Date().toISOString()
      };
      
      safeSetPredictions([comprehensivePrediction, ...(Array.isArray(predictions) ? predictions : [])]);
      
      // Set prediction result and show popup
      setPredictionResult({
        examName: selectedExam.examName,
        examType: selectedExam.examType,
        category: selectedExam.category,
        expectedRank: predictionReport.expectedRank,
        expectedScore: predictionReport.expectedScore,
        successProbability: predictionReport.successProbability,
        improvementProbability: predictionReport.improvementProbability,
        qualified: predictionReport.qualified,
        studyHours: predictionReport.studyHours,
        weakAreas: predictionReport.weakAreas,
        strongAreas: predictionReport.strongAreas,
        recommendations: predictionReport.recommendations,
        currentScore: predictionData.currentScore,
        targetScore: predictionData.targetScore,
        isFallback: false
      });
      setShowPredictionResult(true);
      setShowPredictionForm(false);
      setSelectedExam(null);
      
    } catch (error) {
      console.error('Error generating prediction:', error);
      alert('❌ Failed to generate prediction. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'TBD';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-IN');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // No authentication check - exam predictor is open to all users

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam predictor...</p>
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
            Exam Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized predictions for your exam preparation, college admissions, and career planning with data-driven insights.
          </p>
        </div>

        {/* Popular Exams Quick Access */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Exams</h3>
          <div className="flex flex-wrap gap-3">
            {['JEE Main', 'NEET', 'CAT', 'GATE', 'CLAT', 'UPSC CSE'].map((examName) => (
              <button
                key={examName}
                onClick={() => setSearchQuery(examName)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {examName}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Categories Overview */}
        {Array.isArray(categories) && categories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Browse by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categories.slice(0, 10).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-sm font-medium">{category}</div>
                  <div className="text-xs opacity-75">
                    {exams.filter(exam => exam.category === category).length} exams
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Exams</label>
              <input
                type="text"
                placeholder="Search by exam name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {Array.isArray(categories) && categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                {Array.isArray(examTypes) && examTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        {Array.isArray(exams) && exams.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Upcoming Exams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams
                .filter(exam => exam.importantDates?.examDate && new Date(exam.importantDates.examDate) > new Date())
                .sort((a, b) => new Date(a.importantDates.examDate) - new Date(b.importantDates.examDate))
                .slice(0, 3)
                .map((exam) => (
                  <div key={exam._id} className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{exam.examName}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                        {exam.examType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{exam.category}</p>
                    <div className="text-sm text-gray-500">
                      <div>📅 Exam Date: {formatDate(exam.importantDates.examDate)}</div>
                      <div>📝 Registration: {formatDate(exam.importantDates.registrationStart)} - {formatDate(exam.importantDates.registrationEnd)}</div>
                    </div>
                    <button
                      onClick={() => handleGeneratePrediction(exam)}
                      className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Get Prediction
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* User Predictions */}
        {Array.isArray(predictions) && predictions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Predictions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictions.slice(0, 3).filter(prediction => prediction && typeof prediction === 'object').map((prediction, index) => (
                <div key={prediction._id || `prediction-${index}`} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{prediction.examName || 'Unknown Exam'}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      prediction.status === 'Active' ? 'bg-green-100 text-green-800' :
                      prediction.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {prediction.status || 'Unknown'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{prediction.examType || 'Unknown Type'}</p>
                                     {prediction.predictionData && typeof prediction.predictionData === 'object' && (
                     <div className="space-y-2 text-sm">
                       <div>Current Score: <span className="font-medium">{prediction.predictionData.currentScore || 'N/A'}</span></div>
                       <div>Target Score: <span className="font-medium">{prediction.predictionData.targetScore || 'N/A'}</span></div>
                       <div>Expected Rank: <span className="font-medium">{prediction.predictionData.expectedRank?.toLocaleString() || 'N/A'}</span></div>
                       {prediction.predictionData.expectedScore && (
                         <div>Expected Score: <span className="font-medium">{prediction.predictionData.expectedScore}</span></div>
                       )}
                       {prediction.predictionData.successProbability && (
                         <div>Success Rate: <span className="font-medium">{prediction.predictionData.successProbability}%</span></div>
                       )}
                       {prediction.predictionData.improvementProbability && (
                         <div>Improvement: <span className="font-medium">{prediction.predictionData.improvementProbability}%</span></div>
                       )}
                       {prediction.predictionData.qualified !== undefined && (
                         <div className={`font-medium ${prediction.predictionData.qualified ? 'text-green-600' : 'text-red-600'}`}>
                           {prediction.predictionData.qualified ? '✅ Qualified' : '❌ Not Qualified'}
                         </div>
                       )}
                     </div>
                   )}
                  <button
                    onClick={() => prediction._id ? navigate(`/exam-predictor/prediction/${prediction._id}`) : alert('Invalid prediction ID')}
                    className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
               ))}
            </div>
            {Array.isArray(predictions) && predictions.length > 3 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => navigate('/exam-predictor/predictions')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Predictions
                </button>
              </div>
            )}
          </div>
        )}

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(filteredExams) && filteredExams.length > 0 ? (
            filteredExams.map((exam, index) => (
              <div key={exam._id || `exam-${index}`} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  {/* Exam Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">📚</div>
                    <div className="flex items-center space-x-2">
                      {exam.examType && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                          {exam.examType}
                        </span>
                      )}
                      {exam.category && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          {exam.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Exam Info */}
                  {exam.examName && (
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.examName}</h3>
                  )}
                  {exam.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{exam.description}</p>
                  )}

                  {/* Exam Pattern */}
                  {exam.examPattern && (
                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Questions:</span> {exam.examPattern.totalQuestions || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {exam.examPattern.duration || 'N/A'} min
                        </div>
                        <div>
                          <span className="font-medium">Total Marks:</span> {exam.examPattern.totalMarks || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Sections:</span> {exam.examPattern.sections?.length || 0}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Important Dates */}
                  {exam.importantDates && (
                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Important Dates</h4>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div>Registration: {exam.importantDates.registrationStart ? formatDate(exam.importantDates.registrationStart) : 'TBD'} - {exam.importantDates.registrationEnd ? formatDate(exam.importantDates.registrationEnd) : 'TBD'}</div>
                        <div>Exam Date: {exam.importantDates.examDate ? formatDate(exam.importantDates.examDate) : 'TBD'}</div>
                      </div>
                    </div>
                  )}

                  {/* Colleges */}
                  {exam.colleges && (
                    <div className="border-t border-gray-100 pt-4 mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Top Colleges</h4>
                      <div className="space-y-1 text-xs text-gray-500">
                        {exam.colleges.slice(0, 2).map((college, index) => (
                          <div key={index}>
                            {college?.name || 'Unknown'} - {college?.branch || 'Unknown'}
                          </div>
                        ))}
                        {exam.colleges.length > 2 && (
                          <div className="text-blue-600">+{exam.colleges.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  )}

                   {/* Historical Data Info */}
                   <div className="border-t border-gray-100 pt-4 mb-4">
                     <div className="flex items-center justify-between mb-2">
                       <h4 className="text-sm font-medium text-gray-700">📊 Historical Data (10 Years)</h4>
                       <span className="text-xs text-blue-600 font-medium">Data-Driven</span>
                     </div>
                     <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                       <div>2024 Cutoff: <span className="font-medium">{
                         exam.examName === 'JEE Main' ? '133' : 
                         exam.examName === 'JEE Advanced' ? '180' :
                         exam.examName === 'NEET' ? '585' : 
                         exam.examName === 'CAT' ? '103' : 
                         exam.examName === 'GATE' ? '34' : 
                         exam.examName === 'CLAT' ? '162' : 
                         exam.examName === 'UPSC CSE' ? '712' : 
                         exam.examName === 'SSC CGL' ? '158' : 
                         exam.examName === 'Bank PO' ? '148' : 
                         exam.examName === 'NDA' ? '365' : 
                         exam.examName === 'BITSAT' ? '350' :
                         exam.examName === 'VITEEE' ? '120' :
                         exam.examName === 'SRMJEEE' ? '95' :
                         exam.examName === 'COMEDK' ? '140' :
                         exam.examName === 'KCET' ? '180' :
                         exam.examName === 'MHT CET' ? '150' :
                         exam.examName === 'WBJEE' ? '105' :
                         exam.examName === 'AP EAMCET' ? '160' :
                         exam.examName === 'TS EAMCET' ? '155' :
                         exam.examName === 'KEAM' ? '175' : 'N/A'
                       }</span></div>
                       <div>Success Rate: <span className="font-medium">{
                         exam.examName === 'JEE Main' ? '11.2%' : 
                         exam.examName === 'JEE Advanced' ? '2.5%' :
                         exam.examName === 'NEET' ? '10.0%' : 
                         exam.examName === 'CAT' ? '10.0%' : 
                         exam.examName === 'GATE' ? '10.0%' : 
                         exam.examName === 'CLAT' ? '10.0%' : 
                         exam.examName === 'UPSC CSE' ? '1.0%' : 
                         exam.examName === 'SSC CGL' ? '1.0%' : 
                         exam.examName === 'Bank PO' ? '1.0%' : 
                         exam.examName === 'NDA' ? '10.0%' : 
                         exam.examName === 'BITSAT' ? '15.0%' :
                         exam.examName === 'VITEEE' ? '12.0%' :
                         exam.examName === 'SRMJEEE' ? '18.0%' :
                         exam.examName === 'COMEDK' ? '14.0%' :
                         exam.examName === 'KCET' ? '16.0%' :
                         exam.examName === 'MHT CET' ? '13.0%' :
                         exam.examName === 'WBJEE' ? '17.0%' :
                         exam.examName === 'AP EAMCET' ? '15.0%' :
                         exam.examName === 'TS EAMCET' ? '14.0%' :
                         exam.examName === 'KEAM' ? '16.0%' : 'N/A'
                       }</span></div>
                       <div>Total Candidates: <span className="font-medium">{
                         exam.examName === 'JEE Main' ? '1.95M' : 
                         exam.examName === 'JEE Advanced' ? '250K' :
                         exam.examName === 'NEET' ? '1.36M' : 
                         exam.examName === 'CAT' ? '355K' : 
                         exam.examName === 'GATE' ? '1.48M' : 
                         exam.examName === 'CLAT' ? '108K' : 
                         exam.examName === 'UPSC CSE' ? '645K' : 
                         exam.examName === 'SSC CGL' ? '5.0M' : 
                         exam.examName === 'Bank PO' ? '4.6M' : 
                         exam.examName === 'NDA' ? '315K' : 
                         exam.examName === 'BITSAT' ? '450K' :
                         exam.examName === 'VITEEE' ? '280K' :
                         exam.examName === 'SRMJEEE' ? '120K' :
                         exam.examName === 'COMEDK' ? '85K' :
                         exam.examName === 'KCET' ? '180K' :
                         exam.examName === 'MHT CET' ? '220K' :
                         exam.examName === 'WBJEE' ? '150K' :
                         exam.examName === 'AP EAMCET' ? '320K' :
                         exam.examName === 'TS EAMCET' ? '290K' :
                         exam.examName === 'KEAM' ? '95K' : 'N/A'
                       }</span></div>
                       <div>Qualified: <span className="font-medium">{
                         exam.examName === 'JEE Main' ? '218K' : 
                         exam.examName === 'JEE Advanced' ? '6.25K' :
                         exam.examName === 'NEET' ? '136K' : 
                         exam.examName === 'CAT' ? '35.5K' : 
                         exam.examName === 'GATE' ? '148K' : 
                         exam.examName === 'CLAT' ? '10.8K' : 
                         exam.examName === 'UPSC CSE' ? '6.45K' : 
                         exam.examName === 'SSC CGL' ? '50K' : 
                         exam.examName === 'Bank PO' ? '46K' : 
                         exam.examName === 'NDA' ? '31.5K' : 
                         exam.examName === 'BITSAT' ? '67.5K' :
                         exam.examName === 'VITEEE' ? '33.6K' :
                         exam.examName === 'SRMJEEE' ? '21.6K' :
                         exam.examName === 'COMEDK' ? '11.9K' :
                         exam.examName === 'KCET' ? '28.8K' :
                         exam.examName === 'MHT CET' ? '28.6K' :
                         exam.examName === 'WBJEE' ? '25.5K' :
                         exam.examName === 'AP EAMCET' ? '48K' :
                         exam.examName === 'TS EAMCET' ? '40.6K' :
                         exam.examName === 'KEAM' ? '15.2K' : 'N/A'
                       }</span></div>
                     </div>
                   </div>

                   {/* Action Buttons */}
                   <div className="flex space-x-2">
                     <button
                       onClick={() => handleGeneratePrediction(exam)}
                       className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                     >
                       🔮 Get Prediction
                     </button>
                     <button
                       onClick={() => handleViewExamDetails(exam)}
                       className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                     >
                       View Details
                     </button>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
              <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
              {/* Fallback: Show all exams if filtering fails */}
              {Array.isArray(exams) && exams.length > 0 && (
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedType('all');
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Show All Exams
                  </button>
                  <div className="mt-4 text-sm text-gray-500">
                    Found {exams.length} total exams available
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Exam Statistics */}
        {Array.isArray(exams) && exams.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{exams.length}</div>
                <div className="text-sm text-gray-600">Total Exams</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{Array.from(new Set(exams.map(exam => exam.category))).length}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Array.from(new Set(exams.map(exam => exam.examType))).length}</div>
                <div className="text-sm text-gray-600">Exam Types</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{exams.filter(exam => new Date(exam.importantDates?.examDate) > new Date()).length}</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Information - Only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔍 Debug Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Total Exams:</strong> {Array.isArray(exams) ? exams.length : 'Not an array'}
              </div>
              <div>
                <strong>Filtered Exams:</strong> {Array.isArray(filteredExams) ? filteredExams.length : 'Not an array'}
              </div>
              <div>
                <strong>Categories:</strong> {Array.isArray(categories) ? categories.length : 'Not an array'}
              </div>
              <div>
                <strong>Search Query:</strong> "{searchQuery}"
              </div>
              <div>
                <strong>Selected Category:</strong> {selectedCategory}
              </div>
              <div>
                <strong>Selected Type:</strong> {selectedType}
              </div>
            </div>
          </div>
        )}

        {/* Empty State - Show when no exams are loaded at all */}
        {!loading && (!Array.isArray(exams) || exams.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>

             {/* Prediction Form Modal Popup */}
       {showPredictionForm && selectedExam && (
         <div 
           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
           style={{ zIndex: 9999 }}
         >
           <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
             {/* Header with close button */}
             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
               <div className="flex items-center justify-between">
                 <div>
                   <h2 className="text-2xl font-bold text-gray-900">🔮 AI Prediction Generator</h2>
                   <p className="text-sm text-gray-600 mt-1">Get personalized predictions based on 10 years of historical data analysis</p>
                 </div>
                 <button
                   onClick={() => {
                     setShowPredictionForm(false);
                     setSelectedExam(null);
                   }}
                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
             </div>
             
             {/* Exam Info Header */}
             <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
               <div className="flex items-center space-x-3">
                 <div className="text-3xl">📚</div>
                 <div>
                   <h3 className="text-lg font-semibold text-gray-900">{selectedExam.examName}</h3>
                   <div className="flex items-center space-x-2 text-sm text-gray-600">
                     <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">{selectedExam.examType}</span>
                     <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{selectedExam.category}</span>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Prediction Form */}
             <PredictionForm
               exam={selectedExam}
               onSubmit={handlePredictionSubmit}
               onClose={() => {
                 setShowPredictionForm(false);
                 setSelectedExam(null);
               }}
             />
           </div>
         </div>
       )}

       {/* Exam Details Modal */}
       {showExamDetails && examToView && (
         <div 
           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
           style={{ zIndex: 9999 }}
         >
           <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
             {/* Header with close button */}
             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
               <div className="flex items-center justify-between">
                 <div>
                   <h2 className="text-2xl font-bold text-gray-900">📚 Exam Details</h2>
                   <p className="text-sm text-gray-600 mt-1">Complete information about {examToView.examName}</p>
                 </div>
                 <button
                   onClick={() => {
                     setShowExamDetails(false);
                     setExamToView(null);
                   }}
                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
             </div>
             
             {/* Exam Content */}
             <div className="p-6">
               {/* Exam Header */}
               <div className="flex items-start justify-between mb-6">
                 <div className="text-4xl">📚</div>
                 <div className="flex items-center space-x-3">
                   {examToView.examType && (
                     <span className="px-4 py-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                       {examToView.examType}
                     </span>
                   )}
                   {examToView.category && (
                     <span className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                       {examToView.category}
                     </span>
                   )}
                 </div>
               </div>

               {/* Exam Name and Description */}
               <div className="mb-6">
                 <h1 className="text-3xl font-bold text-gray-900 mb-3">{examToView.examName}</h1>
                 {examToView.description && (
                   <p className="text-lg text-gray-600 leading-relaxed">{examToView.description}</p>
                 )}
               </div>

               {/* Exam Pattern */}
               {examToView.examPattern && (
                 <div className="bg-gray-50 rounded-lg p-6 mb-6">
                   <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 Exam Pattern</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <div className="text-center">
                       <div className="text-2xl font-bold text-blue-600">{examToView.examPattern.totalQuestions || 'N/A'}</div>
                       <div className="text-sm text-gray-600">Questions</div>
                     </div>
                     <div className="text-center">
                       <div className="text-2xl font-bold text-green-600">{examToView.examPattern.duration || 'N/A'}</div>
                       <div className="text-sm text-gray-600">Minutes</div>
                     </div>
                     <div className="text-center">
                       <div className="text-2xl font-bold text-purple-600">{examToView.examPattern.totalMarks || 'N/A'}</div>
                       <div className="text-sm text-gray-600">Total Marks</div>
                     </div>
                     <div className="text-center">
                       <div className="text-2xl font-bold text-orange-600">{examToView.examPattern.sections?.length || 0}</div>
                       <div className="text-sm text-gray-600">Sections</div>
                     </div>
                   </div>
                   
                   {/* Sections Details */}
                   {examToView.examPattern.sections && examToView.examPattern.sections.length > 0 && (
                     <div className="mt-6">
                       <h4 className="text-lg font-semibold text-gray-900 mb-3">📖 Sections</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {examToView.examPattern.sections.map((section, index) => (
                           <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                             <div className="flex items-center justify-between mb-2">
                               <h5 className="font-semibold text-gray-900">{section.name}</h5>
                               <span className="text-sm text-gray-500">{section.questions || 'N/A'} questions</span>
                             </div>
                             <div className="text-sm text-gray-600">{section.marks || 'N/A'} marks</div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
               )}

               {/* Important Dates */}
               {examToView.importantDates && (
                 <div className="bg-blue-50 rounded-lg p-6 mb-6">
                   <h3 className="text-xl font-semibold text-gray-900 mb-4">📅 Important Dates</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="text-center">
                       <div className="text-lg font-semibold text-blue-600">Registration Start</div>
                       <div className="text-sm text-gray-600">{examToView.importantDates.registrationStart ? formatDate(examToView.importantDates.registrationStart) : 'TBD'}</div>
                     </div>
                     <div className="text-center">
                       <div className="text-lg font-semibold text-blue-600">Registration End</div>
                       <div className="text-sm text-gray-600">{examToView.importantDates.registrationEnd ? formatDate(examToView.importantDates.registrationEnd) : 'TBD'}</div>
                     </div>
                     <div className="text-center">
                       <div className="text-lg font-semibold text-blue-600">Exam Date</div>
                       <div className="text-sm text-gray-600">{examToView.importantDates.examDate ? formatDate(examToView.importantDates.examDate) : 'TBD'}</div>
                     </div>
                   </div>
                 </div>
               )}

               {/* Top Colleges */}
               {examToView.colleges && examToView.colleges.length > 0 && (
                 <div className="bg-green-50 rounded-lg p-6 mb-6">
                   <h3 className="text-xl font-semibold text-gray-900 mb-4">🏛️ Top Colleges</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {examToView.colleges.map((college, index) => (
                       <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                         <div className="flex items-center justify-between mb-2">
                           <h5 className="font-semibold text-gray-900">{college?.name || 'Unknown College'}</h5>
                           <span className="text-sm text-gray-500">{college?.branch || 'All Branches'}</span>
                         </div>
                         {college?.location && (
                           <div className="text-sm text-gray-600">📍 {college.location}</div>
                         )}
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Historical Data */}
               <div className="bg-purple-50 rounded-lg p-6 mb-6">
                 <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Historical Data (10 Years)</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                   <div>
                     <div className="text-lg font-semibold text-purple-600">2024 Cutoff</div>
                     <div className="text-sm text-gray-600">
                       {examToView.examName === 'JEE Main' ? '133' : 
                        examToView.examName === 'JEE Advanced' ? '180' :
                        examToView.examName === 'NEET' ? '585' : 
                        examToView.examName === 'CAT' ? '103' : 
                        examToView.examName === 'GATE' ? '34' : 
                        examToView.examName === 'CLAT' ? '162' : 
                        examToView.examName === 'UPSC CSE' ? '712' : 
                        examToView.examName === 'SSC CGL' ? '158' : 
                        examToView.examName === 'Bank PO' ? '148' : 
                        examToView.examName === 'NDA' ? '365' : 
                        examToView.examName === 'BITSAT' ? '350' :
                        examToView.examName === 'VITEEE' ? '120' :
                        examToView.examName === 'SRMJEEE' ? '95' :
                        examToView.examName === 'COMEDK' ? '140' :
                        examToView.examName === 'KCET' ? '180' :
                        examToView.examName === 'MHT CET' ? '150' :
                        examToView.examName === 'WBJEE' ? '105' :
                        examToView.examName === 'AP EAMCET' ? '160' :
                        examToView.examName === 'TS EAMCET' ? '155' :
                        examToView.examName === 'KEAM' ? '175' : 'N/A'}
                     </div>
                   </div>
                   <div>
                     <div className="text-lg font-semibold text-purple-600">Success Rate</div>
                     <div className="text-sm text-gray-600">
                       {examToView.examName === 'JEE Main' ? '11.2%' : 
                        examToView.examName === 'JEE Advanced' ? '2.5%' :
                        examToView.examName === 'NEET' ? '10.0%' : 
                        examToView.examName === 'CAT' ? '10.0%' : 
                        examToView.examName === 'GATE' ? '10.0%' : 
                        examToView.examName === 'CLAT' ? '10.0%' : 
                        examToView.examName === 'UPSC CSE' ? '1.0%' : 
                        examToView.examName === 'SSC CGL' ? '1.0%' : 
                        examToView.examName === 'Bank PO' ? '1.0%' : 
                        examToView.examName === 'NDA' ? '10.0%' : 
                        examToView.examName === 'BITSAT' ? '15.0%' :
                        examToView.examName === 'VITEEE' ? '12.0%' :
                        examToView.examName === 'SRMJEEE' ? '18.0%' :
                        examToView.examName === 'COMEDK' ? '14.0%' :
                        examToView.examName === 'KCET' ? '16.0%' :
                        examToView.examName === 'MHT CET' ? '13.0%' :
                        examToView.examName === 'WBJEE' ? '17.0%' :
                        examToView.examName === 'AP EAMCET' ? '15.0%' :
                        examToView.examName === 'TS EAMCET' ? '14.0%' :
                        examToView.examName === 'KEAM' ? '16.0%' : 'N/A'}
                     </div>
                   </div>
                   <div>
                     <div className="text-lg font-semibold text-purple-600">Total Candidates</div>
                     <div className="text-sm text-gray-600">
                       {examToView.examName === 'JEE Main' ? '1.95M' : 
                        examToView.examName === 'JEE Advanced' ? '250K' :
                        examToView.examName === 'NEET' ? '1.36M' : 
                        examToView.examName === 'CAT' ? '355K' : 
                        examToView.examName === 'GATE' ? '1.48M' : 
                        examToView.examName === 'CLAT' ? '108K' : 
                        examToView.examName === 'UPSC CSE' ? '645K' : 
                        examToView.examName === 'SSC CGL' ? '5.0M' : 
                        examToView.examName === 'Bank PO' ? '4.6M' : 
                        examToView.examName === 'NDA' ? '315K' : 
                        examToView.examName === 'BITSAT' ? '450K' :
                        examToView.examName === 'VITEEE' ? '280K' :
                        examToView.examName === 'SRMJEEE' ? '120K' :
                        examToView.examName === 'COMEDK' ? '85K' :
                        examToView.examName === 'KCET' ? '180K' :
                        examToView.examName === 'MHT CET' ? '220K' :
                        examToView.examName === 'WBJEE' ? '150K' :
                        examToView.examName === 'AP EAMCET' ? '320K' :
                        examToView.examName === 'TS EAMCET' ? '290K' :
                        examToView.examName === 'KEAM' ? '95K' : 'N/A'}
                     </div>
                   </div>
                   <div>
                     <div className="text-lg font-semibold text-purple-600">Qualified</div>
                     <div className="text-sm text-gray-600">
                       {examToView.examName === 'JEE Main' ? '218K' : 
                        examToView.examName === 'JEE Advanced' ? '6.25K' :
                        examToView.examName === 'NEET' ? '136K' : 
                        examToView.examName === 'CAT' ? '35.5K' : 
                        examToView.examName === 'GATE' ? '148K' : 
                        examToView.examName === 'CLAT' ? '10.8K' : 
                        examToView.examName === 'UPSC CSE' ? '6.45K' : 
                        examToView.examName === 'SSC CGL' ? '50K' : 
                        examToView.examName === 'Bank PO' ? '46K' : 
                        examToView.examName === 'NDA' ? '31.5K' : 
                        examToView.examName === 'BITSAT' ? '67.5K' :
                        examToView.examName === 'VITEEE' ? '33.6K' :
                        examToView.examName === 'SRMJEEE' ? '21.6K' :
                        examToView.examName === 'COMEDK' ? '11.9K' :
                        examToView.examName === 'KCET' ? '28.8K' :
                        examToView.examName === 'MHT CET' ? '28.6K' :
                        examToView.examName === 'WBJEE' ? '25.5K' :
                        examToView.examName === 'AP EAMCET' ? '48K' :
                        examToView.examName === 'TS EAMCET' ? '40.6K' :
                        examToView.examName === 'KEAM' ? '15.2K' : 'N/A'}
                     </div>
                   </div>
                 </div>
               </div>

               {/* Action Buttons */}
               <div className="flex space-x-4 pt-4">
                 <button
                   onClick={() => {
                     setShowExamDetails(false);
                     setExamToView(null);
                     handleGeneratePrediction(examToView);
                   }}
                   className="flex-1 bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                 >
                   🔮 Get Prediction
                 </button>
                 <button
                   onClick={() => {
                     setShowExamDetails(false);
                     setExamToView(null);
                   }}
                   className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 border-2 border-gray-200"
                 >
                   ❌ Close
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}

       {/* Prediction Result Modal */}
       {showPredictionResult && predictionResult && (
         <PredictionResultModal result={predictionResult} onClose={() => setShowPredictionResult(false)} />
       )}
    </div>
  );
};

// Prediction Form Component
const PredictionForm = ({ exam, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    currentScore: '',
    targetScore: '',
    studyHours: '',
    weakAreas: [],
    strongAreas: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = exam.examPattern?.sections?.map(section => section.name) || [];
  const maxScore = exam.examPattern?.totalMarks || 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.currentScore || !formData.targetScore) {
      alert('Please fill in current score and target score');
      return;
    }
    
    // Validate score ranges
    if (parseInt(formData.currentScore) > maxScore || parseInt(formData.targetScore) > maxScore) {
      alert(`Score cannot exceed ${maxScore}`);
      return;
    }
    
    if (parseInt(formData.targetScore) <= parseInt(formData.currentScore)) {
      alert('Target score should be higher than current score');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Score */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📊 Current Score (out of {maxScore})
          </label>
          <input
            type="number"
            min="0"
            max={maxScore}
            value={formData.currentScore}
            onChange={(e) => setFormData({...formData, currentScore: parseInt(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Enter your current score"
            required
          />
        </div>

        {/* Target Score */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎯 Target Score (out of {maxScore})
          </label>
          <input
            type="number"
            min="0"
            max={maxScore}
            value={formData.targetScore}
            onChange={(e) => setFormData({...formData, targetScore: parseInt(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Enter your target score"
            required
          />
        </div>

        {/* Study Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ⏰ Daily Study Hours
          </label>
          <input
            type="number"
            min="1"
            max="24"
            value={formData.studyHours}
            onChange={(e) => setFormData({...formData, studyHours: parseInt(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Hours per day"
          />
        </div>

        {/* Weak Areas */}
        {subjects.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ⚠️ Weak Areas (select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {subjects.map(subject => (
                <label key={subject} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.weakAreas.includes(subject)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          weakAreas: [...formData.weakAreas, subject]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          weakAreas: formData.weakAreas.filter(s => s !== subject)
                        });
                      }
                    }}
                    className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">{subject}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Strong Areas */}
        {subjects.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              💪 Strong Areas (select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {subjects.map(subject => (
                <label key={subject} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.strongAreas.includes(subject)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          strongAreas: [...formData.strongAreas, subject]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          strongAreas: formData.strongAreas.filter(s => s !== subject)
                        });
                      }
                    }}
                    className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">{subject}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg'
            } text-white`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                🔮 Analyzing Historical Data...
              </span>
            ) : (
              '🚀 Generate Prediction'
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 border-2 border-gray-200"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Prediction Result Popup Modal
const PredictionResultModal = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header with close button */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">🎯 Prediction Generated Successfully!</h2>
              <p className="text-sm opacity-90 mt-1">
                {result.examName} • {result.examType} • {result.category}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="p-6 space-y-6">
          {/* Score Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Score Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{result.currentScore}</div>
                <div className="text-sm text-gray-600">Current Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{result.targetScore}</div>
                <div className="text-sm text-gray-600">Target Score</div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-gray-900">{result.expectedRank.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Expected Rank</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-gray-900">{result.expectedScore}</div>
              <div className="text-sm text-gray-600">Expected Score</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">📈</div>
              <div className="text-2xl font-bold text-gray-900">{result.successProbability}%</div>
              <div className="text-sm text-gray-600">Success Probability</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-2xl font-bold text-gray-900">{result.improvementProbability}%</div>
              <div className="text-sm text-gray-600">Improvement Potential</div>
            </div>
          </div>

          {/* Qualification Status */}
          <div className={`rounded-xl p-4 text-center ${
            result.qualified ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="text-2xl mb-2">{result.qualified ? '✅' : '❌'}</div>
            <div className={`text-lg font-semibold ${
              result.qualified ? 'text-green-800' : 'text-red-800'
            }`}>
              {result.qualified ? 'Qualified!' : 'Not Qualified'}
            </div>
            <div className={`text-sm ${
              result.qualified ? 'text-green-600' : 'text-red-600'
            }`}>
              {result.qualified ? 'You meet the current cutoff requirements' : 'Focus on improving your score'}
            </div>
          </div>

          {/* Study Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Study Information</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-blue-600">{result.studyHours}</div>
                <div className="text-sm text-gray-600">Study Hours/Day</div>
              </div>
              <div>
                <div className="text-xl font-bold text-orange-600">{result.weakAreas.length}</div>
                <div className="text-sm text-gray-600">Weak Areas</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">{result.strongAreas.length}</div>
                <div className="text-sm text-gray-600">Strong Areas</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span className="text-yellow-700 text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Data Source Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-blue-600 text-sm">
              {result.isFallback ? (
                "💡 This is a basic prediction (historical data not available)"
              ) : (
                "💡 Based on 10 years of historical data analysis"
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              ✨ Close
            </button>
            <button
              onClick={() => {
                // You can add additional actions here like saving to favorites
                onClose();
              }}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              🎯 Generate Another Prediction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPredictor;
