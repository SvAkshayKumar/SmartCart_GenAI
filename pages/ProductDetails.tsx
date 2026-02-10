
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { Icons } from '../constants';
import { generateProductDescription, askAIAboutProduct } from '../services/gemini';

interface ProductDetailsProps {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products, addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === parseInt(id || ''));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'ai'>('info');
  
  // AI States
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-primary-600 font-bold">Return to Shop</Link>
      </div>
    );
  }

  const handleAIDescription = async () => {
    setIsGeneratingDesc(true);
    const desc = await generateProductDescription(product.name, product.category);
    setAiDescription(desc);
    setIsGeneratingDesc(false);
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setIsAsking(true);
    setAiAnswer('');
    const answer = await askAIAboutProduct(product, userQuestion);
    setAiAnswer(answer);
    setIsAsking(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="sticky top-24 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 aspect-square">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full uppercase tracking-widest">{product.category}</span>
              {product.featured && <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full uppercase tracking-widest">Featured</span>}
            </div>
            <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-primary-600">${product.price.toLocaleString()}</p>
          </div>

          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveTab('info')}
              className={`pb-4 px-6 font-bold text-sm transition-colors relative ${activeTab === 'info' ? 'text-primary-600' : 'text-slate-500'}`}
            >
              Description
              {activeTab === 'info' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`pb-4 px-6 font-bold text-sm transition-colors relative flex items-center space-x-2 ${activeTab === 'ai' ? 'text-primary-600' : 'text-slate-500'}`}
            >
              <Icons.Robot className="w-4 h-4" />
              <span>Ask AI Intelligence</span>
              {activeTab === 'ai' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>}
            </button>
          </div>

          <div className="min-h-[200px]">
            {activeTab === 'info' ? (
              <div className="space-y-6">
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{product.description}</p>
                
                <div className="bg-primary-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-primary-100 dark:border-primary-900/20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold flex items-center space-x-2">
                      <Icons.Robot className="w-5 h-5 text-primary-600" />
                      <span>AI Product Insights</span>
                    </h3>
                    <button 
                      onClick={handleAIDescription}
                      disabled={isGeneratingDesc}
                      className="text-xs font-bold text-primary-600 hover:underline disabled:opacity-50"
                    >
                      {isGeneratingDesc ? 'Generating...' : 'Regenerate Insight'}
                    </button>
                  </div>
                  <p className="text-sm italic text-slate-600 dark:text-slate-400">
                    {aiDescription || "Click above to generate a unique AI-powered perspective on this gadget."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
                  <p className="text-sm font-medium mb-4">Ask our Gemini AI any specific questions about this product:</p>
                  <form onSubmit={handleAskAI} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="e.g. Is this good for professional use?" 
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-500"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={isAsking}
                      className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                    >
                      {isAsking ? 'Thinking...' : 'Consult Assistant'}
                    </button>
                  </form>
                </div>
                {aiAnswer && (
                  <div className="p-6 bg-primary-50 dark:bg-primary-900/10 border-l-4 border-primary-600 rounded-r-2xl">
                    <h4 className="font-bold text-primary-600 mb-2">AI Answer:</h4>
                    <p className="text-slate-700 dark:text-slate-300">{aiAnswer}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6 pt-6">
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center font-bold text-xl hover:text-primary-600"
              >-</button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center font-bold text-xl hover:text-primary-600"
              >+</button>
            </div>
            <button 
              onClick={() => addToCart(product, quantity)}
              className="flex-grow py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all transform active:scale-95"
            >
              Add to Shopping Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
