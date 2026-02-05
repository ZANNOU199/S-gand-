
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { siteConfig, sectors, products } = useCMS();

  // Filtrer les 4 produits sélectionnés via le CMS pour la Home
  const sahelCollection = products
    .filter(p => siteConfig.featuredProductIds.includes(p.id))
    .slice(0, 4);

  return (
    <div className="bg-background-dark text-white">
      <section className="relative min-h-[80vh] md:h-[90vh] w-full overflow-hidden flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000" 
          style={{ backgroundImage: `url('${siteConfig.heroImage}')` }}
        ></div>
        <div className="absolute inset-0 luxury-gradient"></div>
        <div className="relative w-full flex flex-col items-center justify-end pb-16 md:pb-24 text-center px-6 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] md:leading-[0.9] uppercase tracking-tight"
          >
            {siteConfig.heroTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-sand/80 text-xs md:text-base max-w-2xl mb-8 md:mb-10 font-medium tracking-wide uppercase leading-relaxed"
          >
            {siteConfig.heroSubtitle}
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => navigate('/category/all')} className="bg-primary text-background-dark px-10 py-4 rounded-lg font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-white transition-all shadow-xl">
              EXPLORE COLLECTION
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 md:mb-12">
          <div>
            <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-2 block">CURATION</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Our Universes</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <motion.div 
              key={sector.slug}
              whileHover={{ scale: 0.98 }}
              onClick={() => navigate(`/category/${sector.slug}`)}
              className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${sector.image}')` }}></div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tighter">{sector.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-background-dark py-16 md:py-24 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 leading-none">The Sahel Collection</h2>
              <p className="text-sand/40 text-xs md:text-sm max-w-xl uppercase font-bold tracking-widest leading-relaxed">
                Selection curated by our designers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {sahelCollection.map(product => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-terracotta/20 py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="relative aspect-square sm:aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 order-2 lg:order-1">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfJlmBSowEjlbIFfda3GxFvnQdRa6cYM_Ll4IaA7gSE6BAKNsx657dPZqJK-20U4b-JfvY0q9NN1krfY8oPbxxxCtRpkgE7MgoPtnM9ml-q6wVZQk1TvKe8Vz3cPWosvtHk_wrz6fZz-saNYECI86SaTKxLvWjm6ONSqHaYzv4MAIOm-lqyJ8-c0nJAWx5JPVN6a8upMqKrNSPtB8OqHnd2Eaxl1dFbEuanBMMRzmBaeg1RGOBh-m3e5dCI4RRH-brbb2ZekHqLnCT" alt="Artisan hands" />
          </div>
          <div className="space-y-6 md:space-y-10 order-1 lg:order-2">
            <span className="text-primary uppercase tracking-[0.4em] text-[10px] font-black">OUR ETHOS</span>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1] md:leading-[0.9] uppercase tracking-tighter">Ancestral Roots,<br/>Modern Vision</h2>
            <button onClick={() => navigate('/contact')} className="flex items-center gap-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] hover:text-primary transition-all group">
              READ THE FULL STORY <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
