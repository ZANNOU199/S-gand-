
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ArrowLeft, RefreshCw, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StyleQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      text: "Quelle ambiance définit le mieux votre intérieur idéal ?",
      options: [
        { label: "Minimalisme Zen & Épuré", value: "minimalist", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe" },
        { label: "Chaleur Artisanale & Terreuse", value: "ethnic", image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5" },
        { label: "Luxe Moderne & Contrasté", value: "modern", image: "https://images.unsplash.com/photo-1616486341351-702524fd73ee" }
      ]
    },
    {
      id: 2,
      text: "Quel est votre rapport aux matières ?",
      options: [
        { label: "Le toucher brut du bois et de la terre", value: "raw" },
        { label: "La finesse des textiles tissés main", value: "soft" },
        { label: "Le raffinement du métal et du verre", value: "refined" }
      ]
    },
    {
      id: 3,
      text: "Pour quel moment de vie cherchez-vous à vous entourer ?",
      options: [
        { label: "L'hospitalité et les repas partagés", value: "culinary" },
        { label: "Le repos et le ressourcement privé", value: "wellbeing" },
        { label: "L'expression de soi à travers la mode", value: "fashion" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(-1); // Result page
    }
  };

  const getRecommendation = () => {
    if (answers.includes('culinary')) return { title: 'Art de la Table', slug: 'art-culinaire' };
    if (answers.includes('fashion')) return { title: 'Mode SÈGANDÉ', slug: 'fashion' };
    return { title: 'Bien-être & Décoration', slug: 'nid-du-bien-etre' };
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <div className="bg-background-dark min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 size-96 bg-primary/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-mint/5 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {step >= 0 ? (
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Inspiration SÈGANDÉ — {step + 1}/{questions.length}</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">{questions[step].text}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {questions[step].options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleAnswer(opt.value)}
                    className="group relative aspect-square md:aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all bg-charcoal shadow-2xl"
                  >
                    {opt.image && (
                      <img src={opt.image} className="absolute inset-0 size-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <p className="font-black text-xs uppercase tracking-widest text-white leading-relaxed group-hover:text-primary transition-colors">{opt.label}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sand/40 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest">
                    <ArrowLeft size={14} /> Revenir en arrière
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-charcoal/50 backdrop-blur-3xl p-12 md:p-20 rounded-[3rem] border border-white/5 text-center space-y-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              <div className="relative size-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <Sparkles size={40} className="animate-pulse" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Votre Profil est Révélé</h2>
                <p className="text-sand/40 text-xs font-bold uppercase tracking-widest max-w-sm mx-auto">Basé sur vos affinités, nous avons sélectionné l'Univers qui résonne avec votre âme.</p>
              </div>

              <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-6">
                 <span className="text-primary font-black uppercase tracking-widest text-[10px]">Recommandation Maison</span>
                 <h3 className="text-3xl font-black uppercase">{getRecommendation().title}</h3>
                 <div className="flex justify-center gap-2 text-primary">
                   {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <button 
                  onClick={() => navigate(`/category/${getRecommendation().slug}`)}
                  className="bg-primary text-black font-black px-12 py-5 rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-xl"
                >
                  Découvrir l'Univers
                </button>
                <button 
                  onClick={resetQuiz}
                  className="bg-white/5 border border-white/10 text-white font-black px-10 py-5 rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCw size={16} /> Recommencer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StyleQuiz;
