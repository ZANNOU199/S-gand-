
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ChevronRight } from 'lucide-react';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState('All');
  const { products: allProducts } = useCMS();

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSlug = slug === 'all' || 
        p.sector.toLowerCase().includes(slug || '') || 
        p.category.toLowerCase().includes(slug || '') ||
        (slug === 'mode' && p.sector.toLowerCase() === 'fashion');
      
      const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
      
      return matchesSlug && matchesFilter;
    });
  }, [slug, activeFilter, allProducts]);

  const categoryTitle = slug === 'all' ? 'The Whole World' : 
                       slug === 'mode' ? 'La Mode' : 
                       slug?.replace('-', ' ');

  return (
    <div className="bg-background-dark min-h-screen py-16 px-8">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-16">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-sand/50 mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-white">Universe</span>
            <ChevronRight size={10} />
            <span className="text-primary font-bold">{categoryTitle}</span>
          </nav>
          <h1 className="text-6xl font-black uppercase tracking-tight mb-4 leading-none">{categoryTitle}</h1>
          <p className="text-sand/50 text-lg max-w-2xl leading-relaxed">
            Discover a unique blend of heritage and contemporary luxury. Each piece is curated to represent the pinnacle of artisanal mastery.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-10">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">Sub-Categories</h3>
              <div className="space-y-4">
                {['All', 'Accessories', 'Apparel', 'Home Decor', 'Jewelry'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`block w-full text-left text-sm font-bold uppercase tracking-wider transition-colors ${activeFilter === f ? 'text-white translate-x-2' : 'text-sand/30 hover:text-white'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">Price Range</h3>
              <div className="space-y-4">
                 <input type="range" className="w-full accent-primary bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer" />
                 <div className="flex justify-between text-[10px] uppercase font-bold text-sand/50">
                   <span>€100</span>
                   <span>€2000</span>
                 </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p as any} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                <p className="text-sand/30 uppercase tracking-[0.3em] font-bold">No pieces found in this universe</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
