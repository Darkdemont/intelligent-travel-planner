import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PlanningHero from '../components/PlanningHero';
import PlanningInterface from '../components/PlanningInterface';
import AIFeatures from '../components/AIFeatures';
import ItineraryBuilder from '../components/ItineraryBuilder';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const PlanWithAI = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'dark bg-gray-900' : 'bg-white'
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <PlanningHero darkMode={darkMode} />
      <PlanningInterface darkMode={darkMode} />
      <AIFeatures darkMode={darkMode} />
      <ItineraryBuilder darkMode={darkMode} />
      <Newsletter darkMode={darkMode} />
      
    </div>
  );
};

export default PlanWithAI;
