import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TravelPackages from './components/TravelPackages';
import PopularTours from './components/PopularTours';
import SriLankaMap from './components/SriLankaMap';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
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
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero darkMode={darkMode} />
      <Features darkMode={darkMode} />
      <TravelPackages darkMode={darkMode} />
      <PopularTours darkMode={darkMode} />
      <SriLankaMap darkMode={darkMode} />
      <Testimonials darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;