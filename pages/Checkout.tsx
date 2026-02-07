
import React, { useState, useEffect } from 'react';
import { useCart, useCMS } from '../App';
import { ShieldCheck, CreditCard, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

declare var FedaPay: any; // Pour TypeScript car le script est chargé dans index.html

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const { createOrder } = useCMS();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });

  const handleCheckout = () => {
    if (!customer.email || !customer.phone || !customer.firstName) {
      alert("Veuillez remplir vos informations de contact pour continuer.");
      return;
    }

    setIsProcessing(true);

    // Initialisation du Widget FedaPay
    FedaPay.checkout({
      public_key: 'pk_sandbox_MzMxVkj0kYgxGPfQe1UgWi4O',
      transaction: {
        amount: total,
        description: `Commande SÈGANDÉ - ${cart.length} articles`,
      },
      customer: {
        firstname: customer.firstName,
        lastname: customer.lastName,
        email: customer.email,
        phone_number: {
            number: customer.phone,
            country: 'BJ' // Code pays par défaut (Bénin)
        }
      },
      onComplete: async (response: any) => {
        if (response.status === 'approved') {
          // Paiement réussi ! On enregistre la commande
          const orderData = {
            customer_name: `${customer.firstName} ${customer.lastName}`,
            customer_email: customer.email,
            customer_phone: customer.phone,
            total: total,
            status: 'completed' as const,
            items: cart,
            transaction_id: response.transaction.reference
          };

          const result = await createOrder(orderData);
          if (!result.error) {
            setStep(3);
            clearCart();
          } else {
            alert("Paiement validé mais erreur d'enregistrement. Contactez le support.");
          }
        } else {
          alert("Le paiement n'a pas pu être finalisé.");
        }
        setIsProcessing(false);
      }
    });

    // Simuler un petit délai pour le chargement du widget
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="bg-background-dark min-h-screen py-12 md:py-24 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
        <div className="lg:col-span-2">
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div className={`size-8 md:size-10 rounded-full flex items-center justify-center font-black text-xs md:text-sm ${step >= s ? 'bg-primary text-background-dark shadow-[0_0_20px_rgba(236,146,19,0.3)]' : 'bg-white/5 text-white/20'}`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-px ${step > s ? 'bg-primary' : 'bg-white/5'}`} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Coordonnées</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-sand/40 ml-1">Prénom</label>
                  <input value={customer.firstName} onChange={e => setCustomer({...customer, firstName: e.target.value})} placeholder="Ex: Amara" className="checkout-input" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-sand/40 ml-1">Nom</label>
                  <input value={customer.lastName} onChange={e => setCustomer({...customer, lastName: e.target.value})} placeholder="Ex: Diop" className="checkout-input" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-sand/40 ml-1">Email</label>
                <input type="email" value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} placeholder="votre@email.com" className="checkout-input" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-sand/40 ml-1">Téléphone (Paiement Mobile)</label>
                <input type="tel" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} placeholder="+229 00 00 00 00" className="checkout-input" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-sand/40 ml-1">Adresse de livraison</label>
                <input value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} placeholder="Rue, Quartier, Ville" className="checkout-input" />
              </div>
              <button 
                onClick={() => setStep(2)} 
                disabled={!customer.email || !customer.firstName || !customer.phone}
                className="w-full bg-primary text-black font-black py-5 rounded-xl uppercase tracking-widest hover:bg-white transition-all shadow-2xl disabled:opacity-30"
              >
                Vérifier ma commande
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Confirmation</h2>
                <img src="https://cdn.fedapay.com/assets/img/logos/fedapay-logo.png" className="h-6 object-contain opacity-50 grayscale hover:grayscale-0 transition-all" alt="FedaPay" />
              </div>
              
              <div className="p-8 border-2 border-primary bg-primary/5 rounded-2xl space-y-6">
                <div className="flex items-center gap-4">
                  <CreditCard className="text-primary size-8" />
                  <div>
                    <span className="font-black uppercase tracking-widest text-sm block">Paiement Mobile & Carte</span>
                    <span className="text-[10px] text-sand/50 uppercase font-bold tracking-[0.1em]">Sécurisé par FedaPay Gateway</span>
                  </div>
                </div>
                <div className="bg-charcoal/40 p-4 rounded-xl space-y-2 border border-white/5">
                  <p className="text-[10px] uppercase font-black text-sand/40 tracking-widest">Client</p>
                  <p className="text-sm font-bold text-white">{customer.firstName} {customer.lastName}</p>
                  <p className="text-xs text-sand/60">{customer.email} • {customer.phone}</p>
                </div>
              </div>

              <button 
                onClick={handleCheckout} 
                disabled={isProcessing}
                className="w-full bg-primary text-black font-black py-6 rounded-xl uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-4 text-xs"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Préparation...
                  </>
                ) : (
                  <>
                    Payer {total.toLocaleString()} FCFA avec FedaPay <ArrowRight size={18} />
                  </>
                )}
              </button>
              <button onClick={() => setStep(1)} className="w-full text-[10px] font-black uppercase text-sand/40 hover:text-white transition-colors">Retour aux informations</button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-20 space-y-10 animate-in fade-in zoom-in duration-700">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150"></div>
                <div className="relative size-32 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto border-4 border-primary/20">
                  <CheckCircle2 size={64} className="animate-in zoom-in duration-500 delay-200" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Merci, {customer.firstName}.</h2>
                <p className="text-sand/50 uppercase font-bold tracking-[0.3em] text-[10px]">Votre commande SÈGANDÉ est en route.</p>
              </div>
              <div className="max-w-md mx-auto p-10 bg-charcoal/80 backdrop-blur-md rounded-3xl border border-white/10 space-y-6 shadow-2xl">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-sand/40">
                  <span>Numéro de Commande</span>
                  <span className="text-white">#{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                </div>
                <div className="h-px bg-white/5"></div>
                <p className="text-xs text-sand/60 leading-relaxed italic">
                  Un email de confirmation contenant votre facture détaillée a été envoyé à {customer.email}.
                </p>
              </div>
              <button onClick={() => window.location.href = '/'} className="bg-white text-black font-black px-14 py-5 rounded-full uppercase text-[10px] tracking-widest hover:bg-primary transition-all shadow-xl">
                RETOURNER À LA MAISON
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Order Summary */}
        <div className="bg-charcoal/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 h-fit lg:sticky lg:top-32 shadow-2xl space-y-10">
          <h3 className="font-black uppercase tracking-[0.4em] text-[10px] text-primary border-b border-primary/20 pb-6">Votre Sélection</h3>
          <div className="space-y-8 max-h-[40vh] overflow-y-auto custom-scrollbar pr-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-6 group">
                <div className="size-16 rounded-xl overflow-hidden bg-charcoal shrink-0 border border-white/5">
                  <img src={item.image} className="size-full object-cover transition-transform group-hover:scale-110" alt={item.name} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-[10px] font-black uppercase truncate text-white tracking-widest">{item.name}</p>
                  <p className="text-[9px] text-sand/40 font-bold uppercase tracking-widest mt-2">{item.variantName} • x{item.quantity}</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <p className="text-[11px] font-black text-primary">{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-sand/40"><span>Total Articles</span><span>{total.toLocaleString()} FCFA</span></div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-sand/40"><span>Frais d'expédition</span><span className="text-mint">OFFERT</span></div>
            <div className="flex justify-between items-center pt-6">
              <span className="text-xs font-black uppercase tracking-widest text-white">À payer</span>
              <span className="text-3xl font-black text-primary leading-none">{total.toLocaleString()} <span className="text-[10px] tracking-normal">FCFA</span></span>
            </div>
          </div>
          <div className="pt-4 flex items-center justify-center gap-2 opacity-30 grayscale scale-90">
             <ShieldCheck size={16} />
             <span className="text-[8px] font-black uppercase tracking-[0.2em]">Transaction Chiffrée</span>
          </div>
        </div>
      </div>
      <style>{`
        .checkout-input {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px 24px;
          color: white;
          font-weight: 700;
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
        }
        .checkout-input:focus {
          border-color: #ec9213;
          background: rgba(255,255,255,0.04);
          box-shadow: 0 0 20px rgba(236,146,19,0.1);
        }
        .checkout-input::placeholder { color: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default Checkout;
