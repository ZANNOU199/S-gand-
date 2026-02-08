
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { siteConfig, sectors, products } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');

  const sahelCollection = useMemo(() => {
    return products
      .filter(p => p.isFeatured)
      .sort((a, b) => Number(a.id) - Number(b.id))
      .slice(0, 4);
  }, [products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const trendingTopics = ["Art culinaire", "Tissage main", "Bien-être", "Sahel"];

  return (
    <div className="bg-background-dark text-white">
      <SEO 
        title="L'Âme Moderne de l'Afrique" 
        description="Maison de luxe africaine dédiée au bien-être, à la mode et à l'artisanat contemporain. Découvrez nos collections d'exception."
      />

      {/* Hero Section with Enhanced Search */}
      <section className="relative h-[95vh] md:h-screen w-full overflow-hidden flex items-center justify-center lg:items-center lg:justify-start">
        <div className="absolute inset-0 z-0">
          <img 
            src={siteConfig.heroImage || "https://images.unsplash.com/photo-1549490349-8643362247b5"} 
            alt="SÈGANDÉ - Art de vivre africain"
            className="w-full h-full object-cover object-center lg:object-top transition-transform duration-[3000ms] scale-105"
          />
          <div className="absolute inset-0 bg-black/50 lg:bg-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent lg:bg-gradient-to-r lg:from-background-dark/90 lg:via-background-dark/10 lg:to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="mb-6 md:mb-8">
                <span className="inline-flex items-center gap-3 text-primary font-black tracking-[0.6em] text-[10px] md:text-xs uppercase bg-primary/10 px-6 py-2.5 rounded-full border border-primary/30 backdrop-blur-sm">
                  <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                  LE BIEN-ÊTRE RÉINVENTÉ
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black mb-6 leading-[1.05] md:leading-[0.9] uppercase tracking-tighter text-white drop-shadow-2xl">
                {siteConfig.heroTitle}
              </h1>
              
              <p className="text-sand/80 text-xs md:text-sm lg:text-base max-w-xl mb-12 font-medium tracking-wide uppercase leading-relaxed mx-auto lg:mx-0">
                {siteConfig.heroSubtitle}
              </p>

              {/* Luxury Search Input */}
              <div className="max-w-xl mx-auto lg:mx-0 mb-10 group">
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <div className="absolute left-6 text-primary pointer-events-none group-focus-within:scale-110 transition-transform">
                    <Search size={20} />
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="RECHERCHER UNE PIÈCE, UN UNIVERS..." 
                    className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl py-6 pl-16 pr-32 text-[10px] font-black uppercase tracking-[0.2em] text-white placeholder:text-white/20 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all shadow-2xl"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 px-8 py-4 bg-primary text-background-dark rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg active:scale-95"
                  >
                    Parcourir
                  </button>
                </form>
                
                {/* Suggestions Tags */}
                <div className="flex flex-wrap items-center gap-4 mt-4 px-2 opacity-40 group-focus-within:opacity-100 transition-opacity">
                  <span className="text-[8px] font-black uppercase tracking-widest text-sand/60">Tendances :</span>
                  {trendingTopics.map(topic => (
                    <button 
                      key={topic} 
                      onClick={() => { setSearchQuery(topic); navigate(`/category/all?search=${encodeURIComponent(topic)}`); }}
                      className="text-[8px] font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/category/all')} 
                  className="group relative overflow-hidden bg-primary text-background-dark px-12 py-5 rounded-lg font-black text-[11px] tracking-[0.2em] uppercase transition-all shadow-[0_20px_40px_-15px_rgba(236,146,19,0.4)] hover:shadow-primary/40 hover:-translate-y-1"
                >
                  <span className="relative z-10">NOS COLLECTIONS</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                <button 
                  onClick={() => navigate('/quiz')}
                  className="px-12 py-5 border border-primary/30 rounded-lg font-black text-[11px] tracking-[0.2em] uppercase text-primary hover:bg-primary/10 transition-all backdrop-blur-sm flex items-center justify-center gap-3"
                >
                  <Sparkles size={16} /> TROUVER MON STYLE
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Univers (Sectors) */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-3 block">LES CURATIONS</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Nos Univers</h2>
          </div>
          <div className="h-px flex-1 bg-white/5 mx-10 hidden lg:block"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
          {sectors.map((sector) => (
            <motion.div 
              key={sector.slug}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/category/${sector.slug}`)}
              className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] cursor-pointer bg-charcoal border border-white/5 shadow-2xl"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110 opacity-60 group-hover:opacity-100" style={{ backgroundImage: `url('${sector.image}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tighter">{sector.name}</h3>
                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Explorer <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sélection d’Exception */}
      <section className="bg-charcoal/30 py-20 md:py-32 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div className="text-center md:text-left flex-1">
              <span className="text-primary uppercase tracking-[0.5em] text-[10px] font-black mb-3 block">CURATION ÉLITE</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none text-white">Sélection d’Exception</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {sahelCollection.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
