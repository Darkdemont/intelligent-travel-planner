// server/config/database.js
const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not set in environment (.env)');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri); // no deprecated options
    console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }

  // Optional: extra listeners for visibility
  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('👋 MongoDB connection closed due to app termination');
    process.exit(0);
  });
}

module.exports = connectDB;
