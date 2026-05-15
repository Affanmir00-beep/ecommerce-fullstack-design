import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, ShieldCheck, Truck, Globe, ChevronDown, User, ShoppingCart, MessageSquare, Heart, Search, ArrowRight, Zap, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

import { API_URL } from '../config';

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const productList = data.products || (Array.isArray(data) ? data : []);
        setProducts(productList);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { name: 'Cloth', label: 'Clothes and wear' },
    { name: 'Interior', label: 'Home interiors' },
    { name: 'Tech', label: 'Computer and tech' },
    { name: 'Tools', label: 'Tools, equipments' },
    { name: 'Sports', label: 'Sports and outdoor' },
    { name: 'Animals', label: 'Animal and pets' },
    { name: 'Machinery', label: 'Machinery tools' },
    { name: 'More', label: 'More category' }
  ];

  return (
    <div className="bg-[#f7f8fa] min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Premium Hero Section */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col lg:flex-row gap-8 mb-12 shadow-sm">
          {/* Categories Sidebar */}
          <div className="w-full lg:w-64 hidden lg:block">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-4">Categories</h3>
            <ul className="space-y-1">
              {categories.map((cat, idx) => (
                <li key={idx} className="group">
                  <Link 
                    to={`/products?category=${cat.name}`} 
                    className="flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                  >
                    {cat.label}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* High-End Hero Banner */}
          <div className="flex-1 relative rounded-[2rem] overflow-hidden min-h-[400px] group shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&h=600&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              alt="Tech Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-12">
              <div className="flex items-center gap-2 text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-4">
                <Zap className="w-4 h-4 fill-current" />
                <span>Latest Trending</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] uppercase tracking-tighter">
                Premium<br/>Electronic<br/>Items
              </h1>
              <Link 
                to="/products"
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest w-fit hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 flex items-center gap-3"
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right User Box */}
          <div className="w-full lg:w-60 space-y-4">
            <div className="bg-[#eff2f4] p-6 rounded-[2rem] text-center border border-white/50 shadow-inner">
              {user ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-xl border border-gray-100">
                    <User className="w-10 h-10" />
                  </div>
                  <p className="text-lg font-black text-gray-900 leading-tight mb-6">
                    Hi,<br/>{user.name.split(' ')[0]}!
                  </p>
                  <Link 
                    to={user.role === 'admin' ? "/admin" : "/products"} 
                    className="w-full bg-blue-600 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg"
                  >
                    {user.role === 'admin' ? 'Manage Store' : 'Shop Now'}
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-300 mb-4 shadow-sm">
                    <User className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-widest">Get started</p>
                  <div className="w-full space-y-2">
                    <Link to="/signup" className="block w-full bg-blue-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg text-center">
                      Join now
                    </Link>
                    <Link to="/login" className="block w-full bg-white text-blue-600 border border-gray-100 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all text-center">
                      Log in
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-6 rounded-[2rem] text-white shadow-lg shadow-orange-100">
              <p className="text-sm font-black uppercase tracking-widest mb-2 opacity-80">Special Offer</p>
              <p className="text-xl font-black leading-tight">Get US $10 off<br/>with a new supplier</p>
            </div>
          </div>
        </div>

        {/* Deals Section */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row mb-12 shadow-sm">
          <div className="p-10 md:w-80 border-r border-gray-50 bg-gray-50/30">
            <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Deals and offers</h3>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">Limited time remaining</p>
            <div className="flex gap-3">
              {[ {v:'04', u:'Days'}, {v:'13', u:'Hour'}, {v:'34', u:'Min'}, {v:'56', u:'Sec'} ].map((t, i) => (
                <div key={i} className="bg-gray-900 text-white w-14 h-14 flex flex-col items-center justify-center rounded-2xl shadow-xl">
                  <span className="text-lg font-black leading-none mb-1">{t.v}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-60 leading-none">{t.u}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {products.slice(0, 5).map((p, i) => (
              <Link to={`/product/${p._id}`} key={i} className="p-8 border-r border-gray-50 flex flex-col items-center text-center group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="h-32 flex items-center justify-center mb-6 relative">
                  <img src={p.image} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 truncate w-full px-2">{p.name}</p>
                <span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm shadow-red-100">-25% OFF</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Home & Outdoor Block */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row mb-12 shadow-sm">
          <div className="relative w-full lg:w-80 h-[300px] lg:h-auto group">
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=1000&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              alt="Home Interior"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
              <h3 className="text-2xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">Home and<br/>Outdoor</h3>
              <Link to="/products?category=Interior" className="bg-white text-gray-900 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all w-fit shadow-xl">
                Source now
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 bg-gray-50/30">
            {products.filter(p => p.category === 'Interior').slice(0, 8).map((p, i) => (
              <Link to={`/product/${p._id}`} key={p._id} className="p-8 border-r border-b border-gray-50 hover:bg-white transition-all cursor-pointer flex flex-col items-center text-center group">
                <div className="h-24 flex items-center justify-center mb-6 w-full">
                   <img src={p.image} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-1 truncate w-full px-2">{p.name}</p>
                  <p className="text-[10px] font-bold text-gray-400">From USD {p.price.toFixed(0)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RFQ Section - Professional Redesign */}
        <div className="relative rounded-[3rem] overflow-hidden min-h-[500px] mb-12 shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=800&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-600/40 p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-white">
              <div className="bg-white/10 w-fit p-3 rounded-2xl backdrop-blur-md mb-8">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight uppercase tracking-tighter">An easy way to<br/>reach global<br/>suppliers</h2>
              <p className="text-blue-100 max-w-md text-lg font-medium leading-relaxed mb-10">Send your requests to millions of verified suppliers worldwide and get quotes in minutes.</p>
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-black">2M+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Suppliers</span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black">190+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Countries</span>
                </div>
              </div>
            </div>
            <div className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-2xl border border-white/50 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <ShoppingCart className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Send quote to suppliers</h3>
              <form className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">What item you need?</label>
                  <input type="text" placeholder="e.g. Smart Watch" className="w-full border-2 border-gray-50 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 bg-gray-50/50 font-medium transition-all" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">More details</label>
                   <textarea placeholder="Specify requirements, materials, etc." className="w-full border-2 border-gray-50 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 bg-gray-50/50 h-28 font-medium transition-all resize-none"></textarea>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Quantity</label>
                    <input type="number" placeholder="0" className="w-full border-2 border-gray-50 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 bg-gray-50/50 font-medium transition-all" />
                  </div>
                  <div className="w-32 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit</label>
                    <select className="w-full border-2 border-gray-50 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 bg-gray-50/50 font-black text-xs uppercase tracking-widest cursor-pointer transition-all appearance-none">
                      <option>Pcs</option>
                      <option>Sets</option>
                      <option>Units</option>
                    </select>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3">
                  Send inquiry
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Recommended Items */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10 px-4">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Recommended items</h2>
            <Link to="/products" className="text-blue-600 font-black text-xs uppercase tracking-widest hover:text-blue-700 flex items-center gap-2">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {products.slice(0, 10).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        {/* Region Section */}
        <div className="mb-20 bg-white border border-gray-100 rounded-[3rem] p-12 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900 mb-10 uppercase tracking-tighter px-4">Suppliers by region</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-8 px-4">
            {[
              {n:'Arabic Emirates', f:'ae'}, {n:'Australia', f:'au'}, {n:'United States', f:'us'}, {n:'Russia', f:'ru'}, {n:'Italy', f:'it'},
              {n:'Denmark', f:'dk'}, {n:'France', f:'fr'}, {n:'Arabic Emirates', f:'ae'}, {n:'China', f:'cn'}, {n:'Great Britain', f:'gb'}
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-4 cursor-pointer group">
                <div className="w-10 h-7 rounded-lg overflow-hidden shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  <img src={`https://flagcdn.com/w40/${r.f}.png`} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-700 font-black group-hover:text-blue-600 transition-colors uppercase tracking-tight">{r.n}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">shopname.{r.f}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
