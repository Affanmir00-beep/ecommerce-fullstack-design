const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined!');
    return null;
  }

  try {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    cachedConnection = await mongoose.connect(process.env.MONGODB_URI, opts);
    console.log('✅ MongoDB Connected and Cached');
    return cachedConnection;
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    cachedConnection = null;
    return null;
  }
};

module.exports = connectDB;
