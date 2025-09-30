import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { psychometricsAPI } from '../../services/api';
import psychometricTestsData from '../../data/psychometricTests';

const AdminPsychometrics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tests');
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importData, setImportData] = useState('');
  const [importFormat, setImportFormat] = useState('json');
  const [importTestKey, setImportTestKey] = useState('');
  const [replaceQuestions, setReplaceQuestions] = useState(false);
  const [filterTest, setFilterTest] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [sortBy, setSortBy] = useState('completedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin');
      return;
    }
  }, [user, navigate]);

  // Load tests and results
  useEffect(() => {
    if (user?.role === 'admin') {
      loadTests();
      loadResults();
    }
  }, [user]);

  const loadTests = async () => {
    try {
      const response = await psychometricsAPI.getTests();
      if (response.data && response.data.length > 0) {
        setTests(response.data);
      } else {
        setTests(psychometricTestsData.tests);
      }
    } catch (error) {
      console.log('Using local test data');
      setTests(psychometricTestsData.tests);
    }
  };

  const loadResults = async () => {
    setLoading(true);
    try {
      const response = await psychometricsAPI.adminListResults({
        page: 1,
        limit: 1000,
        sortBy,
        sortOrder
      });
      if (response.data && response.data.results) {
        setResults(response.data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.log('No results from API, using empty data');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImportQuestions = async () => {
    if (!importTestKey || !importData.trim()) {
      alert('Please select a test and provide import data');
      return;
    }

    try {
      let questions;
      if (importFormat === 'json') {
        questions = JSON.parse(importData);
      } else {
        // CSV format
        const lines = importData.trim().split('\n');
        questions = lines.map((line, index) => {
          const [text, dimensionKey] = line.split(',');
          return {
            text: text.trim(),
            dimensionKey: dimensionKey?.trim() || 'GENERAL',
            order: index + 1
          };
        });
      }

      const response = await psychometricsAPI.adminImportQuestions(
        importTestKey,
        questions,
        replaceQuestions
      );

      if (response.data) {
        alert(`Successfully imported ${questions.length} questions!`);
        setImportData('');
        setImportTestKey('');
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert('Import failed. Please check your data format.');
    }
  };

  const createTestFromTemplate = async (templateTest) => {
    try {
      const testData = {
        key: templateTest.key,
        name: templateTest.name,
        category: templateTest.category,
        description: templateTest.description,
        timeLimitMinutes: templateTest.timeLimitMinutes,
        dimensions: templateTest.dimensions,
        // Scale removed - now using specific options per question
        icon: templateTest.icon
      };

      const response = await psychometricsAPI.adminUpsertTest(testData);
      if (response.data) {
        alert('Test created successfully!');
        loadTests();
      }
    } catch (error) {
      console.error('Failed to create test:', error);
      alert('Failed to create test. Please try again.');
    }
  };

  const createCompleteTest = async (testData) => {
    try {
      const response = await psychometricsAPI.adminCreateCompleteTest(testData);
      if (response.data) {
        alert(`Complete test "${testData.name}" created successfully with ${testData.questions.length} questions!`);
        loadTests();
      }
    } catch (error) {
      console.error('Failed to create complete test:', error);
      alert('Failed to create complete test. Please try again.');
    }
  };

  const filteredResults = results.filter(result => {
    const matchesTest = !filterTest || result.testKey === filterTest;
    const matchesUser = !filterUser || 
      result.userName.toLowerCase().includes(filterUser.toLowerCase()) ||
      result.userId.toLowerCase().includes(filterUser.toLowerCase());
    return matchesTest && matchesUser;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (sortBy === 'completedAt') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Average';
    return 'Below Average';
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Psychometric Tests Management</h1>
          <p className="text-gray-600 mt-2">Manage tests, import questions, and view user results</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'tests', label: 'Tests', icon: '🧠' },
                { id: 'create', label: 'Create Test', icon: '➕' },
                { id: 'import', label: 'Import Questions', icon: '📥' },
                { id: 'results', label: 'User Results', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Available Tests</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => loadTests()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh
                </button>
                <button
                  onClick={() => setActiveTab('create')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create New Test
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test) => (
                <div key={test._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl">{test.icon}</div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {test.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{test.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                  <div className="text-sm text-gray-500 mb-3">
                    <div>Time: {test.timeLimitMinutes} min</div>
                    <div>Questions: {test.numQuestions}</div>
                  </div>
                  <button
                    onClick={() => createTestFromTemplate(test)}
                    className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Create Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Test Tab */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Psychometric Test</h2>
            
            <div className="space-y-6">
              {/* Test Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Key (Unique Identifier)</label>
                  <input
                    type="text"
                    placeholder="e.g., numerical-reasoning-advanced"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Advanced Numerical Reasoning"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Category</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Personality">Personality</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="Technical">Technical</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Intelligence">Intelligence</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
                  <input
                    type="number"
                    min="5"
                    max="120"
                    placeholder="30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe what this test measures..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <input
                  type="text"
                  placeholder="🧠"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Quick Templates */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => createCompleteTest({
                      key: 'numerical-reasoning-advanced',
                      name: 'Advanced Numerical Reasoning',
                      category: 'Aptitude',
                      description: 'Advanced mathematical problem solving and data interpretation',
                      timeLimitMinutes: 45,
                      icon: '🧮',
                      dimensions: [{ key: 'NR', name: 'Numerical Reasoning', description: 'Advanced mathematical ability' }],
                      // Scale removed - using specific options per question
                      questions: [
                        {
                          text: 'What is 15% of 200?',
                          dimensionKey: 'NR',
                          options: [
                            { value: 'A', text: '20', correct: false },
                            { value: 'B', text: '25', correct: false },
                            { value: 'C', text: '30', correct: true },
                            { value: 'D', text: '35', correct: false }
                          ],
                          correctAnswer: 'C',
                          explanation: '15% of 200 = 0.15 × 200 = 30'
                        },
                        {
                          text: 'If a train travels 60km in 1.5 hours, what is the speed in km/h?',
                          dimensionKey: 'NR',
                          options: [
                            { value: 'A', text: '30 km/h', correct: false },
                            { value: 'B', text: '40 km/h', correct: true },
                            { value: 'C', text: '45 km/h', correct: false },
                            { value: 'D', text: '50 km/h', correct: false }
                          ],
                          correctAnswer: 'B',
                          explanation: 'Speed = Distance ÷ Time = 60 ÷ 1.5 = 40 km/h'
                        }
                      ]
                    })}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left transition-colors"
                  >
                    <h4 className="font-medium text-gray-900">Numerical Reasoning (Advanced)</h4>
                    <p className="text-sm text-gray-600">2 sample questions with multiple choice options</p>
                  </button>
                  
                  <button
                    onClick={() => createCompleteTest({
                      key: 'verbal-reasoning-advanced',
                      name: 'Advanced Verbal Reasoning',
                      category: 'Aptitude',
                      description: 'Advanced reading comprehension and language analysis',
                      timeLimitMinutes: 40,
                      icon: '📚',
                      dimensions: [{ key: 'VR', name: 'Verbal Reasoning', description: 'Advanced language comprehension' }],
                      // Scale removed - using specific options per question
                      questions: [
                        {
                          text: 'Select the synonym of "augment".',
                          dimensionKey: 'VR',
                          options: [
                            { value: 'A', text: 'Decrease', correct: false },
                            { value: 'B', text: 'Increase', correct: true },
                            { value: 'C', text: 'Maintain', correct: false },
                            { value: 'D', text: 'Replace', correct: false }
                          ],
                          correctAnswer: 'B',
                          explanation: 'Augment means to increase or add to something'
                        }
                      ]
                    })}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left transition-colors"
                  >
                    <h4 className="font-medium text-gray-900">Verbal Reasoning (Advanced)</h4>
                    <p className="text-sm text-gray-600">1 sample question with multiple choice options</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Import Tab */}
        {activeTab === 'import' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Import Questions</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Test
                </label>
                <select
                  value={importTestKey}
                  onChange={(e) => setImportTestKey(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a test...</option>
                  {tests.map((test) => (
                    <option key={test.key} value={test.key}>
                      {test.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Import Format
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="json"
                      checked={importFormat === 'json'}
                      onChange={(e) => setImportFormat(e.target.value)}
                      className="mr-2"
                    />
                    JSON
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="csv"
                      checked={importFormat === 'csv'}
                      onChange={(e) => setImportFormat(e.target.value)}
                      className="mr-2"
                    />
                    CSV
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Replace Existing Questions
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={replaceQuestions}
                    onChange={(e) => setReplaceQuestions(e.target.checked)}
                    className="mr-2"
                  />
                  Replace all existing questions for this test
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Data ({importFormat.toUpperCase()})
                </label>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder={
                    importFormat === 'json' 
                      ? '[\n  {"text": "Question text", "dimensionKey": "NR", "order": 1},\n  ...\n]'
                      : 'Question text,NR,1\nAnother question,VR,2\n...'
                  }
                />
              </div>

              <button
                onClick={handleImportQuestions}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Import Questions
              </button>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">User Test Results</h2>
              <button
                onClick={() => loadResults()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Test</label>
                <select
                  value={filterTest}
                  onChange={(e) => setFilterTest(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Tests</option>
                  {tests.map((test) => (
                    <option key={test.key} value={test.key}>
                      {test.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by User</label>
                <input
                  type="text"
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                  placeholder="Search by name or ID..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="completedAt">Completion Date</option>
                  <option value="score">Score</option>
                  <option value="userName">User Name</option>
                  <option value="testName">Test Name</option>
                </select>
              </div>
            </div>

            {/* Results Table */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading results...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Questions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time Spent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedResults.map((result) => (
                      <tr key={result._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{result.userName}</div>
                            <div className="text-sm text-gray-500">{result.userId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{result.testName}</div>
                          <div className="text-sm text-gray-500">{result.testKey}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getScoreColor(result.score)}`}>
                              {result.score}%
                            </span>
                            <span className="text-sm text-gray-500">({getScoreLabel(result.score)})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.answeredQuestions}/{result.totalQuestions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(result.completedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Summary Stats */}
            {sortedResults.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{sortedResults.length}</div>
                  <div className="text-sm text-blue-600">Total Results</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(sortedResults.reduce((sum, r) => sum + r.score, 0) / sortedResults.length)}
                  </div>
                  <div className="text-sm text-green-600">Average Score</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.round(sortedResults.reduce((sum, r) => sum + r.timeSpent, 0) / sortedResults.length / 60)}
                  </div>
                  <div className="text-sm text-yellow-600">Avg Time (min)</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {Array.from(new Set(sortedResults.map(r => r.userId))).length}
                  </div>
                  <div className="text-sm text-purple-600">Unique Users</div>
                </div>
              </div>
            )}

            {sortedResults.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">No test results match your current filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPsychometrics;
