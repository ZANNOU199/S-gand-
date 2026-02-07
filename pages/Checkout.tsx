
import React, { useState, useEffect } from 'react';
import { useCart, useCMS } from '../App';
import { ShieldCheck, CreditCard, Loader2, ArrowRight, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

declare var FedaPay: any;

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const { createOrder } = useCMS();
  const [step, setStep] = useState(1); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Cotonou'
  });

  // Vérifier si le SDK FedaPay est bien chargé au montage du composant
  useEffect(() => {
    const checkSdk = setInterval(() => {
      if (typeof FedaPay !== 'undefined') {
        setSdkReady(true);
        clearInterval(checkSdk);
      }
    }, 500);
    return () => clearInterval(checkSdk);
  }, []);

  const handlePayment = () => {
    // 1. Validation des champs
    if (!customer.email || !customer.phone || !customer.firstName) {
      alert("Veuillez remplir au moins le Prénom, l'Email et le Téléphone.");
      return;
    }

    // 2. Vérification du SDK
    if (typeof FedaPay === 'undefined') {
      alert("Le service de paiement n'est pas encore prêt. Veuillez rafraîchir la page.");
      return;
    }

    setIsProcessing(true);

    try {
      // 3. Configuration et Ouverture du Checkout
      FedaPay.init({
        public_key: 'pk_sandbox_MzMxVkj0kYgxGPfQe1UgWi4O'
      });

      FedaPay.checkout({
        transaction: {
          amount: Math.round(total),
          description: `Commande SÈGANDÉ - ${cart.length} articles`,
        },
        customer: {
          firstname: customer.firstName,
          lastname: customer.lastName || 'Client',
          email: customer.email,
          phone_number: {
            number: customer.phone.replace(/\s/g, ''), // Nettoyage du numéro
            country: 'bj' // minuscule obligatoire pour FedaPay
          }
        },
        onComplete: async (response: any) => {
          console.log("FedaPay Response:", response);
          
          if (response.status === 'approved' || response.status === 'successful') {
            const orderData = {
              customer_name: `${customer.firstName} ${customer.lastName}`,
              customer_email: customer.email,
              customer_phone: customer.phone,
              total: total,
              status: 'completed' as const,
              items: cart,
              transaction_id: response.transaction.reference || response.transaction.id
            };

            await createOrder(orderData);
            setStep(2);
            clearCart();
          } else {
            alert("Le paiement n'a pas été approuvé. Veuillez réessayer.");
            setIsProcessing(false);
          }
        }
      });
      
      // On garde un fallback pour débloquer le bouton si l'utilisateur ferme la popup manuellement
      // (FedaPay n'a pas toujours de callback onClose fiable dans tous les navigateurs)
      setTimeout(() => setIsProcessing(false), 5000);

    } catch (error) {
      console.error("FedaPay Error:", error);
      alert("Une erreur est survenue lors du lancement du paiement.");
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && step !== 2) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-black uppercase mb-6">Votre panier est vide</h2>
        <button onClick={() => window.location.hash = '#/'} className="text-primary font-bold uppercase tracking-widest text-xs border-b border-primary">Retour à la boutique</button>
      </div>
    );
  }

  return (
    <div className="bg-background-dark min-h-screen py-12 md:py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {!sdkReady && step === 1 && (
          <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4 text-primary text-xs font-bold uppercase animate-pulse">
            <Loader2 className="animate-spin" size={16} /> Chargement du module de paiement sécurisé...
          </div>
        )}

        {step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              <header className="space-y-4">
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Maison SÈGANDÉ — Checkout</span>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Paiement Sécurisé</h1>
              </header>

              <div className="bg-charcoal/30 p-8 md:p-10 rounded-3xl border border-white/5 space-y-8 shadow-2xl">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-primary" size={20} />
                  <h2 className="text-sm font-black uppercase tracking-widest">Détails de facturation</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    value={customer.firstName} 
                    onChange={e => setCustomer({...customer, firstName: e.target.value})} 
                    placeholder="PRÉNOM *" 
                    className="admin-input-style" 
                  />
                  <input 
                    value={customer.lastName} 
                    onChange={e => setCustomer({...customer, lastName: e.target.value})} 
                    placeholder="NOM" 
                    className="admin-input-style" 
                  />
                </div>
                
                <input 
                  type="email" 
                  value={customer.email} 
                  onChange={e => setCustomer({...customer, email: e.target.value})} 
                  placeholder="EMAIL POUR LA FACTURE *" 
                  className="admin-input-style" 
                />
                
                <div className="relative">
                  <input 
                    type="tel" 
                    value={customer.phone} 
                    onChange={e => setCustomer({...customer, phone: e.target.value})} 
                    placeholder="NUMÉRO MOBILE MONEY (EX: 66000000) *" 
                    className="admin-input-style" 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-sand/20 uppercase tracking-widest">Benin (+229)</div>
                </div>

                <textarea 
                  value={customer.address} 
                  onChange={e => setCustomer({...customer, address: e.target.value})} 
                  placeholder="ADRESSE DE LIVRAISON PRÉCISE" 
                  className="admin-input-style h-24 resize-none" 
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-primary/5 rounded-3xl border border-primary/20 gap-8">
                <div className="flex items-center gap-4 text-primary font-black uppercase tracking-widest text-[10px]">
                  <Lock size={16} /> Vos données sont protégées
                </div>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing || !sdkReady}
                  className="w-full md:w-auto bg-primary text-black font-black px-16 py-6 rounded-2xl uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shadow-[0_20px_40px_-10px_rgba(236,146,19,0.3)] flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> INITIALISATION...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} /> CONFIRMER ET PAYER
                    </>
                  )}
                </button>
              </div>
            </div>

            <aside className="lg:h-fit lg:sticky lg:top-32">
              <div className="bg-charcoal p-10 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-10">
                <h3 className="font-black uppercase tracking-[0.4em] text-[10px] text-primary border-b border-primary/10 pb-6">Votre Panier</h3>
                <div className="space-y-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.image} className="size-12 rounded-lg object-cover bg-white/5" alt={item.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase truncate">{item.name}</p>
                        <p className="text-[9px] text-sand/40 font-bold uppercase tracking-widest">x{item.quantity}</p>
                      </div>
                      <p className="text-[11px] font-black text-primary">{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-8 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black text-primary leading-none">{total.toLocaleString()} <span className="text-[10px]">FCFA</span></span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-20 space-y-12 animate-in fade-in zoom-in duration-1000">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150"></div>
              <div className="relative size-32 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto border-4 border-primary/20 shadow-2xl">
                <CheckCircle2 size={64} className="animate-bounce" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Commande Reçue.</h2>
              <p className="text-sand/50 uppercase font-bold tracking-[0.5em] text-[10px]">Bienvenue dans le cercle SÈGANDÉ.</p>
            </div>
            <div className="bg-charcoal/50 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 shadow-2xl">
              <p className="text-xs text-sand/60 leading-relaxed italic mb-8">
                Votre transaction de <span className="text-primary font-black">{total.toLocaleString()} FCFA</span> a été confirmée par FedaPay. Un artisan prendra contact avec vous d'ici 24h.
              </p>
              <button onClick={() => window.location.hash = '#/'} className="bg-white text-black font-black px-12 py-5 rounded-full uppercase text-[10px] tracking-widest hover:bg-primary transition-all">
                RETOUR À LA BOUTIQUE
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .admin-input-style {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 22px 28px;
          color: white;
          font-weight: 700;
          font-size: 13px;
          outline: none;
          transition: all 0.3s;
        }
        .admin-input-style:focus {
          border-color: #ec9213;
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 30px rgba(236,146,19,0.1);
        }
        .admin-input-style::placeholder { color: rgba(255,255,255,0.1); font-size: 11px; letter-spacing: 0.1em; }
      `}</style>
    </div>
  );
};

export default Checkout;
