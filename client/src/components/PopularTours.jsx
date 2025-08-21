import React from 'react';
import PropTypes from 'prop-types';
import { Clock, Users, Star, MapPin, Calendar, ArrowRight } from 'lucide-react';

const PopularTours = ({ darkMode }) => {
  const tours = [
    {
      id: 1,
      title: 'Sigiriya & Dambulla Day Tour',
      location: 'Central Province',
      duration: '8 hours',
      groupSize: '2-15 people',
      price: '$89',
      rating: 4.9,
      reviews: 342,
      image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      highlights: ['Ancient Rock Fortress', 'Cave Temples', 'Local Lunch', 'Expert Guide'],
      nextAvailable: 'Tomorrow',
    },
    {
      id: 2,
      title: 'Kandy Cultural Experience',
      location: 'Kandy',
      duration: '6 hours',
      groupSize: '2-12 people',
      price: '$65',
      rating: 4.8,
      reviews: 289,
      image: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      highlights: ['Temple of Tooth', 'Royal Gardens', 'Cultural Show', 'Traditional Crafts'],
      nextAvailable: 'Today',
    },
    {
      id: 3,
      title: 'Galle Fort Walking Tour',
      location: 'Southern Coast',
      duration: '4 hours',
      groupSize: '2-20 people',
      price: '$45',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      highlights: ['Dutch Architecture', 'Lighthouse', 'Local Markets', 'Sunset Views'],
      nextAvailable: 'Today',
    },
    {
      id: 4,
      title: 'Ella Train Journey & Hiking',
      location: 'Hill Country',
      duration: '10 hours',
      groupSize: '2-8 people',
      price: '$125',
      rating: 4.9,
      reviews: 198,
      image: 'https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      highlights: ['Scenic Train Ride', 'Ella Rock Hike', 'Tea Plantations', 'Nine Arch Bridge'],
      nextAvailable: 'Tomorrow',
    },
    {
      id: 5,
      title: 'Yala Safari Adventure',
      location: 'Yala National Park',
      duration: '6 hours',
      groupSize: '2-6 people',
      price: '$95',
      rating: 4.8,
      reviews: 267,
      image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      highlights: ['Leopard Spotting', 'Wildlife Photography', 'Breakfast in Nature', 'Expert Tracker'],
      nextAvailable: 'Tomorrow',
    },
    {
      id: 6,
      title: 'Colombo City & Food Tour',
      location: 'Colombo',
      duration: '5 hours',
      groupSize: '2-10 people',
      price: '$55',
      rating: 4.6,
      reviews: 134,
      image: 'https://images.pexels.com/photos/1450359/pexels-photo-1450359.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      highlights: ['Street Food Tasting', 'Colonial Architecture', 'Local Markets', 'Pettah Bazaar'],
      nextAvailable: 'Today',
    },
  ];

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Popular
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Day Tours
            </span>
          </h2>

          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Join our most loved experiences with immediate booking confirmation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-100'
              } shadow-lg`}
            >
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tour.nextAvailable === 'Today'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    Available {tour.nextAvailable}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{tour.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {tour.title}
                </h3>

                <div className="flex items-center space-x-1 mb-3">
                  <MapPin
                    className={`w-4 h-4 ${
                      darkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {tour.location}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock
                        className={`w-4 h-4 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {tour.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users
                        className={`w-4 h-4 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {tour.groupSize}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full ${
                          darkMode
                            ? 'bg-gray-800 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {highlight}
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
                      {tour.price}
                    </span>
                    <div
                      className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      per person
                    </div>
                  </div>
                  <div
                    className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {tour.reviews} reviews
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 ${
              darkMode
                ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            View All Tours
          </button>
        </div>
      </div>
    </section>
  );
};

PopularTours.propTypes = {
  darkMode: PropTypes.bool,
};

export default PopularTours;
