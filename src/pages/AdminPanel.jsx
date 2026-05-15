import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Package, Search, Upload, Image as ImageIcon, AlertCircle, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';

const AdminPanel = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [formData, setFormData] = useState({
    name: '', price: '', category: 'Cloth', image: '', description: '', stock: 50, brand: '', featured: false
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products?limit=100`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      const productList = data.products || (Array.isArray(data) ? data : []);
      setProducts(productList);
    } catch (err) {
      console.error('Fetch error:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({ ...product });
      setPreviewImage(product.image);
    } else {
      setCurrentProduct(null);
      setFormData({ name: '', price: '', category: 'Cloth', image: '', description: '', stock: 50, brand: '', featured: false });
      setPreviewImage('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.token) return;

    const url = currentProduct 
      ? `${API_URL}/products/${currentProduct._id}`
      : `${API_URL}/products`;
    const method = currentProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchProducts();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    if (!user?.token) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (res.ok) {
        fetchProducts();
      } else {
        const data = await res.json();
        alert(`Delete failed: ${data.message || 'Server error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Delete failed: Network error');
    }
  };

  if (authLoading) return (
    <div className="flex flex-col items-center justify-center p-40 min-h-screen bg-gray-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Verifying Admin Access...</p>
    </div>
  );

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 font-medium mt-1">Control your global inventory and listings</p>
          </div>
          <Link 
            to="/add-product"
            className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-black hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Item</span>
          </Link>
        </div>

        {/* Inventory Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Products', value: products.length, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Low Stock Items', value: products.filter(p => p.stock < 10).length, icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Featured items', value: products.filter(p => p.featured).length, icon: Star, color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: 'Categories', value: new Set(products.map(p => p.category)).size, icon: Search, color: 'text-green-500', bg: 'bg-green-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {loading ? (
             <div className="p-20 text-center">
                <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400 font-bold text-sm">Syncing with database...</p>
             </div>
          ) : products.length === 0 ? (
            <div className="p-20 text-center">
               <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Package className="w-10 h-10 text-gray-300" />
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-2">Inventory is Empty</h3>
               <p className="text-gray-500 mb-8">Start by adding your first product to the store.</p>
               <Link to="/add-product" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">Add First Product</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Product Listing</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Unit Price</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Stock Level</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 bg-white border border-gray-100 rounded-xl p-1.5 flex-shrink-0 flex items-center justify-center shadow-sm">
                            <img src={product.image} alt="" className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                            <p className="font-black text-gray-900 text-[15px] truncate max-w-[240px] leading-tight">{product.name}</p>
                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">{product.brand || 'No Brand'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-tighter border border-blue-100">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-black text-gray-900 text-lg">${Number(product.price || 0).toFixed(2)}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                           <div className={`h-2.5 w-2.5 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                           <span className="text-sm font-black text-gray-700">{product.stock} Units</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                         {product.featured ? (
                           <span className="flex items-center gap-1.5 text-purple-600 text-[10px] font-black uppercase">
                             <Star className="w-3.5 h-3.5 fill-purple-600" />
                             <span>Featured</span>
                           </span>
                         ) : (
                           <span className="text-gray-300 text-[10px] font-black uppercase">Standard</span>
                         )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenModal(product)} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm bg-white border border-gray-100">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm bg-white border border-gray-100">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Modal (Keeping for quick edits) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/20">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Quick Edit</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Product ID: {currentProduct?._id}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2.5 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-200">
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Name</label>
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-sm font-bold text-gray-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price ($)</label>
                    <input 
                      type="number" required step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-sm font-black text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-sm font-bold text-gray-700 bg-white"
                    >
                      <option>Cloth</option>
                      <option>Tech</option>
                      <option>Interior</option>
                      <option>Tools</option>
                      <option>Sports</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand</label>
                    <input 
                      type="text" required
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-sm font-bold text-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                   <textarea 
                     required rows="4"
                     value={formData.description}
                     onChange={(e) => setFormData({...formData, description: e.target.value})}
                     className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all text-sm font-medium text-gray-600"
                   ></textarea>
                </div>

                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <input 
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-black text-gray-700 text-xs uppercase">Feature on Home</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Level:</span>
                      <input 
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                        className="w-20 bg-white border border-gray-200 p-3 rounded-xl text-center font-black text-sm shadow-sm"
                      />
                   </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200"
                >
                  <Save className="h-6 w-6" />
                  <span>Save Changes</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
