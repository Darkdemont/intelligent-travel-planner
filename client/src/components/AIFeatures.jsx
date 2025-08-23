import React from 'react';
import PropTypes from 'prop-types';
import { Brain, TrendingDown, Route, BarChart3, MapPin, Zap, Shield } from 'lucide-react';

const AIFeatures = ({ darkMode }) => {
  const features = [
    {
      icon: Brain,
      title: 'Content-Based Filtering',
      description:
        'AI analyzes your preferences and historical data to recommend personalized destinations and activities.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: TrendingDown,
      title: 'Machine Learning Cost Optimization',
      description:
        'Predictive models estimate expenses and suggest budget-friendly alternatives without compromising quality.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Route,
      title: 'Advanced Route Optimization',
      description:
        "Graph-based algorithms like Dijkstra's find optimal travel routes to minimize time and maximize efficiency.",
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      description:
        'Real-time data analysis predicts weather, crowd levels, and optimal timing for activities.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: MapPin,
      title: 'Dynamic Itinerary Building',
      description:
        'Interactive visual planner automatically updates travel times, distances, and costs as you modify your trip.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Smart Risk Assessment',
      description:
        'AI monitors safety conditions, weather patterns, and local events to ensure secure travel experiences.',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Advanced AI Technology
            </span>
          </div>

          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Intelligent Travel Planning
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Technology
            </span>
          </h2>

          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Our AI-powered system uses advanced machine learning algorithms to create
            personalized travel experiences while optimizing costs and routes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {feature.title}
              </h3>

              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div
          className={`mt-16 p-8 rounded-2xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          } shadow-lg`}
        >
          <h3
            className={`text-2xl font-bold mb-6 text-center ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Technical Capabilities
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                95%
              </div>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                Recommendation Accuracy
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                40%
              </div>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                Average Cost Savings
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                &lt;2s
              </div>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                Route Optimization Time
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                24/7
              </div>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                Real-time Updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AIFeatures.propTypes = {
  darkMode: PropTypes.bool,
};

export default AIFeatures;
