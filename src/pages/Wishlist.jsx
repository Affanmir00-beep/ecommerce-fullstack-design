import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Heart, ShoppingCart, Trash2, ArrowRight, PackageOpen, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="bg-[#f7f8fa] min-h-screen py-32">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white p-16 rounded-[3rem] shadow-2xl shadow-gray-100 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
            <div className="w-24 h-24 bg-red-50 rounded-[1.5rem] flex items-center justify-center text-red-500 mx-auto mb-10 shadow-inner">
              <Heart className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Your Favorites are Empty</h1>
            <p className="text-gray-500 mb-12 font-medium leading-relaxed">Save items you love here and they'll be waiting for you when you're ready to buy. Start exploring our premium catalog today!</p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-4 bg-gray-900 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-gray-200 group"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="bg-red-500 p-2 rounded-xl shadow-lg shadow-red-100">
                  <Heart className="w-5 h-5 text-white fill-current" />
               </div>
               <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">My Favorites</h1>
            </div>
            <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.3em] ml-11">{wishlist.length} Exclusive Items Saved</p>
          </div>
          <Link to="/products" className="bg-white border border-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-3 shadow-sm group">
            Continue Shopping
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div key={product._id || product.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative">
              <div className="aspect-square relative overflow-hidden bg-gray-50/50 p-10 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-700" 
                />
                
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                   <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWishlist(product._id || product.id);
                    }}
                    className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl border border-gray-100"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6">
                   <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-100 shadow-sm flex items-center gap-1.5">
                      <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                      <span className="text-[10px] font-black text-gray-700">{product.rating || '4.8'}</span>
                   </div>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                   <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-blue-100/50">{product.category}</span>
                   <span className="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-green-100/50">In Stock</span>
                </div>
                
                <Link to={`/product/${product._id || product.id}`} className="mb-4">
                  <h3 className="text-xl font-black text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors uppercase tracking-tighter leading-tight">{product.name}</h3>
                </Link>
                
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-2xl font-black text-blue-600">${product.price.toFixed(2)}</span>
                    {product.oldPrice && <span className="text-xs text-gray-300 line-through font-bold">${product.oldPrice}</span>}
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group/btn"
                    >
                      <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More CTA */}
        <div className="mt-24 bg-gray-900 rounded-[3rem] p-16 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
           
           <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 uppercase tracking-tighter relative z-10">Discover more premium products</h2>
           <p className="text-gray-400 mb-10 max-w-xl mx-auto font-medium relative z-10">Explore our curated collections of high-end electronics, home interiors, and more. Quality guaranteed on every purchase.</p>
           <Link to="/products" className="inline-flex bg-white text-gray-900 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all relative z-10 shadow-xl">
             Explore All Categories
           </Link>
        </div>
      </div>
    </div>
  );
}
