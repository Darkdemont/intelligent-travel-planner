// components/SupportOptions.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  MessageCircle,
  Phone,
  Mail,
  Users,
  Headphones,
  FileText,
  Video,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const SupportOptions = ({ darkMode }) => {
  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our travel experts',
      availability: 'Available 24/7',
      responseTime: 'Instant',
      color: 'from-blue-500 to-cyan-500',
      action: 'Start Chat',
      popular: true,
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our travel consultants',
      availability: 'Mon-Sun 8AM-10PM (LKT)',
      responseTime: 'Immediate',
      color: 'from-green-500 to-emerald-500',
      action: 'Call +94 11 234 5678',
      popular: false,
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send detailed questions and get comprehensive answers',
      availability: 'Available 24/7',
      responseTime: 'Within 2 hours',
      color: 'from-purple-500 to-indigo-500',
      action: 'Send Email',
      popular: false,
    },
    {
      icon: Video,
      title: 'Video Consultation',
      description: 'Schedule a video call with our travel experts',
      availability: 'By appointment',
      responseTime: 'Same day',
      color: 'from-orange-500 to-red-500',
      action: 'Schedule Call',
      popular: false,
    },
  ];

  const selfServiceOptions = [
    {
      icon: BookOpen,
      title: 'Travel Guides',
      description: 'Comprehensive guides for Sri Lankan destinations',
      count: '50+ guides',
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Visa, insurance, and travel requirement guides',
      count: '25+ documents',
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Connect with other travelers and share experiences',
      count: '5K+ members',
    },
    {
      icon: Headphones,
      title: 'Video Tutorials',
      description: 'Step-by-step guides for using our platform',
      count: '20+ videos',
    },
  ];

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Support Channels */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Get
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {' '}Personal Support
              </span>
            </h2>
            <p
              className={`text-lg max-w-3xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Choose your preferred way to get help from our expert travel team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer relative ${
                  darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-100'
                } shadow-lg`}
              >
                {channel.popular && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${channel.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <channel.icon className="w-6 h-6 text-white" />
                </div>

                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {channel.title}
                </h3>

                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {channel.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Availability:
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        darkMode ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    >
                      {channel.availability}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Response:
                    </span>
                    <span className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {channel.responseTime}
                    </span>
                  </div>
                </div>

                <button className="group/btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                  <span>{channel.action}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Service Options */}
        <div>
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Self-Service
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {' '}Resources
              </span>
            </h2>
            <p
              className={`text-lg max-w-3xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Explore our comprehensive resources to plan and enhance your Sri Lankan adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selfServiceOptions.map((option, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                  darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
                } shadow-lg`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <option.icon className="w-6 h-6 text-white" />
                </div>

                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {option.title}
                </h3>

                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {option.description}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}
                  >
                    {option.count}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    } group-hover:translate-x-1 transition-transform`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

SupportOptions.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default SupportOptions;
