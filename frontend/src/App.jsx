import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import Lesson from './components/Lesson';
import Certificate from './components/Certificate';
import './index.css';

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSession = localStorage.getItem('itmentor_user');
    if (savedSession) {
      const user = JSON.parse(savedSession);
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('itmentor_user', JSON.stringify(user));
    navigate(user.role === 'student' ? '/student-dashboard' : '/mentor-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('itmentor_user');
    navigate('/login');
  };

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to={currentUser ? (currentUser.role === 'student' ? '/student-dashboard' : '/mentor-dashboard') : '/login'} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/student-dashboard" element={currentUser?.role === 'student' ? <StudentDashboard currentUser={currentUser} /> : <Navigate to="/login" />} />
          <Route path="/mentor-dashboard" element={currentUser?.role === 'mentor' ? <MentorDashboard /> : <Navigate to="/login" />} />
          <Route path="/lesson" element={currentUser?.role === 'student' ? <Lesson /> : <Navigate to="/login" />} />
          <Route path="/certificate" element={currentUser?.role === 'student' ? <Certificate currentUser={currentUser} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router basename="/it-mentor-platform2">
      <AppContent />
    </Router>
  );
}

export default App;
