import React from 'react';
import { Mail, Facebook, Twitter, Linkedin, Instagram, Youtube, ShoppingBag, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* Subscribe Section */}
      <div className="bg-gray-100 py-10 text-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl font-bold mb-2">Subscribe on our newsletter</h2>
          <p className="text-gray-500 mb-6">Get daily news on upcoming offers from many suppliers all over the world</p>
          <form className="flex max-w-md mx-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
            {/* Brand Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 text-blue-500 mb-4">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-md">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black font-sans tracking-tight text-blue-600">Brand</span>
              </Link>
              <p className="text-gray-500 mb-6 max-w-xs text-sm leading-relaxed">
                Empowering global trade through a seamless B2B marketplace experience. Quality, trust, and efficiency.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-black text-gray-900 mb-4 text-xs uppercase tracking-[0.2em]">About</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-bold">
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link to="/products" className="hover:text-blue-600 transition-colors">Find store</Link></li>
                <li><Link to="/products" className="hover:text-blue-600 transition-colors">Categories</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">Blogs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-gray-900 mb-4 text-xs uppercase tracking-[0.2em]">Partnership</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-bold">
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">Our Partners</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">Find store</Link></li>
                <li><Link to="/products" className="hover:text-blue-600 transition-colors">Categories</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">Blogs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-gray-900 mb-4 text-xs uppercase tracking-[0.2em]">Information</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-bold">
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">Money Refund</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">Shipping</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">Contact us</Link></li>
              </ul>
            </div>

            {/* App Badges */}
            <div>
              <h4 className="font-black text-gray-900 mb-4 text-xs uppercase tracking-[0.2em]">Get app</h4>
              <div className="space-y-4">
                <a href="#" className="block hover:scale-105 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
                </a>
                <a href="#" className="block hover:scale-105 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center text-xs font-black uppercase tracking-widest text-gray-400 gap-4">
          <p>© 2024 Brand Marketplace. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
              <img src="https://flagcdn.com/w20/us.png" alt="English" className="w-5 h-3.5 object-cover rounded-sm" />
              <span>English</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <Link to="/admin" className="text-gray-300 hover:text-blue-600 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
