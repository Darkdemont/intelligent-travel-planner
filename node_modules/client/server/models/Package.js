const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Package title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Package description is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: 1
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  destinations: [{
    type: String,
    required: true
  }],
  highlights: [{
    type: String
  }],
  includes: [{
    type: String
  }],
  excludes: [{
    type: String
  }],
  images: [{
    url: String,
    alt: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['cultural', 'adventure', 'beach', 'wildlife', 'heritage', 'hill-country'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'challenging'],
    default: 'easy'
  },
  groupSize: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 20 }
  },
  availability: {
    type: Boolean,
    default: true
  },
  seasonality: [{
    type: String,
    enum: ['all-year', 'dry-season', 'wet-season', 'peak-season']
  }],
  tags: [String]
}, {
  timestamps: true
});

// Calculate savings percentage
packageSchema.virtual('savingsPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

packageSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Package', packageSchema);