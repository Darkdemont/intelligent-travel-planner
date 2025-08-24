// components/HelpCategories.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  CreditCard, MapPin, Calendar, Shield, Plane, Settings, ArrowRight
} from 'lucide-react';

const HelpCategories = ({ darkMode }) => {
  const categories = [
    {
      icon: CreditCard,
      title: 'Booking & Payments',
      description: 'Learn about booking tours, payment methods, and billing',
      topics: ['How to book', 'Payment options', 'Refund policy', 'Billing issues'],
      color: 'from-blue-500 to-cyan-500',
      articleCount: 12,
    },
    {
      icon: Calendar,
      title: 'Trip Planning',
      description: 'Get help with planning your perfect Sri Lankan adventure',
      topics: ['AI planning', 'Custom itineraries', 'Best times to visit', 'Duration guides'],
      color: 'from-emerald-500 to-teal-500',
      articleCount: 18,
    },
    {
      icon: MapPin,
      title: 'Destinations & Tours',
      description: 'Discover information about destinations and tour packages',
      topics: ['Popular destinations', 'Tour details', 'Hidden gems', 'Local experiences'],
      color: 'from-purple-500 to-indigo-500',
      articleCount: 25,
    },
    {
      icon: Plane,
      title: 'Travel Requirements',
      description: 'Essential information for traveling to Sri Lanka',
      topics: ['Visa requirements', 'Health & safety', 'Travel insurance', 'Packing lists'],
      color: 'from-orange-500 to-red-500',
      articleCount: 15,
    },
    {
      icon: Shield,
      title: 'Safety & Security',
      description: 'Stay safe and secure during your travels',
      topics: ['Travel safety', 'Emergency contacts', 'Health precautions', 'Insurance claims'],
      color: 'from-green-500 to-emerald-500',
      articleCount: 10,
    },
    {
      icon: Settings,
      title: 'Account & Profile',
      description: 'Manage your account settings and preferences',
      topics: ['Profile settings', 'Password reset', 'Preferences', 'Privacy settings'],
      color: 'from-pink-500 to-rose-500',
      articleCount: 8,
    },
  ];

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Browse Help
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Categories
            </span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find answers organized by topic or browse our comprehensive help articles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-100'
              } shadow-lg`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>

              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    darkMode ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {category.articleCount} articles
                </span>
              </div>

              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{category.description}</p>

              <div className="space-y-2 mb-4">
                {category.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{topic}</span>
                  </div>
                ))}
              </div>

              <button className="group/btn w-full flex items-center justify-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-200">
                <span>Browse Articles</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

HelpCategories.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default HelpCategories;
