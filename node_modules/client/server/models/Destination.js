const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['city', 'cultural', 'heritage', 'coastal', 'nature', 'hill-country', 'wildlife'],
    required: true
  },
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  attractions: [{
    name: String,
    description: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    entryFee: Number,
    openingHours: String,
    bestTimeToVisit: String
  }],
  hiddenGems: [{
    name: String,
    description: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    type: {
      type: String,
      enum: ['temple', 'nature', 'heritage', 'viewpoint', 'local-experience']
    },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'challenging']
    }
  }],
  bestTimeToVisit: String,
  averageStayDuration: Number, // in days
  popularActivities: [String],
  nearbyDestinations: [{
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    },
    distance: Number, // in km
    travelTime: Number // in minutes
  }],
  images: [{
    url: String,
    alt: String,
    category: String
  }],
  weatherInfo: {
    temperature: {
      min: Number,
      max: Number
    },
    rainfall: String,
    humidity: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for geospatial queries
destinationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Destination', destinationSchema);