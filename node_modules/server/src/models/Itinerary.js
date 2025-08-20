import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  day: Number,
  activity: String,
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  estimatedCost: Number,
  order: Number
}, { _id: false });

const ItinerarySchema = new mongoose.Schema({
  userId: String, // keep simple for now
  title: String,
  items: [ItemSchema],
  totalEstimatedCost: Number,
}, { timestamps: true });

export default mongoose.model('Itinerary', ItinerarySchema);
