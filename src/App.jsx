import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthErrorBoundary from './components/ui/AuthErrorBoundary';
import Navbar from './components/ui/navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CollegeList from './components/college/CollegeList';
import CollegeDetail from './pages/CollegeDetail';
import CourseDetail from './pages/CourseDetail';
import ExamDetail from './pages/ExamDetail';
import TestPage from './pages/TestPage';
import CollegesByLocation from './components/college/CollegesByLocation';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminColleges from './pages/admin/AdminColleges';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import ResumeBuilder from './pages/ResumeBuilder';
import AdminResumes from './pages/admin/AdminResumes';
import AdminTools from './pages/admin/AdminTools';
import AdminReviews from './pages/admin/AdminReviews';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminPsychometrics from './pages/admin/AdminPsychometrics';
import AdminExamPredictor from './pages/admin/AdminExamPredictor';
import TemplateSelection from './pages/TemplateSelection';
import AllTemplates from './pages/AllTemplates';
import CollegeTools from './pages/CollegeTools';
import ExamPreparation from './pages/ExamPreparation';
import CareerResources from './pages/CareerResources';
import StudyAbroad from './pages/StudyAbroad';
import Admin from './pages/admin/Admin';
import PsychometricTests from './pages/PsychometricTests';
import PsychometricRunner from './pages/PsychometricRunner';
import PsychometricResult from './pages/PsychometricResult';
import ExamPredictor from './pages/ExamPredictor';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <AuthErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="pt-24">
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/colleges" element={<CollegeList />} />
              <Route path="/colleges/engineering-by-location" element={<CollegesByLocation />} />
              <Route path="/colleges/medical-by-location" element={<CollegesByLocation />} />
              <Route path="/colleges/mba-by-location" element={<CollegesByLocation />} />
              <Route path="/colleges/law-by-location" element={<CollegesByLocation />} />
              <Route path="/colleges/dental-by-location" element={<CollegesByLocation />} />
              <Route path="/colleges/pharmacy-by-location" element={<CollegesByLocation />} />
              <Route path="/colleges/university-by-location" element={<CollegesByLocation />} />
              <Route path="/colleges/college-by-location" element={<CollegesByLocation />} />
              <Route path="/colleges/research-by-location" element={<CollegesByLocation />} />
              <Route path="/colleges/:category-by-location" element={<CollegesByLocation />} />
              <Route path="/college/:slug" element={<CollegeDetail />} />
              <Route path="/course/:slug" element={<CourseDetail />} />
              <Route path="/exam/:slug" element={<ExamDetail />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/templates" element={<TemplateSelection />} />
              <Route path="/all-templates" element={<AllTemplates />} />
              <Route path="/college-tools" element={<CollegeTools />} />
              <Route path="/exam-preparation" element={<ExamPreparation />} />
              <Route path="/career-resources" element={<CareerResources />} />
              <Route path="/study-abroad" element={<StudyAbroad />} />
                      <Route path="/psychometrics" element={<PsychometricTests />} />
        <Route path="/psychometrics/:key" element={<PsychometricRunner />} />
        <Route path="/psychometrics/:key/result/:resultId" element={<PsychometricResult />} />
        <Route path="/exam-predictor" element={<ExamPredictor />} />
        <Route path="/dashboard" element={<UserDashboard />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/colleges" element={<AdminColleges />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/resumes" element={<AdminResumes />} />
              <Route path="/admin/tools" element={<AdminTools />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route path="/admin/templates" element={<AdminTemplates />} />
              <Route path="/admin/psychometrics" element={<AdminPsychometrics />} />
        <Route path="/admin/exam-predictor" element={<AdminExamPredictor />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </AuthErrorBoundary>
  );
}

export default App;
