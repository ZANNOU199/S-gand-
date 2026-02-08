
import React, { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { useCMS } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const { siteConfig, sendContactMessage } = useCMS();
  const { contact } = siteConfig;
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;
    
    setIsSending(true);
    await sendContactMessage({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      message: formData.message
    });
    setIsSending(false);
    setShowSuccess(true);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="bg-background-dark min-h-screen py-16 md:py-24 px-6 md:px-8 text-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <span className="text-primary font-black uppercase tracking-widest text-[10px] mb-4 block">Nous Contacter</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">Contact</h1>
          <p className="text-sand/50 text-sm md:text-base leading-relaxed mb-12 max-w-md uppercase font-bold tracking-wide">
            {contact.subtitle}
          </p>
          
          <div className="space-y-10">
            <div className="flex items-start gap-6 group">
              <div className="size-12 bg-white/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-sand/40">Email</p>
                <p className="text-base font-bold text-white">{contact.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="size-12 bg-white/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-sand/40">Téléphone</p>
                <p className="text-base font-bold text-white">{contact.phone1}</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="size-12 bg-white/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-sand/40">Adresse</p>
                <p className="text-base font-bold text-white">{contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-charcoal p-8 md:p-12 rounded-3xl border border-white/5 animate-in fade-in slide-in-from-right duration-700 relative">
          <AnimatePresence>
            {showSuccess && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-charcoal/95 z-10 rounded-3xl flex flex-col items-center justify-center text-center p-8">
                <CheckCircle size={48} className="text-mint mb-4" />
                <h3 className="text-xl font-black uppercase mb-2">Message envoyé</h3>
                <p className="text-sm text-sand/60">Nous reviendrons vers vous très prochainement.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <h3 className="text-2xl font-black uppercase mb-8 tracking-tight">Envoyer un Message</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-sand/40 pl-1">Prénom</label>
                <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="contact-input" type="text" placeholder="AMARA" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-sand/40 pl-1">Nom</label>
                <input value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="contact-input" type="text" placeholder="DIOP" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-sand/40 pl-1">Email</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="contact-input" placeholder="CONTACT@EXEMPLE.COM" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-sand/40 pl-1">Message</label>
              <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="contact-input resize-none h-32" placeholder="VOTRE MESSAGE ICI..."></textarea>
            </div>
            <button disabled={isSending} className="w-full bg-primary text-background-dark font-black py-5 rounded-xl uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all shadow-xl disabled:opacity-50">
              {isSending ? 'ENVOI...' : 'Soumettre la requête'}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .contact-input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; color: white; font-weight: 700; font-size: 13px; outline: none; transition: all 0.3s; }
        .contact-input:focus { border-color: #ec9213; background: rgba(255,255,255,0.06); }
      `}</style>
    </div>
  );
};

export default Contact;
