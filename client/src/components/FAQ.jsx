// components/FAQ.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp, Search, Star, Clock, Shield } from 'lucide-react';

const FAQ = ({ darkMode }) => {
  const [openFAQ, setOpenFAQ] = useState(0); // number or null
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'Booking & Payments',
      icon: Star,
      questions: [
        {
          question: 'How do I book a tour with Zentra Travels?',
          answer:
            "Booking is simple! You can either choose from our pre-designed packages or use our AI-powered planning tool. Select your preferred tour, choose dates, add traveler details, and complete payment. You'll receive instant confirmation via email.",
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.',
        },
        {
          question: 'Can I modify or cancel my booking?',
          answer:
            'Yes! You can modify bookings up to 48 hours before departure. Cancellations are allowed up to 7 days before travel with a full refund, or up to 48 hours with a 50% refund. Same-day cancellations are non-refundable.',
        },
        {
          question: 'Do you offer group discounts?',
          answer:
            'Absolutely! We offer discounts for groups of 6+ people. Contact our team for custom group pricing and special arrangements for larger parties.',
        },
      ],
    },
    {
      category: 'AI Planning',
      icon: Clock,
      questions: [
        {
          question: 'How does the AI trip planning work?',
          answer:
            'Our AI analyzes your preferences, budget, travel dates, and interests to create a personalized itinerary. It considers factors like weather, crowd levels, travel distances, and cost optimization to suggest the perfect trip for you.',
        },
        {
          question: 'Can I customize the AI-generated itinerary?',
          answer:
            'Yes! The AI-generated itinerary is fully customizable. You can add, remove, or modify activities, change accommodations, adjust timing, and even add your own discoveries to the plan.',
        },
        {
          question: 'How accurate are the AI cost estimates?',
          answer:
            'Our AI cost estimates are typically 90-95% accurate. They include accommodation, meals, transportation, activities, and entrance fees. Final costs may vary slightly based on seasonal pricing and personal spending choices.',
        },
      ],
    },
    {
      category: 'Travel Information',
      icon: Shield,
      questions: [
        {
          question: 'Do I need a visa to visit Sri Lanka?',
          answer:
            'Most visitors need an Electronic Travel Authorization (ETA) or visa. Citizens of Singapore, Maldives, and Seychelles can visit visa-free for 30 days. We recommend checking current requirements based on your nationality.',
        },
        {
          question: "What's the best time to visit Sri Lanka?",
          answer:
            'Sri Lanka has two monsoon seasons, so the best time depends on your destinations. December to March is ideal for the west and south coasts, while April to September is better for the east coast. Our AI considers seasonal factors in planning.',
        },
        {
          question: 'Is Sri Lanka safe for tourists?',
          answer:
            'Yes! Sri Lanka is generally very safe for tourists. We provide 24/7 support, emergency contacts, and safety guidelines. Our local guides are trained in safety protocols and first aid.',
        },
        {
          question: 'What should I pack for Sri Lanka?',
          answer:
            'Pack light, breathable clothing, comfortable walking shoes, sunscreen, insect repellent, and modest clothing for temple visits. We provide a detailed packing checklist after booking.',
        },
      ],
    },
  ];

  const filteredFAQs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Questions
            </span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find quick answers to the most common questions about traveling with Zentra Travels
          </p>
        </div>

        {/* FAQ Search */}
        <div className="mb-8">
          <div
            className={`relative rounded-lg ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQs..."
              className={`w-full pl-10 pr-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg ${
                darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <category.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.category}
                </h3>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category.questions.length} questions
                </span>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openFAQ === globalIndex;

                  return (
                    <div
                      key={faqIndex}
                      className={`rounded-xl border transition-all duration-300 ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      } shadow-sm hover:shadow-md`}
                    >
                      <button
                        onClick={() => setOpenFAQ(isOpen ? null : globalIndex)}
                        className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
                      >
                        <h4 className={`font-semibold pr-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {faq.question}
                        </h4>
                        {isOpen ? (
                          <ChevronUp className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchTerm && filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <Search className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No results found
            </h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Try searching with different keywords or browse our help categories above
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

FAQ.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default FAQ;
