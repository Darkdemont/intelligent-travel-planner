import React from 'react';
import PropTypes from 'prop-types';
import { Brain, DollarSign, Route, Clock } from 'lucide-react';

const PlanningHero = ({ darkMode }) => {
  const features = [
    { icon: Brain,      title: 'AI Recommendations', desc: 'Personalized suggestions' },
    { icon: DollarSign, title: 'Cost Optimization',  desc: 'Budget-friendly options' },
    { icon: Route,      title: 'Route Planning',     desc: 'Optimal travel paths' },
    { icon: Clock,      title: 'Real-time Updates',  desc: 'Live information' },
  ];

  return (
    <section
      className={`relative pt-24 pb-16 overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-emerald-50 to-teal-50'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6">
            <Brain className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              AI-Powered Trip Planning
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Plan Your Perfect
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Sri Lankan Adventure
            </span>
          </h1>

          <p
            className={`text-lg max-w-3xl mx-auto mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Let our AI create a personalized itinerary or build your own custom trip.
            Get optimized routes, cost estimates, and real-time recommendations.
          </p>

          {/* AI Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <Icon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

PlanningHero.propTypes = {
  darkMode: PropTypes.bool,
};

export default PlanningHero;
