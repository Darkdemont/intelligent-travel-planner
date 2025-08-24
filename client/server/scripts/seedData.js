const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Package = require('../models/Package');
const Destination = require('../models/Destination');
const Booking = require('../models/Booking');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  const users = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '+1 555 123 4567',
      role: 'customer',
      preferences: {
        travelStyle: 'adventure',
        interests: ['Photography', 'Hiking', 'Cultural Tours'],
        dietaryRestrictions: 'None',
        accommodationType: 'Boutique Hotels'
      }
    },
    {
      name: 'Admin User',
      email: 'admin@zentratravels.com',
      password: 'password123',
      phone: '+94 11 234 5678',
      role: 'admin'
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      password: 'password123',
      phone: '+1 555 987 6543',
      role: 'customer',
      preferences: {
        travelStyle: 'luxury',
        interests: ['Beach Activities', 'Spa', 'Fine Dining'],
        dietaryRestrictions: 'Vegetarian',
        accommodationType: 'Luxury Hotels'
      }
    }
  ];

  await User.deleteMany({});
  await User.insertMany(users);
  console.log('✅ Users seeded');
};

const seedDestinations = async () => {
  const destinations = [
    {
      name: 'Colombo',
      type: 'city',
      coordinates: { lat: 6.9271, lng: 79.8612 },
      description: 'The bustling capital city of Sri Lanka',
      attractions: [
        {
          name: 'Galle Face Green',
          description: 'Urban park stretching along the coast',
          coordinates: { lat: 6.9271, lng: 79.8612 },
          entryFee: 0,
          openingHours: '24/7',
          bestTimeToVisit: 'Evening'
        }
      ],
      hiddenGems: [
        {
          name: 'Gangaramaya Temple',
          description: 'Beautiful Buddhist temple with eclectic architecture',
          coordinates: { lat: 6.9167, lng: 79.8563 },
          type: 'temple'
        },
        {
          name: 'Red Mosque',
          description: 'Historic Indo-Saracenic mosque',
          coordinates: { lat: 6.9344, lng: 79.8428 },
          type: 'heritage'
        }
      ],
      bestTimeToVisit: 'December to March',
      averageStayDuration: 2,
      popularActivities: ['City Tours', 'Shopping', 'Museums', 'Nightlife']
    },
    {
      name: 'Kandy',
      type: 'cultural',
      coordinates: { lat: 7.2906, lng: 80.6337 },
      description: 'The cultural capital and last kingdom of Sri Lanka',
      attractions: [
        {
          name: 'Temple of the Tooth',
          description: 'Sacred Buddhist temple housing a tooth relic of Buddha',
          coordinates: { lat: 7.2906, lng: 80.6337 },
          entryFee: 1500,
          openingHours: '5:30 AM - 8:00 PM',
          bestTimeToVisit: 'Morning or evening'
        }
      ],
      hiddenGems: [
        {
          name: 'Udawattakele Forest',
          description: 'Historic forest reserve in the heart of Kandy',
          coordinates: { lat: 7.2955, lng: 80.6369 },
          type: 'nature'
        }
      ],
      bestTimeToVisit: 'December to April',
      averageStayDuration: 2,
      popularActivities: ['Temple Visits', 'Cultural Shows', 'Lake Walks', 'Spice Gardens']
    },
    {
      name: 'Kurunegala',
      type: 'city',
      coordinates: { lat: 7.4863, lng: 80.3623 },
      description: 'Ancient capital with unique rock formations',
      attractions: [
        {
          name: 'Kurunegala Lake',
          description: 'Scenic lake in the city center',
          coordinates: { lat: 7.4863, lng: 80.3623 },
          entryFee: 0,
          openingHours: '24/7',
          bestTimeToVisit: 'Evening'
        }
      ],
      hiddenGems: [
        {
          name: 'Elephant Rock',
          description: 'Massive rock formation resembling an elephant',
          coordinates: { lat: 7.4900, lng: 80.3600 },
          type: 'nature'
        },
        {
          name: 'Athugala Rock',
          description: 'Historic rock with ancient inscriptions',
          coordinates: { lat: 7.4800, lng: 80.3650 },
          type: 'heritage'
        }
      ],
      bestTimeToVisit: 'December to March',
      averageStayDuration: 1,
      popularActivities: ['Rock Climbing', 'Historical Tours', 'Lake Activities']
    },
    {
      name: 'Kadawatha',
      type: 'city',
      coordinates: { lat: 7.0167, lng: 79.9500 },
      description: 'Suburban town with religious and natural attractions',
      attractions: [
        {
          name: 'Kelaniya Temple',
          description: 'Ancient Buddhist temple with beautiful murals',
          coordinates: { lat: 7.0167, lng: 79.9500 },
          entryFee: 0,
          openingHours: '5:00 AM - 9:00 PM',
          bestTimeToVisit: 'Morning'
        }
      ],
      hiddenGems: [
        {
          name: 'Muthurajawela Wetlands',
          description: 'Coastal wetland sanctuary with diverse wildlife',
          coordinates: { lat: 7.0200, lng: 79.9400 },
          type: 'nature'
        }
      ],
      bestTimeToVisit: 'November to April',
      averageStayDuration: 1,
      popularActivities: ['Temple Visits', 'Bird Watching', 'Boat Rides']
    }
  ];

  await Destination.deleteMany({});
  await Destination.insertMany(destinations);
  console.log('✅ Destinations seeded');
};

