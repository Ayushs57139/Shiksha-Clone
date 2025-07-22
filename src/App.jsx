import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import Courses from './pages/Courses';
import Exams from './pages/Exams';
import StudyAbroad from './pages/StudyAbroad';
import News from './pages/News';
import CollegeDetail from './pages/CollegeDetail';
import CourseDetail from './pages/CourseDetail';
import ExamDetail from './pages/ExamDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Compare from './pages/Compare';
import Reviews from './pages/Reviews';
import TopMbaDelhi from './pages/TopMbaDelhi';

import Navbar from './components/navbar';
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import UsersList from "./admin/UsersList";
import TopMbaIndia from "./pages/TopMbaIndia";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* <Header /> */}
          <Navbar /> {/* ✅ Render the Navbar */}
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/colleges/:id" element={<CollegeDetail />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/exams/:id" element={<ExamDetail />} />
              <Route path="/study-abroad" element={<StudyAbroad />} />
              <Route path="/news" element={<News />} />
              <Route path="/search" element={<Search />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/top-mba-india" element={<TopMbaIndia />} />
              <Route path="/top-mba-delhi" element={<TopMbaDelhi />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UsersList />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
