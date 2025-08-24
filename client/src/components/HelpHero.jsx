// components/HelpHero.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

const HelpHero = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const quickHelp = [
    'How to book a tour?',
    'Cancellation policy',
    'Payment methods',
    'Travel insurance',
    'Visa requirements',
    'Best time to visit',
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              24/7 Support Available
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            How Can We
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Help You?
            </span>
          </h1>

          <p
            className={`text-lg max-w-3xl mx-auto mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Find answers to your questions, get support, or contact our travel experts.
            We're here to make your Sri Lankan adventure seamless.
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for help topics, FAQs, guides..."
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

          {/* Quick Help Topics */}
          <div className="max-w-4xl mx-auto">
            <p
              className={`text-sm font-medium mb-4 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Popular help topics:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickHelp.map((topic, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  } shadow-sm hover:shadow-md`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              {
                icon: MessageCircle,
                title: 'Live Chat',
                desc: 'Chat with our support team',
                action: 'Start Chat',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Phone,
                title: 'Call Us',
                desc: '+94 11 234 5678',
                action: 'Call Now',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: Mail,
                title: 'Email Support',
                desc: 'hello@zentratravels.com',
                action: 'Send Email',
                color: 'from-purple-500 to-indigo-500',
              },
            ].map((contact, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                } shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${contact.color} flex items-center justify-center mb-4 mx-auto`}
                >
                  <contact.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className={`font-semibold mb-2 text-center ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {contact.title}
                </h3>
                <p
                  className={`text-sm text-center mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {contact.desc}
                </p>
                <button
                  className={`w-full text-sm font-medium py-2 rounded-lg transition-colors ${
                    darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                  }`}
                >
                  {contact.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

HelpHero.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default HelpHero;
