import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MapPin, Calendar, Car, Train, Truck, Bus,
  Camera, Mountain, Waves, Building, Utensils,
  Sparkles, Download, Plus, Minus, RotateCcw
} from 'lucide-react';

import InteractiveMap from './InteractiveMap';
import TravelerDetailsForm from './TravelerDetailsForm';

const PlanningInterface = ({ darkMode }) => {
  const [planningMode, setPlanningMode] = useState('ai'); // 'ai' | 'manual'
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [budget, setBudget] = useState(1000);
  const [duration, setDuration] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [transportation, setTransportation] = useState('car');
  const [startDate, setStartDate] = useState('');
  const [showTravelerForm, setShowTravelerForm] = useState(false);

  const destinations = [
    { id: 'colombo', name: 'Colombo', type: 'city', icon: Building },
    { id: 'kandy', name: 'Kandy', type: 'cultural', icon: Building },
    { id: 'sigiriya', name: 'Sigiriya', type: 'heritage', icon: Mountain },
    { id: 'galle', name: 'Galle', type: 'coastal', icon: Waves },
    { id: 'ella', name: 'Ella', type: 'nature', icon: Mountain },
    { id: 'nuwara-eliya', name: 'Nuwara Eliya', type: 'hill-country', icon: Mountain },
    { id: 'yala', name: 'Yala National Park', type: 'wildlife', icon: Camera },
    { id: 'mirissa', name: 'Mirissa', type: 'beach', icon: Waves }
  ];

  const activities = [
    { id: 'sightseeing', name: 'Sightseeing', icon: Camera },
    { id: 'adventure', name: 'Adventure Sports', icon: Mountain },
    { id: 'cultural', name: 'Cultural Tours', icon: Building },
    { id: 'food', name: 'Food Experiences', icon: Utensils },
    { id: 'wildlife', name: 'Wildlife Safari', icon: Camera },
    { id: 'beach', name: 'Beach Activities', icon: Waves }
  ];

  const transportOptions = [
    { id: 'car', name: 'Private Car', icon: Car },
    { id: 'van', name: 'Van', icon: Truck },
    { id: 'bus', name: 'Bus', icon: Bus },
    { id: 'train', name: 'Train', icon: Train }
  ];

  const toggleDestination = (destId) => {
    setSelectedDestinations((prev) =>
      prev.includes(destId) ? prev.filter((id) => id !== destId) : [...prev, destId]
    );
  };

  const toggleActivity = (activityId) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
    );
  };

  const generateAIPlan = () => {
    if (planningMode === 'ai') {
      setShowTravelerForm(true);
    } else {
      alert('AI is generating your personalized itinerary...');
    }
  };

  const handleTravelerDetailsSubmit = (details) => {
    // use details to drive AI flow if desired
    console.log('Traveler details:', details);
    setShowTravelerForm(false);
    alert('AI is generating your personalized itinerary based on your preferences...');
  };

  const exportPlan = () => {
    alert('Exporting your travel plan as PDF...');
  };

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Planning Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className={`p-1 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <button
              onClick={() => setPlanningMode('ai')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                planningMode === 'ai'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Planning</span>
            </button>
            <button
              onClick={() => setPlanningMode('manual')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                planningMode === 'manual'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Manual Planning</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Planning Controls */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Trip Details */}
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-100'
              } shadow-lg`}
            >
              <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Trip Details
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Duration (Days)
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setDuration(Math.max(1, duration - 1))}
                      className={`p-2 rounded-lg ${
                        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                      } border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:scale-105 transition-transform`}
                    >
                      <Plus className="w-4 h-4 rotate-180" />
                    </button>
                    <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{duration}</span>
                    <button
                      onClick={() => setDuration(duration + 1)}
                      className={`p-2 rounded-lg ${
                        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                      } border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:scale-105 transition-transform`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Travelers
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className={`p-2 rounded-lg ${
                        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                      } border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:scale-105 transition-transform`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{travelers}</span>
                    <button
                      onClick={() => setTravelers(travelers + 1)}
                      className={`p-2 rounded-lg ${
                        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                      } border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:scale-105 transition-transform`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Budget (USD)
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value, 10))}
                    className="w-full"
                  />
                  <div className={`text-center text-lg font-semibold mt-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    ${budget}
                  </div>
                </div>
              </div>
            </div>

           {/* Interactive Map 
            <InteractiveMap
              darkMode={darkMode}
              selectedDestinations={selectedDestinations}
              onDestinationToggle={toggleDestination}
            />*/}

            {/* Manual Destination Selection (fallback) */}
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-100'
              } shadow-lg`}
            >
              <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Additional Destinations
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {destinations.map((dest) => {
                  const Icon = dest.icon;
                  const selected = selectedDestinations.includes(dest.id);
                  return (
                    <button
                      key={dest.id}
                      onClick={() => toggleDestination(dest.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        selected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                          : darkMode
                          ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mx-auto mb-2 ${
                          selected ? 'text-emerald-600' : darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      />
                      <div
                        className={`text-sm font-medium ${
                          selected ? 'text-emerald-700 dark:text-emerald-300' : darkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {dest.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div> 

            {/* Activities Selection */}
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-100'
              } shadow-lg`}
            >
              <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Preferred Activities
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activities.map((activity) => {
                  const Icon = activity.icon;
                  const selected = selectedActivities.includes(activity.id);
                  return (
                    <button
                      key={activity.id}
                      onClick={() => toggleActivity(activity.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        selected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                          : darkMode
                          ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mx-auto mb-2 ${
                          selected ? 'text-emerald-600' : darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      />
                      <div
                        className={`text-sm font-medium ${
                          selected ? 'text-emerald-700 dark:text-emerald-300' : darkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {activity.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transportation */}
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-100'
              } shadow-lg`}
            >
              <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Transportation Mode
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                {transportOptions.map((transport) => {
                  const Icon = transport.icon;
                  const selected = transportation === transport.id;
                  return (
                    <button
                      key={transport.id}
                      onClick={() => setTransportation(transport.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        selected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                          : darkMode
                          ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mx-auto mb-2 ${
                          selected ? 'text-emerald-600' : darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      />
                      <div
                        className={`text-sm font-medium ${
                          selected ? 'text-emerald-700 dark:text-emerald-300' : darkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {transport.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Trip Summary & Actions */}
          <div className="space-y-6">
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-lg sticky top-24`}
            >
              <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Trip Summary
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Duration:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{duration} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Start Date:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {startDate ? new Date(startDate).toLocaleDateString() : 'Not selected'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Travelers:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{travelers} people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Budget:</span>
                  <span className="font-semibold text-emerald-600">${budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Destinations:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedDestinations.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Activities:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedActivities.length}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Estimated Cost:</span>
                  <span className="text-lg font-bold text-emerald-600">
                    ${Math.round(budget * 0.85)} - ${budget}
                  </span>
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  AI optimization can save up to 15%
                </div>
              </div>

              <div className="space-y-3 mt-6">
                {planningMode === 'ai' ? (
                  <button
                    onClick={generateAIPlan}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Continue with AI</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert('Building manual itinerary...')}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Build Itinerary</span>
                  </button>
                )}

                <button
                  onClick={exportPlan}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 ${
                    darkMode
                      ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                      : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  <span>Export as PDF</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedDestinations([]);
                    setSelectedActivities([]);
                    setBudget(1000);
                    setDuration(7);
                    setTravelers(2);
                    setTransportation('car');
                    setStartDate('');
                  }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Traveler Details Form Modal */}
        {showTravelerForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={() => setShowTravelerForm(false)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  ×
                </button>
                <TravelerDetailsForm darkMode={darkMode} onSubmit={handleTravelerDetailsSubmit} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

PlanningInterface.propTypes = {
  darkMode: PropTypes.bool
};

export default PlanningInterface;
