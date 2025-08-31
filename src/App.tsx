import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './components/pages/LandingPage';
import SearchPage from './components/pages/SearchPage';
import TurfDetailPage from './components/pages/TurfDetailPage';
import BookingFlow from './components/booking/BookingFlow';
import BookingConfirmation from './components/booking/BookingConfirmation';
import UserDashboard from './components/pages/UserDashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import TurfManagerDashboard from './components/pages/TurfManagerDashboard';
import LoginPage from './components/pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';

function App() {
  // Handle mobile viewport and scrolling
  useEffect(() => {
    // Set viewport height for mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Prevent zoom on double tap for mobile
    let lastTouchEnd = 0;
    const preventZoom = (event: TouchEvent) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', preventZoom, false);

    // Smooth scrolling for mobile
    const enableSmoothScrolling = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    enableSmoothScrolling();

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      document.removeEventListener('touchend', preventZoom);
    };
  }, []);

  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-x-hidden">
            <Navbar />
            <main className="relative pt-16 md:pt-20">
              {/* Background Pattern */}
              <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20"></div>
              </div>
              
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/turf/:id" element={<TurfDetailPage />} />
                <Route path="/booking/:turfId" element={<BookingFlow />} />
                <Route path="/confirmation/:bookingId" element={<BookingConfirmation />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/manager" element={<TurfManagerDashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;