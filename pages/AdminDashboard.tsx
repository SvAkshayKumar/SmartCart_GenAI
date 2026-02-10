
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Product } from '../types';
import { getBusinessInsights } from '../services/gemini';
import { Icons } from '../constants';

interface AdminDashboardProps {
  products: Product[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [error, setError] = useState('');
  const [insights, setInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.user === 'admin' && loginForm.pass === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Staff access only.');
    }
  };

  useEffect(() => {
    if (isAuthenticated && products.length > 0) {
      setLoadingInsights(true);
      getBusinessInsights(products).then(res => {
        setInsights(res);
        setLoadingInsights(false);
      });
    }
  }, [isAuthenticated, products]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">S</div>
            <h1 className="text-2xl font-bold">Staff Portal</h1>
            <p className="text-slate-500">Secure access to SmartCart Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Username</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500"
                value={loginForm.user}
                onChange={(e) => setLoginForm({ ...loginForm, user: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500"
                value={loginForm.pass}
                onChange={(e) => setLoginForm({ ...loginForm, pass: e.target.value })}
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all">
              Login to Dashboard
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-400">Authorized personnel only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Store Management Dashboard</h1>
          <p className="text-slate-500">Live overview of your e-commerce operations</p>
        </div>
        <div className="flex space-x-3">
           <a href="/admin/index.html" className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-all">
             Open CMS Editor
           </a>
           <button onClick={() => setIsAuthenticated(false)} className="px-6 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-bold">
             Logout
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Total Products</p>
          <p className="text-4xl font-extrabold text-primary-600">{products.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Active Categories</p>
          <p className="text-4xl font-extrabold text-indigo-600">{new Set(products.map(p => p.category)).size}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Recent Requests</p>
          <p className="text-4xl font-extrabold text-emerald-600">Pending</p>
          <p className="text-xs text-slate-400 mt-1">Check Formspree dashboard for orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold">Inventory List</h3>
            <span className="text-xs text-slate-400">Total {products.length} units</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs font-bold uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-sm">{p.name}</td>
                    <td className="px-6 py-4 text-xs">
                      <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full">{p.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">${p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-3xl border border-indigo-500/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Icons.Robot className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-6">
                <Icons.Robot className="w-6 h-6 text-indigo-400" />
                <h3 className="font-bold text-white uppercase tracking-widest text-sm">AI Business Consultant</h3>
              </div>
              {loadingInsights ? (
                <div className="flex items-center space-x-4 text-indigo-200">
                  <div className="animate-spin h-5 w-5 border-2 border-indigo-400 border-t-transparent rounded-full"></div>
                  <span>Analyzing store performance...</span>
                </div>
              ) : (
                <div className="text-indigo-100 leading-relaxed whitespace-pre-line">
                  {insights || "Store metrics synced. AI analysis ready."}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-bold mb-6">External Integrations</h3>
            <div className="grid grid-cols-1 gap-4">
              <a 
                href="https://formspree.io/f/mykdzvry" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                    <Icons.Cart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Formspree Orders</p>
                    <p className="text-xs text-slate-500">Manage customer submissions</p>
                  </div>
                </div>
                <Icons.Search className="w-5 h-5 text-slate-400 transform rotate-90" />
              </a>
              <a 
                href="/admin/index.html" 
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                    <Icons.User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Decap CMS Editor</p>
                    <p className="text-xs text-slate-500">Edit products and blog posts</p>
                  </div>
                </div>
                <Icons.Search className="w-5 h-5 text-slate-400 transform rotate-90" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
