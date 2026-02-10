
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { CartItem, Product } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('smartcart_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem('smartcart_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <Layout cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}>
        <Routes>
          <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
          <Route path="/shop" element={<Shop products={products} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/staff/dashboard" element={<AdminDashboard products={products} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
