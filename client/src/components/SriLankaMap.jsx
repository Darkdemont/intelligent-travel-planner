import React from 'react';
import { MapPin, Camera, Mountain, Waves, TreePine, Building } from 'lucide-react';

const SriLankaMap = ({ darkMode }) => {
  const destinations = [
    { name: 'Colombo', icon: Building, x: '15%', y: '70%', color: 'bg-blue-500' },
    { name: 'Kandy', icon: Mountain, x: '35%', y: '50%', color: 'bg-green-500' },
    { name: 'Galle', icon: Waves, x: '20%', y: '85%', color: 'bg-cyan-500' },
    { name: 'Sigiriya', icon: Camera, x: '40%', y: '35%', color: 'bg-orange-500' },
    { name: 'Nuwara Eliya', icon: TreePine, x: '38%', y: '55%', color: 'bg-emerald-500' },
    { name: 'Anuradhapura', icon: Building, x: '30%', y: '25%', color: 'bg-purple-500' }
  ];

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-emerald-50 to-teal-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Explore
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Sri Lanka
            </span>
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Discover the pearl of the Indian Ocean with our AI-curated destinations
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Sri Lanka Map Outline */}
          <div
            className={`relative w-full h-96 rounded-2xl overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-2xl`}
          >
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-gray-700 dark:to-gray-600">
              {/* Simplified Sri Lanka Shape */}
              <svg
                viewBox="0 0 400 600"
                className="w-full h-full opacity-20"
                fill="currentColor"
              >
                <path
                  d="M200 50 C250 60, 300 100, 320 150 C340 200, 350 250, 340 300 C330 350, 310 400, 280 450 C250 500, 200 550, 150 520 C100 490, 80 440, 70 390 C60 340, 70 290, 90 240 C110 190, 140 140, 170 100 C180 80, 190 60, 200 50 Z"
                  className="text-emerald-200 dark:text-gray-500"
                />
              </svg>
            </div>

            {/* Destination Markers */}
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: destination.x, top: destination.y }}
              >
                <div
                  className={`w-10 h-10 ${destination.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-all duration-300 animate-pulse`}
                >
                  <destination.icon className="w-5 h-5 text-white" />
                </div>

                {/* Tooltip */}
                <div
                  className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                  } shadow-lg whitespace-nowrap`}
                >
                  {destination.name}
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                      darkMode ? 'border-t-gray-800' : 'border-t-white'
                    }`}
                  ></div>
                </div>
              </div>
            ))}

            {/* Floating Info Cards */}
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-float">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <div>
                  <div
                    className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    200+ Destinations
                  </div>
                  <div
                    className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    AI-Curated
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-emerald-500 text-white rounded-lg shadow-lg p-4 animate-float-delayed">
              <div className="text-sm font-medium">Personalized Routes</div>
              <div className="text-xs opacity-90">Optimized by AI</div>
            </div>
          </div>

          {/* Popular Destinations Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {destinations.slice(0, 3).map((destination, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                } shadow-lg hover:shadow-xl`}
              >
                <div
                  className={`w-12 h-12 ${destination.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <destination.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {destination.name}
                </h3>
                <p
                  className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Discover the beauty and culture of {destination.name} with our AI-guided tours.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SriLankaMap;
