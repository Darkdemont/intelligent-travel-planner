import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, User, Clock, ArrowRight, Eye, Heart } from 'lucide-react';

const BlogGrid = ({ darkMode }) => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Hidden Gems in Sri Lanka Discovered by AI',
      excerpt:
        'Our AI algorithm analyzed thousands of traveler reviews to uncover these incredible hidden destinations.',
      image:
        'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Rajesh Kumar',
      date: 'January 12, 2025',
      readTime: '6 min read',
      category: 'Destinations',
      views: '2.3k',
      likes: 156,
    },
    {
      id: 2,
      title:
        'Cost-Effective Travel: AI Optimization Saves 40% on Sri Lankan Adventures',
      excerpt:
        'Learn how our intelligent pricing algorithms help travelers save money without compromising on experiences.',
      image:
        'https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Maya Wickramasinghe',
      date: 'January 10, 2025',
      readTime: '5 min read',
      category: 'Travel Tips',
      views: '1.8k',
      likes: 124,
    },
    {
      id: 3,
      title: 'Sigiriya Rock Fortress: A Complete Photography Guide',
      excerpt:
        'Master the art of capturing this ancient wonder with our comprehensive photography tips and techniques.',
      image:
        'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'David Chen',
      date: 'January 8, 2025',
      readTime: '7 min read',
      category: 'Photography',
      views: '3.1k',
      likes: 289,
    },
    {
      id: 4,
      title:
        'Sri Lankan Street Food: A Culinary Journey Through Colombo',
      excerpt:
        'Explore the vibrant street food scene of Colombo with our AI-curated food tour recommendations.',
      image:
        'https://images.pexels.com/photos/1450359/pexels-photo-1450359.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Priya Jayawardena',
      date: 'January 6, 2025',
      readTime: '4 min read',
      category: 'Food & Culture',
      views: '2.7k',
      likes: 198,
    },
    {
      id: 5,
      title:
        'Ella Rock Hiking: AI-Planned Routes for Every Fitness Level',
      excerpt:
        'Discover personalized hiking routes to Ella Rock based on your fitness level and preferences.',
      image:
        'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Michael Thompson',
      date: 'January 4, 2025',
      readTime: '8 min read',
      category: 'Adventure',
      views: '1.9k',
      likes: 167,
    },
    {
      id: 6,
      title: 'Galle Fort: Where Dutch Heritage Meets Modern Sri Lanka',
      excerpt:
        'Explore the historical significance and modern attractions of this UNESCO World Heritage site.',
      image:
        'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Sarah Williams',
      date: 'January 2, 2025',
      readTime: '6 min read',
      category: 'Heritage',
      views: '2.1k',
      likes: 143,
    },
    {
      id: 7,
      title: 'Tea Country Adventures: AI-Optimized Plantation Tours',
      excerpt:
        'Experience the best of Sri Lankan tea country with our intelligently planned plantation visits.',
      image:
        'https://images.pexels.com/photos/1450362/pexels-photo-1450362.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'James Anderson',
      date: 'December 30, 2024',
      readTime: '5 min read',
      category: 'Destinations',
      views: '1.6k',
      likes: 112,
    },
    {
      id: 8,
      title: 'Mirissa Whale Watching: Best Times and AI Predictions',
      excerpt:
        'Maximize your whale watching experience with AI-powered weather and migration predictions.',
      image:
        'https://images.pexels.com/photos/1450354/pexels-photo-1450354.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Emma Johnson',
      date: 'December 28, 2024',
      readTime: '7 min read',
      category: 'Beaches',
      views: '2.4k',
      likes: 201,
    },
    {
      id: 9,
      title:
        'Sustainable Tourism: AI Helping Preserve Sri Lankan Nature',
      excerpt:
        'Learn how artificial intelligence is contributing to sustainable tourism practices in Sri Lanka.',
      image:
        'https://images.pexels.com/photos/1450365/pexels-photo-1450365.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Dr. Nimal Fernando',
      date: 'December 26, 2024',
      readTime: '9 min read',
      category: 'Travel Tips',
      views: '1.3k',
      likes: 89,
    },
  ];

  // Plain JS version (no TS types)
  const getCategoryColor = (category) => {
    const colors = {
      'Destinations': 'bg-blue-500',
      'Travel Tips': 'bg-green-500',
      'Photography': 'bg-purple-500',
      'Food & Culture': 'bg-orange-500',
      'Adventure': 'bg-red-500',
      'Heritage': 'bg-indigo-500',
      'Beaches': 'bg-cyan-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Latest Travel{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Stay updated with the latest travel trends, destination guides, and
            AI-powered insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                darkMode
                  ? 'bg-gray-900 border border-gray-700'
                  : 'bg-gray-50 border border-gray-100'
              } shadow-lg`}
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`${getCategoryColor(
                      post.category
                    )} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-lg font-semibold mb-3 line-clamp-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {post.title}
                </h3>

                <p
                  className={`text-sm mb-4 line-clamp-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User
                        className={`w-3 h-3 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {post.author}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock
                      className={`w-3 h-3 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Calendar
                      className={`w-3 h-3 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {post.date}
                    </span>
                  </div>
                  <button className="group/btn text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center space-x-1 transition-colors duration-200">
                    <span>Read More</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 ${
              darkMode
                ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
};

BlogGrid.propTypes = {
  darkMode: PropTypes.bool,
};

export default BlogGrid;
