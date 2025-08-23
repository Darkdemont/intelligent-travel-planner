// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create context (no TS generics)
const AuthContext = createContext(undefined);

/* ---------------- Mock data (same as TSX) ---------------- */
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555 123 4567',
    role: 'customer',
    twoFactorEnabled: false,
    createdAt: '2024-01-15',
    preferences: {
      travelStyle: 'adventure',
      interests: ['Photography', 'Hiking', 'Cultural Tours'],
      dietaryRestrictions: 'None',
      accommodationType: 'Boutique Hotels',
    },
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@zentratravels.com',
    phone: '+94 11 234 5678',
    role: 'admin',
    twoFactorEnabled: true,
    createdAt: '2023-06-01',
  },
];

const mockBookings = [
  {
    id: '1',
    userId: '1',
    packageName: 'Cultural Heritage Explorer',
    destination: 'Kandy, Sigiriya, Anuradhapura',
    startDate: '2025-03-15',
    endDate: '2025-03-22',
    travelers: 2,
    totalCost: 1798,
    status: 'confirmed',
    bookingDate: '2025-01-10',
    orderNumber: 'ZT-2025-001234',
  },
  {
    id: '2',
    userId: '1',
    packageName: 'Beach & Relaxation',
    destination: 'Galle, Mirissa, Unawatuna',
    startDate: '2024-12-20',
    endDate: '2024-12-25',
    travelers: 2,
    totalCost: 1398,
    status: 'completed',
    bookingDate: '2024-11-15',
    orderNumber: 'ZT-2024-005678',
  },
];

/* ---------------- Provider ---------------- */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load any stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('zentra_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setBookings(mockBookings.filter((b) => b.userId === userData.id));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const foundUser = mockUsers.find((u) => u.email === email);
      if (foundUser && password === 'password123') {
        setUser(foundUser);
        setBookings(mockBookings.filter((b) => b.userId === foundUser.id));
        localStorage.setItem('zentra_user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'customer',
        twoFactorEnabled: false,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUser(newUser);
      setBookings([]);
      localStorage.setItem('zentra_user', JSON.stringify(newUser));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    localStorage.removeItem('zentra_user');
  };

  const updateProfile = async (data) => {
    if (!user) return false;
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('zentra_user', JSON.stringify(updatedUser));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const findBooking = async (email, orderNumber) => {
    await new Promise((r) => setTimeout(r, 1000));
    const booking = mockBookings.find((b) => b.orderNumber === orderNumber);
    const userExists = mockUsers.find((u) => u.email === email);
    return booking && userExists ? booking : null;
  };

  const isAdmin = () => user?.role === 'admin';

  const value = {
    user,
    bookings,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    findBooking,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/* ---------------- Hook ---------------- */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
