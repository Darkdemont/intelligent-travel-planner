import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MapPin, Clock, DollarSign, Plus, Trash2, Edit3,
  Save, Download, Plane, Car, Utensils, Camera, ChevronUp, ChevronDown
} from 'lucide-react';

const ItineraryBuilder = ({ darkMode }) => {
  const [itinerary, setItinerary] = useState([
    {
      id: '1',
      day: 1,
      date: '2025-02-01',
      activities: [
        {
          id: '1-1',
          name: 'Arrival at Bandaranaike Airport',
          location: 'Colombo',
          startTime: '10:00',
          duration: 2,
          cost: 50,
          type: 'transport',
          icon: Plane,
        },
        {
          id: '1-2',
          name: 'Check-in at Hotel',
          location: 'Colombo',
          startTime: '12:00',
          duration: 1,
          cost: 120,
          type: 'accommodation',
          icon: MapPin,
        },
        {
          id: '1-3',
          name: 'Galle Face Green Walk',
          location: 'Colombo',
          startTime: '15:00',
          duration: 2,
          cost: 0,
          type: 'sightseeing',
          icon: Camera,
        },
      ],
      totalCost: 170,
      totalTime: 5,
    },
    {
      id: '2',
      day: 2,
      date: '2025-02-02',
      activities: [
        {
          id: '2-1',
          name: 'Travel to Kandy',
          location: 'Kandy',
          startTime: '08:00',
          duration: 3,
          cost: 75,
          type: 'transport',
          icon: Car,
        },
        {
          id: '2-2',
          name: 'Temple of the Tooth Visit',
          location: 'Kandy',
          startTime: '12:00',
          duration: 2,
          cost: 15,
          type: 'sightseeing',
          icon: Camera,
        },
        {
          id: '2-3',
          name: 'Traditional Sri Lankan Lunch',
          location: 'Kandy',
          startTime: '14:30',
          duration: 1,
          cost: 25,
          type: 'food',
          icon: Utensils,
        },
      ],
      totalCost: 115,
      totalTime: 6,
    },
  ]);

  const [expandedDay, setExpandedDay] = useState('1');

  const getActivityTypeColor = (type) => {
    const colors = {
      sightseeing: 'bg-blue-500',
      food: 'bg-orange-500',
      transport: 'bg-green-500',
      accommodation: 'bg-purple-500',
    };
    return colors[type] || 'bg-gray-500';
  };

  const addNewDay = () => {
    const nextIndex = itinerary.length + 1;
    const firstDate = new Date(itinerary[0]?.date || Date.now());
    const nextDate = new Date(firstDate.getTime() + (nextIndex - 1) * 24 * 60 * 60 * 1000);

    const newDay = {
      id: String(nextIndex),
      day: nextIndex,
      date: nextDate.toISOString().split('T')[0],
      activities: [],
      totalCost: 0,
      totalTime: 0,
    };
    setItinerary((prev) => [...prev, newDay]);
  };

  const addActivity = (dayId) => {
    // Stub: plug your modal/form here
    alert(`Adding new activity to Day ${dayId}`);
  };

  const removeActivity = (dayId, activityId) => {
    setItinerary((prev) =>
      prev.map((day) => {
        if (day.id !== dayId) return day;
        const activities = day.activities.filter((a) => a.id !== activityId);
        const totalCost = activities.reduce((s, a) => s + (a.cost || 0), 0);
        const totalTime = activities.reduce((s, a) => s + (a.duration || 0), 0);
        return { ...day, activities, totalCost, totalTime };
      })
    );
  };

  const totalTripCost = itinerary.reduce((sum, day) => sum + (day.totalCost || 0), 0);
  const totalTripDays = itinerary.length;

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Interactive
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Itinerary Builder
            </span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Build and customize your travel itinerary with real-time cost and time calculations
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Itinerary Timeline */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {itinerary.map((day) => (
                <div
                  key={day.id}
                  className={`rounded-2xl overflow-hidden ${
                    darkMode
                      ? 'bg-gray-900 border border-gray-700'
                      : 'bg-gray-50 border border-gray-100'
                  } shadow-lg`}
                >
                  {/* Day Header */}
                  <div
                    className={`p-6 cursor-pointer ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    onClick={() => setExpandedDay(expandedDay === day.id ? '' : day.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Day {day.day}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {new Date(day.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            ${day.totalCost}
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Total Cost
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {day.totalTime}h
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Duration
                          </div>
                        </div>
                        <button
                          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                        >
                          {expandedDay === day.id ? (
                            <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                          ) : (
                            <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Day Activities */}
                  {expandedDay === day.id && (
                    <div className="p-6">
                      <div className="space-y-4">
                        {day.activities.map((activity) => {
                          const Icon = activity.icon;
                          return (
                            <div
                              key={activity.id}
                              className={`p-4 rounded-xl ${
                                darkMode
                                  ? 'bg-gray-800 border border-gray-700'
                                  : 'bg-white border border-gray-200'
                              } hover:shadow-md transition-shadow`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-10 h-10 ${getActivityTypeColor(activity.type)} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                      {activity.name}
                                    </h4>
                                    <div className="flex items-center space-x-4 text-sm">
                                      <span className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <MapPin className="w-3 h-3" />
                                        <span>{activity.location}</span>
                                      </span>
                                      <span className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <Clock className="w-3 h-3" />
                                        <span>
                                          {activity.startTime} ({activity.duration}h)
                                        </span>
                                      </span>
                                      <span className={`flex items-center space-x-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                        <DollarSign className="w-3 h-3" />
                                        <span>${activity.cost}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <button
                                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => removeActivity(day.id, activity.id)}
                                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'} transition-colors`}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Add Activity Button */}
                        <button
                          onClick={() => addActivity(day.id)}
                          className={`w-full p-4 rounded-xl border-2 border-dashed transition-all duration-300 hover:scale-105 ${
                            darkMode
                              ? 'border-gray-600 hover:border-emerald-500 hover:bg-emerald-900/20'
                              : 'border-gray-300 hover:border-emerald-500 hover:bg-emerald-50'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <Plus className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                            <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Add Activity
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Day Button */}
              <button
                onClick={addNewDay}
                className={`w-full p-6 rounded-2xl border-2 border-dashed transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? 'border-gray-600 hover:border-emerald-500 hover:bg-emerald-900/20'
                    : 'border-gray-300 hover:border-emerald-500 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Plus className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Add New Day
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Trip Summary Sidebar */}
          <div className="space-y-6">
            <div
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-lg sticky top-24`}
            >
              <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Trip Overview
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Days:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalTripDays}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Activities:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {itinerary.reduce((sum, day) => sum + day.activities.length, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Cost:</span>
                  <span className="text-lg font-bold text-emerald-600">${totalTripCost}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>Save Itinerary</span>
                  </button>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 ${
                      darkMode
                        ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                        : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Download className="w-5 h-5" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ItineraryBuilder.propTypes = {
  darkMode: PropTypes.bool,
};

export default ItineraryBuilder;
