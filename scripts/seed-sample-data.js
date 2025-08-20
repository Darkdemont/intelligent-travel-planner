import 'dotenv/config';
import mongoose from 'mongoose';
import Destination from '../server/src/models/Destination.js';


async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/travel_ai');
  await Destination.deleteMany({});
  await Destination.insertMany([
    { name: 'Mirissa Beach', country: 'Sri Lanka', category: ['beach'], priceLevel: 2, location: { lat: 5.948, lng: 80.454 } },
    { name: 'Sigiriya', country: 'Sri Lanka', category: ['culture'], priceLevel: 3, location: { lat: 7.956, lng: 80.760 } }
  ]);
  console.log('Seeded!');
  await mongoose.disconnect();
}
run().catch(console.error);
