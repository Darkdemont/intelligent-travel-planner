import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapPin, Camera, Utensils, Mountain, Waves, Building, Sparkles, Users } from 'lucide-react';

const BlogCategories = ({ darkMode }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', icon: Sparkles, count: 156 },
    { name: 'Destinations', icon: MapPin, count: 45 },
    { name: 'Photography', icon: Camera, count: 32 },
    { name: 'Food & Culture', icon: Utensils, count: 28 },
    { name: 'Adventure', icon: Mountain, count: 24 },
    { name: 'Beaches', icon: Waves, count: 18 },
    { name: 'Heritage', icon: Building, count: 15 },
    { name: 'Travel Tips', icon: Users, count: 22 },
  ];

  return (
    <section className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`group flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                activeCategory === category.name
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.name
                    ? 'bg-white/20 text-white'
                    : darkMode
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

BlogCategories.propTypes = {
  darkMode: PropTypes.bool,
};

export default BlogCategories;
