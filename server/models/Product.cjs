const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  image: {
    type: String,
    required: [true, 'Image path is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Cloth', 'Tech', 'Interior', 'Tools', 'Sports', 'Animals', 'Machinery', 'More']
  },
  stock: {
    type: Number,
    required: true,
    default: 50,
    min: 0
  },
  brand: {
    type: String,
    default: 'Generic'
  },
  condition: {
    type: String,
    enum: ['New', 'Refurbished'],
    default: 'New'
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  features: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Text index for search
productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
