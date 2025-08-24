import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import TravelPackages from './components/TravelPackages';
import PopularTours from './components/PopularTours';
import ExperienceMap from './components/ExperienceMap';
import Testimonials from './components/Testimonials';
import PlanWithAI from './pages/PlanWithAI';
import MyAccountPage from './pages/MyAccount';
import Tours from './pages/Tours';
import Help from './pages/Help';


import Blog from './pages/Blog';

const HomePage = ({ darkMode }) => (
  <>
    <Hero darkMode={darkMode} />
    <Features darkMode={darkMode} />
    <TravelPackages darkMode={darkMode} />
    <PopularTours darkMode={darkMode} />
    <ExperienceMap darkMode={darkMode} />
    <Testimonials darkMode={darkMode} />
    <Footer darkMode={darkMode} />
  </>
);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) setDarkMode(JSON.parse(saved));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('darkMode', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Shared header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} />} />
        <Route path="/blog" element={<Blog darkMode={darkMode} />} />
        <Route path="/tours" element={<Tours darkMode={darkMode} />} />
        <Route path="/plan-ai" element={<PlanWithAI darkMode={darkMode} />} />
        <Route path="/account" element={<MyAccountPage darkMode={darkMode} />} />
        <Route path="/help" element={<Help darkMode={darkMode} />} />
      </Routes>

      {/* Shared footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
