// components/ToursHero.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Search, MapPin, Users, Star, Calendar } from 'lucide-react';

const ToursHero = ({ darkMode }) => {
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
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Discover Sri Lanka Tours
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Explore Sri Lanka with
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Expert Guides
            </span>
          </h1>

          <p
            className={`text-lg max-w-3xl mx-auto mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            From ancient temples to pristine beaches, discover the pearl of the Indian Ocean
            with our carefully curated tours and local expert guides.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
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
                  placeholder="Search tours, destinations, activities..."
                  className={`w-full px-4 py-4 bg-transparent focus:outline-none ${
                    darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 font-semibold hover:shadow-lg transition-all duration-300">
                  Search Tours
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: 'Tours Available', value: '50+', color: 'text-blue-600' },
              { icon: Users, label: 'Happy Travelers', value: '25K+', color: 'text-green-600' },
              { icon: Star, label: 'Average Rating', value: '4.9★', color: 'text-yellow-600' },
              { icon: Calendar, label: 'Years Experience', value: '15+', color: 'text-purple-600' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div
                  className={`text-2xl font-bold mb-1 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stat.value}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

ToursHero.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default ToursHero;
