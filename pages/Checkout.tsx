
import React, { useState } from 'react';
import { useCart } from '../App';
import { ShieldCheck, Truck, CreditCard, ChevronRight } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, total } = useCart();
  const [step, setStep] = useState(1);

  return (
    <div className="bg-background-dark min-h-screen py-24 text-white">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          {/* Progress */}
          <div className="flex items-center gap-4 mb-12">
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div className={`size-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= s ? 'bg-primary text-background-dark' : 'bg-white/10 text-white/30'}`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-px ${step > s ? 'bg-primary' : 'bg-white/10'}`} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-black uppercase">Livraison</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Prénom" className="bg-white/5 border-white/10 p-4 rounded-lg outline-none focus:border-primary" />
                <input placeholder="Nom" className="bg-white/5 border-white/10 p-4 rounded-lg outline-none focus:border-primary" />
              </div>
              <input placeholder="Adresse" className="w-full bg-white/5 border-white/10 p-4 rounded-lg outline-none focus:border-primary" />
              <div className="grid grid-cols-3 gap-4">
                <input placeholder="Code Postal" className="bg-white/5 border-white/10 p-4 rounded-lg outline-none focus:border-primary" />
                <input placeholder="Ville" className="bg-white/5 border-white/10 p-4 rounded-lg outline-none focus:border-primary" />
                <input placeholder="Pays" className="bg-white/5 border-white/10 p-4 rounded-lg outline-none focus:border-primary" />
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-primary text-black font-black py-5 rounded-lg uppercase tracking-widest">Passer au paiement</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-black uppercase">Paiement</h2>
              <div className="p-6 border border-primary bg-primary/5 rounded-xl flex items-center gap-4">
                <CreditCard className="text-primary" />
                <span className="font-bold uppercase tracking-widest text-sm">Carte Bancaire (Stripe)</span>
              </div>
              <input placeholder="Numéro de carte" className="w-full bg-white/5 border-white/10 p-4 rounded-lg outline-none focus:border-primary" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="MM/AA" className="bg-white/5 border-white/10 p-4 rounded-lg outline-none focus:border-primary" />
                <input placeholder="CVC" className="bg-white/5 border-white/10 p-4 rounded-lg outline-none focus:border-primary" />
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-primary text-black font-black py-5 rounded-lg uppercase tracking-widest">Confirmer la commande</button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-20 space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="size-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck size={40} />
              </div>
              <h2 className="text-4xl font-black uppercase">Merci !</h2>
              <p className="text-sand/50">Votre commande #SEG-4492 est en cours de préparation artisanale.</p>
              <button className="text-primary font-bold uppercase tracking-widest border-b border-primary pb-1">Suivre mon colis</button>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="bg-charcoal/50 p-8 rounded-2xl border border-white/10 h-fit">
          <h3 className="font-black uppercase tracking-widest mb-8">Votre Panier</h3>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} className="size-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase">{item.name}</p>
                  <p className="text-[10px] text-sand/40">Qté: {item.quantity}</p>
                </div>
                <p className="text-xs font-bold text-primary">€{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 space-y-2">
            <div className="flex justify-between text-xs text-sand/50"><span>Sous-total</span><span>€{total}</span></div>
            <div className="flex justify-between text-xs text-sand/50"><span>Livraison</span><span>Gratuit</span></div>
            <div className="flex justify-between text-lg font-black text-white pt-2"><span>TOTAL</span><span>€{total}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
