
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Filter } from 'lucide-react';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState('All');
  const { products: allProducts, sectors } = useCMS();

  // Find current sector info
  const currentSector = sectors.find(s => s.slug === slug);
  const isAll = slug === 'all';

  const filteredBySector = useMemo(() => {
    if (isAll) return allProducts;
    return allProducts.filter(p => p.sector.toLowerCase() === slug?.toLowerCase());
  }, [slug, allProducts, isAll]);

  // Extract dynamic sub-categories from products in this sector
  const dynamicSubCategories = useMemo(() => {
    const categories = new Set<string>();
    filteredBySector.forEach(p => categories.add(p.category));
    return ['All', ...Array.from(categories)];
  }, [filteredBySector]);

  const finalProducts = useMemo(() => {
    if (activeFilter === 'All') return filteredBySector;
    return filteredBySector.filter(p => p.category === activeFilter);
  }, [filteredBySector, activeFilter]);

  const categoryTitle = isAll ? 'The Whole World' : currentSector?.name || slug?.replace('-', ' ');

  return (
    <div className="bg-background-dark min-h-screen">
      {/* Header Banner */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-1000" 
          style={{ backgroundImage: `url('${currentSector?.image || "https://images.unsplash.com/photo-1549490349-8643362247b5"}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 to-background-dark"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <nav className="flex items-center justify-center gap-2 text-[9px] uppercase font-black tracking-[0.3em] text-primary/80 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-white/40">Universe</span>
            <ChevronRight size={10} />
            <span className="text-white">{categoryTitle}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 leading-[0.8]">{categoryTitle}</h1>
          <p className="text-sand/40 text-[11px] font-bold uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
            A curated selection of the finest African craftsmanship, where heritage meets contemporary luxury.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-8 pb-32">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Sidebar - Alignment focused */}
          <aside className="w-full lg:w-56 shrink-0 space-y-12">
            <div className="pt-2">
              <div className="flex items-center gap-2 text-primary mb-8">
                <Filter size={14} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Curation</h3>
              </div>
              <div className="space-y-4">
                {dynamicSubCategories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`group flex items-center gap-3 w-full text-left transition-all ${activeFilter === cat ? 'text-primary' : 'text-sand/30 hover:text-white'}`}
                  >
                    <div className={`size-1 rounded-full transition-all ${activeFilter === cat ? 'bg-primary scale-150' : 'bg-transparent group-hover:bg-white/20'}`}></div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-white/5 pt-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sand/40 mb-8">Price Scale</h3>
              <div className="space-y-6">
                 <div className="relative h-1 w-full bg-white/5 rounded-full">
                    <div className="absolute top-0 left-0 h-full w-2/3 bg-primary rounded-full"></div>
                 </div>
                 <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-sand/20">
                   <span>€100</span>
                   <span>€4500</span>
                 </div>
              </div>
            </div>

            {/* Newsletter Shortcut in Sidebar */}
            <div className="bg-charcoal/50 p-6 rounded-2xl border border-white/5 space-y-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-primary">Insider</p>
              <p className="text-[10px] text-sand/40 font-bold uppercase leading-relaxed">Join our world for early collection access.</p>
              <button className="text-[9px] font-black uppercase tracking-widest border-b border-primary/40 pb-1 hover:text-primary transition-colors">Subscribe</button>
            </div>
          </aside>

          {/* Grid - Perfectly Aligned */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sand/40">
                Found <span className="text-white">{finalProducts.length}</span> masterworks
              </p>
              <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-sand/40 focus:ring-0 cursor-pointer hover:text-white transition-colors">
                <option>Sort: Relevant</option>
                <option>Sort: Price Asc</option>
                <option>Sort: Newest</option>
              </select>
            </div>

            {finalProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {finalProducts.map(p => (
                  <ProductCard key={p.id} product={p as any} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/5 rounded-3xl">
                <div className="size-16 rounded-full bg-white/5 flex items-center justify-center text-sand/20 mb-6">
                  <Filter size={24} />
                </div>
                <p className="text-sand/30 uppercase tracking-[0.3em] font-black text-xs">No pieces found in this universe</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
