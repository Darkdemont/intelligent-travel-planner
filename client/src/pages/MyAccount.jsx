// pages/MyAccountPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyAccount from '../components/MyAccount';
import AuthModal from '../components/AuthModal';

const MyAccountPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Show auth modal if user is not logged in
  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
    }
  }, [user]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'dark bg-gray-900' : 'bg-white'
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {user ? (
        <MyAccount darkMode={darkMode} />
      ) : (
        <div
          className={`min-h-screen flex items-center justify-center ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}
        >
          <div className="text-center">
            <h1
              className={`text-3xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Please Sign In
            </h1>
            <p
              className={`text-lg mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              You need to be logged in to access your account
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      )}

      <Footer darkMode={darkMode} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        darkMode={darkMode}
      />
    </div>
  );
};

export default MyAccountPage;
