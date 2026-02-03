
import React from 'react';
import { motion } from 'framer-motion';
import { Package, User, MapPin, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import { useCart } from '../App';

const UserDashboard: React.FC = () => {
  const { cart } = useCart();

  const orders = [
    { id: 'SEG-8821', date: '12 Oct 2023', total: 450, status: 'Livré', items: 2 },
    { id: 'SEG-4492', date: '05 Jan 2024', total: 320, status: 'En préparation', items: 1 },
  ];

  return (
    <div className="bg-background-dark min-h-screen pt-12 md:pt-24 pb-24 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Header - Stacked on mobile */}
        <header className="mb-10 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">Mon Espace</span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Bienvenue, Amara</h1>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase text-sand/40 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-full">
            <LogOut size={14} /> Déconnexion
          </button>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10 md:gap-12">
          
          {/* Navigation - Horizontal scroll on mobile, Sidebar on desktop */}
          <aside className="lg:col-span-1">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
              {[
                { icon: User, label: 'Profil', active: true },
                { icon: Package, label: 'Commandes', active: false },
                { icon: MapPin, label: 'Adresses', active: false },
                { icon: CreditCard, label: 'Paiement', active: false },
              ].map(item => (
                <button 
                  key={item.label}
                  className={`flex items-center gap-3 px-5 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${item.active ? 'bg-primary text-black' : 'bg-white/5 lg:bg-transparent text-sand/50 hover:bg-white/10 hover:text-white'}`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10 md:space-y-12">
            
            {/* Quick Stats - 2 columns on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-charcoal/50 p-5 md:p-6 rounded-2xl border border-white/5">
                <p className="text-[9px] uppercase font-black text-sand/40 tracking-widest mb-1">Commandes</p>
                <p className="text-xl md:text-2xl font-black text-white">12</p>
              </div>
              <div className="bg-charcoal/50 p-5 md:p-6 rounded-2xl border border-white/5">
                <p className="text-[9px] uppercase font-black text-sand/40 tracking-widest mb-1">Points</p>
                <p className="text-xl md:text-2xl font-black text-primary">2,450</p>
              </div>
              <div className="col-span-2 md:col-span-1 bg-charcoal/50 p-5 md:p-6 rounded-2xl border border-white/5">
                <p className="text-[9px] uppercase font-black text-sand/40 tracking-widest mb-1">Statut Membre</p>
                <p className="text-xl md:text-2xl font-black text-white">ÉLITE</p>
              </div>
            </div>

            {/* Order History */}
            <section className="bg-charcoal/30 rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-white/5 bg-charcoal/20">
                <h3 className="text-[10px] font-black uppercase tracking-widest">Historique Récent</h3>
              </div>
              <div className="divide-y divide-white/5">
                {orders.map(order => (
                  <div key={order.id} className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-5 md:gap-6">
                      <div className="size-10 md:size-12 bg-white/5 rounded-full flex items-center justify-center text-primary shrink-0">
                        <Package size={18} md:size={20} />
                      </div>
                      <div>
                        <p className="font-black text-xs md:text-sm uppercase">{order.id}</p>
                        <p className="text-[9px] md:text-[10px] text-sand/40 uppercase font-bold tracking-widest">{order.date} • {order.items} article(s)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full sm:w-auto gap-8 sm:gap-12 pl-14 sm:pl-0">
                      <div className="text-left sm:text-right">
                        <p className="font-black text-sm md:text-base">€{order.total}.00</p>
                        <p className={`text-[8px] md:text-[9px] uppercase font-black tracking-widest ${order.status === 'Livré' ? 'text-green-500' : 'text-primary'}`}>
                          {order.status}
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-sand/20 group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Profile Info Shortcut */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-white/5 bg-charcoal/20 space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Adresse de Livraison</h4>
                </div>
                <p className="text-xs text-sand/50 leading-relaxed font-bold uppercase">
                  Amara Diop <br/>
                  Victoria Island, Lagos <br/>
                  Nigeria
                </p>
                <button className="text-[9px] font-black uppercase text-primary border-b border-primary/20 pb-1">Modifier</button>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-charcoal/20 space-y-4">
                <div className="flex items-center gap-3">
                  <CreditCard size={16} className="text-primary" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Paiement par défaut</h4>
                </div>
                <p className="text-xs text-sand/50 leading-relaxed font-bold uppercase">
                  Visa parvenant par **** 4492 <br/>
                  Expire le 12/26
                </p>
                <button className="text-[9px] font-black uppercase text-primary border-b border-primary/20 pb-1">Gérer</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
