const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config({ path: __dirname + '/.env' });

const sampleProducts = [
  // CLOTH CATEGORY
  { name: "Premium Cotton T-Shirt", price: 25.99, category: "Cloth", image: "/assets/cloth/1.jpg", rating: 4.5, reviews: 120, brand: "FashionX", condition: "New", stock: 80, featured: true, description: "Premium quality cotton t-shirt for ultimate comfort." },
  { name: "Summer Denim Jacket", price: 89.99, category: "Cloth", image: "/assets/cloth/2.jpg", rating: 4.8, reviews: 85, brand: "DenimElite", condition: "New", stock: 45, featured: true, description: "Stylish denim jacket perfect for summer evenings." },
  { name: "Slim Fit Chinos", price: 45.00, category: "Cloth", image: "/assets/cloth/3.jpg", rating: 4.2, reviews: 210, brand: "UrbanStyle", condition: "New", stock: 120, featured: false, description: "Versatile chinos that transition from office to dinner." },
  { name: "Floral Summer Dress", price: 55.00, category: "Cloth", image: "/assets/cloth/4.jpg", rating: 4.7, reviews: 64, brand: "Bloom", condition: "New", stock: 35, featured: true, description: "Lightweight floral dress for sunny days." },
  { name: "Wool Winter Coat", price: 120.00, category: "Cloth", image: "/assets/cloth/5.jpg", rating: 4.9, reviews: 45, brand: "Warmth", condition: "New", stock: 15, featured: false, description: "Heavy wool coat to keep you warm in the coldest winters." },
  { name: "Casual Linen Shirt", price: 35.00, category: "Cloth", image: "/assets/cloth/6.jpg", rating: 4.3, reviews: 98, brand: "FashionX", condition: "New", stock: 90, featured: false, description: "Breathable linen shirt for a relaxed look." },
  
  // TECH CATEGORY
  { name: "Smart Watch Gen 5", price: 199.99, category: "Tech", image: "/assets/tech/1.jpg", rating: 4.6, reviews: 320, brand: "TechGear", condition: "New", stock: 60, featured: true, description: "Next-gen smartwatch with health tracking and GPS." },
  { name: "Noise Cancelling Headphones", price: 299.00, category: "Tech", image: "/assets/tech/2.jpg", rating: 4.8, reviews: 450, brand: "AudioPro", condition: "New", stock: 40, featured: true, description: "Industry-leading noise cancellation for immersive audio." },
  { name: "Wireless Charging Pad", price: 29.99, category: "Tech", image: "/assets/tech/3.jpg", rating: 4.1, reviews: 89, brand: "TechGear", condition: "New", stock: 150, featured: false, description: "Fast wireless charging for all your devices." },
  { name: "Mechanical Keyboard", price: 150.00, category: "Tech", image: "/assets/tech/4.jpg", rating: 4.7, reviews: 180, brand: "GamerKey", condition: "New", stock: 55, featured: false, description: "Tactile mechanical keyboard with RGB lighting." },
  { name: "Portable Bluetooth Speaker", price: 79.99, category: "Tech", image: "/assets/tech/5.jpg", rating: 4.5, reviews: 230, brand: "AudioPro", condition: "New", stock: 70, featured: false, description: "Waterproof speaker with powerful bass." },
  { name: "HD Mirrorless Camera", price: 850.00, category: "Tech", image: "/assets/tech/6.jpg", rating: 4.9, reviews: 110, brand: "OpticX", condition: "New", stock: 20, featured: true, description: "Professional mirrorless camera for stunning photos." },
  { name: "Ultrabook Pro 14", price: 1299.00, category: "Tech", image: "/assets/tech/7.jpg", rating: 4.8, reviews: 156, brand: "TechGear", condition: "New", stock: 25, featured: true, description: "High-performance laptop for professionals and creators." },
  
  // INTERIOR CATEGORY
  { name: "Ergonomic Soft Chair", price: 19.00, category: "Interior", image: "/assets/interior/1.jpg", rating: 4.4, reviews: 140, brand: "HomeComfort", condition: "New", stock: 30, featured: true, description: "Adjustable office chair designed for long hours." },
  { name: "Modern Floor Lamp", price: 120.00, category: "Interior", image: "/assets/interior/2.jpg", rating: 4.3, reviews: 67, brand: "Lumina", condition: "New", stock: 25, featured: false, description: "Sleek floor lamp to brighten up any room." },
  { name: "Ceramic Vase Set", price: 45.00, category: "Interior", image: "/assets/interior/3.jpg", rating: 4.6, reviews: 92, brand: "DecorPlus", condition: "New", stock: 50, featured: false, description: "Handcrafted ceramic vases for a modern touch." },
  { name: "Oak Dining Table", price: 450.00, category: "Interior", image: "/assets/interior/4.jpg", rating: 4.8, reviews: 54, brand: "HomeComfort", condition: "New", stock: 10, featured: true, description: "Solid oak table for family dinners." },
  { name: "Velvet Throw Pillow", price: 15.00, category: "Interior", image: "/assets/interior/5.jpg", rating: 4.2, reviews: 110, brand: "DecorPlus", condition: "New", stock: 100, featured: false, description: "Soft velvet pillows for extra comfort." },
  { name: "Kitchen Dish Set", price: 89.00, category: "Interior", image: "/assets/interior/6.jpg", rating: 4.5, reviews: 45, brand: "ChefPro", condition: "New", stock: 60, featured: true, description: "Elegant ceramic dish set for modern kitchens." },
  { name: "Smart Home Hub", price: 129.00, category: "Interior", image: "/assets/interior/7.jpg", rating: 4.7, reviews: 88, brand: "TechHome", condition: "New", stock: 40, featured: false, description: "Control your entire home from one central device." },
  { name: "Minimalist Bookshelf", price: 159.00, category: "Interior", image: "/assets/interior/8.jpg", rating: 4.4, reviews: 34, brand: "Nordic", condition: "New", stock: 20, featured: false, description: "Clean lines and plenty of storage for your collection." },
  { name: "Industrial Coffee Table", price: 210.00, category: "Interior", image: "/assets/interior/9.jpg", rating: 4.6, reviews: 56, brand: "UrbanStyle", condition: "New", stock: 15, featured: true, description: "Solid wood and metal coffee table for a loft aesthetic." },
  { name: "Geometric Wall Art", price: 75.00, category: "Interior", image: "/assets/interior/10.jpg", rating: 4.8, reviews: 29, brand: "DecorPlus", condition: "New", stock: 100, featured: false, description: "Vibrant geometric print to add color to your walls." }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${inserted.length} products`);

    await User.deleteMany({});
    await User.create({
      name: 'Admin',
      email: 'admin@brandstore.com',
      password: 'admin123',
      role: 'admin'
    });
    await User.create({
      name: 'Test User',
      email: 'user@brandstore.com',
      password: 'user123',
      role: 'user'
    });
    console.log('✅ Seeded admin + test user');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
