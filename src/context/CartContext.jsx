import { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync with Database if logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCartFromDB();
    }
  }, []);

  const fetchCartFromDB = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Backend returns array of { product: {...}, quantity: n }
        const formattedItems = data.map(item => ({
          ...item.product,
          quantity: item.quantity
        }));
        setCartItems(formattedItems);
      }
    } catch (error) {
      console.error('Failed to fetch cart from DB:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncItemToDB = async (productId, quantity, method = 'POST') => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const url = method === 'PUT' || method === 'DELETE' 
        ? `${API_URL}/cart/${productId}` 
        : `${API_URL}/cart`;
      
      const options = {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: method !== 'DELETE' ? JSON.stringify({ productId, quantity }) : null
      };

      await fetch(url, options);
    } catch (error) {
      console.error('Failed to sync item to DB:', error);
    }
  };

  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const productId = product._id || product.id;
    if (!productId) return;

    // Execute side-effect outside the state updater to avoid double-firing in StrictMode
    const existingIndex = cartItems.findIndex(item => (item._id || item.id) === productId);
    if (existingIndex > -1) {
      const newQty = cartItems[existingIndex].quantity + quantity;
      syncItemToDB(productId, newQty, 'PUT');
    } else {
      syncItemToDB(productId, quantity, 'POST');
    }

    setCartItems(prev => {
      const idx = prev.findIndex(item => (item._id || item.id) === productId);
      if (idx > -1) {
        const newItems = [...prev];
        newItems[idx] = { ...newItems[idx], quantity: newItems[idx].quantity + quantity };
        return newItems;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => (item._id || item.id) !== id));
    syncItemToDB(id, 0, 'DELETE');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => (item._id || item.id) === id ? { ...item, quantity } : item));
    syncItemToDB(id, quantity, 'PUT');
  };

  const clearCart = async () => {
    setCartItems([]);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${API_URL}/cart`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {}
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  const getCartCount = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      subtotal,
      tax,
      shipping,
      total,
      getCartCount,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};
