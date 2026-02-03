
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Filter, LayoutGrid, List } from 'lucide-react';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState('All');
  const { products: allProducts, sectors } = useCMS();

  // Reset filter when slug changes
  useEffect(() => {
    setActiveFilter('All');
  }, [slug]);

  // Find current sector info from constants
  const currentSector = sectors.find(s => s.slug === slug);
  const isAll = slug === 'all';

  // Filter products by sector slug
  const filteredBySector = useMemo(() => {
    if (isAll) return allProducts;
    return allProducts.filter(p => p.sector === slug);
  }, [slug, allProducts, isAll]);

  // Extract dynamic sub-categories (e.g., Accessories, Sculpture) based on current products
  const dynamicSubCategories = useMemo(() => {
    const categories = new Set<string>();
    filteredBySector.forEach(p => categories.add(p.category));
    return ['All', ...Array.from(categories)].sort();
  }, [filteredBySector]);

  // Final filtered product list
  const finalProducts = useMemo(() => {
    if (activeFilter === 'All') return filteredBySector;
    return filteredBySector.filter(p => p.category === activeFilter);
  }, [filteredBySector, activeFilter]);

  const categoryTitle = isAll ? 'The Whole World' : currentSector?.name || slug?.replace('-', ' ');

  return (
    <div className="bg-background-dark min-h-screen">
      {/* Dynamic Header Banner */}
      <section className="relative h-[45vh] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-1000 scale-105" 
          style={{ backgroundImage: `url('${currentSector?.image || "https://images.unsplash.com/photo-1549490349-8643362247b5"}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-background-dark/60 to-background-dark"></div>
        
        <div className="relative z-10 text-center px-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <nav className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/40">Universe</span>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white">{categoryTitle}</span>
          </nav>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.85]">{categoryTitle}</h1>
          <p className="text-sand/50 text-xs md:text-sm font-bold uppercase tracking-[0.15em] max-w-2xl mx-auto leading-relaxed">
            Exploring the fusion of ancestral soul and modern luxury. Each piece tells a story of heritage.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-8 pb-40">
        <div className="flex flex-col lg:flex-row gap-24">
          
          {/* Sidebar Filters - Perfectly Aligned */}
          <aside className="w-full lg:w-64 shrink-0 space-y-16">
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-primary border-b border-white/10 pb-4">
                <Filter size={14} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Categories</h3>
              </div>
              <div className="flex flex-col gap-5">
                {dynamicSubCategories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`group flex items-center gap-4 w-full text-left transition-all ${activeFilter === cat ? 'text-primary translate-x-1' : 'text-sand/30 hover:text-white'}`}
                  >
                    <div className={`h-[2px] transition-all duration-300 ${activeFilter === cat ? 'w-4 bg-primary' : 'w-0 bg-white/20 group-hover:w-2'}`}></div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-white border-b border-white/10 pb-4">
                <LayoutGrid size={14} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Filters</h3>
              </div>
              <div className="space-y-6">
                 <div className="space-y-3">
                   <p className="text-[9px] font-black uppercase tracking-widest text-sand/40">Price range</p>
                   <input type="range" className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none cursor-pointer" />
                   <div className="flex justify-between text-[9px] font-black text-sand/20">
                     <span>€100</span>
                     <span>€5000</span>
                   </div>
                 </div>
              </div>
            </div>

            {/* Quality Commitment Box */}
            <div className="p-8 rounded-2xl bg-charcoal/40 border border-white/5 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Artisanal Guarantee</p>
              <p className="text-[10px] text-sand/40 font-bold leading-relaxed uppercase">Each piece is verified for authenticity and ethical sourcing.</p>
            </div>
          </aside>

          {/* Product Grid - Premium Alignment */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12 py-4 border-b border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sand/40">
                <span className="text-white">{finalProducts.length}</span> Masterpieces found
              </p>
              <div className="flex items-center gap-6">
                <button className="text-white/20 hover:text-white transition-colors"><List size={18} /></button>
                <button className="text-primary"><LayoutGrid size={18} /></button>
              </div>
            </div>

            {finalProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
                {finalProducts.map(p => (
                  <ProductCard key={p.id} product={p as any} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 bg-charcoal/20 rounded-3xl border border-dashed border-white/10">
                <p className="text-sand/20 uppercase tracking-[0.4em] font-black text-xs">Awaiting new creations</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
