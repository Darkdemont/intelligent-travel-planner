// components/TourGrid.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Clock,
  Users,
  Star,
  MapPin,
  ArrowRight,
  Camera,
  Mountain,
  Waves,
  TreePine,
  Building,
  Utensils,
} from 'lucide-react';

const TourGrid = ({ darkMode }) => {
  const tours = [
    {
      id: 1,
      title: 'Sigiriya Rock Fortress & Dambulla Cave Temples',
      location: 'Central Province',
      duration: '8 hours',
      groupSize: '2-15 people',
      price: 89,
      originalPrice: 120,
      rating: 4.9,
      reviews: 342,
      difficulty: 'Moderate',
      category: 'Cultural',
      image:
        'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: ['Ancient Rock Fortress', 'Cave Temples', 'Local Lunch', 'Expert Guide'],
      includes: ['Transportation', 'Entrance Fees', 'Lunch', 'Guide'],
      nextAvailable: 'Tomorrow',
      badge: 'Best Seller',
      badgeColor: 'bg-red-500',
      icon: Building,
    },
    {
      id: 2,
      title: 'Yala National Park Wildlife Safari',
      location: 'Southern Province',
      duration: '6 hours',
      groupSize: '2-6 people',
      price: 95,
      originalPrice: 130,
      rating: 4.8,
      reviews: 267,
      difficulty: 'Easy',
      category: 'Wildlife',
      image:
        'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: [
        'Leopard Spotting',
        'Wildlife Photography',
        'Breakfast in Nature',
        'Expert Tracker',
      ],
      includes: ['4WD Safari Vehicle', 'Park Fees', 'Breakfast', 'Tracker Guide'],
      nextAvailable: 'Today',
      badge: 'Wildlife Special',
      badgeColor: 'bg-green-500',
      icon: Camera,
    },
    {
      id: 3,
      title: 'Ella Hill Country Adventure',
      location: 'Uva Province',
      duration: '10 hours',
      groupSize: '2-8 people',
      price: 125,
      originalPrice: 160,
      rating: 4.9,
      reviews: 198,
      difficulty: 'Challenging',
      category: 'Adventure',
      image:
        'https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: ['Ella Rock Hike', 'Nine Arch Bridge', 'Tea Plantations', 'Train Journey'],
      includes: ['Train Tickets', 'Hiking Guide', 'Lunch', 'Tea Tasting'],
      nextAvailable: 'Tomorrow',
      badge: 'Adventure',
      badgeColor: 'bg-orange-500',
      icon: Mountain,
    },
    {
      id: 4,
      title: 'Galle Fort & Southern Coast',
      location: 'Southern Province',
      duration: '7 hours',
      groupSize: '2-20 people',
      price: 65,
      originalPrice: 85,
      rating: 4.7,
      reviews: 156,
      difficulty: 'Easy',
      category: 'Cultural',
      image:
        'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: ['Dutch Fort', 'Lighthouse', 'Local Markets', 'Sunset Views'],
      includes: ['Transportation', 'Walking Tour', 'Local Guide', 'Refreshments'],
      nextAvailable: 'Today',
      badge: 'Heritage',
      badgeColor: 'bg-purple-500',
      icon: Building,
    },
    {
      id: 5,
      title: 'Kandy Cultural Experience',
      location: 'Central Province',
      duration: '6 hours',
      groupSize: '2-12 people',
      price: 75,
      originalPrice: 95,
      rating: 4.8,
      reviews: 289,
      difficulty: 'Easy',
      category: 'Cultural',
      image:
        'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: ['Temple of Tooth', 'Royal Gardens', 'Cultural Show', 'Traditional Crafts'],
      includes: ['Temple Entry', 'Cultural Show', 'Garden Visit', 'Local Guide'],
      nextAvailable: 'Today',
      badge: 'Cultural',
      badgeColor: 'bg-indigo-500',
      icon: Building,
    },
    {
      id: 6,
      title: 'Nuwara Eliya Tea Country',
      location: 'Central Province',
      duration: '8 hours',
      groupSize: '2-10 people',
      price: 85,
      originalPrice: 110,
      rating: 4.6,
      reviews: 134,
      difficulty: 'Easy',
      category: 'Hill Country',
      image:
        'https://images.pexels.com/photos/1450362/pexels-photo-1450362.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: ['Tea Factory Visit', 'Strawberry Fields', 'Lake Gregory', 'Cool Climate'],
      includes: ['Transportation', 'Factory Tour', 'Tea Tasting', 'Lunch'],
      nextAvailable: 'Tomorrow',
      badge: 'Scenic',
      badgeColor: 'bg-green-600',
      icon: TreePine,
    },
    {
      id: 7,
      title: 'Colombo Street Food & City Tour',
      location: 'Western Province',
      duration: '5 hours',
      groupSize: '2-10 people',
      price: 55,
      originalPrice: 75,
      rating: 4.5,
      reviews: 178,
      difficulty: 'Easy',
      category: 'Food & Culture',
      image:
        'https://images.pexels.com/photos/1450359/pexels-photo-1450359.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: ['Street Food Tasting', 'Pettah Market', 'Colonial Architecture', 'Local Transport'],
      includes: ['Food Tastings', 'Market Tour', 'Local Guide', 'Transport'],
      nextAvailable: 'Today',
      badge: 'Foodie',
      badgeColor: 'bg-yellow-500',
      icon: Utensils,
    },
    {
      id: 8,
      title: 'Mirissa Whale Watching',
      location: 'Southern Province',
      duration: '4 hours',
      groupSize: '2-25 people',
      price: 45,
      originalPrice: 60,
      rating: 4.4,
      reviews: 223,
      difficulty: 'Easy',
      category: 'Beach',
      image:
        'https://images.pexels.com/photos/1450354/pexels-photo-1450354.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      highlights: ['Blue Whale Spotting', 'Dolphin Watching', 'Ocean Adventure', 'Beach Time'],
      includes: ['Boat Trip', 'Life Jackets', 'Refreshments', 'Guide'],
      nextAvailable: 'Tomorrow',
      badge: 'Marine Life',
      badgeColor: 'bg-blue-500',
      icon: Waves,
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50 dark:bg-green-900/30';
      case 'Moderate':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30';
      case 'Challenging':
        return 'text-red-600 bg-red-50 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/30';
    }
  };

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Available Tours
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {tours.length} tours found
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-lg`}
            >
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`${tour.badgeColor} text-white px-2 py-1 rounded-full text-xs font-semibold`}
                  >
                    {tour.badge}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex space-x-2">
                  <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{tour.rating}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      tour.nextAvailable === 'Today' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                    }`}
                  >
                    {tour.nextAvailable}
                  </span>
                </div>

                {/* Category Icon */}
                <div className="absolute bottom-3 left-3">
                  <div className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center">
                    <tour.icon className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`text-lg font-semibold line-clamp-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {tour.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  <MapPin className={`w-4 h-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tour.location}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Clock className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {tour.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {tour.groupSize}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      tour.difficulty
                    )}`}
                  >
                    {tour.difficulty}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 2).map((highlight, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${tour.price}
                      </span>
                      {tour.originalPrice > tour.price && (
                        <span className={`text-sm line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          ${tour.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>per person</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {tour.reviews} reviews
                    </div>
                    {tour.originalPrice > tour.price && (
                      <div className="text-xs text-green-600 font-medium">
                        Save ${tour.originalPrice - tour.price}
                      </div>
                    )}
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

        {/* Load More */}
        <div className="text-center mt-12">
          <button
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 ${
              darkMode
                ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Load More Tours
          </button>
        </div>
      </div>
    </section>
  );
};

TourGrid.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default TourGrid;
