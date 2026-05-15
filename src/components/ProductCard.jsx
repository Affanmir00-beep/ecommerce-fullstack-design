import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isFav = isInWishlist(product._id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
      <Link to={`/product/${product._id}`} className="flex-1 flex flex-col">
        <div className="h-44 flex items-center justify-center mb-6 relative overflow-hidden rounded-xl bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-[80%] max-w-[80%] object-contain group-hover:scale-110 transition-transform duration-700"
          />
          
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <button 
              onClick={toggleWishlist}
              className={`p-2.5 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 ${
                isFav 
                  ? 'bg-red-500 text-white scale-110' 
                  : 'bg-white/90 text-gray-400 hover:text-red-500 hover:scale-110'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 px-1">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xl font-black text-gray-900">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through font-bold">${product.oldPrice}</span>
            )}
          </div>
          
          <h3 className="text-[15px] font-bold text-gray-700 leading-snug line-clamp-2 mb-4 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{product.category}</span>
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
