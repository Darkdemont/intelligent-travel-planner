import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = ({ darkMode }) => {
  const footerLinks = {
    Destinations: ['Colombo', 'Kandy', 'Galle', 'Sigiriya', 'Nuwara Eliya', 'Anuradhapura'],
    Services: ['AI Trip Planning', 'Custom Tours', 'Hotel Booking', 'Transport', 'Travel Insurance', 'Visa Assistance'],
    Company: ['About Us', 'Our Team', 'Careers', 'Press', 'Blog', 'Contact'],
    Support: ['Help Center', 'Safety', 'Cancellation', 'Refunds', 'Terms of Service', 'Privacy Policy'],
  };

  return (
    <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Zentra Travels</h3>
                <p className="text-emerald-400 text-sm">AI-Powered Adventures</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience Sri Lanka like never before with our intelligent travel planning system.
              We combine AI technology with local expertise to create unforgettable journeys.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">hello@zentratravels.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">+94 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
  © 2025 <span className="font-semibold text-white">Zentra Travels</span>. 
  All rights reserved. {" "} 
  <span className="block md:inline text-emerald-400">
    A Wijesiri Group (Pvt) Ltd Company
  </span>
</p>

          

          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        

      </div>
    </footer>
  );
};

Footer.propTypes = {
  darkMode: PropTypes.bool,
};

export default Footer;
