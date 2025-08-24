const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  packageName: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  travelers: {
    type: Number,
    required: true,
    min: 1
  },
  totalCost: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  itinerary: [{
    day: Number,
    date: Date,
    activities: [{
      name: String,
      location: String,
      startTime: String,
      duration: Number,
      cost: Number,
      type: {
        type: String,
        enum: ['sightseeing', 'food', 'transport', 'accommodation']
      }
    }],
    totalCost: Number,
    totalTime: Number
  }],
  specialRequests: String,
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  notes: String
}, {
  timestamps: true
});

// Generate order number before saving
bookingSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.orderNumber = `ZT-${year}-${randomNum}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);