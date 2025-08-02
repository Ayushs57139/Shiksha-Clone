import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CollegeList from './components/CollegeList';
import CollegeDetail from './pages/CollegeDetail';
import CourseDetail from './pages/CourseDetail';
import ExamDetail from './pages/ExamDetail';
import TestPage from './pages/TestPage';
import CollegesByLocation from './components/CollegesByLocation';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminColleges from './pages/AdminColleges';
import AdminUsers from './pages/AdminUsers';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
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
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/colleges" element={<AdminColleges />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
