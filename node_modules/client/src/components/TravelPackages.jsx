import React from 'react';
import PropTypes from 'prop-types';
import {
  Calendar,
  Users,
  MapPin,
  Star,
  Clock,
  Camera,
  Mountain,
  Waves,
  TreePine,
  Building,
  Sparkles,
} from 'lucide-react';

const TravelPackages = ({ darkMode }) => {
  const packages = [
    {
      id: 1,
      title: 'Cultural Heritage Explorer',
      duration: '7 Days',
      price: '$899',
      originalPrice: '$1,199',
      rating: 4.9,
      reviews: 234,
      image:
        'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: [
        'Sigiriya Rock Fortress',
        'Temple of the Tooth',
        'Ancient Anuradhapura',
        'Traditional Villages',
      ],
      icon: Building,
      color: 'from-amber-500 to-orange-500',
      includes: ['Accommodation', 'Meals', 'Transport', 'Guide'],
    },
    {
      id: 2,
      title: 'Adventure & Nature',
      duration: '10 Days',
      price: '$1,299',
      originalPrice: '$1,699',
      rating: 4.8,
      reviews: 189,
      image:
        'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: [
        'Ella Rock Hiking',
        'Yala Safari',
        'White Water Rafting',
        'Tea Plantation Tours',
      ],
      icon: Mountain,
      color: 'from-green-500 to-emerald-500',
      includes: ['Adventure Gear', 'All Activities', 'Eco Lodges', 'Expert Guides'],
    },
    {
      id: 3,
      title: 'Beach & Relaxation',
      duration: '5 Days',
      price: '$699',
      originalPrice: '$899',
      rating: 4.7,
      reviews: 156,
      image:
        'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: ['Galle Fort', 'Mirissa Whale Watching', 'Unawatuna Beach', 'Spa Treatments'],
      icon: Waves,
      color: 'from-blue-500 to-cyan-500',
      includes: ['Beach Resorts', 'Water Sports', 'Spa Access', 'Sunset Cruises'],
    },
    {
      id: 4,
      title: 'Hill Country Escape',
      duration: '6 Days',
      price: '$799',
      originalPrice: '$1,099',
      rating: 4.9,
      reviews: 201,
      image:
        'https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: ['Nuwara Eliya', 'Train Journey', 'Tea Factory Visits', 'Horton Plains'],
      icon: TreePine,
      color: 'from-purple-500 to-indigo-500',
      includes: ['Mountain Hotels', 'Train Tickets', 'Tea Tastings', 'Nature Walks'],
    },
  ];

  const getSavings = (original, current) => {
    const toNum = (s) => Number(String(s).replace(/[^0-9.]/g, ''));
    return toNum(original) - toNum(current);
  };

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Curated Travel Packages
            </span>
          </div>

          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Choose Your Perfect
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Sri Lankan Adventure
            </span>
          </h2>

          <p
            className={`text-lg max-w-3xl mx-auto mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Select from our expertly crafted packages or let our AI create a personalized itinerary
            just for you
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Create Custom Trip with AI</span>
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 ${
                darkMode
                  ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>Browse All Packages</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-lg`}
            >
              <div className="relative">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${pkg.color} flex items-center justify-center shadow-lg`}
                  >
                    <pkg.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  Save ${getSavings(pkg.originalPrice, pkg.price)}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {pkg.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {pkg.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {pkg.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {pkg.reviews} reviews
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4
                    className={`text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Highlights:
                  </h4>
                  <ul className="space-y-1">
                    {pkg.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <MapPin
                          className={`w-3 h-3 ${
                            darkMode ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4
                    className={`text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Includes:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {pkg.includes.map((item, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span
                      className={`text-2xl font-bold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className={`text-sm line-through ml-2 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      {pkg.originalPrice}
                    </span>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      per person
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI vs Package Comparison */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div
            className={`p-8 rounded-2xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
            } shadow-lg`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  AI-Powered Planning
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Completely personalized
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                'Tailored to your exact preferences',
                'Dynamic pricing optimization',
                'Real-time availability updates',
                'Flexible itinerary adjustments',
                'Budget-conscious recommendations',
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`p-8 rounded-2xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
            } shadow-lg`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Pre-Designed Packages
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Expertly curated experiences
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                'Proven itineraries with great reviews',
                'Fixed pricing with clear inclusions',
                'Immediate booking confirmation',
                'Group-friendly options available',
                'Local expert recommendations',
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

TravelPackages.propTypes = {
  darkMode: PropTypes.bool,
};

export default TravelPackages;
