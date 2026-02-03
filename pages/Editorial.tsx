
import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../App';
import { ArrowRight } from 'lucide-react';

const Editorial: React.FC = () => {
  const { siteConfig } = useCMS();

  return (
    <div className="bg-background-dark min-h-screen text-white">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-40 scale-105" 
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfJlmBSowEjlbIFfda3GxFvnQdRa6cYM_Ll4IaA7gSE6BAKNsx657dPZqJK-20U4b-JfvY0q9NN1krfY8oPbxxxCtRpkgE7MgoPtnM9ml-q6wVZQk1TvKe8Vz3cPWosvtHk_wrz6fZz-saNYECI86SaTKxLvWjm6ONSqHaYzv4MAIOm-lqyJ8-c0nJAWx5JPVN6a8upMqKrNSPtB8OqHnd2Eaxl1dFbEuanBMMRzmBaeg1RGOBh-m3e5dCI4RRH-brbb2ZekHqLnCT')` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark"></div>
        <div className="relative text-center space-y-6 px-8 max-w-4xl">
          <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Le Journal SÈGANDÉ</span>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">Craftsmanship <br/>& Heritage</h1>
          <p className="text-sand/60 text-xs md:text-sm font-bold uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
            Exploring the intersection of ancestral African soul and modern luxury.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-32 px-8 space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <span className="text-primary font-black text-[9px] uppercase tracking-widest">Chapter I</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">The Breath of <br/>the Niger River</h2>
            <p className="text-sand/70 text-base leading-loose font-medium">
              Every creation begins on the banks of the Niger. Where time seems to stand still, the nimble hands of our artisans continue to weave centuries-old stories into every fiber of organic cotton. At SÈGANDÉ, we don't just create objects; we capture moments of African grace.
            </p>
            <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">
              Discover our artisans <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl group-hover:bg-primary/10 transition-all"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbqRE-SdeillU7VtjhWINQ67vBXlFwlB595kbU_k-0YxwNUwaDepWnsrGxNPU2wKF2odLhLCCYFgZOIBTcypLcE4PgAfSqcBy2aifoLonGwlOY0XG0wULCXxQxfa7_L8m4_zT3328jMEumQFLaMnJZWejSx9Jgeyjfv5Mvd54--tF_h0JVaU10c0hIC3s__Bh0Mt4RN7xc5WoU6v9de4sSpMxEjipKL4Z8-fAZBArFdBLjWN_G49lVxeQwzj3ObL6_ke6vGln5iQAA" 
              className="relative w-full rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
              alt="Artisanal process"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Sustainable Vision", icon: "01", desc: "Using 400-year-old natural dye techniques with contemporary silhouettes." },
            { title: "Fair Trade Roots", icon: "02", desc: "Supporting over 50 artisan communities across West Africa directly." },
            { title: "Modern Heritage", icon: "03", desc: "Defining a new standard for conscious luxury and slow fashion." }
          ].map(item => (
            <div key={item.title} className="p-10 bg-charcoal/30 rounded-3xl border border-white/5 space-y-6 group hover:border-primary/20 transition-all">
              <span className="text-4xl font-black text-white/5 group-hover:text-primary/20 transition-colors font-display">{item.icon}</span>
              <h3 className="text-lg font-black uppercase tracking-tight">{item.title}</h3>
              <p className="text-sand/40 text-xs font-medium leading-relaxed uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Editorial;
