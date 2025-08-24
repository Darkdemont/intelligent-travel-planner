// pages/Tours.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ToursHero from '../components/ToursHero';
import TourFilters from '../components/TourFilters';
import TourGrid from '../components/TourGrid';
import TourMap from '../components/TourMap';
import Newsletter from '../components/Newsletter';


const Tours = () => {
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
      <ToursHero darkMode={darkMode} />
      <TourFilters darkMode={darkMode} />
      <TourGrid darkMode={darkMode} />
      <TourMap darkMode={darkMode} />
      <Newsletter darkMode={darkMode} />
    
    </div>
  );
};

export default Tours;
