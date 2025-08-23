import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlogHero from '../components/BlogHero';
import BlogCategories from '../components/BlogCategories';
import FeaturedPost from '../components/FeaturedPost';
import BlogGrid from '../components/BlogGrid';
import Newsletter from '../components/Newsletter';


function Blog() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
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
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        <BlogHero darkMode={darkMode} />
        <BlogCategories darkMode={darkMode} />
        <FeaturedPost darkMode={darkMode} />
        <BlogGrid darkMode={darkMode} />
        <Newsletter darkMode={darkMode} />
      </main>

      
    </div>
  );
}

export default Blog;
