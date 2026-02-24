/**
 * Test MongoDB Connection Script
 * Run this to verify your MongoDB connection string works
 * Usage: node test-connection.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('❌ MONGODB_URI is not set in .env file');
  process.exit(1);
}

console.log('Testing MongoDB connection...');
console.log(`Connection string: ${mongoUri.substring(0, 50)}...\n`);

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log('✅ SUCCESS! MongoDB connection works!');
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Database: ${mongoose.connection.name}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ FAILED! MongoDB connection error:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('querySrv')) {
      console.log('💡 This usually means:');
      console.log('   1. Your MongoDB Atlas cluster is PAUSED');
      console.log('      → Go to MongoDB Atlas and click "Resume" on your cluster\n');
      console.log('   2. Your IP address is NOT whitelisted');
      console.log('      → Go to MongoDB Atlas → Network Access → Add IP Address\n');
      console.log('   3. Network/firewall is blocking the connection');
      console.log('      → Check your firewall settings\n');
    }
    
    process.exit(1);
  });
