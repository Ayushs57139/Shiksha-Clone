import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error accessing localStorage in request interceptor:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (storageError) {
        console.error('Error clearing localStorage in interceptor:', storageError);
      }
      // Only redirect if we're not already on the login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Colleges API
export const collegesAPI = {
  // Get all colleges with filters and pagination
  getAll: (params = {}) => api.get('/colleges', { params }),
  
  // Get college by slug
  getBySlug: (slug) => api.get(`/colleges/${slug}`),
  
  // Get colleges by category
  getByCategory: (category, params = {}) => api.get(`/colleges/category/${category}`, { params }),
  
  // Get colleges by location
  getByLocation: (location, params = {}) => api.get(`/colleges/location/${location}`, { params }),
  
  // Search colleges
  search: (query, params = {}) => api.get(`/colleges/search/${query}`, { params }),
  
  // Get college statistics
  getStats: () => api.get('/colleges/stats/overview'),
  
  // Trigger scraper
  triggerScrape: () => api.get('/colleges/scrape/trigger'),
  
  // CRUD operations
  create: (data) => api.post('/colleges', data),
  update: (id, data) => api.put(`/colleges/${id}`, data),
  delete: (id) => api.delete(`/colleges/${id}`),
};

// Courses API
export const coursesAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
};

// Exams API
export const examsAPI = {
  getAll: (params) => api.get('/exams', { params }),
  getById: (id) => api.get(`/exams/${id}`),
  create: (data) => api.post('/exams', data),
  update: (id, data) => api.put(`/exams/${id}`, data),
};

// News API
export const newsAPI = {
  getAll: (params) => api.get('/news', { params }),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  
  // Exam Predictor Admin
  examPredictorStats: () => api.get('/exam-predictor/admin/stats'),
  examPredictorPredictions: (params = {}) => api.get('/exam-predictor/admin/predictions', { params }),
  createExam: (data) => api.post('/exam-predictor/admin/exams', data),
  updateExam: (id, data) => api.put(`/exam-predictor/admin/exams/${id}`, data),
  deleteExam: (id) => api.delete(`/exam-predictor/admin/exams/${id}`),
  
  // Dashboard and Analytics
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getRecentActivity: () => api.get('/admin/dashboard/activity'),
  getColleges: (params = {}) => api.get('/admin/colleges', { params }),
  getCollege: (id) => api.get(`/admin/colleges/${id}`),
  createCollege: (data) => api.post('/admin/colleges', data),
  updateCollege: (id, data) => api.put(`/admin/colleges/${id}`, data),
  deleteCollege: (id) => api.delete(`/admin/colleges/${id}`),
  getUsers: (params = {}) => api.get('/admin/users', { params }),
  getAnalytics: (params = {}) => api.get('/admin/analytics', { params }),
  getCollegeStats: () => api.get('/admin/colleges/stats/overview'),
};

// Templates API
export const templatesAPI = {
  list: (params = {}) => api.get('/templates', { params }),
  get: (id) => api.get(`/templates/${id}`),
  create: (data) => api.post('/templates', data),
  update: (id, data) => api.put(`/templates/${id}`, data),
  remove: (id) => api.delete(`/templates/${id}`),
  use: (id) => api.post(`/templates/${id}/use`),
  seed: () => api.post('/templates/seed'),
  seedRefresh: () => api.post('/templates/seed/refresh'),
};

// Psychometrics API
export const psychometricsAPI = {
  getTests: () => api.get('/psychometrics/tests'),
  getQuestions: (key, params) => api.get(`/psychometrics/tests/${key}/questions`, { params }),
  submit: (key, payload) => api.post(`/psychometrics/tests/${key}/submit`, payload),
  results: (userId) => api.get(`/psychometrics/results/${userId}`),
  // Admin
  adminUpsertTest: (testData) => api.post('/psychometrics/admin/tests', testData),
  adminCreateCompleteTest: (testData) => api.post('/psychometrics/admin/tests/complete', testData),
  adminImportQuestions: (testKey, questions, replace = false) => api.post(`/psychometrics/admin/tests/${testKey}/questions/import`, questions, { params: { replace } }),
  adminListResults: (params = {}) => api.get('/psychometrics/admin/results', { params })
};

// Exam Predictor API
export const examPredictorAPI = {
  getExams: (params = {}) => api.get('/exam-predictor/exams', { params }),
  getExam: (id) => api.get(`/exam-predictor/exams/${id}`),
  getCategories: () => api.get('/exam-predictor/categories'),
  getTypes: () => api.get('/exam-predictor/types'),
  generatePrediction: (data) => api.post('/exam-predictor/predict', data),
  getUserPredictions: (userId) => api.get('/exam-predictor/predictions', { params: { userId } }),
  getPrediction: (id) => api.get(`/exam-predictor/predictions/${id}`),
  updateMockScore: (id, data) => api.put(`/exam-predictor/predictions/${id}/scores`, data)
};

export default api;