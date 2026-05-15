const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));

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
