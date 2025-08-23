// MyAccount.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  User, Settings, CreditCard, FileText, LogOut, Shield,
  Calendar, MapPin, Download, Edit3, Save, X, Users
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const MyAccount = ({ darkMode }) => {
  const { user, bookings, logout, updateProfile, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('trips');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  if (!user) return null;

  const tabs = [
    { id: 'trips', name: 'My Trips & Bookings', icon: Calendar },
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'profile', name: 'Profile & Security', icon: User },
    { id: 'billing', name: 'Billing & Invoices', icon: CreditCard },
  ];

  const handleSaveProfile = async () => {
    if (editData.newPassword && editData.newPassword !== editData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const success = await updateProfile({
      name: editData.name,
      phone: editData.phone,
    });

    if (success) {
      setIsEditing(false);
      alert('Profile updated successfully');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50 dark:bg-green-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30';
      case 'cancelled':
        return 'text-red-600 bg-red-50 dark:bg-red-900/30';
      case 'completed':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/30';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/30';
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              My Account
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Welcome back, {user.name}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {isAdmin() && (
              <a
                href="/admin"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Admin Console</span>
              </a>
            )}

            <button
              onClick={logout}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center space-x-2 ${
                darkMode
                  ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`rounded-2xl ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-lg p-6`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user.role === 'admin' ? 'Administrator' : 'Customer'}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                          : darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3">
            <div
              className={`rounded-2xl ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-lg p-6`}
            >
              {/* Trips */}
              {activeTab === 'trips' && (
                <div>
                  <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    My Trips & Bookings
                  </h2>

                  {(bookings || []).length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        No bookings yet
                      </h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Start planning your Sri Lankan adventure today!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className={`p-6 rounded-xl border ${
                            darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {booking.packageName}
                              </h3>
                              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Order #{booking.orderNumber}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {booking.destination}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {new Date(booking.startDate).toLocaleDateString()} -{' '}
                                {new Date(booking.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {booking.travelers} travelers
                              </span>
                              <span className="text-lg font-bold text-emerald-600">${booking.totalCost}</span>
                            </div>
                            <button
                              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 ${
                                darkMode
                                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Preferences */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Travel Preferences
                  </h2>

                  {user.preferences ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Travel Style
                        </h3>
                        <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg font-medium capitalize">
                          {user.preferences.travelStyle}
                        </span>
                      </div>

                      <div>
                        <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {user.preferences.interests.map((interest, idx) => (
                            <span
                              key={`${interest}-${idx}`}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Accommodation Type
                        </h3>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {user.preferences.accommodationType}
                        </p>
                      </div>

                      <div>
                        <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Dietary Restrictions
                        </h3>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {user.preferences.dietaryRestrictions || 'None specified'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Settings className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        No preferences set
                      </h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Complete your profile to get personalized recommendations
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Profile & Security */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Profile & Security
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveProfile}
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center space-x-2 ${
                            darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData((p) => ({ ...p, name: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                            }`}
                          />
                        ) : (
                          <p className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                            {user.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Email Address
                        </label>
                        <p className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-600'}`}>
                          {user.email} (Cannot be changed)
                        </p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData((p) => ({ ...p, phone: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                            }`}
                          />
                        ) : (
                          <p className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                            {user.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Account Type
                        </label>
                        <p className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} capitalize`}>
                          {user.role}
                        </p>
                      </div>
                    </div>

                    {/* Two-Factor */}
                    <div className={`p-6 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Shield className={`w-6 h-6 ${user.twoFactorEnabled ? 'text-green-600' : darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <div>
                            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Two-Factor Authentication</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {user.twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security to your account'}
                            </p>
                          </div>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                            user.twoFactorEnabled
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {user.twoFactorEnabled ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>

                    {/* Password Change */}
                    {isEditing && (
                      <div className={`p-6 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                        <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Current Password
                            </label>
                            <input
                              type="password"
                              value={editData.currentPassword}
                              onChange={(e) => setEditData((p) => ({ ...p, currentPassword: e.target.value }))}
                              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                              }`}
                              placeholder="Enter current password"
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              New Password
                            </label>
                            <input
                              type="password"
                              value={editData.newPassword}
                              onChange={(e) => setEditData((p) => ({ ...p, newPassword: e.target.value }))}
                              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                              }`}
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={editData.confirmPassword}
                              onChange={(e) => setEditData((p) => ({ ...p, confirmPassword: e.target.value }))}
                              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                              }`}
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Billing */}
              {activeTab === 'billing' && (
                <div>
                  <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Billing & Invoices
                  </h2>

                  <div className="text-center py-12">
                    <FileText className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      No invoices yet
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Your billing history will appear here after your first booking
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyAccount.propTypes = {
  darkMode: PropTypes.bool,
};

export default MyAccount;
