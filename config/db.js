const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses connection string from environment variables
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      // Mongoose connection options
      serverSelectionTimeoutMS: 10000, // Timeout after 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log(`✓ MongoDB connected: ${conn.connection.host}`);
    console.log(`  Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('\n✗ MongoDB connection error:', error.message);
    console.error('\nTroubleshooting tips:');
    console.error('  1. Check if your MongoDB Atlas cluster is running (not paused)');
    console.error('  2. Verify your IP address is whitelisted in MongoDB Atlas');
    console.error('  3. Check your connection string is correct');
    console.error('  4. Ensure your network can reach MongoDB Atlas');
    console.error(`\n  Connection string: ${mongoUri.substring(0, 50)}...`);
    throw error;
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

module.exports = connectDB;