const seedPackages = async () => {
  const packages = [
    {
      title: 'Cultural Heritage Explorer',
      description: 'Discover the rich cultural heritage of Sri Lanka',
      duration: 7,
      price: 899,
      originalPrice: 1199,
      destinations: ['Kandy', 'Sigiriya', 'Anuradhapura'],
      highlights: ['Sigiriya Rock Fortress', 'Temple of the Tooth', 'Ancient Anuradhapura'],
      includes: ['Accommodation', 'Meals', 'Transport', 'Guide'],
      category: 'cultural',
      rating: 4.9,
      reviewCount: 234,
      images: [
        {
          url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
          alt: 'Sigiriya Rock Fortress'
        }
      ]
    },
    {
      title: 'Adventure & Nature',
      description: 'Thrilling adventures in Sri Lanka\'s natural wonders',
      duration: 10,
      price: 1299,
      originalPrice: 1699,
      destinations: ['Ella', 'Yala', 'Nuwara Eliya'],
      highlights: ['Ella Rock Hiking', 'Yala Safari', 'Tea Plantation Tours'],
      includes: ['Adventure Gear', 'All Activities', 'Eco Lodges', 'Expert Guides'],
      category: 'adventure',
      rating: 4.8,
      reviewCount: 189
    },
    {
      title: 'Beach & Relaxation',
      description: 'Unwind on Sri Lanka\'s pristine beaches',
      duration: 5,
      price: 699,
      originalPrice: 899,
      destinations: ['Galle', 'Mirissa', 'Unawatuna'],
      highlights: ['Galle Fort', 'Whale Watching', 'Beach Relaxation'],
      includes: ['Beach Resorts', 'Water Sports', 'Spa Access', 'Sunset Cruises'],
      category: 'beach',
      rating: 4.7,
      reviewCount: 156
    }
  ];

  await Package.deleteMany({});
  await Package.insertMany(packages);
  console.log('✅ Packages seeded');
};

const seedBookings = async () => {
  // Get users to create bookings for
  const users = await User.find({ role: 'customer' });
  
  if (users.length === 0) {
    console.log('No customers found, skipping booking seed');
    return;
  }

  const bookings = [
    {
      userId: users[0]._id,
      orderNumber: 'ZT-2025-001234',
      packageName: 'Cultural Heritage Explorer',
      destination: 'Kandy, Sigiriya, Anuradhapura',
      startDate: new Date('2025-03-15'),
      endDate: new Date('2025-03-22'),
      travelers: 2,
      totalCost: 1798,
      status: 'confirmed',
      itinerary: [
        {
          day: 1,
          date: new Date('2025-03-15'),
          activities: [
            {
              name: 'Arrival in Kandy',
              location: 'Kandy',
              startTime: '10:00',
              duration: 2,
              cost: 0,
              type: 'transport'
            }
          ],
          totalCost: 250,
          totalTime: 6
        }
      ]
    },
    {
      userId: users[0]._id,
      orderNumber: 'ZT-2024-005678',
      packageName: 'Beach & Relaxation',
      destination: 'Galle, Mirissa, Unawatuna',
      startDate: new Date('2024-12-20'),
      endDate: new Date('2024-12-25'),
      travelers: 2,
      totalCost: 1398,
      status: 'completed'
    }
  ];

  await Booking.deleteMany({});
  await Booking.insertMany(bookings);
  console.log('✅ Bookings seeded');
};

const seedAll = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    await seedUsers();
    await seedDestinations();
    await seedPackages();
    await seedBookings();
    
    console.log('✅ Database seeding completed successfully!');
    
    console.log('\n📋 Test Credentials:');
    console.log('Customer: john@example.com / password123');
    console.log('Admin: admin@zentratravels.com / password123');
    console.log('Find Booking: john@example.com / ZT-2025-001234');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedAll();