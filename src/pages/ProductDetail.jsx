import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MessageSquare, ShoppingBag, ShieldCheck, Globe, ChevronRight, Heart, Share2, Info, Truck, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { API_URL } from '../config';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });

    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setRelatedProducts((data.products || []).slice(0, 6)))
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-40">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Loading Premium Experience...</p>
    </div>
  );

  if (error || !product || !product.name) return (
    <div className="p-20 text-center bg-gray-50 min-h-screen">
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-200 max-w-lg mx-auto">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <ShoppingBag className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Product Not Found</h2>
        <p className="text-gray-500 mb-10 font-medium">The product you are looking for does not exist or has been moved.</p>
        <Link to="/products" className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-700 transition-all inline-block shadow-lg shadow-blue-100 uppercase tracking-widest text-sm">
          Return to Shop
        </Link>
      </div>
    </div>
  );

  const isFav = isInWishlist(product._id);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-8 uppercase tracking-[0.2em]">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/products?category=${product.category}`} className="hover:text-blue-600">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-4 lg:p-10 mb-12 flex flex-col lg:flex-row gap-12 shadow-2xl shadow-gray-100">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-[500px] flex-shrink-0">
            <div className="border border-gray-50 rounded-[2rem] p-10 mb-6 flex items-center justify-center h-[500px] bg-gray-50/30 group overflow-hidden relative shadow-inner">
              <img src={product.image} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700" alt={product.name} />
              
              <button 
                onClick={() => isFav ? removeFromWishlist(product._id) : addToWishlist(product)}
                className={`absolute top-6 right-6 p-4 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 ${
                  isFav 
                    ? 'bg-red-500 text-white scale-110' 
                    : 'bg-white/90 text-gray-400 hover:text-red-500 hover:scale-110'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div key={i} className={`w-20 h-20 flex-shrink-0 border-2 rounded-2xl p-2 cursor-pointer flex items-center justify-center transition-all ${i === 0 ? 'border-blue-600 bg-blue-50/50' : 'border-gray-50 hover:border-gray-200 bg-white'}`}>
                  <img src={img} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Details */}
          <div className="flex-1">
            <div className="flex items-center gap-3 text-green-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200"></div>
              <span>Verified Global Supplier • 10,000+ In stock</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6 leading-[1.1] uppercase tracking-tighter">{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-8 mb-10">
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-xl">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= product.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-200'}`} />)}
                </div>
                <span className="text-orange-500 font-black text-sm">{product.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-black uppercase tracking-widest">
                <MessageSquare className="w-4 h-4 text-gray-300" />
                <span>128 Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-black uppercase tracking-widest">
                <ShoppingBag className="w-4 h-4 text-gray-300" />
                <span>{Math.floor(Math.random() * 500) + 100} Orders</span>
              </div>
            </div>

            {/* Price Table - Alibaba Style */}
            <div className="bg-gray-50/50 p-8 rounded-3xl flex flex-wrap justify-between gap-10 mb-10 border border-gray-100 shadow-inner">
              <div className="flex-1 min-w-[120px] border-r border-gray-200 pr-10">
                <p className="text-blue-600 text-3xl font-black mb-1">${product.price.toFixed(2)}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">1-10 Pieces</p>
              </div>
              <div className="flex-1 min-w-[120px] border-r border-gray-200 px-10">
                <p className="text-gray-900 text-3xl font-black mb-1">${(product.price * 0.95).toFixed(2)}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">10-100 Pieces</p>
              </div>
              <div className="flex-1 min-w-[120px] pl-10">
                <p className="text-gray-900 text-3xl font-black mb-1">${(product.price * 0.9).toFixed(2)}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">100+ Pieces</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-12 pb-12 border-b border-gray-100">
               {[
                 {l:'Price', v:'Negotiable', c:true, i:Info},
                 {l:'Condition', v:product.condition || 'New', i:Award},
                 {l:'Brand', v:product.brand || 'Premium Global', i:ShieldCheck},
                 {l:'Category', v:product.category, i:ShoppingBag},
                 {l:'Shipping', v:'Fast Global Express', c:true, i:Truck},
                 {l:'Lead Time', v:'3-5 Business Days', c:true, i:Globe}
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 text-sm group">
                   <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all shadow-sm">
                     <item.i className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{item.l}</p>
                     <p className={`font-bold ${item.c ? 'text-blue-600' : 'text-gray-900'}`}>{item.v}</p>
                   </div>
                 </div>
               ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-700 transition-all flex-1 md:flex-none shadow-2xl shadow-blue-200 uppercase tracking-[0.2em] text-xs"
              >
                Inquiry Now
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  isFav ? removeFromWishlist(product._id) : addToWishlist(product);
                }}
                className={`border-2 px-12 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs flex-1 md:flex-none ${
                  isFav 
                    ? 'bg-red-50 border-red-200 text-red-600 shadow-lg shadow-red-50' 
                    : 'bg-white border-gray-100 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                <span>{isFav ? 'Wishlisted' : 'Add to Fav'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Tabs & Sidebar */}
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-100">
              <div className="flex border-b border-gray-50 bg-gray-50/30 px-6">
                {['Description', 'Specifications', 'Reviews (128)', 'Seller Info'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab.split(' ')[0].toLowerCase())}
                    className={`px-10 py-6 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-4 ${activeTab === tab.split(' ')[0].toLowerCase() ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-12">
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Product Overview</h3>
                  <p className="text-gray-500 text-lg leading-relaxed mb-12 font-medium">{product.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                     {[
                       {l:'Model Number', v:`#ALB-${product._id.slice(-6).toUpperCase()}`},
                       {l:'Product Grade', v:'A++ Certified'},
                       {l:'Manufacturing', v:product.brand || 'Global Direct'},
                       {l:'Global Warranty', v:'24 Months Support'}
                     ].map((item, i) => (
                       <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{item.l}</p>
                         <p className="text-gray-900 font-bold">{item.v}</p>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Recommended */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-2xl shadow-gray-100">
              <h3 className="font-black text-gray-900 mb-10 uppercase tracking-[0.2em] text-[11px] border-b border-gray-50 pb-4">You may also like</h3>
              <div className="space-y-10">
                {relatedProducts.slice(0, 4).map(p => (
                  <Link to={`/product/${p._id}`} key={p._id} className="flex gap-6 group items-center">
                    <div className="w-24 h-24 bg-gray-50 border border-gray-50 rounded-[1.5rem] p-4 flex-shrink-0 flex items-center justify-center group-hover:bg-white group-hover:shadow-xl group-hover:border-blue-100 transition-all duration-500 shadow-inner">
                      <img src={p.image} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-bold leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 uppercase tracking-tight">{p.name}</p>
                      <p className="text-lg font-black text-gray-900">${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
