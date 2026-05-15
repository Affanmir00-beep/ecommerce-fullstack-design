import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User, MessageSquare, Heart, ChevronDown, ShoppingBag, X, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const categories = [
    { name: 'All', label: 'All category' },
    { name: 'Cloth', label: 'Clothes and wear' },
    { name: 'Interior', label: 'Home interiors' },
    { name: 'Tech', label: 'Computer and tech' },
    { name: 'Tools', label: 'Tools, equipments' },
    { name: 'Sports', label: 'Sports and outdoor' },
    { name: 'Animals', label: 'Animal and pets' },
    { name: 'Machinery', label: 'Machinery tools' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const selectCategory = (cat) => {
    if (cat === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?category=${cat}`);
    }
    setIsDropdownOpen(false);
    setIsSideMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-[100] shadow-sm">
      {/* Top Main Navbar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <Link to="/" className="flex items-center gap-2 text-primary">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-md">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black font-sans tracking-tight text-blue-600 hidden sm:block">Brand</span>
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="flex w-full border-2 border-blue-500 rounded-lg h-11 relative shadow-sm">
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 outline-none text-sm font-medium"
                />
                <div 
                  className="border-l border-blue-100 flex items-center px-4 bg-white cursor-pointer hover:bg-gray-50 relative group"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-sm text-gray-700 font-bold whitespace-nowrap">All category</span>
                  <ChevronDown className={`w-4 h-4 ml-2 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl z-[110] py-3 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      {categories.map((cat) => (
                        <div 
                          key={cat.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectCategory(cat.name);
                          }}
                          className="px-5 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-bold flex items-center justify-between"
                        >
                          <span>{cat.label}</span>
                          <ChevronDown className="-rotate-90 w-3 h-3 opacity-0 group-hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button type="submit" className="bg-blue-600 text-white px-8 font-black hover:bg-blue-700 transition-all text-sm uppercase tracking-wider">
                  Search
                </button>
              </form>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-6">
              {user ? (
                <div className="relative group">
                  <div className="flex flex-col items-center cursor-pointer group">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <User className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">{user.name.split(' ')[0]}</span>
                  </div>
                  
                  {/* User Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-[110] py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-1">
                    {user.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-bold">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold border-t border-gray-50 mt-1">
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="flex flex-col items-center cursor-pointer group">
                  <div className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <User className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">Sign In</span>
                </Link>
              )}
              
              <div className="hidden sm:flex flex-col items-center cursor-pointer group">
                <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">Chat</span>
              </div>
              
              {/* Favorites (Wishlist) */}
              <Link to="/wishlist" className="flex flex-col items-center cursor-pointer group relative">
                <div className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                </div>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">Favorites</span>
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black shadow-sm ring-2 ring-white">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>
              
              <Link to="/cart" className="flex flex-col items-center cursor-pointer group relative">
                <div className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">Cart</span>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black shadow-sm ring-2 ring-white">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Bottom Navbar */}
      <div className="border-b border-gray-100 bg-white hidden md:block">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setIsSideMenuOpen(true)}
                className="flex items-center gap-2 cursor-pointer font-black text-gray-900 hover:text-blue-600 transition-colors uppercase text-xs tracking-widest"
              >
                <Menu className="w-5 h-5" />
                <span>All Categories</span>
              </button>
              <nav className="flex items-center gap-8 text-xs font-black text-gray-500 uppercase tracking-widest">
                <Link to="/products?category=Tech" className="hover:text-blue-600 transition-colors">Hot offers</Link>
                <Link to="/products?category=Cloth" className="hover:text-blue-600 transition-colors">Gift boxes</Link>
                <Link to="/products?category=Interior" className="hover:text-blue-600 transition-colors">Projects</Link>
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors group">
                  <span>Help Center</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </nav>
            </div>

            <div className="flex items-center gap-8 text-xs font-black text-gray-500 uppercase tracking-widest">
              <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                <span>English, USD</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                <span>Ship to</span>
                <img src="https://flagcdn.com/w20/us.png" alt="USA" className="w-5 h-3.5 object-cover rounded-sm border border-gray-100" />
                <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu Drawer (Desktop & Mobile) */}
      {(isSideMenuOpen || isMobileMenuOpen) && (
        <div className="fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => {setIsSideMenuOpen(false); setIsMobileMenuOpen(false);}}></div>
          <div className="absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <Menu className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-gray-900 uppercase tracking-widest">Browse Shop</span>
              </div>
              <button onClick={() => {setIsSideMenuOpen(false); setIsMobileMenuOpen(false);}} className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6">
              <div className="px-6 mb-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Product Categories</p>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button 
                      key={cat.name}
                      onClick={() => selectCategory(cat.name)}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all flex items-center justify-between group"
                    >
                      <span>{cat.label}</span>
                      <ChevronDown className="-rotate-90 w-4 h-4 text-gray-300 group-hover:text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 mb-8">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Quick Links</p>
                 <div className="grid grid-cols-1 gap-1">
                   <Link to="/products" className="px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-all">All Products</Link>
                   <Link to="/wishlist" className="px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-all">My Favorites</Link>
                   <Link to="/cart" className="px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-all">Shopping Cart</Link>
                   {user?.role === 'admin' && (
                     <Link to="/admin" className="px-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all">Admin Dashboard</Link>
                   )}
                 </div>
              </div>
            </div>

            {!user && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <Link to="/login" className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                  <User className="w-5 h-5" />
                  <span>Sign In Now</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Search Bar (Only on small screens) */}
      <div className="md:hidden border-b border-gray-100 p-4">
        <form onSubmit={handleSearch} className="flex border border-gray-200 rounded-lg h-10 overflow-hidden shadow-sm">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 outline-none text-sm"
          />
          <button type="submit" className="bg-gray-100 px-4 text-gray-500 hover:bg-gray-200 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
    </header>
  );
}
