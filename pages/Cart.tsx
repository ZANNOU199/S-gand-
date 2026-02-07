
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../App';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="bg-background-dark min-h-[70vh] flex flex-col items-center justify-center text-center p-6 text-white">
        <div className="text-white/10 mb-10 relative">
           <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150"></div>
           <ShoppingBag className="w-24 h-24 relative" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none">Votre Sac est Vide</h2>
        <p className="text-sand/40 mb-12 max-w-sm text-xs font-bold uppercase tracking-widest leading-relaxed">Découvrez nos collections d'exception pour trouver votre pièce idéale.</p>
        <Link to="/category/all" className="bg-primary text-background-dark px-14 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all shadow-2xl">
          Explorer la Maison
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background-dark min-h-screen pt-8 md:pt-16 pb-24 text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">Mon Panier</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Sac d'Achat</h1>
          </div>
          <p className="text-sand/40 text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">
            {cart.length} Pièce(s) sélectionnée(s)
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1 space-y-6 w-full">
            {cart.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 md:gap-8 bg-charcoal/30 p-6 md:p-8 rounded-[2rem] border border-white/5 group hover:border-primary/20 transition-all duration-500">
                <div className="w-full sm:w-40 aspect-square rounded-2xl overflow-hidden shrink-0 bg-charcoal border border-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter text-white mb-2 leading-none">{item.name}</h3>
                      <p className="text-[10px] text-sand/40 font-black uppercase tracking-widest mb-4">{item.variantName}</p>
                      <p className="text-xs text-primary font-black uppercase">Exclusivité Maison</p>
                    </div>
                    <p className="text-xl font-black text-white shrink-0">{(item.price * item.quantity).toLocaleString()} <span className="text-[10px]">FCFA</span></p>
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center gap-6 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-black text-white text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[9px] font-black text-sand/30 hover:text-red-500 transition-colors uppercase flex items-center gap-2 group/btn"
                    >
                      <Trash2 size={16} className="group-hover/btn:animate-pulse" />
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="w-full lg:w-[400px] bg-charcoal p-10 rounded-[2.5rem] border border-white/10 lg:sticky lg:top-32 shadow-2xl space-y-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary border-b border-primary/20 pb-6">Récapitulatif</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sand/50 text-[10px] font-black uppercase tracking-widest">
                <span>Articles</span>
                <span className="text-white">{total.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-sand/50 text-[10px] font-black uppercase tracking-widest">
                <span>Livraison</span>
                <span className="text-mint">OFFERTE</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-white font-black uppercase text-xs tracking-widest">Total</span>
                <span className="text-3xl font-black text-primary leading-none">{total.toLocaleString()} <span className="text-xs font-normal">FCFA</span></span>
              </div>
            </div>
            <div className="space-y-4 pt-4">
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary text-background-dark font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-4 group/checkout"
              >
                Passer au Paiement <ArrowRight size={18} className="group-hover/checkout:translate-x-2 transition-transform" />
              </button>
              <button onClick={() => navigate('/')} className="w-full text-[9px] font-black uppercase text-sand/40 hover:text-white transition-colors tracking-widest">
                Continuer mes achats
              </button>
            </div>
            <div className="pt-6 flex flex-col items-center gap-4 opacity-30 grayscale scale-90">
              <div className="flex gap-4">
                <img src="https://cdn.fedapay.com/assets/img/logos/fedapay-logo.png" className="h-4 object-contain" alt="FedaPay" />
              </div>
              <p className="text-[8px] text-center text-sand/40 uppercase tracking-[0.2em] leading-loose">
                Paiement Mobile Money & Cartes Sécurisé. <br/> Expédition sous 24/48h.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
