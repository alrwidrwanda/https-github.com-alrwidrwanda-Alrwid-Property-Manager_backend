// Load environment variables first
require('./config/env');

const connectDB = require('./config/db');
const app = require('./app');
const { nodeEnv } = require('./config/env');

// Use Render-provided PORT or fallback
const PORT = process.env.PORT || 3000;

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n✓ Server running in ${nodeEnv} mode`);
      console.log(`  URL: http://localhost:${PORT}`);
      console.log(`  Health: http://localhost:${PORT}/api/health\n`);
    });
  })
  .catch((err) => {
    console.error('\n✗ Failed to start server:', err.message || err);
    console.error('\n⚠️  MongoDB connection failed!');
    console.error('\nQuick fixes:');
    console.error('  1. Test connection: node test-connection.js');
    console.error('  2. Check MongoDB Atlas cluster is running (not paused)');
    console.error('  3. Verify IP is whitelisted in MongoDB Atlas');
    console.error('\nSee TROUBLESHOOTING.md for detailed help.\n');
    process.exit(1);
  });
  