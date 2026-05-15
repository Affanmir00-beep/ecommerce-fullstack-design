import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag, ChevronDown, ShieldCheck, Truck, MessageSquare, ChevronRight, X, Minus, Plus, CreditCard, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, tax, total, shipping } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-7xl">
        <div className="bg-white border border-gray-100 rounded-[3rem] p-20 inline-block mb-10 shadow-2xl shadow-gray-100 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
           <ShoppingBag className="h-24 w-24 text-blue-50 mx-auto mb-4" />
           <div className="bg-blue-600 h-1 w-12 mx-auto rounded-full"></div>
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Your cart is empty</h2>
        <p className="text-gray-500 mb-12 font-medium max-w-md mx-auto">It looks like you haven't added anything to your cart yet. Discover our premium collections and find something special!</p>
        <Link to="/products" className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 uppercase tracking-widest text-xs inline-flex items-center gap-3">
          Explore Products
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fa] min-h-screen pb-24">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">My Shopping Cart</h1>
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ml-4">{cartItems.length} Items</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="p-8 flex flex-col md:flex-row gap-8 hover:bg-gray-50/50 transition-colors group">
                    <Link to={`/product/${item._id || item.id}`} className="w-32 h-32 border border-gray-50 rounded-[1.5rem] p-4 flex-shrink-0 flex items-center justify-center bg-gray-50 group-hover:bg-white transition-all shadow-inner">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    </Link>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <Link to={`/product/${item._id || item.id}`}>
                        <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{item.name}</h3>
                      </Link>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Seller: Premium Global Marketplace</p>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => removeFromCart(item._id || item.id)}
                          className="text-red-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <button className="text-gray-400 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
                          <Heart className="w-4 h-4" />
                          Save for later
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-6">
                      <div className="text-2xl font-black text-blue-600">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="flex items-center bg-gray-100 rounded-xl p-1 shadow-inner border border-gray-50">
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-black text-gray-900 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-gray-50/30 border-t border-gray-50 flex flex-wrap justify-between items-center gap-6">
                <Link to="/products" className="bg-white border border-gray-100 text-gray-900 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-3 shadow-sm">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
                <button 
                  onClick={clearCart}
                  className="bg-red-50 text-red-600 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-100"
                >
                  Clear All Items
                </button>
              </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {[
                {t:'Secure payment', d:'PCI-DSS Compliant', i:ShieldCheck, c:'blue'},
                {t:'Customer support', d:'24/7 Premium Help', i:MessageSquare, c:'orange'},
                {t:'Free delivery', d:'On orders over $200', i:Truck, c:'green'}
              ].map((feat, i) => (
                <div key={i} className="bg-white border border-gray-50 p-6 rounded-[2rem] flex items-center gap-5 shadow-sm">
                  <div className={`w-14 h-14 bg-${feat.c}-50 rounded-2xl flex items-center justify-center text-${feat.c}-600 shadow-inner`}>
                     <feat.i className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-[11px] uppercase tracking-widest mb-0.5">{feat.t}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{feat.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Summary */}
          <div className="w-full lg:w-[400px] space-y-8">
            <div className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-2xl shadow-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 -mr-10 -mt-10">
                 <CreditCard className="w-48 h-48 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Order Summary</h3>
              
              <div className="space-y-5 mb-10 relative z-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-black text-gray-400 uppercase tracking-widest text-[10px]">Subtotal</span>
                  <span className="font-black text-gray-900 text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-black text-gray-400 uppercase tracking-widest text-[10px]">Estimated Tax (10%)</span>
                  <span className="font-black text-green-600 text-lg">+ ${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-black text-gray-400 uppercase tracking-widest text-[10px]">Shipping</span>
                  <span className="font-black text-gray-900 text-lg">${shipping.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-50 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="font-black text-gray-900 uppercase tracking-tighter text-2xl">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-black text-blue-600 tracking-tighter">${total.toFixed(2)}</p>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mt-1">Inclusive of all taxes</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="bg-gray-50 p-2 rounded-2xl flex gap-2 border border-gray-50 shadow-inner">
                  <input type="text" placeholder="Promo Code" className="flex-1 bg-transparent px-4 py-3 text-xs font-black uppercase tracking-widest outline-none placeholder:text-gray-300" />
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-600 hover:text-white transition-all">Apply</button>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-4 group">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="MasterCard" />
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-100 flex items-center gap-6 group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 -mr-4 -mt-4">
                  <Award className="w-20 h-20" />
               </div>
               <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Safe & Secure</p>
                  <p className="font-black text-lg leading-tight">Every purchase is protected<br/>by our Buyer Guarantee.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Recommended Items Section */}
        <div className="mt-24">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">You might also be interested in</h2>
              <Link to="/products" className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline">View all deals</Link>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {/* Placeholder for related items */}
             {[1,2,3,4].map(i => (
               <div key={i} className="bg-white border border-gray-50 rounded-[2rem] p-6 hover:shadow-xl transition-all group">
                 <div className="aspect-square bg-gray-50 rounded-[1.5rem] mb-6 flex items-center justify-center p-6 group-hover:bg-white transition-all shadow-inner">
                   <div className="w-24 h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                 </div>
                 <div className="px-2">
                   <p className="text-xl font-black text-gray-900 mb-2 tracking-tighter">$199.00</p>
                   <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-tight line-clamp-2 mb-4 group-hover:text-blue-600 transition-colors">Premium Industrial Series Gadget x{i}</p>
                   <button className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Add to Cart</button>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
