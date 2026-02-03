
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Filter, LayoutGrid } from 'lucide-react';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState('All');
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

  // 2. Extract dynamic sub-categories from products (Accessories, Sculpture, etc.)
  const dynamicSubCategories = useMemo(() => {
    const categories = new Set<string>();
    filteredBySector.forEach(p => categories.add(p.category));
    return ['All', ...Array.from(categories)].sort();
  }, [filteredBySector]);

  // 3. Final display filter
  const finalProducts = useMemo(() => {
    if (activeFilter === 'All') return filteredBySector;
    return filteredBySector.filter(p => p.category === activeFilter);
  }, [filteredBySector, activeFilter]);

  const categoryTitle = isAll ? 'Le Monde Entier' : currentSector?.name || slug?.replace('-', ' ');

  return (
    <div className="bg-background-dark min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105" 
          style={{ backgroundImage: `url('${currentSector?.image || "https://images.unsplash.com/photo-1549490349-8643362247b5"}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/60 to-background-dark"></div>
        <div className="relative z-10 text-center px-8">
          <nav className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">
            <Link to="/" className="hover:text-white transition-colors">Maison</Link>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/40">Univers</span>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white">{categoryTitle}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 leading-none">{categoryTitle}</h1>
          <p className="text-sand/40 text-[11px] font-bold uppercase tracking-widest max-w-xl mx-auto">
            Une sélection pointue du meilleur de l'artisanat africain.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-12">
            <div>
              <div className="flex items-center gap-2 text-primary border-b border-white/10 pb-4 mb-8">
                <Filter size={14} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Conservation</h3>
              </div>
              <div className="flex flex-col gap-4">
                {dynamicSubCategories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`group flex items-center gap-3 w-full text-left transition-all ${activeFilter === cat ? 'text-primary' : 'text-sand/30 hover:text-white'}`}
                  >
                    <div className={`h-1 transition-all ${activeFilter === cat ? 'w-4 bg-primary' : 'w-0 bg-white/20 group-hover:w-2'}`}></div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sand/40 border-b border-white/10 pb-4">Échelle de prix</h3>
              <div className="px-2">
                <input type="range" className="w-full accent-primary bg-white/5 h-1 appearance-none cursor-pointer rounded-full" />
                <div className="flex justify-between mt-4 text-[9px] font-black text-sand/20 uppercase tracking-widest">
                  <span>100 €</span>
                  <span>4500 €</span>
                </div>
              </div>
            </div>

            <div className="bg-charcoal/40 p-8 rounded-2xl border border-white/5 space-y-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-primary">Initié</p>
              <p className="text-[10px] text-sand/40 font-bold uppercase leading-relaxed">Accédez aux collections en avant-première.</p>
              <button className="text-[9px] font-black uppercase tracking-widest border-b border-primary/40 pb-1">S'abonner</button>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12 py-4 border-b border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sand/40">
                <span className="text-white">{finalProducts.length}</span> chefs-d'œuvre trouvés
              </p>
              <div className="flex items-center gap-4 text-sand/20">
                <LayoutGrid size={18} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Trier par pertinence</span>
              </div>
            </div>

            {finalProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {finalProducts.map(p => (
                  <ProductCard key={p.id} product={p as any} />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center border border-dashed border-white/10 rounded-3xl">
                <p className="text-sand/20 uppercase tracking-widest font-black text-xs">Aucune pièce trouvée dans cet univers</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
