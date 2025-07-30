import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CollegeList from './components/CollegeList';
import CollegeDetail from './pages/CollegeDetail';
import CourseDetail from './pages/CourseDetail';
import ExamDetail from './pages/ExamDetail';
import TestPage from './pages/TestPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminColleges from './pages/AdminColleges';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/colleges" element={<CollegeList />} />
            <Route path="/college/:slug" element={<CollegeDetail />} />
            <Route path="/course/:slug" element={<CourseDetail />} />
            <Route path="/exam/:slug" element={<ExamDetail />} />
            <Route path="/test" element={<TestPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route index element={<AdminDashboard />} />
              <Route path="colleges" element={<AdminColleges />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
