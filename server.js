// Load environment variables first
require('./config/env');

const connectDB = require('./config/db');
const app = require('./app');
const { port, nodeEnv } = require('./config/env');

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`\n✓ Server running in ${nodeEnv} mode`);
      console.log(`  URL: http://localhost:${port}`);
      console.log(`  Health: http://localhost:${port}/api/health\n`);
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
