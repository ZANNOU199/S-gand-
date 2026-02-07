
import React, { useState, useEffect } from 'react';
import { useCart, useCMS } from '../App';
import { ShieldCheck, CreditCard, Loader2, CheckCircle2, Lock, AlertCircle } from 'lucide-react';

declare var FedaPay: any;

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
    address: ''
  });

  const handlePayment = () => {
    // 1. Validation de base côté UI
    if (!customer.email || !customer.phone || !customer.firstName) {
      alert("Veuillez remplir les champs obligatoires (Prénom, Email, Téléphone).");
      return;
    }

    // Nettoyage du numéro de téléphone (uniquement les chiffres)
    const cleanPhone = customer.phone.replace(/[^0-9]/g, '');
    
    // Validation du numéro béninois (doit souvent faire 8 ou 10 chiffres pour FedaPay)
    if (cleanPhone.length < 8) {
      alert("Le numéro de téléphone semble invalide. Veuillez entrer un numéro à 8 chiffres (ex: 66000000).");
      return;
    }

    if (typeof FedaPay === 'undefined') {
      alert("Le service de paiement n'est pas chargé. Vérifiez votre connexion internet.");
      return;
    }

    setIsProcessing(true);

    try {
      // 2. Initialisation de la clé
      FedaPay.init({
        public_key: 'pk_sandbox_MzMxVkj0kYgxGPfQe1UgWi4O'
      });

      // 3. Lancement du Checkout
      FedaPay.checkout({
        transaction: {
          amount: Math.ceil(total),
          description: `Commande Maison SÈGANDÉ - ${cart.length} articles`,
        },
        customer: {
          firstname: customer.firstName,
          lastname: customer.lastName || 'Client',
          email: customer.email,
          phone_number: {
            number: cleanPhone,
            country: 'bj' 
          }
        },
        onComplete: async (response: any) => {
          console.log("FedaPay Response:", response);
          
          if (response.status === 'approved' || response.status === 'successful') {
            const orderData = {
              customer_name: `${customer.firstName} ${customer.lastName}`,
              customer_email: customer.email,
              customer_phone: cleanPhone,
              total: total,
              status: 'completed' as const,
              items: cart,
              transaction_id: response.transaction.reference || response.transaction.id
            };

            const result = await createOrder(orderData);
            if (result.error) {
              console.error("Erreur Supabase:", result.error);
            }
            setStep(2);
            clearCart();
          } else {
            alert("Le paiement n'a pas été approuvé (Statut: " + response.status + ").");
          }
          setIsProcessing(false);
        }
      });

      // On débloque le bouton après 10s au cas où la popup est fermée sans callback
      setTimeout(() => setIsProcessing(false), 10000);

    } catch (error: any) {
      console.error("FedaPay Error Details:", error);
      alert("Détails de l'erreur : " + (error.message || "Erreur de configuration FedaPay"));
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && step !== 2) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white p-6">
        <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter">Votre panier est vide</h2>
        <button onClick={() => window.location.hash = '#/'} className="text-primary font-bold uppercase tracking-widest text-[10px] border-b border-primary pb-1">Retour à la boutique</button>
      </div>
    );
  }

  return (
    <div className="bg-background-dark min-h-screen py-12 md:py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              <header className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                  <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Paiement Sécurisé</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Finaliser ma commande</h1>
              </header>

              <div className="bg-charcoal/40 p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-10 shadow-2xl">
                <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <ShieldCheck size={20} />
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-widest">Informations de livraison</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-sand/40 uppercase tracking-widest ml-1">Prénom *</label>
                    <input 
                      value={customer.firstName} 
                      onChange={e => setCustomer({...customer, firstName: e.target.value})} 
                      placeholder="Amara" 
                      className="segande-input" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-sand/40 uppercase tracking-widest ml-1">Nom</label>
                    <input 
                      value={customer.lastName} 
                      onChange={e => setCustomer({...customer, lastName: e.target.value})} 
                      placeholder="Diop" 
                      className="segande-input" 
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-sand/40 uppercase tracking-widest ml-1">Email (Pour la facture) *</label>
                  <input 
                    type="email" 
                    value={customer.email} 
                    onChange={e => setCustomer({...customer, email: e.target.value})} 
                    placeholder="votre@email.com" 
                    className="segande-input" 
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-sand/40 uppercase tracking-widest ml-1">Numéro Mobile Money *</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      value={customer.phone} 
                      onChange={e => setCustomer({...customer, phone: e.target.value})} 
                      placeholder="66000000" 
                      className="segande-input" 
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-30 pointer-events-none">
                      <span className="text-[10px] font-black uppercase tracking-widest">Benin</span>
                      <div className="w-4 h-3 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-sand/40 uppercase tracking-widest ml-1">Adresse complète</label>
                  <textarea 
                    value={customer.address} 
                    onChange={e => setCustomer({...customer, address: e.target.value})} 
                    placeholder="Quartier, Rue, N° de porte..." 
                    className="segande-input h-28 resize-none py-5" 
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-primary/5 rounded-3xl border border-primary/20 gap-8">
                <div className="flex items-center gap-4 text-primary font-black uppercase tracking-widest text-[10px]">
                  <Lock size={16} /> Serveur Sécurisé 256-bit
                </div>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full md:w-auto bg-primary text-black font-black px-20 py-6 rounded-2xl uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> INITIALISATION...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} /> CONFIRMER LE PAIEMENT
                    </>
                  )}
                </button>
              </div>
            </div>

            <aside className="lg:h-fit lg:sticky lg:top-32">
              <div className="bg-charcoal p-10 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-10">
                <h3 className="font-black uppercase tracking-[0.4em] text-[10px] text-primary border-b border-primary/10 pb-6">Sommaire</h3>
                <div className="space-y-6 max-h-[350px] overflow-y-auto custom-scrollbar pr-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center group">
                      <div className="size-14 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10 group-hover:border-primary/30 transition-colors">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase truncate text-white/90">{item.name}</p>
                        <p className="text-[9px] text-sand/40 font-bold uppercase tracking-widest">x{item.quantity} — {item.variantName}</p>
                      </div>
                      <p className="text-[11px] font-black text-primary">{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-8 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-center text-sand/40 text-[10px] font-black uppercase tracking-widest">
                    <span>Livraison</span>
                    <span className="text-mint">GRATUITE</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-black uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black text-primary leading-none">{total.toLocaleString()} <span className="text-[10px]">FCFA</span></span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-24 space-y-12 animate-in fade-in zoom-in duration-1000">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150"></div>
              <div className="relative size-32 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto border-4 border-primary/20 shadow-2xl">
                <CheckCircle2 size={64} className="animate-bounce" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Votre élégance est en route.</h2>
              <p className="text-sand/50 uppercase font-bold tracking-[0.5em] text-[10px]">L'Artisanat Africain à votre porte.</p>
            </div>
            <div className="bg-charcoal/50 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/10 shadow-2xl">
              <p className="text-xs text-sand/60 leading-relaxed italic mb-8">
                Votre transaction de <span className="text-primary font-black">{total.toLocaleString()} FCFA</span> a été validée. Nous vous enverrons un message dès que votre colis quittera l'atelier.
              </p>
              <button onClick={() => window.location.hash = '#/'} className="bg-white text-black font-black px-16 py-6 rounded-full uppercase text-[10px] tracking-widest hover:bg-primary transition-all shadow-xl">
                RETOUR À LA BOUTIQUE
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .segande-input {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 22px 28px;
          color: white;
          font-weight: 700;
          font-size: 14px;
          outline: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .segande-input:focus {
          border-color: #ec9213;
          background: rgba(255,255,255,0.04);
          box-shadow: 0 0 40px rgba(236,146,19,0.15);
        }
        .segande-input::placeholder { color: rgba(255,255,255,0.08); font-size: 12px; }
      `}</style>
    </div>
  );
};

export default Checkout;
