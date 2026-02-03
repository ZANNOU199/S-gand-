
import React from 'react';
import { motion } from 'framer-motion';

const Editorial: React.FC = () => {
  return (
    <div className="bg-background-dark min-h-screen text-white">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-fixed opacity-40" style={{ backgroundImage: `url('https://picsum.photos/seed/editorial/1920/1080')` }} />
        <div className="relative text-center space-y-4 px-8">
          <span className="text-primary font-black uppercase tracking-[0.5em] text-xs">Le Journal</span>
          <h1 className="text-7xl font-black uppercase tracking-tighter">Héritage & Vision</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-24 px-8 space-y-20">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold italic serif tracking-tight">Le Souffle du Niger</h2>
          <p className="text-sand/70 text-lg leading-loose font-light">
            Tout commence sur les rives du fleuve Niger. Là où le temps semble s'être arrêté, les mains agiles de nos artisans continuent de tisser des histoires séculaires dans chaque fibre de coton organique. Chez SÈGANDÉ, nous ne créons pas seulement des objets ; nous capturons des moments de grâce africaine.
          </p>
          <img src="https://picsum.photos/seed/craft1/1200/600" className="w-full rounded-2xl shadow-2xl border border-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-black uppercase">Modernité Durable</h3>
            <p className="text-sand/60 text-sm leading-relaxed">
              L'innovation est au cœur de notre processus. En combinant des techniques de teinture naturelles vieilles de 400 ans avec des silhouettes contemporaines, nous définissons un nouveau standard pour le luxe conscient.
            </p>
          </div>
          <div className="aspect-[4/5] bg-charcoal rounded-xl overflow-hidden shadow-2xl">
            <img src="https://picsum.photos/seed/craft2/800/1000" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Editorial;
