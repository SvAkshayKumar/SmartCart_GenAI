
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal; // Simulating no discount for final submit logic

  const handleSubmit = (e: React.FormEvent) => {
    // Note: Traditional form submit is handled by the browser's action attribute
    // but we can clear the cart if we detect navigation or use AJAX.
    // For this prototype, we'll assume the form submit is handled.
  };

  if (cart.length === 0 && !isSuccess) return <Navigate to="/shop" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">Complete Your Order</h1>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
           <h2 className="text-lg font-bold">Order Summary ({cart.length} items)</h2>
           <p className="text-slate-500 font-bold">Total Due: ${total.toLocaleString()}</p>
        </div>

        <form 
          action="https://formspree.io/f/mykdzvry" 
          method="POST" 
          onSubmit={() => {
            // Clearing the cart on form submit
            setTimeout(clearCart, 1000);
          }}
          className="p-8 space-y-6"
        >
          <input type="hidden" name="_subject" value="New SmartCart Order" />
          <input type="hidden" name="cart_data" value={JSON.stringify(cart)} />
          <input type="hidden" name="total_amount" value={`$${total.toLocaleString()}`} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold">Full Name</label>
              <input 
                name="name" 
                type="text" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Email Address</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Phone Number</label>
              <input 
                name="phone" 
                type="tel" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Postal Code</label>
              <input 
                name="zip" 
                type="text" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="90210"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold">Full Address</label>
              <textarea 
                name="address" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500" 
                rows={3}
                placeholder="123 Smart St, Gadget City, CA"
              ></textarea>
            </div>
          </div>

          <div className="bg-primary-50 dark:bg-primary-900/10 p-4 rounded-xl text-sm border border-primary-100 dark:border-primary-900/20">
            <p className="flex items-center space-x-2 text-primary-700 dark:text-primary-400">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span>By clicking Place Order, your order details will be sent to our processing team via Formspree.</span>
            </p>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all text-lg"
          >
            Place Order – ${total.toLocaleString()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
