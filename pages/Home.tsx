
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { getAIRecommendations } from '../services/gemini';
import { Icons } from '../constants';

interface HomeProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, addToCart }) => {
  const [recommendations, setRecommendations] = useState<{id: number, reason: string}[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      setIsLoadingRecs(true);
      getAIRecommendations(products).then(recs => {
        setRecommendations(recs);
        setIsLoadingRecs(false);
      });
    }
  }, [products]);

  const featured = products.filter(p => p.featured).slice(0, 4);
  const recommendedProducts = recommendations.map(rec => ({
    product: products.find(p => p.id === rec.id),
    reason: rec.reason
  })).filter(r => r.product);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary-400 uppercase bg-primary-900/30 rounded-full border border-primary-500/30">
              New Era of Gadgets
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 leading-tight">
              The Smarter Way to <span className="text-primary-500">Shop Tech</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Discover cutting-edge gadgets powered by AI insights. Join the SmartCart revolution and upgrade your digital lifestyle today.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center sm:justify-start">
              <Link to="/shop" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105">
                Explore Shop
              </Link>
              <a href="#featured" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md rounded-xl font-bold text-lg transition-all">
                View Deals
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recommendation Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-900 to-slate-900 rounded-3xl p-8 md:p-12 border border-primary-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <div className="flex items-center space-x-3 mb-4">
                <Icons.Robot className="w-8 h-8 text-primary-400" />
                <span className="text-primary-400 font-bold tracking-widest uppercase text-sm">AI Recommendation Engine</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">SmartCart Intelligence</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Our Gemini-powered AI analyzes global tech trends to bring you personalized recommendations tailored to your unique digital ecosystem.
              </p>
              {isLoadingRecs ? (
                <div className="flex items-center space-x-4 text-white">
                  <div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                  <span>Assistant is thinking...</span>
                </div>
              ) : (
                <div className="space-y-4">
                   {recommendedProducts.map(({product, reason}, idx) => (
                      <div key={idx} className="flex items-start space-x-4 bg-white/5 border border-white/10 p-4 rounded-xl">
                        <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center shrink-0">
                          <Icons.Robot className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <p className="text-white font-bold">{product?.name}</p>
                          <p className="text-sm text-slate-400">{reason}</p>
                        </div>
                      </div>
                   ))}
                </div>
              )}
            </div>
            <div className="md:w-1/2 flex justify-center">
               <div className="relative">
                 <div className="absolute inset-0 bg-primary-500 blur-3xl opacity-20"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800" 
                    className="rounded-2xl relative z-10 border border-white/10 shadow-2xl w-full max-w-sm"
                    alt="AI Visualization"
                 />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-slate-500 dark:text-slate-400">Hand-picked premium gadgets for the modern professional.</p>
          </div>
          <Link to="/shop" className="text-primary-600 font-bold hover:underline">View All &rarr;</Link>
        </div>
        <div className="product-grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-20 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Audio', 'Wearables', 'Drones', 'Smart Home', 'Gadgets'].map(cat => (
              <Link 
                key={cat}
                to={`/shop?category=${cat}`} 
                className="group relative h-48 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="z-10">
                  <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors">{cat}</h3>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Explore items</span>
                </div>
                <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Icons.Robot className="w-24 h-24" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
