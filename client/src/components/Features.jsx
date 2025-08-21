import React from 'react';
import PropTypes from 'prop-types';
import { Brain, MapPin, DollarSign, Clock, Shield, Users, Sparkles, Zap } from 'lucide-react';

const Features = ({ darkMode }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Planning',
      description: 'Our intelligent system analyzes your preferences to create personalized itineraries.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: DollarSign,
      title: 'Cost Optimization',
      description: 'Smart algorithms find the best deals and optimize your travel budget automatically.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: MapPin,
      title: 'Local Experiences',
      description: 'Discover hidden gems and authentic Sri Lankan experiences curated by locals.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications about weather, traffic, and attraction availability.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Travel with confidence knowing your data and bookings are fully protected.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Our expert travel consultants are available round the clock to assist you.',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Why Choose Zentra Travels
            </span>
          </div>

          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Intelligent Travel Planning
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Redefined
            </span>
          </h2>

          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Experience the future of travel planning with our AI-powered platform that combines
            personalization, cost optimization, and local expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3
                className={`text-xl font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {feature.title}
              </h3>

              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
            <Zap className="w-5 h-5" />
            <span>Start Planning with AI</span>
          </button>
        </div>
      </div>
    </section>
  );
};

Features.propTypes = {
  darkMode: PropTypes.bool,
};

export default Features;
