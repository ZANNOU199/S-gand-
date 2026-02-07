
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { siteConfig, sectors, products } = useCMS();

  // Filtrage intelligent : priorités aux produits mis en avant, sinon les plus récents
  const featured = products.filter(p => p.isFeatured === true);
  const sahelCollection = featured.length > 0 
    ? featured.slice(0, 4) 
    : products.slice(0, 4);

  return (
    <div className="bg-background-dark text-white">
      {/* Hero Section - Perfectly Calibrated for Desktop & Mobile */}
      <section className="relative h-[85vh] md:h-screen w-full overflow-hidden flex items-center justify-center lg:items-center lg:justify-start">
        {/* Background Image - Forced to TOP on Desktop to see faces */}
        <div className="absolute inset-0 z-0">
          <img 
            src={siteConfig.heroImage || "https://images.unsplash.com/photo-1549490349-8643362247b5"} 
            alt="SÈGANDÉ Hero"
            className="w-full h-full object-cover object-center lg:object-top transition-transform duration-[3000ms] scale-105"
          />
          {/* Dual Gradient for maximum readability and visual depth */}
          <div className="absolute inset-0 bg-black/40 lg:bg-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent lg:bg-gradient-to-r lg:from-background-dark/90 lg:via-background-dark/10 lg:to-transparent"></div>
        </div>

        {/* Content Container - Centered vertically on desktop for total visibility */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Brand Tag - Now guaranteed visible */}
              <div className="mb-6 md:mb-8">
                <span className="inline-flex items-center gap-3 text-primary font-black tracking-[0.6em] text-[10px] md:text-xs uppercase bg-primary/10 px-6 py-2.5 rounded-full border border-primary/30 backdrop-blur-sm">
                  <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                  LE BIEN-ÊTRE RÉINVENTÉ
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[1.05] md:leading-[0.9] uppercase tracking-tighter text-white drop-shadow-2xl">
                {siteConfig.heroTitle}
              </h1>
              
              <p className="text-sand/80 text-xs md:text-sm lg:text-base max-w-xl mb-12 font-medium tracking-wide uppercase leading-relaxed mx-auto lg:mx-0">
                {siteConfig.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/category/all')} 
                  className="group relative overflow-hidden bg-primary text-background-dark px-12 py-5 rounded-lg font-black text-[11px] tracking-[0.2em] uppercase transition-all shadow-[0_20px_40px_-15px_rgba(236,146,19,0.4)] hover:shadow-primary/40 hover:-translate-y-1"
                >
                  <span className="relative z-10">DÉCOUVRIR LA COLLECTION</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                <button 
                  onClick={() => navigate('/journal')}
                  className="px-12 py-5 border border-white/20 rounded-lg font-black text-[11px] tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm"
                >
                  NOTRE MANIFESTE
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Subtle Scroll Indicator for Desktop */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
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
          <p className="text-sand/40 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-right hidden md:block">
            Exploration Artisanale
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
          {sectors.length > 0 ? sectors.map((sector) => (
            <motion.div 
              key={sector.slug}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/category/${sector.slug}`)}
              className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] cursor-pointer bg-charcoal border border-white/5 shadow-2xl"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110 opacity-60 group-hover:opacity-100" style={{ backgroundImage: `url('${sector.image || "https://via.placeholder.com/800x1200"}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tighter">{sector.name}</h3>
                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Explorer <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-24 text-center text-sand/10 uppercase font-black tracking-widest border-2 border-dashed border-white/5 rounded-3xl">
              Configuration de la Maison en cours...
            </div>
          )}
        </div>
      </section>

      {/* Collection Sahel (Featured Products) */}
      <section className="bg-charcoal/30 py-20 md:py-32 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div className="text-center md:text-left flex-1">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none text-white">Collection Sahel</h2>
              <p className="text-sand/40 text-xs md:text-sm max-w-xl uppercase font-bold tracking-[0.2em] leading-relaxed">
                Une sélection rigoureuse de pièces d'exception, alliant héritage africain et minimalisme contemporain.
              </p>
            </div>
            <button 
              onClick={() => navigate('/category/all')}
              className="px-8 py-4 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all shrink-0"
            >
              VOIR TOUT L'INVENTAIRE
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {sahelCollection.length > 0 ? sahelCollection.map(product => (
              <ProductCard key={product.id} product={product} />
            )) : (
              <div className="col-span-full py-32 text-center text-sand/10 uppercase font-black tracking-widest border border-dashed border-white/5 rounded-3xl">
                À la découverte de nouvelles pépites...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ethos / Story Section */}
      <section className="relative overflow-hidden bg-background-dark py-24 md:py-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square sm:aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 bg-charcoal">
              <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfJlmBSowEjlbIFfda3GxFvnQdRa6cYM_Ll4IaA7gSE6BAKNsx657dPZqJK-20U4b-JfvY0q9NN1krfY8oPbxxxCtRpkgE7MgoPtnM9ml-q6wVZQk1TvKe8Vz3cPWosvtHk_wrz6fZz-saNYECI86SaTKxLvWjm6ONSqHaYzv4MAIOm-lqyJ8-c0nJAWx5JPVN6a8upMqKrNSPtB8OqHnd2Eaxl1dFbEuanBMMRzmBaeg1RGOBh-m3e5dCI4RRH-brbb2ZekHqLnCT" alt="Artisan SÈGANDÉ" />
            </div>
            <div className="absolute -bottom-10 -right-10 size-40 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
          </div>
          <div className="space-y-8 md:space-y-12 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="text-primary uppercase tracking-[0.5em] text-[10px] font-black">L'ÂME DE LA MAISON</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] uppercase tracking-tighter text-white">Racines<br/>Ancestrales,<br/>Vision Luxe</h2>
            </div>
            <p className="text-sand/50 text-sm md:text-base leading-relaxed max-w-lg font-medium">
              Nous réinterprétons les codes du luxe à travers le prisme de l'authenticité africaine. Chaque objet raconte une histoire de temps, de geste et de passion.
            </p>
            <button onClick={() => navigate('/journal')} className="flex items-center gap-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white hover:text-primary transition-all group">
              NOTRE HISTOIRE <div className="size-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:translate-x-3 transition-all"><ArrowRight size={18} /></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
