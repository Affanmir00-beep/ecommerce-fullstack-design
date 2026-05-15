import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { API_URL } from '../config';

export default function AddProduct() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Cloth',
    image: '',
    description: '',
    stock: 50,
    brand: '',
    featured: false,
    rating: 5
  });

  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image is too large (max 5MB). Please use a smaller file or a URL.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.image) {
      setError('Please provide a product image (URL or Upload)');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/admin'), 2000);
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create product');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="py-40 text-center font-bold text-gray-500">Verifying Admin Status...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-gray-400 hover:text-blue-600">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Add New Product</h1>
              <p className="text-gray-500 text-sm">Create a professional product listing</p>
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4 text-green-700 animate-in fade-in slide-in-from-top-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="font-black">Product Created Successfully!</p>
              <p className="text-sm">Redirecting you to the inventory master...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-4 text-red-700">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div>
              <p className="font-black">Error Creating Product</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
              <Package className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-wider">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Product Title</label>
                <input 
                  type="text" required
                  placeholder="e.g. Premium Wireless Headphones"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Price ($)</label>
                <input 
                  type="number" required step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-bold text-gray-700 bg-white"
                >
                  <option value="Cloth">Cloth</option>
                  <option value="Tech">Tech</option>
                  <option value="Interior">Interior</option>
                  <option value="Tools">Tools</option>
                  <option value="Sports">Sports</option>
                  <option value="Animals">Animals</option>
                  <option value="Machinery">Machinery</option>
                  <option value="More">More</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Brand Name</label>
                <input 
                  type="text" required
                  placeholder="e.g. AudioPro"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Visuals Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
              <ImageIcon className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-wider">Product Visuals</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Image Source</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Paste Image URL or Base64 here..."
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({...formData, image: e.target.value});
                        setPreviewImage(e.target.value);
                      }}
                      className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-gray-700 pr-12"
                    />
                    <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 h-6 w-6" />
                  </div>
                </div>

                <div className="relative">
                  <input 
                    type="file" accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden" id="page-file-upload"
                  />
                  <label 
                    htmlFor="page-file-upload"
                    className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-gray-100 p-8 rounded-2xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group"
                  >
                    <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-100 transition-colors">
                      <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-gray-700">Upload from local machine</p>
                      <p className="text-xs text-gray-400 font-medium">Drag & drop or click to browse</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="w-full md:w-64 h-64 bg-gray-50 border-2 border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                {previewImage ? (
                  <img src={previewImage} className="max-h-full max-w-full object-contain" alt="Preview" />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-200 mx-auto mb-2" />
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No Image Selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details & Inventory Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
              <Package className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-wider">Inventory & Description</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Product Description</label>
                <textarea 
                  required rows="5"
                  placeholder="Write a detailed description of the product features, materials, and benefits..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 rounded-2xl gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center h-5">
                    <input 
                      type="checkbox"
                      id="featured-check"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="featured-check" className="text-sm font-black text-gray-700 cursor-pointer">
                    Feature this product on the Home Page
                  </label>
                </div>

                <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">Initial Stock:</span>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={() => setFormData(f => ({...f, stock: Math.max(0, f.stock - 1)}))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 font-bold hover:bg-gray-200 transition-colors"
                    >-</button>
                    <input 
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                      className="w-16 text-center font-black text-gray-900 outline-none"
                    />
                    <button 
                      type="button"
                      onClick={() => setFormData(f => ({...f, stock: f.stock + 1}))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 font-bold hover:bg-gray-200 transition-colors"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-200 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="h-6 w-6" />
            )}
            <span>{loading ? 'Creating Listing...' : 'Publish Product Listing'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
