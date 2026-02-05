
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight, Filter, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 6;

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceLimit, setPriceLimit] = useState(500000); 
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const { products: allProducts, sectors, siteConfig } = useCMS();

  useEffect(() => {
    setActiveFilter('All');
    setCurrentPage(1);
  }, [slug]);

  const currentSector = sectors.find(s => s.slug === slug);
  const isAll = slug === 'all';
  const meta = siteConfig.categoryMeta[slug || 'all'] || { title: slug, description: "" };

  const filteredBySector = useMemo(() => {
    if (isAll) return allProducts;
    return allProducts.filter(p => p.sector === slug);
  }, [slug, allProducts, isAll]);

  const dynamicSubCategories = useMemo(() => {
    const categories = new Set<string>();
    filteredBySector.forEach(p => categories.add(p.category));
    return ['All', ...Array.from(categories)].sort();
  }, [filteredBySector]);

  const finalProducts = useMemo(() => {
    let filtered = filteredBySector;
    if (activeFilter !== 'All') {
      filtered = filtered.filter(p => p.category === activeFilter);
    }
    return filtered.filter(p => p.price <= priceLimit);
  }, [filteredBySector, activeFilter, priceLimit]);

  const totalPages = Math.ceil(finalProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = finalProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-background-dark min-h-screen">
      <section className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 scale-105" 
          style={{ backgroundImage: `url('${currentSector?.image || "https://images.unsplash.com/photo-1549490349-8643362247b5"}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/60 to-background-dark"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <nav className="flex items-center justify-center gap-2 md:gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-6">
            <Link to="/" className="hover:text-white transition-colors">Maison</Link>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white">{meta.title}</span>
          </nav>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-none">{meta.title}</h1>
          <p className="text-sand/50 text-xs md:text-sm font-bold uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
            {meta.description}
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <aside className="w-full lg:w-64 shrink-0 space-y-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6 border-b border-white/10 pb-4">Conservation</h3>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                {dynamicSubCategories.map(cat => (
                  <button 
                    key={cat} onClick={() => { setActiveFilter(cat); setCurrentPage(1); }}
                    className={`whitespace-nowrap lg:w-full text-left transition-all px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest ${activeFilter === cat ? 'bg-primary text-black' : 'text-sand/30 hover:bg-white/5'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sand/40 border-b border-white/10 pb-4">Budget (FCFA)</h3>
              <input 
                type="range" min="1000" max="1000000" step="10000" value={priceLimit}
                onChange={(e) => { setPriceLimit(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-primary bg-white/5 h-1 appearance-none cursor-pointer rounded-full" 
              />
              <p className="text-right text-[10px] font-black text-primary tracking-widest">{priceLimit.toLocaleString()} FCFA</p>
            </div>
          </aside>

          <div className="flex-1" ref={gridRef}>
            <div className="flex items-center justify-between mb-12 py-4 border-b border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sand/40">
                Page <span className="text-white">{currentPage}</span> / {totalPages || 1} — <span className="text-white">{finalProducts.length}</span> pièces
              </p>
              <LayoutGrid size={16} className="text-primary" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={`${slug}-${currentPage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16"
              >
                {paginatedProducts.map(p => <ProductCard key={p.id} product={p as any} />)}
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="mt-20 flex justify-center gap-3">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => handlePageChange(i + 1)} className={`size-10 rounded-lg text-[10px] font-black ${currentPage === i+1 ? 'bg-primary text-black' : 'bg-white/5'}`}>
                    {i+1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
