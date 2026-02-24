require('dotenv').config();

const required = ['MONGODB_URI'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0 && process.env.NODE_ENV !== 'test') {
  console.warn(`Missing env: ${missing.join(', ')}. Using defaults or .env.example.`);
}

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/alrwid-property-manager',
  clientOrigin: process.env.CLIENT_ORIGIN,
};
