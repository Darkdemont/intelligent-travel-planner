import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: String,
  category: [String],          // beach, culture, adventure
  priceLevel: { type: Number, default: 2 }, // 1 cheap - 5 expensive
  location: { lat: Number, lng: Number },
});

export default mongoose.model('Destination', DestinationSchema);
