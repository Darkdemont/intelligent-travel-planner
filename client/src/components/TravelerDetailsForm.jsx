import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  User, Mail, Phone, Calendar, MapPin, Heart, Camera, Mountain, Utensils, Users, Sparkles
} from 'lucide-react';

const TravelerDetailsForm = ({ darkMode, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      age: '',
      nationality: ''
    },
    travelPreferences: {
      travelStyle: '',
      interests: [],
      dietaryRestrictions: '',
      mobilityNeeds: '',
      accommodationType: ''
    },
    previousTravel: {
      visitedSriLanka: false,
      previousDestinations: [],
      favoriteActivities: []
    }
  });

  const travelStyles = [
    { id: 'luxury', name: 'Luxury', icon: Sparkles, desc: 'Premium experiences and accommodations' },
    { id: 'adventure', name: 'Adventure', icon: Mountain, desc: 'Thrilling activities and outdoor experiences' },
    { id: 'cultural', name: 'Cultural', icon: Camera, desc: 'Historical sites and local traditions' },
    { id: 'relaxation', name: 'Relaxation', icon: Heart, desc: 'Peaceful and rejuvenating experiences' },
    { id: 'budget', name: 'Budget-Friendly', icon: Users, desc: 'Cost-effective travel options' }
  ];

  const interests = [
    'Photography', 'Wildlife Safari', 'Beach Activities', 'Hiking', 'Cultural Tours',
    'Food Experiences', 'Temples & Heritage', 'Tea Plantations', 'Water Sports', 'Nightlife'
  ];

  const accommodationTypes = [
    'Luxury Hotels', 'Boutique Hotels', 'Eco Lodges', 'Guesthouses', 'Homestays', 'Beach Resorts'
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleInterestToggle = (interest) => {
    const currentInterests = formData.travelPreferences.interests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];

    handleInputChange('travelPreferences', 'interests', newInterests);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const nextStep = () => setStep(Math.min(step + 1, 3));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  return (
    <div className={`p-6 rounded-2xl ${
      darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
    } shadow-lg`}>
      <div className="mb-6">
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Tell Us About Yourself
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Help our AI create the perfect personalized itinerary for you
        </p>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum
                    ? 'bg-emerald-600 text-white'
                    : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-emerald-600' : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Personal Info</span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Preferences</span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Travel History</span>
          </div>
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Full Name *
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  value={formData.personalInfo.name}
                  onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address *
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number
              </label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Age Range
              </label>
              <select
                value={formData.personalInfo.age}
                onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              >
                <option value="">Select age range</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-45">36-45</option>
                <option value="46-55">46-55</option>
                <option value="56-65">56-65</option>
                <option value="65+">65+</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Nationality
              </label>
              <div className="relative">
                <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  value={formData.personalInfo.nationality}
                  onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="e.g., American, British, Australian"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Travel Preferences */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Travel Style *
            </label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {travelStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleInputChange('travelPreferences', 'travelStyle', style.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-left ${
                    formData.travelPreferences.travelStyle === style.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                      : darkMode
                      ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <style.icon
                    className={`w-6 h-6 mb-2 ${
                      formData.travelPreferences.travelStyle === style.id
                        ? 'text-emerald-600'
                        : darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  />
                  <div
                    className={`font-medium mb-1 ${
                      formData.travelPreferences.travelStyle === style.id
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {style.name}
                  </div>
                  <div
                    className={`text-xs ${
                      formData.travelPreferences.travelStyle === style.id
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {style.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Interests (Select all that apply)
            </label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    formData.travelPreferences.interests.includes(interest)
                      ? 'bg-emerald-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Accommodation Preference
              </label>
              <select
                value={formData.travelPreferences.accommodationType}
                onChange={(e) => handleInputChange('travelPreferences', 'accommodationType', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              >
                <option value="">Select accommodation type</option>
                {accommodationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Dietary Restrictions
              </label>
              <input
                type="text"
                value={formData.travelPreferences.dietaryRestrictions}
                onChange={(e) => handleInputChange('travelPreferences', 'dietaryRestrictions', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="e.g., Vegetarian, Halal, None"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Travel History */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Have you visited Sri Lanka before?
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => handleInputChange('previousTravel', 'visitedSriLanka', true)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  formData.previousTravel.visitedSriLanka
                    ? 'bg-emerald-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleInputChange('previousTravel', 'visitedSriLanka', false)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  !formData.previousTravel.visitedSriLanka
                    ? 'bg-emerald-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              What type of traveler are you?
            </label>
            <textarea
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Tell us about your travel style, what you enjoy most, any special requirements..."
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Any mobility needs or accessibility requirements?
            </label>
            <input
              type="text"
              value={formData.travelPreferences.mobilityNeeds}
              onChange={(e) => handleInputChange('travelPreferences', 'mobilityNeeds', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="e.g., Wheelchair accessible, Walking difficulties, None"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            step === 1
              ? 'opacity-50 cursor-not-allowed'
              : darkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        {step < 3 ? (
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate AI Plan</span>
          </button>
        )}
      </div>
    </div>
  );
};

TravelerDetailsForm.propTypes = {
  darkMode: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default TravelerDetailsForm;
