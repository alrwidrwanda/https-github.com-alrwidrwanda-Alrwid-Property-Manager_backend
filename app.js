const express = require('express');
const cors = require('cors');
const { clientOrigin } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const itemRoutes = require('./routes/itemRoutes');
const apartmentRoutes = require('./routes/apartments');
const clientRoutes = require('./routes/clientRoutes');
const saleRoutes = require('./routes/sales');
const paymentRoutes = require('./routes/payments');
const apartmentReservationRoutes = require('./routes/apartmentReservations');
const receiptRoutes = require('./routes/receipts');
const defaultedSaleRoutes = require('./routes/defaultedSales');

const app = express();

// CORS - allow frontend origin(s)
const corsOptions = {
  origin: clientOrigin
    ? clientOrigin.split(',').map((o) => o.trim())
    : true, // allow all in dev if CLIENT_ORIGIN not set
  credentials: true,
};
app.use(cors(corsOptions));

// Increase limit to allow base64 document uploads (contracts, receipts, ID pics - up to 10MB each)
const bodyLimit = '15mb';
app.use(express.json({ limit: bodyLimit }));
app.use(express.urlencoded({ extended: true, limit: bodyLimit }));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/apartments', apartmentRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/apartment-reservations', apartmentReservationRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/defaulted-sales', defaultedSaleRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Alrwid Property Manager API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      products: '/api/products',
      items: '/api/items',
      apartments: '/api/apartments',
      clients: '/api/clients',
    },
  });
});

// 404 for unknown routes
app.use(notFound);
app.use(errorHandler);

module.exports = app;
