
import React from 'react';
import { motion } from 'framer-motion';
import { Package, User, MapPin, CreditCard, LogOut, ChevronRight, Clock } from 'lucide-react';
import { useCart } from '../App';

const UserDashboard: React.FC = () => {
  const { cart } = useCart();

  const orders = [
    { id: 'SEG-8821', date: '12 Oct 2023', total: 450, status: 'Livré', items: 2 },
    { id: 'SEG-4492', date: '05 Jan 2024', total: 320, status: 'En préparation', items: 1 },
  ];

  return (
    <div className="bg-background-dark min-h-screen pt-24 pb-24 text-white">
      <div className="max-w-6xl mx-auto px-8">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-2 block">Mon Espace</span>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Bienvenue, Amara</h1>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold uppercase text-sand/40 hover:text-white transition-colors">
            <LogOut size={16} /> Déconnexion
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Navigation Latérale */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { icon: User, label: 'Profil Personnel', active: true },
              { icon: Package, label: 'Mes Commandes', active: false },
              { icon: MapPin, label: 'Adresses', active: false },
              { icon: CreditCard, label: 'Moyens de Paiement', active: false },
            ].map(item => (
              <button 
                key={item.label}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${item.active ? 'bg-primary text-black' : 'text-sand/50 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </aside>

          {/* Contenu Principal */}
          <div className="lg:col-span-3 space-y-12">
            {/* Statistiques Rapides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-charcoal p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase font-black text-sand/40 tracking-widest mb-1">Commandes totales</p>
                <p className="text-2xl font-black text-white">12</p>
              </div>
              <div className="bg-charcoal p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase font-black text-sand/40 tracking-widest mb-1">Points Fidélité</p>
                <p className="text-2xl font-black text-primary">2,450</p>
              </div>
              <div className="bg-charcoal p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase font-black text-sand/40 tracking-widest mb-1">Statut</p>
                <p className="text-2xl font-black text-white">ÉLITE</p>
              </div>
            </div>

            {/* Historique des Commandes */}
            <section className="bg-charcoal rounded-3xl border border-white/10 overflow-hidden">
              <div className="p-8 border-b border-white/5">
                <h3 className="text-sm font-black uppercase tracking-widest">Historique Récent</h3>
              </div>
              <div className="divide-y divide-white/5">
                {orders.map(order => (
                  <div key={order.id} className="p-8 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-6">
                      <div className="size-12 bg-white/5 rounded-full flex items-center justify-center text-primary">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase">{order.id}</p>
                        <p className="text-[10px] text-sand/40 uppercase font-bold tracking-widest">{order.date} • {order.items} article(s)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="font-black text-sm">€{order.total}.00</p>
                        <p className={`text-[9px] uppercase font-black tracking-widest ${order.status === 'Livré' ? 'text-green-500' : 'text-primary'}`}>{order.status}</p>
                      </div>
                      <ChevronRight size={18} className="text-sand/20 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
