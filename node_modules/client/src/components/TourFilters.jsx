// components/TourFilters.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Filter, Search, X, Grid, Map, SlidersHorizontal } from 'lucide-react';

const TourFilters = ({ darkMode }) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [duration, setDuration] = useState('Any');
  const [difficulty, setDifficulty] = useState('Any');

  const categories = [
    'All', 'Cultural', 'Adventure', 'Wildlife', 'Beach', 'Hill Country', 'Food & Culture'
  ];

  const durations = ['Any', '1 Day', '2-3 Days', '4-7 Days', '8+ Days'];
  const difficulties = ['Any', 'Easy', 'Moderate', 'Challenging'];

  const handleFilterChange = (filterType, value) => {
    const filterId = `${filterType}:${value}`;
    if (activeFilters.includes(filterId)) {
      setActiveFilters(prev => prev.filter(f => f !== filterId));
    } else {
      setActiveFilters(prev => [...prev, filterId]);
    }
  };

  const removeFilter = (filterId) => {
    setActiveFilters(prev => prev.filter(f => f !== filterId));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange([0, 500]);
    setDuration('Any');
    setDifficulty('Any');
  };

  return (
    <section
      className={`py-8 sticky top-16 z-40 ${
        darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'
      } shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search and Filter Toggle */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 lg:w-80">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tours..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                showFilters
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeFilters.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* View Mode and Sort */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                View:
              </span>
              <div className={`flex rounded-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-emerald-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-r-lg transition-all duration-300 ${
                    viewMode === 'map'
                      ? 'bg-emerald-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>

            <select
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <option>Sort by Popular</option>
              <option>Sort by Price: Low to High</option>
              <option>Sort by Price: High to Low</option>
              <option>Sort by Rating</option>
              <option>Sort by Duration</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Active filters:
            </span>
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center space-x-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm"
              >
                <span>{filter.split(':')[1]}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="hover:text-emerald-900 dark:hover:text-emerald-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button onClick={clearAllFilters} className="text-sm text-red-600 hover:text-red-700 font-medium">
              Clear all
            </button>
          </div>
        )}

        {/* Expanded Filters */}
        {showFilters && (
          <div
            className={`mt-6 p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Categories */}
              <div>
                <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Duration</h4>
                <div className="space-y-2">
                  {durations.map((dur) => (
                    <label key={dur} className="flex items-center">
                      <input
                        type="radio"
                        name="duration"
                        value={dur}
                        checked={duration === dur}
                        onChange={(e) => setDuration(e.target.value)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{dur}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Difficulty</h4>
                <div className="space-y-2">
                  {difficulties.map((diff) => (
                    <label key={diff} className="flex items-center">
                      <input
                        type="radio"
                        name="difficulty"
                        value={diff}
                        checked={difficulty === diff}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{diff}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>$0</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${priceRange[1]}+
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

TourFilters.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default TourFilters;
