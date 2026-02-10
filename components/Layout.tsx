
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, cartCount }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">SmartCart</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 font-medium">Home</Link>
              <Link to="/shop" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 font-medium">Shop</Link>
              <Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 font-medium">Contact</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
              </button>

              <Link to="/cart" className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Icons.Cart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button 
                className="md:hidden p-2 text-slate-600 dark:text-slate-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <Icons.Close className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-4">
            <Link to="/" className="block text-lg font-medium text-slate-600 dark:text-slate-300">Home</Link>
            <Link to="/shop" className="block text-lg font-medium text-slate-600 dark:text-slate-300">Shop</Link>
            <Link to="/contact" className="block text-lg font-medium text-slate-600 dark:text-slate-300">Contact</Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
                <span className="text-xl font-bold">SmartCart</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">Your one-stop destination for the latest and greatest in tech gadgets. AI-powered shopping experiences.</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
                <li><Link to="/shop" className="hover:text-primary-600">Shop</Link></li>
                <li><Link to="/cart" className="hover:text-primary-600">Cart</Link></li>
                <li><Link to="/contact" className="hover:text-primary-600">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                <li><Link to="/faq" className="hover:text-primary-600">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-primary-600">Shipping Policy</Link></li>
                <li><Link to="/returns" className="hover:text-primary-600">Returns</Link></li>
                <li><Link to="/privacy" className="hover:text-primary-600">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Stay updated with our newest tech releases.</p>
              <form action="https://formspree.io/f/mykdzvry" method="POST" className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500" 
                  required 
                />
                <input type="hidden" name="_subject" value="SmartCart Newsletter Signup" />
                <button type="submit" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} SmartCart – TechGadgets Store. Built with Gemini AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
