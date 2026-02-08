
import React from 'react';
import { useCMS, useCart } from '../App';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, ShieldCheck, ChevronRight, LogOut, Clock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const { orders } = useCMS();
  const { wishlist } = useCart();
  const navigate = useNavigate();

  // Simulation d'un utilisateur (à connecter à Supabase Auth si nécessaire)
  const user = {
    name: "Amara Diop",
    email: "amara.diop@example.com",
    memberSince: "Janvier 2024",
    status: "Membre Privilège"
  };

  const userOrders = orders.filter(o => o.customer_email === user.email);

  return (
    <div className="bg-background-dark min-h-screen pt-12 pb-24 text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        
        {/* Header Profile */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 animate-in fade-in duration-700">
          <div className="flex items-center gap-6">
            <div className="size-20 md:size-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary relative overflow-hidden group">
              <User size={40} className="group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">{user.name}</h1>
                <span className="bg-mint/10 text-mint text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-mint/20">{user.status}</span>
              </div>
              <p className="text-sand/40 text-xs font-bold uppercase tracking-widest">Membre de la Maison depuis {user.memberSince}</p>
            </div>
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors">
            <LogOut size={16} /> Déconnexion
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="space-y-4">
            {[
              { icon: Package, label: 'Mes Commandes', active: true },
              { icon: Heart, label: 'Ma Wishlist', path: '/wishlist' },
              { icon: ShieldCheck, label: 'Sécurité & Accès' },
              { icon: Settings, label: 'Préférences' },
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => item.path && navigate(item.path)}
                className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${item.active ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-charcoal/30 border-white/5 text-sand/40 hover:border-white/10 hover:text-white'}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
                <ChevronRight size={14} className={item.active ? 'opacity-100' : 'opacity-20'} />
              </button>
            ))}
          </aside>

          {/* Main Content: Orders History */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-charcoal/30 rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h2 className="font-black uppercase text-[10px] tracking-widest text-sand/40">Historique des Acquisitions</h2>
                <span className="text-[10px] font-black bg-white/5 px-3 py-1 rounded-full">{userOrders.length} Commandes</span>
              </div>
              
              <div className="divide-y divide-white/5">
                {userOrders.length > 0 ? userOrders.map((order) => (
                  <div key={order.id} className="p-8 hover:bg-white/5 transition-colors group">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 bg-mint/10 rounded-lg flex items-center justify-center text-mint">
                             <Clock size={14} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase text-white">Commande #{order.transaction_id?.slice(-6) || order.id.slice(-6)}</p>
                            <p className="text-[9px] text-sand/40 font-bold uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex -space-x-3 overflow-hidden">
                          {order.items.slice(0, 3).map((item: any, idx: number) => (
                            <img key={idx} src={item.image} className="size-10 rounded-full border-2 border-background-dark object-cover" />
                          ))}
                          {order.items.length > 3 && (
                            <div className="size-10 rounded-full border-2 border-background-dark bg-charcoal flex items-center justify-center text-[8px] font-bold">+{order.items.length - 3}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col justify-between items-end gap-2">
                        <p className="text-lg font-black text-primary">{order.total.toLocaleString()} FCFA</p>
                        <span className="bg-mint/10 text-mint text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-mint/20">Livré</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="p-20 text-center space-y-6">
                    <div className="text-sand/10 flex justify-center"><Package size={48} /></div>
                    <p className="text-[10px] font-black uppercase text-sand/30 tracking-widest">Aucune acquisition pour le moment</p>
                    <Link to="/category/all" className="inline-block bg-primary/10 text-primary border border-primary/20 px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all">Parcourir la Maison</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Loyalty / Benefits Section */}
            <div className="bg-gradient-to-br from-charcoal to-background-dark p-8 md:p-10 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
              <div className="flex-1 space-y-4">
                <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Programme de Fidélité</span>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Votre Prestige Maison</h3>
                <p className="text-sand/40 text-xs leading-relaxed max-w-md">Accédez à des avant-premières exclusives, des invitations à nos ateliers artisanaux et une conciergerie dédiée.</p>
              </div>
              <div className="relative size-32 shrink-0">
                 <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                 <div className="relative size-full border-2 border-primary/30 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary leading-none">1250</p>
                      <p className="text-[8px] font-black uppercase text-sand/40 tracking-widest mt-1">Points</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
