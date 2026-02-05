
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
  const [priceLimit, setPriceLimit] = useState(500000); // Ajusté pour FCFA
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const { products: allProducts, sectors } = useCMS();

  useEffect(() => {
    setActiveFilter('All');
    setCurrentPage(1);
  }, [slug]);

  const currentSector = sectors.find(s => s.slug === slug);
  const isAll = slug === 'all';

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

  const categoryTitle = isAll ? 'Le Monde Entier' : currentSector?.name || slug?.replace('-', ' ');
  const pricePercentage = ((priceLimit - 1000) / (1000000 - 1000)) * 100;

  return (
    <div className="bg-background-dark min-h-screen">
      <section className="relative h-[35vh] md:h-[40vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105" 
          style={{ backgroundImage: `url('${currentSector?.image || "https://images.unsplash.com/photo-1549490349-8643362247b5"}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/60 to-background-dark"></div>
        <div className="relative z-10 text-center px-6">
          <nav className="flex items-center justify-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 md:mb-6">
            <Link to="/" className="hover:text-white transition-colors">Maison</Link>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/40">Univers</span>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white">{categoryTitle}</span>
          </nav>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 leading-none">{categoryTitle}</h1>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-10 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <aside className="w-full lg:w-64 shrink-0 space-y-8 lg:space-y-12">
            <div>
              <div className="flex items-center gap-2 text-primary border-b border-white/10 pb-4 mb-6">
                <Filter size={14} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Conservation</h3>
              </div>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                {dynamicSubCategories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setActiveFilter(cat); setCurrentPage(1); }}
                    className={`group flex items-center gap-3 whitespace-nowrap lg:w-full text-left transition-all ${activeFilter === cat ? 'text-primary bg-primary/5 lg:bg-transparent p-2 lg:p-0 rounded' : 'text-sand/30 hover:text-white p-2 lg:p-0'}`}
                  >
                    <div className={`hidden lg:block h-1 transition-all ${activeFilter === cat ? 'w-4 bg-primary' : 'w-0 bg-white/20 group-hover:w-2'}`}></div>
                    <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sand/40 border-b border-white/10 pb-4">Échelle de prix (FCFA)</h3>
              <div className="relative px-2 pt-6 pb-2">
                <div 
                  className="absolute -top-4 bg-primary text-background-dark text-[10px] font-black px-2 py-1 rounded pointer-events-none whitespace-nowrap -translate-x-1/2 transition-all duration-75"
                  style={{ left: `${pricePercentage}%` }}
                >
                  {priceLimit.toLocaleString()} FCFA
                </div>
                <input 
                  type="range" min="1000" max="1000000" step="10000"
                  value={priceLimit}
                  onChange={(e) => { setPriceLimit(Number(e.target.value)); setCurrentPage(1); }}
                  className="w-full accent-primary bg-white/5 h-1 appearance-none cursor-pointer rounded-full relative z-10" 
                />
              </div>
            </div>
          </aside>

          <div className="flex-1" ref={gridRef}>
            <div className="flex items-center justify-between mb-8 md:mb-12 py-4 border-b border-white/5">
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-sand/40">
                Page <span className="text-white">{currentPage}</span> / {totalPages || 1} — <span className="text-white">{finalProducts.length}</span> chefs-d'œuvre
              </p>
              <div className="flex items-center gap-4 text-sand/20">
                <LayoutGrid size={16} className="text-primary" />
                <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">Grille Royale</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={`${slug}-${currentPage}-${activeFilter}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16 min-h-[600px]"
              >
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map(p => <ProductCard key={p.id} product={p as any} />)
                ) : (
                  <div className="col-span-full py-40 text-center border border-dashed border-white/10 rounded-2xl">
                    <p className="text-sand/20 uppercase tracking-widest font-black text-[10px]">Aucune pièce trouvée</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="mt-20 flex flex-col items-center gap-8 border-t border-white/5 pt-12">
                <div className="flex items-center gap-4">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="flex items-center gap-3 px-6 py-4 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:border-primary disabled:opacity-0 disabled:pointer-events-none transition-all"
                  >
                    <ChevronLeft size={14} /> Précédent
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`size-10 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-primary text-background-dark' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="flex items-center gap-3 px-6 py-4 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:border-primary disabled:opacity-0 disabled:pointer-events-none transition-all"
                  >
                    Suivant <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
