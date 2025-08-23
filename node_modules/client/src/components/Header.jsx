// components/Header.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, MapPin, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import zentraLogo from '../assets/zentra-logo.png';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup' | 'find-booking'
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Tours', path: '/tours' },
    { name: 'Deals', path: '/deals' },
    { name: 'Plan with AI', path: '/plan-ai' },
    { name: 'Blog', path: '/blog' },
    { name: 'Help', path: '/help' },
  ];

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          darkMode ? 'bg-gray-900/95' : 'bg-white/95'
        } backdrop-blur-md border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
  <div className="w-20 h-20 rounded-lg overflow-hidden translate-x-4 translate-y-0.5 transition-transform duration-300">
    <img src={zentraLogo} alt="Zentra Logo" className="w-full h-full object-contain" />
  </div>
  <div>
    <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Zentra Travels</h1>
    <p className="text-xs text-emerald-600 font-medium">AI-Powered Adventures</p>
  </div>
</div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-200 hover:text-emerald-600 relative group ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  } ${item.name === 'Plan with AI' ? 'flex items-center space-x-1' : ''} ${
                    location.pathname === item.path ? 'text-emerald-600' : ''
                  }`}
                >
                  {item.name === 'Plan with AI' && <Sparkles className="w-4 h-4" />}
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* User Menu & Dark Mode Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
                } hover:scale-110`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Authentication */}
              {user ? (
                <div className="hidden lg:flex items-center space-x-4">
                  {isAdmin() && (
                    <a
                      href="/admin"
                      className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      Admin Console
                    </a>
                  )}
                  <Link
                    to="/account"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                      darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="Log out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className={`text-sm font-medium transition-colors ${
                      darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => handleAuthClick('find-booking')}
                    className={`text-xs transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
                    }`}
                  >
                    Find Booking
                  </button>
                </div>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2 rounded-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`lg:hidden py-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-emerald-600 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    } ${item.name === 'Plan with AI' ? 'flex items-center space-x-1' : ''} ${
                      location.pathname === item.path ? 'text-emerald-600' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name === 'Plan with AI' && <Sparkles className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                ))}

                {/* Mobile Auth Menu */}
                {user ? (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <Link
                      to="/account"
                      className={`flex items-center space-x-2 text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Account</span>
                    </Link>
                    {isAdmin() && (
                      <a
                        href="/admin"
                        className="text-sm font-medium text-purple-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Console
                      </a>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <button
                      onClick={() => {
                        handleAuthClick('signin');
                        setIsMenuOpen(false);
                      }}
                      className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        handleAuthClick('signup');
                        setIsMenuOpen(false);
                      }}
                      className="text-sm font-medium text-emerald-600"
                    >
                      Create Account
                    </button>
                    <button
                      onClick={() => {
                        handleAuthClick('find-booking');
                        setIsMenuOpen(false);
                      }}
                      className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      Find Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        darkMode={darkMode}
        initialMode={authMode}
      />
    </>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Header;
