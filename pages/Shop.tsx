
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { CATEGORIES, Icons } from '../constants';

interface ShopProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, addToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState('newest');

  const activeCategory = searchParams.get('category') || 'All';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    result = result.filter(p => p.price <= maxPrice);

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, activeCategory, search, maxPrice, sortBy]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          <div>
            <h3 className="text-lg font-bold mb-6">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find gadgets..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Icons.Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Categories</h3>
            <div className="flex flex-col space-y-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-left px-4 py-2.5 rounded-xl transition-colors font-medium ${
                    activeCategory === cat 
                      ? 'bg-primary-600 text-white' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Max Price: ${maxPrice}</h3>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>$0</span>
              <span>$5,000</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold">
              {activeCategory} {filteredProducts.length > 0 && `(${filteredProducts.length})`}
            </h2>
            <select 
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <Icons.Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setSearch(''); handleCategoryChange('All'); setMaxPrice(5000); }}
                className="mt-6 text-primary-600 font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
