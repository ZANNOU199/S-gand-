
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Quote } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { siteConfig, sectors, products } = useCMS();

  return (
    <div className="bg-background-dark text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000" 
          style={{ backgroundImage: `url('${siteConfig.heroImage}')` }}
        ></div>
        <div className="absolute inset-0 luxury-gradient"></div>
        <div className="relative h-full flex flex-col items-center justify-end pb-24 text-center px-4 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] uppercase tracking-tight whitespace-pre-line"
          >
            {siteConfig.heroTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sand/80 text-sm md:text-base max-w-2xl mb-10 font-medium tracking-wide uppercase leading-relaxed"
          >
            {siteConfig.heroSubtitle}
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/category/all')}
              className="bg-primary text-background-dark px-10 py-4 rounded-lg font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-white transition-all shadow-xl"
            >
              EXPLORE COLLECTION
            </button>
            <button 
              onClick={() => navigate('/category/art')}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-lg font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-white/20 transition-all"
            >
              VIEW LOOKBOOK
            </button>
          </div>
        </div>
      </section>

      {/* Our Universes */}
      <section className="py-24 px-8 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-black mb-3 block">CURATION</span>
            <h2 className="text-5xl font-black uppercase tracking-tight">Our Universes</h2>
          </div>
          <Link to="/category/all" className="text-[11px] font-black uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary transition-all pb-1">Explore All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <motion.div 
              key={sector.slug}
              whileHover={{ scale: 0.98 }}
              onClick={() => navigate(`/category/${sector.slug}`)}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${sector.image}')` }}></div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">{sector.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Sahel Collection Grid */}
      <section className="bg-background-dark py-24 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tight mb-4 leading-none">The Sahel Collection</h2>
            <p className="text-sand/40 text-sm max-w-xl mx-auto uppercase font-bold tracking-widest">Limited-edition pieces crafted in collaboration with the master artisans <br/> of the Niger River.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      {/* Ethos Section (Split Layout) */}
      <section className="relative overflow-hidden bg-terracotta/20 py-24">
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-square lg:aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfJlmBSowEjlbIFfda3GxFvnQdRa6cYM_Ll4IaA7gSE6BAKNsx657dPZqJK-20U4b-JfvY0q9NN1krfY8oPbxxxCtRpkgE7MgoPtnM9ml-q6wVZQk1TvKe8Vz3cPWosvtHk_wrz6fZz-saNYECI86SaTKxLvWjm6ONSqHaYzv4MAIOm-lqyJ8-c0nJAWx5JPVN6a8upMqKrNSPtB8OqHnd2Eaxl1dFbEuanBMMRzmBaeg1RGOBh-m3e5dCI4RRH-brbb2ZekHqLnCT" alt="Artisan hands working on a loom" />
          </div>
          <div className="space-y-10">
            <span className="text-primary uppercase tracking-[0.4em] text-[10px] font-black">OUR ETHOS</span>
            <h2 className="text-6xl font-black leading-[0.9] uppercase tracking-tighter">Ancestral Roots,<br/>Modern Vision</h2>
            <p className="text-sand/70 text-base leading-loose font-medium">
              SÈGANDÉ is more than a brand; it's a bridge between the centuries-old techniques of African artisans and the sophisticated demands of modern luxury. Each piece in our collection is a testament to sustainable craftsmanship, fair trade practices, and the vibrant creativity of the continent.
            </p>
            <div className="flex items-center gap-16 py-6 border-y border-white/10">
              <div className="text-left">
                <p className="text-4xl font-black text-white">50+</p>
                <p className="text-[10px] uppercase text-sand/40 font-black tracking-widest mt-1">Artisan Communities</p>
              </div>
              <div className="text-left">
                <p className="text-4xl font-black text-white">100%</p>
                <p className="text-[10px] uppercase text-sand/40 font-black tracking-widest mt-1">Sustainably Sourced</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/contact')}
              className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] hover:text-primary transition-all group"
            >
              READ THE FULL STORY 
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 max-w-[1440px] mx-auto px-8">
        <div className="bg-charcoal/30 rounded-3xl p-16 lg:p-24 text-center relative overflow-hidden border border-white/5">
          <div className="text-primary opacity-30 flex justify-center mb-10">
            <Quote size={48} fill="currentColor" />
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed mb-12 max-w-4xl mx-auto relative z-10 text-sand/90">
            "The attention to detail and the sheer soul poured into the Sahel Collection is unlike anything I've seen in modern luxury. It's fashion that feels alive."
          </p>
          <div className="flex flex-col items-center relative z-10">
            <div className="size-16 rounded-full overflow-hidden mb-4 border-2 border-primary/20 p-1">
              <img className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP4gSrNsZesA_A3HhaBfgdKq4NyvjP5Wfe2Up41w1YGZDry7wqG9Tl_Xh2L4r2GxceshzIkkNB82fcSo2VLEQfh1FOjrK6XeUwJqOAWc344yZ7XzgVbn1071xyvejohzlfbdgYdl1P7fYSRBhXXYxvXoP63MvYOD4Njfjyu2v058GH9uKuvmFAaYACHr2Oo9X2nGsFODuBQgq8Qg2wAZ_pLDLzwINjvg9aE4sGwHuh4Y3Z1703i1I9_YjBgSK34L516KaPYHEZg2n2" alt="Amara Diop" />
            </div>
            <p className="font-black text-white uppercase tracking-[0.2em] text-[11px]">AMARA DIOP</p>
            <p className="text-sand/30 text-[9px] font-bold uppercase tracking-[0.1em] mt-1">CREATIVE DIRECTOR, PARIS</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
