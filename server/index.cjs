const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.cjs');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
}

const app = express();
const PORT = process.env.PORT || 5000;

// Non-blocking Database Connection
connectDB().catch(err => console.error('Initial DB connection failed:', err));

// Middleware
app.use(cors({
  origin: true, // Allow all origins for Vercel deployment
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Routes
app.use('/api/products', require('./routes/products.cjs'));
app.use('/api/auth', require('./routes/auth.cjs'));
app.use('/api/cart', require('./routes/cart.cjs'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: err.message || 'Something went wrong!',
    stack: err.stack 
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints:`);
    console.log(`   GET    /api/products          - List all products`);
    console.log(`   GET    /api/products/featured  - Featured products`);
    console.log(`   GET    /api/products/:id       - Single product`);
    console.log(`   POST   /api/products           - Create product (admin)`);
    console.log(`   PUT    /api/products/:id       - Update product (admin)`);
    console.log(`   DELETE /api/products/:id       - Delete product (admin)`);
    console.log(`   POST   /api/auth/register      - Register`);
    console.log(`   POST   /api/auth/login         - Login`);
    console.log(`   GET    /api/auth/me            - Profile (auth)\n`);
  });
}

// Export for Vercel Serverless Functions
module.exports = app;
