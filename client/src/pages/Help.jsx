// pages/Help.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HelpHero from '../components/HelpHero';
import FAQ from '../components/FAQ';
import SupportOptions from '../components/SupportOptions';
import HelpCategories from '../components/HelpCategories';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Help = () => {
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
      <HelpHero darkMode={darkMode} />
      <HelpCategories darkMode={darkMode} />
      <FAQ darkMode={darkMode} />
      <SupportOptions darkMode={darkMode} />
      <ContactForm darkMode={darkMode} />
      <Newsletter darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Help;
