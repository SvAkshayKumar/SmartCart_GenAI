
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block overflow-hidden h-64 bg-slate-100 dark:bg-slate-900">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{product.category}</span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">${product.price.toLocaleString()}</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{product.description}</p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
