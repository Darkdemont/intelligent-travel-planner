import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, Sun, Moon, MapPin, Sparkles } from 'lucide-react';
import zentraLogo from '../assets/zentra-logo.png';



const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    'Home',
    'Destinations',
    'Experiences',
    'Tours',
    'Deals',
    'Plan with AI',
    'Blog',
    'Help',
    'My Account',
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        darkMode ? 'bg-gray-900/95' : 'bg-white/95'
      } backdrop-blur-md border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-20 h-20 rounded-lg overflow-hidden transform translate-x-4 transform duration-300 translate-y-0.5">
              <img src={zentraLogo} alt="Zentra Logo" className="w-full h-full object-contain" />             
            </div>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Zentra Travels
              </h1>
              <p className="text-xs text-emerald-600 font-medium">AI-Powered Adventures</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-medium transition-all duration-200 hover:text-emerald-600 relative group ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } ${item === 'Plan with AI' ? 'flex items-center space-x-1' : ''}`}
              >
                {item === 'Plan with AI' && <Sparkles className="w-4 h-4" />}
                <span>{item}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
              } hover:scale-110`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`lg:hidden py-4 border-t ${
              darkMode ? 'border-gray-800' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm font-medium transition-colors duration-200 hover:text-emerald-600 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  } ${item === 'Plan with AI' ? 'flex items-center space-x-1' : ''}`}
                >
                  {item === 'Plan with AI' && <Sparkles className="w-4 h-4" />}
                  <span>{item}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Header;
