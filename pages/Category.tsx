
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Filter, LayoutGrid } from 'lucide-react';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceLimit, setPriceLimit] = useState(5000);
  const { products: allProducts, sectors } = useCMS();

  // Reset filter when universe changes
  useEffect(() => {
    setActiveFilter('All');
  }, [slug]);

  // Find info about current sector
  const currentSector = sectors.find(s => s.slug === slug);
  const isAll = slug === 'all';

  // 1. Filter by sector slug
  const filteredBySector = useMemo(() => {
    if (isAll) return allProducts;
    return allProducts.filter(p => p.sector === slug);
  }, [slug, allProducts, isAll]);

  // 2. Extract dynamic sub-categories from products (Accessoires, Sculpture, etc.)
  const dynamicSubCategories = useMemo(() => {
    const categories = new Set<string>();
    filteredBySector.forEach(p => categories.add(p.category));
    return ['All', ...Array.from(categories)].sort();
  }, [filteredBySector]);

  // 3. Final display filter including price
  const finalProducts = useMemo(() => {
    let filtered = filteredBySector;
    if (activeFilter !== 'All') {
      filtered = filtered.filter(p => p.category === activeFilter);
    }
    return filtered.filter(p => p.price <= priceLimit);
  }, [filteredBySector, activeFilter, priceLimit]);

  const categoryTitle = isAll ? 'Le Monde Entier' : currentSector?.name || slug?.replace('-', ' ');

  // Calculate percentage for price tooltip position
  const pricePercentage = ((priceLimit - 100) / (5000 - 100)) * 100;

  return (
    <div className="bg-background-dark min-h-screen">
      {/* Hero Banner - Optimized height for mobile */}
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
          <p className="hidden md:block text-sand/40 text-[11px] font-bold uppercase tracking-widest max-w-xl mx-auto">
            Une sélection pointue du meilleur de l'artisanat africain.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-10 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Sidebar - Stacks at top on Mobile */}
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
                    onClick={() => setActiveFilter(cat)}
                    className={`group flex items-center gap-3 whitespace-nowrap lg:w-full text-left transition-all ${activeFilter === cat ? 'text-primary bg-primary/5 lg:bg-transparent p-2 lg:p-0 rounded' : 'text-sand/30 hover:text-white p-2 lg:p-0'}`}
                  >
                    <div className={`hidden lg:block h-1 transition-all ${activeFilter === cat ? 'w-4 bg-primary' : 'w-0 bg-white/20 group-hover:w-2'}`}></div>
                    <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sand/40 border-b border-white/10 pb-4">Échelle de prix</h3>
              <div className="relative px-2 pt-6 pb-2">
                {/* Dynamic Price Tooltip */}
                <div 
                  className="absolute -top-4 bg-primary text-background-dark text-[10px] font-black px-2 py-1 rounded pointer-events-none whitespace-nowrap -translate-x-1/2 transition-all duration-75"
                  style={{ left: `${pricePercentage}%` }}
                >
                  {priceLimit} €
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[4px] border-x-transparent border-t-[4px] border-t-primary"></div>
                </div>

                <input 
                  type="range" 
                  min="100" 
                  max="5000" 
                  step="50"
                  value={priceLimit}
                  onChange={(e) => setPriceLimit(Number(e.target.value))}
                  className="w-full accent-primary bg-white/5 h-1 appearance-none cursor-pointer rounded-full relative z-10" 
                />
                <div className="flex justify-between mt-6 text-[9px] font-black text-sand/20 uppercase tracking-widest">
                  <span>100 €</span>
                  <span>5000 €</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block bg-charcoal/40 p-8 rounded-2xl border border-white/5 space-y-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-primary">Initié</p>
              <p className="text-[10px] text-sand/40 font-bold uppercase leading-relaxed">Accédez aux collections en avant-première.</p>
              <button className="text-[9px] font-black uppercase tracking-widest border-b border-primary/40 pb-1">S'abonner</button>
            </div>
          </aside>

          {/* Grid - Better spacing and card sizing */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 md:mb-12 py-4 border-b border-white/5">
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-sand/40">
                <span className="text-white">{finalProducts.length}</span> chefs-d'œuvre
              </p>
              <div className="flex items-center gap-4 text-sand/20">
                <LayoutGrid size={16} className="text-primary" />
                <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">Trier par pertinence</span>
              </div>
            </div>

            {finalProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
                {finalProducts.map(p => (
                  <ProductCard key={p.id} product={p as any} />
                ))}
              </div>
            ) : (
              <div className="py-20 md:py-40 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-sand/20 uppercase tracking-widest font-black text-[10px]">Aucune pièce trouvée</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
