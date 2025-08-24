// components/TourMap.jsx
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MapPin, Star, Clock, ArrowRight, X } from 'lucide-react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const sriLankaCenter = { lat: 7.8731, lng: 80.7718 }; // map center

const TourMap = ({ darkMode }) => {
  const [selectedTour, setSelectedTour] = useState(null);

  // Load Google Maps JS (reads Vite env var)
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  // Replace your x/y with real coordinates
  const tourLocations = useMemo(
    () => [
      {
        id: 1,
        name: 'Sigiriya Rock Fortress',
        position: { lat: 7.9570, lng: 80.7603 },
        category: 'Cultural',
        color: 'bg-purple-500',
        tour: {
          title: 'Sigiriya Rock Fortress & Dambulla Cave Temples',
          duration: '8 hours',
          price: 89,
          rating: 4.9,
          reviews: 342,
          image:
            'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        },
      },
      {
        id: 2,
        name: 'Yala National Park',
        position: { lat: 6.3667, lng: 81.5167 },
        category: 'Wildlife',
        color: 'bg-green-500',
        tour: {
          title: 'Yala National Park Wildlife Safari',
          duration: '6 hours',
          price: 95,
          rating: 4.8,
          reviews: 267,
          image:
            'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        },
      },
      {
        id: 3,
        name: 'Ella',
        position: { lat: 6.8667, lng: 81.0500 },
        category: 'Adventure',
        color: 'bg-orange-500',
        tour: {
          title: 'Ella Hill Country Adventure',
          duration: '10 hours',
          price: 125,
          rating: 4.9,
          reviews: 198,
          image:
            'https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        },
      },
      {
        id: 4,
        name: 'Galle',
        position: { lat: 6.0329, lng: 80.2168 },
        category: 'Cultural',
        color: 'bg-purple-500',
        tour: {
          title: 'Galle Fort & Southern Coast',
          duration: '7 hours',
          price: 65,
          rating: 4.7,
          reviews: 156,
          image:
            'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        },
      },
      {
        id: 5,
        name: 'Kandy',
        position: { lat: 7.2906, lng: 80.6337 },
        category: 'Cultural',
        color: 'bg-purple-500',
        tour: {
          title: 'Kandy Cultural Experience',
          duration: '6 hours',
          price: 75,
          rating: 4.8,
          reviews: 289,
          image:
            'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        },
      },
      {
        id: 6,
        name: 'Nuwara Eliya',
        position: { lat: 6.9497, lng: 80.7891 },
        category: 'Hill Country',
        color: 'bg-green-600',
        tour: {
          title: 'Nuwara Eliya Tea Country',
          duration: '8 hours',
          price: 85,
          rating: 4.6,
          reviews: 134,
          image:
            'https://images.pexels.com/photos/1450362/pexels-photo-1450362.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        },
      },
      {
        id: 7,
        name: 'Colombo',
        position: { lat: 6.9271, lng: 79.8612 },
        category: 'Food & Culture',
        color: 'bg-yellow-500',
        tour: {
          title: 'Colombo Street Food & City Tour',
          duration: '5 hours',
          price: 55,
          rating: 4.5,
          reviews: 178,
          image:
            'https://images.pexels.com/photos/1450359/pexels-photo-1450359.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        },
      },
      {
        id: 8,
        name: 'Mirissa',
        position: { lat: 5.9489, lng: 80.4596 },
        category: 'Beach',
        color: 'bg-blue-500',
        tour: {
          title: 'Mirissa Whale Watching',
          duration: '4 hours',
          price: 45,
          rating: 4.4,
          reviews: 223,
          image:
            'https://images.pexels.com/photos/1450354/pexels-photo-1450354.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        },
      },
    ],
    []
  );

  const categories = [
    { name: 'Cultural', color: 'bg-purple-500', count: 3 },
    { name: 'Wildlife', color: 'bg-green-500', count: 1 },
    { name: 'Adventure', color: 'bg-orange-500', count: 1 },
    { name: 'Hill Country', color: 'bg-green-600', count: 1 },
    { name: 'Food & Culture', color: 'bg-yellow-500', count: 1 },
    { name: 'Beach', color: 'bg-blue-500', count: 1 },
  ];

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      gestureHandling: 'greedy',
    }),
    []
  );

  if (loadError) {
    return (
      <div className={`p-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Failed to load Google Maps. Check your API key and billing.
      </div>
    );
  }

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Tour
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Locations Map
            </span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore tour locations across Sri Lanka and discover what each destination offers
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            <div
              className={`relative w-full h-96 lg:h-[600px] rounded-2xl overflow-hidden ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              } shadow-2xl`}
            >
              {isLoaded ? (
                <GoogleMap
                  center={sriLankaCenter}
                  zoom={7}
                  options={mapOptions}
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                >
                  {tourLocations.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={loc.position}
                      onClick={() => setSelectedTour(loc)}
                      // Simple colored pin using SVG path fill
                      icon={{
                        path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        scale: 5,
                        fillColor:
                          loc.color === 'bg-purple-500' ? '#7C3AED' :
                          loc.color === 'bg-green-500' ? '#22C55E' :
                          loc.color === 'bg-orange-500' ? '#F97316' :
                          loc.color === 'bg-green-600' ? '#16A34A' :
                          loc.color === 'bg-yellow-500' ? '#EAB308' :
                          '#3B82F6', // blue
                        fillOpacity: 1,
                        strokeWeight: 0.8,
                        strokeColor: '#111827',
                      }}
                    />
                  ))}

                  {selectedTour && (
                    <InfoWindow
                      position={selectedTour.position}
                      onCloseClick={() => setSelectedTour(null)}
                    >
                      <div className="w-72">
                        <img
                          src={selectedTour.tour.image}
                          alt={selectedTour.tour.title}
                          className="w-full h-28 object-cover rounded-md mb-2"
                        />
                        <div className="font-semibold mb-1">{selectedTour.tour.title}</div>
                        <div className="flex items-center gap-3 text-sm mb-2">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-3 h-3" /> {selectedTour.tour.duration}
                          </span>
                          <span className="flex items-center gap-1 text-yellow-600">
                            <Star className="w-3 h-3 fill-current" /> {selectedTour.tour.rating} ({selectedTour.tour.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold">${selectedTour.tour.price}</span>
                          <span className="text-xs text-gray-500">per person</span>
                        </div>
                        <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                          <span>Book Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Loading map…
                </div>
              )}

              {/* Map overlay (small hint) */}
              <div
                className={`absolute top-4 right-4 p-3 rounded-lg ${
                  darkMode ? 'bg-gray-800/90 text-white' : 'bg-white/90 text-gray-900'
                } backdrop-blur-sm`}
              >
                <div className="text-sm font-medium mb-1">
                  {tourLocations.length} Tours Available
                </div>
                <div className="text-xs text-emerald-600">Click markers for details</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Legend */}
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-lg`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Tour Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${category.color} rounded-full`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {category.name}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Tour (sidebar duplicate) */}
            {selectedTour && (
              <div
                className={`p-6 rounded-2xl ${
                  darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Tour Details
                  </h3>
                  <button
                    onClick={() => setSelectedTour(null)}
                    className={`p-1 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <X className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>

                <div className="space-y-4">
                  <img
                    src={selectedTour.tour.image}
                    alt={selectedTour.tour.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedTour.tour.title}
                    </h4>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center gap-1 text-xs">
                        <Clock className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{selectedTour.tour.duration}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {selectedTour.tour.rating} ({selectedTour.tour.reviews})
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${selectedTour.tour.price}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>per person</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-lg`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Tours:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {tourLocations.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Price Range:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>$45 - $125</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Avg. Rating:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>4.7★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

TourMap.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default TourMap;
