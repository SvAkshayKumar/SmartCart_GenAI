
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';
import { Icons, COUPONS } from '../constants';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeFromCart }) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    const coupon = COUPONS.find(c => c.code === couponInput.toUpperCase());
    if (coupon) {
      setAppliedDiscount(coupon.discount);
      setCouponError('');
    } else {
      setAppliedDiscount(0);
      setCouponError('Invalid coupon code.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icons.Cart className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto">Looks like you haven't added any tech treasures yet. Head back to our store and discover something new.</p>
        <Link to="/shop" className="inline-block px-8 py-4 bg-primary-600 text-white font-bold rounded-xl">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Items List */}
        <div className="lg:w-2/3 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center space-x-6 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 flex-shrink-0 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-primary-600 font-bold mb-2">${item.price.toLocaleString()}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden h-9">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">-</button>
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">+</button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right font-bold text-lg">
                ${(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="text-green-500 font-bold uppercase text-xs">Free</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-primary-600">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold mb-2">Promo Code</label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  className="flex-grow px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="SAVE10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-red-500 text-xs mt-2">{couponError}</p>}
              {appliedDiscount > 0 && <p className="text-green-500 text-xs mt-2">Coupon Applied Successfully!</p>}
            </div>

            <Link 
              to="/checkout" 
              className="block w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-center font-bold shadow-lg shadow-primary-600/20 transition-all"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
