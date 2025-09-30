// Mock data utilities - Replace with real API calls
// This file contains placeholder functions and empty data structures
// that should be replaced with actual backend integration

// TODO: Replace these with real API calls
export const mockData = {
  // Empty arrays for real data
  colleges: [],
  courses: [],
  exams: [],
  reviews: [],
  users: [],
  notifications: []
};

// Placeholder functions for API calls
export const fetchColleges = async () => {
  // TODO: Replace with real API call
  // const response = await collegeAPI.getAll();
  // return response.data;
  return [];
};

export const fetchCourses = async () => {
  // TODO: Replace with real API call
  // const response = await courseAPI.getAll();
  // return response.data;
  return [];
};

export const fetchExams = async () => {
  // TODO: Replace with real API call
  // const response = await examAPI.getAll();
  // return response.data;
  return [];
};

export const fetchUserData = async (userId) => {
  // TODO: Replace with real API call
  // const response = await userAPI.getById(userId);
  // return response.data;
  return null;
};

export const fetchUserReviews = async (userId) => {
  // TODO: Replace with real API call
  // const response = await reviewAPI.getByUser(userId);
  // return response.data;
  return [];
};

export const fetchUserTestResults = async (userId) => {
  // TODO: Replace with real API call
  // const response = await testResultAPI.getByUser(userId);
  // return response.data;
  return [];
};

export const fetchUserSavedColleges = async (userId) => {
  // TODO: Replace with real API call
  // const response = await savedCollegeAPI.getByUser(userId);
  // return response.data;
  return [];
};

export const fetchUserNotifications = async (userId) => {
  // TODO: Replace with real API call
  // const response = await notificationAPI.getByUser(userId);
  // return response.data;
  return [];
};

export const fetchUserActivity = async (userId) => {
  // TODO: Replace with real API call
  // const response = await activityAPI.getByUser(userId);
  // return response.data;
  return [];
};

// Export empty data for components that still reference this file
export default mockData;