import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Grid, List, ChevronDown, Star, Heart, ShoppingCart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config';
import { useWishlist } from '../context/WishlistContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentPage = searchParams.get('page') || '1';

  useEffect(() => {
    // Fetch categories
    fetch(`${API_URL}/products/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = `${API_URL}/products?`;
    if (currentCategory && currentCategory !== 'All') url += `&category=${currentCategory}`;
    if (currentSearch) url += `&search=${currentSearch}`;
    if (currentMinPrice) url += `&minPrice=${currentMinPrice}`;
    if (currentMaxPrice) url += `&maxPrice=${currentMaxPrice}`;
    if (currentPage) url += `&page=${currentPage}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setPagination({
          page: data.page || 1,
          pages: data.pages || 1,
          total: data.total || 0
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [currentCategory, currentSearch, currentMinPrice, currentMaxPrice, currentPage]);

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value && value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate(`/products?${params.toString()}`);
  };

  const [minInput, setMinInput] = useState(currentMinPrice);
  const [maxInput, setMaxInput] = useState(currentMaxPrice);

  const applyPriceFilter = () => {
    const params = new URLSearchParams(location.search);
    if (minInput) params.set('minPrice', minInput); else params.delete('minPrice');
    if (maxInput) params.set('maxPrice', maxInput); else params.delete('maxPrice');
    navigate(`/products?${params.toString()}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-8 uppercase tracking-[0.2em]">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900">{currentCategory === 'All' ? (currentSearch ? `Search: ${currentSearch}` : 'All products') : currentCategory}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-50">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Category</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {categories.map(cat => (
                    <li 
                      key={cat} 
                      onClick={() => handleFilterChange('category', cat)}
                      className={`text-[13px] cursor-pointer transition-all flex justify-between items-center px-3 py-2 rounded-lg font-bold ${currentCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}`}
                    >
                      <span>{cat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-50">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Price range</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Min</p>
                    <input 
                      type="number" 
                      value={minInput}
                      onChange={(e) => setMinInput(e.target.value)}
                      placeholder="0" 
                      className="w-full border border-gray-100 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-all font-medium" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Max</p>
                    <input 
                      type="number" 
                      value={maxInput}
                      onChange={(e) => setMaxInput(e.target.value)}
                      placeholder="9999" 
                      className="w-full border border-gray-100 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-all font-medium" 
                    />
                  </div>
                </div>
                <button 
                  onClick={applyPriceFilter}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 shadow-sm">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Found <span className="text-blue-600">{products.length}</span> items
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-white border border-gray-100 h-80 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-[2.5rem] p-20 text-center shadow-xl">
                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <ShoppingCart className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">No products found</h3>
                <p className="text-gray-500 mb-10 font-medium">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => navigate('/products')}
                  className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {products.map(p => (
                  <div key={p._id} className="bg-white border border-gray-100 rounded-[2.5rem] p-6 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    <Link to={`/product/${p._id}`} className="w-full md:w-64 h-64 border border-gray-50 rounded-3xl p-8 flex items-center justify-center flex-shrink-0 bg-gray-50 group-hover:bg-white transition-colors duration-500">
                      <img src={p.image} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                    </Link>
                    <div className="flex-1 flex flex-col py-2">
                      <div className="flex justify-between items-start mb-4">
                        <Link to={`/product/${p._id}`}>
                          <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight uppercase tracking-tighter">{p.name}</h3>
                        </Link>
                        <div className="flex gap-2">
                           <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const pid = p._id || p.id;
                              isInWishlist(pid) ? removeFromWishlist(pid) : addToWishlist(p);
                            }}
                            className={`p-3 rounded-2xl shadow-sm transition-all ${isInWishlist(p._id || p.id) ? 'bg-red-500 text-white' : 'bg-gray-50 text-gray-400 hover:text-red-500'}`}
                           >
                             <Heart className={`w-5 h-5 ${isInWishlist(p._id || p.id) ? 'fill-current' : ''}`} />
                           </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 mb-6">
                        <p className="text-3xl font-black text-blue-600">${p.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 bg-orange-50 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                          <span className="text-orange-600 text-sm font-black">{p.rating}</span>
                        </div>
                        <span className="text-[10px] font-black text-green-600 border border-green-100 px-3 py-1 rounded-full uppercase tracking-widest">Free Shipping</span>
                      </div>
                      
                      <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">{p.description}</p>
                      
                      <div className="mt-auto flex gap-4">
                        <Link to={`/product/${p._id || p.id}`} className="flex-1 bg-gray-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center hover:bg-black transition-all">
                          Details
                        </Link>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(p);
                          }}
                          className="flex-1 bg-blue-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && pagination.pages > 1 && (
              <div className="mt-16 flex justify-center">
                <div className="flex gap-2 p-2 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <button 
                    disabled={pagination.page === 1}
                    onClick={() => handleFilterChange('page', pagination.page - 1)}
                    className="px-6 py-3 rounded-xl hover:bg-gray-50 disabled:opacity-30 font-black text-[10px] uppercase tracking-widest text-gray-500 transition-all"
                  >
                    Prev
                  </button>
                  
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button 
                      key={i + 1}
                      onClick={() => handleFilterChange('page', i + 1)}
                      className={`w-12 h-12 rounded-xl font-black text-sm transition-all ${pagination.page === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'hover:bg-gray-50 text-gray-400'}`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button 
                    disabled={pagination.page === pagination.pages}
                    onClick={() => handleFilterChange('page', pagination.page + 1)}
                    className="px-6 py-3 rounded-xl hover:bg-gray-50 disabled:opacity-30 font-black text-[10px] uppercase tracking-widest text-gray-500 transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
