
import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Aura Spheres */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-mint/5 rounded-full blur-[150px]"
      />
      
      {/* Floating 3D Elements (Abstract) */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              y: [0, -100, 0],
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 10 + i * 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 2 
            }}
            style={{
              left: `${i * 20}%`,
              top: `${(i * 15) % 100}%`,
            }}
            className="absolute size-24 md:size-48 border border-white/10 rounded-full backdrop-blur-[2px]"
          />
        ))}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { siteConfig, sectors, products } = useCMS();
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const sahelCollection = useMemo(() => {
    return products
      .filter(p => p.isFeatured)
      .sort((a, b) => Number(a.id) - Number(b.id))
      .slice(0, 4);
  }, [products]);

  return (
    <div className="bg-background-dark text-white relative">
      <SEO 
        title="L'Âme Moderne de l'Afrique" 
        description="Maison de luxe africaine dédiée au bien-être, à la mode et à l'artisanat contemporain. Découvrez nos collections d'exception."
      />

      {/* Hero Section with Parallax and Animated BG */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-center lg:items-center lg:justify-start">
        <AnimatedBackground />
        
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img 
            src={siteConfig.heroImage || "https://images.unsplash.com/photo-1549490349-8643362247b5"} 
            alt="SÈGANDÉ - Art de vivre africain"
            className="w-full h-full object-cover object-center lg:object-top transition-transform duration-[3000ms] scale-105"
          />
          <div className="absolute inset-0 bg-black/40 lg:bg-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent lg:bg-gradient-to-r lg:from-background-dark/90 lg:via-background-dark/10 lg:to-transparent"></div>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.div 
                style={{ opacity }}
                className="mb-6 md:mb-8"
              >
                <span className="inline-flex items-center gap-3 text-primary font-black tracking-[0.6em] text-[10px] md:text-xs uppercase bg-primary/10 px-6 py-2.5 rounded-full border border-primary/30 backdrop-blur-sm">
                  <Sparkles size={14} className="text-primary animate-pulse" />
                  LE BIEN-ÊTRE RÉINVENTÉ
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[1.05] md:leading-[0.9] uppercase tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {siteConfig.heroTitle}
              </h1>
              
              <p className="text-sand/80 text-xs md:text-sm lg:text-base max-w-xl mb-12 font-medium tracking-wide uppercase leading-relaxed mx-auto lg:mx-0">
                {siteConfig.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/category/all')} 
                  className="group relative overflow-hidden bg-primary text-background-dark px-16 py-6 rounded-lg font-black text-[12px] tracking-[0.3em] uppercase transition-all shadow-[0_20px_40px_-15px_rgba(236,146,19,0.4)] hover:shadow-primary/40 hover:-translate-y-1"
                >
                  <span className="relative z-10">NOS COLLECTIONS</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Univers (Sectors) */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto z-10">
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
      <section className="relative bg-charcoal/30 py-20 md:py-32 border-t border-white/5 z-10">
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
