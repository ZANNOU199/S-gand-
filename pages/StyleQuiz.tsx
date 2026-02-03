
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Palette, Diamond, Map, ArrowRight, RefreshCcw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// Define interface for the AI-generated style result
interface StylePersonaResult {
  persona: string;
  recommendation: string;
}

const StyleQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  // Fix: Changed state type from string | null to StylePersonaResult | null to resolve property access errors
  const [result, setResult] = useState<StylePersonaResult | null>(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      q: "Quelle palette de couleurs résonne avec votre âme ?",
      options: [
        { label: "Ocre & Terracotta", icon: Palette },
        { label: "Indigo & Bleu Nuit", icon: Diamond },
        { label: "Sable & Ébène", icon: Map }
      ]
    },
    {
      q: "Quel type de luxe préférez-vous ?",
      options: [
        { label: "Minimalisme Ancestral", icon: Sparkles },
        { label: "Opulence Contemporaine", icon: Diamond },
        { label: "Artisanat Brut", icon: Palette }
      ]
    }
  ];

  const handleAnswer = (ans: string) => {
    const newAnswers = [...answers, ans];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      generateResult(newAnswers);
    }
  };

  const generateResult = async (finalAnswers: string[]) => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `L'utilisateur a répondu à un quiz de style pour la marque de luxe africaine SÈGANDÉ. Réponses : ${finalAnswers.join(', ')}. 
      Définis son "Style Persona" en 3 phrases poétiques et suggère un type de produit SÈGANDÉ (ex: textile indigo, poterie, bijou). Format JSON: { "persona": "...", "recommendation": "..." }`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      // Fix: Ensure the parsed data matches the expected interface
      const data = JSON.parse(response.text || '{}') as StylePersonaResult;
      setResult(data);
    } catch (e) {
      // Fix: Corrected fallback to match StylePersonaResult interface
      setResult({ 
        persona: "Vous êtes un explorateur de beauté authentique.", 
        recommendation: "Nos textiles tissés main." 
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-background-dark min-h-screen py-24 px-8 text-white flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {!result && !loading && (
          <div className="text-center space-y-12">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">AI Style Concierge</span>
            <h1 className="text-5xl font-black uppercase tracking-tight">{questions[step].q}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {questions[step].options.map(opt => (
                <button 
                  key={opt.label}
                  onClick={() => handleAnswer(opt.label)}
                  className="bg-charcoal p-10 rounded-2xl border border-white/5 hover:border-primary group transition-all"
                >
                  <opt.icon size={32} className="mx-auto mb-6 text-sand group-hover:text-primary transition-colors" />
                  <span className="font-bold uppercase tracking-widest text-[10px]">{opt.label}</span>
                </button>
              ))}
            </div>
            <p className="text-sand/30 text-[10px] uppercase font-bold">Étape {step + 1} de {questions.length}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-40 space-y-8 animate-pulse">
            <Sparkles size={48} className="text-primary mx-auto animate-spin" />
            <h2 className="text-2xl font-black uppercase tracking-widest">Analyse de votre aura stylistique...</h2>
          </div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-charcoal p-16 rounded-3xl border border-white/10 text-center space-y-10 shadow-2xl">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Votre Profil SÈGANDÉ</h2>
            {/* Fix: Property persona now exists on the typed result object */}
            <p className="text-xl italic text-sand/80 leading-relaxed font-light">{result.persona}</p>
            <div className="p-8 border border-primary/20 bg-primary/5 rounded-xl">
              <p className="text-[10px] uppercase font-black text-primary tracking-widest mb-2">Recommandation Exclusive</p>
              {/* Fix: Property recommendation now exists on the typed result object */}
              <p className="text-lg font-bold">{result.recommendation}</p>
            </div>
            <div className="flex justify-center gap-6">
              <button onClick={() => { setStep(0); setResult(null); setAnswers([]); }} className="flex items-center gap-2 text-xs font-bold uppercase text-sand/40 hover:text-white transition-colors">
                <RefreshCcw size={14} /> Recommencer
              </button>
              <button className="bg-primary text-black px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest flex items-center gap-3">
                Voir la collection <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StyleQuiz;
