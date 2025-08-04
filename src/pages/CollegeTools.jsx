import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalculator, 
  FaChartLine, 
  FaGraduationCap, 
  FaSearch,
  FaArrowLeft,
  FaCheckCircle,
  FaInfoCircle,
  FaUniversity,
  FaMoneyBillWave,
  FaStar,
  FaCalendarAlt,
  FaFileAlt
} from 'react-icons/fa';
import { collegeTools } from '../data/toolsData';

const CollegeTools = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState(null);
  const [selectedPredictor, setSelectedPredictor] = useState(null);
  const [userScore, setUserScore] = useState('');
  const [userRank, setUserRank] = useState('');
  const [userPercentile, setUserPercentile] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredictorSubmit = () => {
    if (!selectedPredictor || !userScore) return;

    const predictor = collegeTools.collegePredictor.data.find(p => p.id === selectedPredictor);
    if (!predictor) return;

    let result = {
      predictor: predictor.name,
      userInput: userScore,
      predictions: []
    };

    if (predictor.name.includes('JEE')) {
      const rank = parseInt(userRank);
      predictor.colleges.forEach((college, index) => {
        const cutoffRank = predictor.cutoffRanks[index];
        const chance = rank <= cutoffRank ? 'High' : rank <= cutoffRank * 1.5 ? 'Medium' : 'Low';
        result.predictions.push({
          college,
          cutoffRank,
          userRank: rank,
          chance,
          successRate: predictor.successRate
        });
      });
    } else if (predictor.name.includes('NEET')) {
      const score = parseInt(userScore);
      predictor.colleges.forEach((college, index) => {
        const cutoffScore = predictor.cutoffScores[index];
        const chance = score >= cutoffScore ? 'High' : score >= cutoffScore - 50 ? 'Medium' : 'Low';
        result.predictions.push({
          college,
          cutoffScore,
          userScore: score,
          chance,
          successRate: predictor.successRate
        });
      });
    } else if (predictor.name.includes('CAT')) {
      const percentile = parseFloat(userPercentile);
      predictor.colleges.forEach((college, index) => {
        const cutoffPercentile = predictor.cutoffPercentiles[index];
        const chance = percentile >= cutoffPercentile ? 'High' : percentile >= cutoffPercentile - 2 ? 'Medium' : 'Low';
        result.predictions.push({
          college,
          cutoffPercentile,
          userPercentile: percentile,
          chance,
          successRate: predictor.successRate
        });
      });
    }

    setPredictionResult(result);
  };

  const getChanceColor = (chance) => {
    switch (chance) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">College Tools</h1>
              <p className="text-gray-600">Essential tools for college selection and admission</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(collegeTools).map(([key, tool]) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setActiveTool(key)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {key === 'collegePredictor' && <FaSearch className="h-6 w-6 text-blue-600" />}
                  {key === 'feeCalculator' && <FaCalculator className="h-6 w-6 text-green-600" />}
                  {key === 'rankingCompare' && <FaChartLine className="h-6 w-6 text-purple-600" />}
                  {key === 'admissionGuide' && <FaGraduationCap className="h-6 w-6 text-orange-600" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tool Content */}
        {activeTool && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{collegeTools[activeTool].title}</h2>
              <button
                onClick={() => setActiveTool(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* College Predictor */}
            {activeTool === 'collegePredictor' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Predictor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {collegeTools.collegePredictor.data.map((predictor) => (
                      <div
                        key={predictor.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPredictor === predictor.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedPredictor(predictor.id)}
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{predictor.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{predictor.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaCheckCircle className="h-4 w-4 mr-2" />
                          <span>{predictor.successRate}% accuracy</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPredictor && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Your Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedPredictor === 1 && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">JEE Main Rank</label>
                            <input
                              type="number"
                              value={userRank}
                              onChange={(e) => setUserRank(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your rank"
                            />
                          </div>
                        </>
                      )}
                      {selectedPredictor === 2 && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">NEET Score</label>
                            <input
                              type="number"
                              value={userScore}
                              onChange={(e) => setUserScore(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your score"
                            />
                          </div>
                        </>
                      )}
                      {selectedPredictor === 3 && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CAT Percentile</label>
                            <input
                              type="number"
                              step="0.01"
                              value={userPercentile}
                              onChange={(e) => setUserPercentile(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your percentile"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      onClick={handlePredictorSubmit}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Get Prediction
                    </button>
                  </div>
                )}

                {predictionResult && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction Results</h3>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">
                        <strong>Predictor:</strong> {predictionResult.predictor}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Your Input:</strong> {predictionResult.userInput}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {predictionResult.predictions.map((prediction, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{prediction.college}</h4>
                          <div className="space-y-2 text-sm">
                            {prediction.cutoffRank && (
                              <p><strong>Cutoff Rank:</strong> {prediction.cutoffRank}</p>
                            )}
                            {prediction.cutoffScore && (
                              <p><strong>Cutoff Score:</strong> {prediction.cutoffScore}</p>
                            )}
                            {prediction.cutoffPercentile && (
                              <p><strong>Cutoff Percentile:</strong> {prediction.cutoffPercentile}%</p>
                            )}
                            <p><strong>Your Rank:</strong> {prediction.userRank || prediction.userScore || prediction.userPercentile}</p>
                            <p><strong>Success Rate:</strong> {prediction.successRate}%</p>
                            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getChanceColor(prediction.chance)}`}>
                              {prediction.chance} Chance
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Fee Calculator */}
            {activeTool === 'feeCalculator' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {collegeTools.feeCalculator.data.map((calculator) => (
                    <div key={calculator.id} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{calculator.name}</h3>
                      <div className="space-y-4">
                        {Object.entries(calculator.feeRanges).map(([category, fees]) => (
                          <div key={category} className="bg-white rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2 capitalize">{category}</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Min:</strong> ₹{fees.min.toLocaleString()}</p>
                              <p><strong>Max:</strong> ₹{fees.max.toLocaleString()}</p>
                              <p><strong>Average:</strong> ₹{fees.avg.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                        <div className="bg-white rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Additional Costs</h4>
                          <div className="space-y-2 text-sm">
                            <p><strong>Hostel:</strong> ₹{calculator.additionalCosts.hostel.toLocaleString()}</p>
                            <p><strong>Mess:</strong> ₹{calculator.additionalCosts.mess.toLocaleString()}</p>
                            <p><strong>Books:</strong> ₹{calculator.additionalCosts.books.toLocaleString()}</p>
                            <p><strong>Transport:</strong> ₹{calculator.additionalCosts.transport.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ranking Compare */}
            {activeTool === 'rankingCompare' && (
              <div>
                <div className="space-y-6">
                  {collegeTools.rankingCompare.data.map((ranking) => (
                    <div key={ranking.id} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{ranking.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ranking.colleges.map((college, index) => (
                          <div key={index} className="bg-white rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-gray-900">{college.name}</h4>
                              <div className="flex items-center space-x-1">
                                <FaStar className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm font-medium">#{college.nirfRank}</span>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <p><strong>Placement Rate:</strong> {college.placementRate}%</p>
                              <p><strong>Avg Package:</strong> ₹{college.avgPackage.toLocaleString()}</p>
                              <p><strong>Highest Package:</strong> ₹{college.highestPackage.toLocaleString()}</p>
                              <p><strong>Research Score:</strong> {college.researchScore}/100</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admission Guide */}
            {activeTool === 'admissionGuide' && (
              <div>
                <div className="space-y-6">
                  {collegeTools.admissionGuide.data.map((guide) => (
                    <div key={guide.id} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{guide.name}</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <FaCalendarAlt className="h-4 w-4 mr-2" />
                            Important Dates
                          </h4>
                          <div className="bg-white rounded-lg p-4">
                            <ul className="space-y-2 text-sm">
                              {guide.importantDates.map((date, index) => (
                                <li key={index} className="flex items-start">
                                  <FaCheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5" />
                                  {date}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <FaFileAlt className="h-4 w-4 mr-2" />
                            Documents Required
                          </h4>
                          <div className="bg-white rounded-lg p-4">
                            <ul className="space-y-2 text-sm">
                              {guide.documentsRequired.map((doc, index) => (
                                <li key={index} className="flex items-start">
                                  <FaCheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <FaInfoCircle className="h-4 w-4 mr-2" />
                          Admission Process
                        </h4>
                        <div className="bg-white rounded-lg p-4">
                          <ol className="space-y-2 text-sm">
                            {guide.process.map((step, index) => (
                              <li key={index} className="flex items-start">
                                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                                  {index + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeTools; 