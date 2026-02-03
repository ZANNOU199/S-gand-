
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Hammer, ShieldCheck } from 'lucide-react';

const Editorial: React.FC = () => {
  return (
    <div className="bg-background-dark min-h-screen text-white">
      {/* Hero Section - Savoir-faire */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-fixed opacity-30" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfJlmBSowEjlbIFfda3GxFvnQdRa6cYM_Ll4IaA7gSE6BAKNsx657dPZqJK-20U4b-JfvY0q9NN1krfY8oPbxxxCtRpkgE7MgoPtnM9ml-q6wVZQk1TvKe8Vz3cPWosvtHk_wrz6fZz-saNYECI86SaTKxLvWjm6ONSqHaYzv4MAIOm-lqyJ8-c0nJAWx5JPVN6a8upMqKrNSPtB8OqHnd2Eaxl1dFbEuanBMMRzmBaeg1RGOBh-m3e5dCI4RRH-brbb2ZekHqLnCT')` }} />
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
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]"
          >
            Savoir-Faire <br/> <span className="text-primary">&</span> Héritage
          </motion.h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-32 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight uppercase">Le Geste Auguste</h2>
            <p className="text-sand/70 text-lg leading-loose font-light italic">
              "Chaque point de couture, chaque coup de ciseau sur le bois, est un dialogue entre le passé et le futur."
            </p>
            <p className="text-sand/60 text-sm leading-relaxed">
              Chez SÈGANDÉ, le savoir-faire n'est pas seulement une technique, c'est un héritage vivant. Nous travaillons avec des maîtres artisans au Bénin, au Mali et au Nigeria qui utilisent des méthodes de tannage végétal et de tissage à la main inchangées depuis des siècles.
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
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbqRE-SdeillU7VtjhWINQ67vBXlFwlB595kbU_k-0YxwNUwaDepWnsrGxNPU2wKF2odLhLCCYFgZOIBTcypLcE4PgAfSqcBy2aifoLonGwlOY0XG0wULCXxQxfa7_L8m4_zT3328jMEumQFLaMnJZWejSx9Jgeyjfv5Mvd54--tF_h0JVaU10c0hIC3s__Bh0Mt4RN7xc5WoU6v9de4sSpMxEjipKL4Z8-fAZBArFdBLjWN_G49lVxeQwzj3ObL6_ke6vGln5iQAA" className="w-full h-full object-cover" alt="Artisanat" />
          </div>
        </div>

        {/* Pillars of craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-24">
          <div className="space-y-4">
            <h3 className="text-primary font-black uppercase tracking-widest text-xs">I. Matériaux Nobles</h3>
            <p className="text-xs text-sand/50 leading-relaxed uppercase font-bold">Nous sourçons exclusivement du coton organique, des bois certifiés et des cuirs à tannage végétal, minimisant notre empreinte écologique.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-primary font-black uppercase tracking-widest text-xs">II. Temps de Création</h3>
            <p className="text-xs text-sand/50 leading-relaxed uppercase font-bold">Une pièce SÈGANDÉ peut nécessiter jusqu'à 200 heures de travail manuel. Le luxe est, avant tout, une question de temps.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-primary font-black uppercase tracking-widest text-xs">III. Communautés</h3>
            <p className="text-xs text-sand/50 leading-relaxed uppercase font-bold">Chaque achat soutient directement les coopératives d'artisans, garantissant des revenus justes et la préservation de leur art.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Editorial;
