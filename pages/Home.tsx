
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Settings } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { siteConfig, sectors, products } = useCMS();

  // Si aucune config n'est en base de données
  if (!siteConfig) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8 bg-background-dark">
        <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mb-8 animate-pulse">
           <Settings className="text-primary" size={32} />
        </div>
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-white mb-4">Initialisation Requise</h1>
        <p className="text-sand/40 text-xs md:text-sm uppercase font-bold tracking-[0.2em] max-w-sm mb-10">
          Votre base de données est connectée mais aucune configuration visuelle n'a été détectée.
        </p>
        <button onClick={() => navigate('/admin/site-config')} className="bg-primary text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
          Configurer la Vitrine
        </button>
      </div>
    );
  }

  const featuredProducts = products.filter(p => p.isFeatured);

  return (
    <div className="bg-background-dark text-white animate-in fade-in duration-1000">
      {/* Hero Section - 100% DB */}
      <section className="relative min-h-[85vh] w-full overflow-hidden flex items-end">
        {siteConfig.heroImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${siteConfig.heroImage}')` }}
          ></div>
        )}
        <div className="absolute inset-0 luxury-gradient"></div>
        <div className="relative w-full flex flex-col items-center justify-end pb-24 text-center px-6 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-8xl font-black mb-8 leading-[0.9] uppercase tracking-tighter"
          >
            {siteConfig.heroTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-sand/80 text-xs md:text-base max-w-2xl mb-12 font-medium tracking-widest uppercase leading-relaxed"
          >
            {siteConfig.heroSubtitle}
          </motion.p>
          <button onClick={() => navigate('/category/all')} className="bg-primary text-black px-12 py-5 rounded-xl font-black text-[11px] tracking-[0.3em] uppercase hover:bg-white transition-all shadow-2xl">
            Explorer la Collection
          </button>
        </div>
      </section>

      {/* Secteurs - 100% DB */}
      {sectors.length > 0 ? (
        <section className="py-24 px-8 max-w-[1440px] mx-auto">
          <div className="mb-16">
            <span className="text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-3 block">HÉRITAGE</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Nos Univers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector) => (
              <motion.div 
                key={sector.slug}
                whileHover={{ scale: 0.98 }}
                onClick={() => navigate(`/category/${sector.slug}`)}
                className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] cursor-pointer bg-charcoal border border-white/5"
              >
                {sector.image && (
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" style={{ backgroundImage: `url('${sector.image}')` }}></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{sector.name}</h3>
                  <div className="w-12 h-1 bg-primary group-hover:w-full transition-all duration-700"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        <div className="py-24 text-center text-sand/20 font-black uppercase tracking-widest text-xs">
          Aucun univers configuré en base de données.
        </div>
      )}

      {/* Featured Products - 100% DB */}
      {featuredProducts.length > 0 && (
        <section className="bg-charcoal/30 py-24 border-y border-white/5">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="mb-20">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">Sélection du Moment</h2>
              <p className="text-sand/30 text-xs uppercase font-bold tracking-[0.2em]">Pièces d'exception puisées dans nos archives.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Preview - 100% DB */}
      {siteConfig.editorial && siteConfig.editorial.heroImage && (
        <section className="py-24 px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-charcoal">
            <img className="w-full h-full object-cover" src={siteConfig.editorial.heroImage} alt="Editorial" />
          </div>
          <div className="space-y-12">
            <span className="text-primary uppercase tracking-[0.5em] text-[10px] font-black">MANUFACTURE</span>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] uppercase tracking-tighter text-white">
              {siteConfig.editorial.heroTitle || "L'Âme SÈGANDÉ"}
            </h2>
            <button onClick={() => navigate('/journal')} className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] text-white hover:text-primary transition-all group">
              DÉCOUVRIR LE JOURNAL <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
