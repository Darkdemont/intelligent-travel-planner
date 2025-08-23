import React from 'react';
import PropTypes from 'prop-types';
import { Mail, Bell, Sparkles, ArrowRight } from 'lucide-react';

const Newsletter = ({ darkMode }) => {
  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-emerald-50 to-teal-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-2xl overflow-hidden ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          } shadow-2xl`}
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-0">
            {/* Left: Copy + Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6 w-fit">
                <Bell className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Stay Updated
                </span>
              </div>

              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Get AI-Powered Travel{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Insights
                </span>
              </h2>

              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Subscribe to our newsletter and receive personalized travel recommendations, exclusive deals, and the
                latest AI-powered insights for your Sri Lankan adventures.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Weekly AI-curated destination highlights
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Exclusive travel deals and packages
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Personalized travel tips and insights
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
                <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className={`text-xs mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>

            {/* Right: Stats / Promo */}
            <div
              className={`p-8 lg:p-12 ${
                darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-emerald-500 to-teal-600'
              } flex items-center justify-center`}
            >
              <div className="text-center text-white">
                <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-2">Join 25,000+ Travelers</h3>
                <p className="text-emerald-100">
                  Get exclusive access to AI-powered travel insights and personalized recommendations
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">25K+</div>
                    <div className="text-xs text-emerald-200">Subscribers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.9★</div>
                    <div className="text-xs text-emerald-200">Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Weekly</div>
                    <div className="text-xs text-emerald-2  00">Updates</div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Right */}
          </div>
        </div>
      </div>
    </section>
  );
};

Newsletter.propTypes = {
  darkMode: PropTypes.bool,
};

export default Newsletter;
