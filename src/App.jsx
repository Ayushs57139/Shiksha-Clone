import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import CollegeDetail from './pages/CollegeDetail';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Exams from './pages/Exams';
import ExamDetail from './pages/ExamDetail';
import Search from './pages/Search';
import Compare from './pages/Compare';
import Reviews from './pages/Reviews';
import News from './pages/News';
import StudyAbroad from './pages/StudyAbroad';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import TopMbaIndia from './pages/TopMbaIndia';
import TopMbaDelhi from './pages/TopMbaDelhi';
import CollegeManagement from './pages/CollegeManagement';
import CollegeAnalytics from './pages/CollegeAnalytics';
import CollegeImport from './pages/CollegeImport';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/college/:slug" element={<CollegeDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:slug" element={<CourseDetail />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exam/:slug" element={<ExamDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/news" element={<News />} />
            <Route path="/study-abroad" element={<StudyAbroad />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/top-mba-india" element={<TopMbaIndia />} />
            <Route path="/top-mba-delhi" element={<TopMbaDelhi />} />
            
            {/* New College Management Routes */}
            <Route path="/admin/colleges" element={<CollegeManagement />} />
            <Route path="/admin/analytics" element={<CollegeAnalytics />} />
            <Route path="/admin/import" element={<CollegeImport />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
