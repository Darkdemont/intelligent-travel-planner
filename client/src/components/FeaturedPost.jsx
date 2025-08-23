import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, User, Clock, ArrowRight, Star } from 'lucide-react';

const FeaturedPost = ({ darkMode }) => {
  const featuredPost = {
    title: 'AI-Powered Travel Planning: How Machine Learning is Revolutionizing Sri Lankan Tourism',
    excerpt:
      'Discover how artificial intelligence is transforming the way travelers explore Sri Lanka, from personalized itineraries to cost optimization and real-time recommendations.',
    image:
      'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: 'Dr. Samantha Perera',
    date: 'January 15, 2025',
    readTime: '8 min read',
    category: 'AI & Technology',
    featured: true,
  };

  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Featured Article</span>
          </div>
        </div>

        {/* Article Card */}
        <div
          className={`rounded-2xl overflow-hidden shadow-2xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-0">
            {/* Image Section */}
            <div className="relative">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 lg:h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {featuredPost.category}
                </span>
              </div>
            </div>

            {/* Text Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2
                className={`text-2xl lg:text-3xl font-bold mb-4 leading-tight ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {featuredPost.title}
              </h2>

              <p
                className={`text-lg mb-6 leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {featuredPost.excerpt}
              </p>

              {/* Author / Meta Info */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <User className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {featuredPost.author}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {featuredPost.date}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>

              {/* Read More Button */}
              <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2 w-fit">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturedPost.propTypes = {
  darkMode: PropTypes.bool,
};

export default FeaturedPost;
