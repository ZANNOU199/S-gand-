
import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, ShieldCheck } from 'lucide-react';
import { useCMS } from '../App';

const Editorial: React.FC = () => {
  const { siteConfig } = useCMS();
  const content = siteConfig.editorial;

  return (
    <div className="bg-background-dark min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-fixed opacity-30" style={{ backgroundImage: `url('${content.heroImage}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark"></div>
        <div className="relative text-center space-y-6 px-8 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-black uppercase tracking-[0.5em] text-[10px] block"
          >
            L'Âme de la Création
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            {content.heroTitle}
          </motion.h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-32 px-8">
        {content.sections.map((section, idx) => (
          <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40 last:mb-0">
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="text-4xl font-bold tracking-tight uppercase">{section.title}</h2>
              <p className="text-sand/70 text-lg leading-loose font-light italic">
                "{section.quote}"
              </p>
              <p className="text-sand/60 text-sm leading-relaxed">
                {section.text}
              </p>
              <div className="flex gap-10 pt-4">
                <div className="flex flex-col gap-2">
                  <Hammer className="text-primary" size={24} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">Artisanal</span>
                </div>
                <div className="flex flex-col gap-2">
                  <ShieldCheck className="text-primary" size={24} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">Éthique</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/5 order-1 lg:order-2">
              <img src={section.image} className="w-full h-full object-cover" alt={section.title} />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-24 mt-20">
          <div className="space-y-4">
            <h3 className="text-primary font-black uppercase tracking-widest text-xs">I. Matériaux Nobles</h3>
            <p className="text-xs text-sand/50 leading-relaxed uppercase font-bold">Coton organique et cuirs tannés végétalement.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-primary font-black uppercase tracking-widest text-xs">II. Temps de Création</h3>
            <p className="text-xs text-sand/50 leading-relaxed uppercase font-bold">Chaque pièce est une œuvre de patience.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-primary font-black uppercase tracking-widest text-xs">III. Communautés</h3>
            <p className="text-xs text-sand/50 leading-relaxed uppercase font-bold">Un engagement direct pour nos artisans.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Editorial;
