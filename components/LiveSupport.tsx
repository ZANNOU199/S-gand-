
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const LiveSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Tu es le concierge de SÈGANDÉ, une marque de luxe africaine. Ton ton est extrêmement poli, raffiné et poétique. Aide l'utilisateur avec ses questions sur l'artisanat, les commandes ou le style."
        }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Je m'excuse, une petite interférence dans la connexion." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "Nos artisans sont occupés, je reviens vers vous vite." }]);
    }
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      {isOpen ? (
        <div className="bg-charcoal w-[350px] h-[500px] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-primary p-4 flex justify-between items-center text-black">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <span className="font-black text-xs uppercase tracking-widest">Conciergerie SÈGANDÉ</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-background-dark/50">
            <div className="bg-white/5 p-3 rounded-lg text-xs italic text-sand/60">
              Bienvenue dans l'univers SÈGANDÉ. Comment puis-je vous accompagner aujourd'hui ?
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${m.role === 'user' ? 'bg-primary text-black font-bold' : 'bg-white/10 text-white border border-white/5'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-primary animate-pulse uppercase font-black">Rédaction en cours...</div>}
          </div>

          <div className="p-4 border-t border-white/5 bg-charcoal flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Votre requête..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-primary outline-none"
            />
            <button onClick={handleSend} className="bg-primary p-2 rounded-lg text-black hover:bg-white transition-colors">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="size-16 bg-primary text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
        >
          <MessageSquare size={24} className="group-hover:animate-bounce" />
        </button>
      )}
    </div>
  );
};

export default LiveSupport;
