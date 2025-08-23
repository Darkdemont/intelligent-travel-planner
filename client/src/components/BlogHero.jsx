import React from 'react';
import PropTypes from 'prop-types';
import { Search, Sparkles } from 'lucide-react';

const BlogHero = ({ darkMode }) => {
  return (
    <section
      className={`relative pt-24 pb-16 overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-emerald-50 to-teal-50'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Travel Insights & AI-Powered Tips
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Zentra Travels
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Blog
            </span>
          </h1>

          <p
            className={`text-lg max-w-3xl mx-auto mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Discover Sri Lanka through our AI-curated travel insights, destination guides,
            and expert tips for your perfect adventure.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div
              className={`relative rounded-xl overflow-hidden shadow-lg ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <Search
                  className={`w-5 h-5 ml-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                />
                <input
                  type="text"
                  placeholder="Search travel guides, destinations, tips..."
                  className={`w-full px-4 py-4 bg-transparent focus:outline-none ${
                    darkMode
                      ? 'text-white placeholder-gray-400'
                      : 'text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 font-semibold hover:shadow-lg transition-all duration-300">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

BlogHero.propTypes = {
  darkMode: PropTypes.bool,
};

export default BlogHero;
