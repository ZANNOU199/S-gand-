
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, User, MapPin, CreditCard, LogOut, ChevronRight, CheckCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TabType = 'profil' | 'commandes' | 'adresses' | 'paiement';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profil');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    // Simulation de déconnexion
    showNotification("Déconnexion en cours...");
    setTimeout(() => navigate('/'), 1000);
  };

  const orders = [
    { id: 'SEG-8821', date: '12 Oct 2023', total: 450, status: 'Livré', items: 2 },
    { id: 'SEG-4492', date: '05 Jan 2024', total: 320, status: 'En préparation', items: 1 },
    { id: 'SEG-1102', date: '20 Fév 2024', total: 1250, status: 'Livré', items: 1 },
  ];

  const menuItems = [
    { id: 'profil' as TabType, icon: User, label: 'Profil' },
    { id: 'commandes' as TabType, icon: Package, label: 'Commandes' },
    { id: 'adresses' as TabType, icon: MapPin, label: 'Adresses' },
    { id: 'paiement' as TabType, icon: CreditCard, label: 'Paiement' },
  ];

  return (
    <div className="bg-background-dark min-h-screen pt-12 md:pt-24 pb-24 text-white relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] bg-primary text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-bold uppercase text-[10px] tracking-widest"
          >
            <Bell size={16} />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <header className="mb-10 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">Mon Espace</span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              {activeTab === 'profil' ? 'Bienvenue, Amara' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-[10px] font-black uppercase text-sand/40 hover:text-white transition-colors border border-white/10 px-6 py-3 rounded-full hover:bg-white/5"
          >
            <LogOut size={14} /> Déconnexion
          </button>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10 md:gap-12">
          
          {/* Navigation Sidebar/Mobile bar */}
          <aside className="lg:col-span-1">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
              {menuItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-5 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${activeTab === item.id ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-white/5 lg:bg-transparent text-sand/50 hover:bg-white/10 hover:text-white'}`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === 'profil' && (
                <motion.div 
                  key="profil"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10 md:space-y-12"
                >
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-charcoal/50 p-5 md:p-6 rounded-2xl border border-white/5">
                      <p className="text-[9px] uppercase font-black text-sand/40 tracking-widest mb-1">Commandes</p>
                      <p className="text-xl md:text-2xl font-black text-white">{orders.length}</p>
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

                  {/* History Preview */}
                  <section className="bg-charcoal/30 rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-white/5 bg-charcoal/20 flex justify-between items-center">
                      <h3 className="text-[10px] font-black uppercase tracking-widest">Historique Récent</h3>
                      <button onClick={() => setActiveTab('commandes')} className="text-[9px] font-black uppercase text-primary tracking-widest hover:underline">Voir tout</button>
                    </div>
                    <div className="divide-y divide-white/5">
                      {orders.slice(0, 2).map(order => (
                        <div 
                          key={order.id} 
                          onClick={() => showNotification(`Chargement des détails pour ${order.id}...`)}
                          className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-5 md:gap-6">
                            <div className="size-10 md:size-12 bg-white/5 rounded-full flex items-center justify-center text-primary shrink-0">
                              {/* Fix: Replaced invalid md:size prop with Tailwind responsive classes to handle dynamic sizing for Lucide Package icon */}
                              <Package className="w-[18px] h-[18px] md:w-5 md:h-5" />
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

                  {/* Profile Cards */}
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
                      <button 
                        onClick={() => setActiveTab('adresses')}
                        className="text-[9px] font-black uppercase text-primary border-b border-primary/20 pb-1 hover:text-white transition-colors"
                      >
                        Modifier
                      </button>
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
                      <button 
                        onClick={() => setActiveTab('paiement')}
                        className="text-[9px] font-black uppercase text-primary border-b border-primary/20 pb-1 hover:text-white transition-colors"
                      >
                        Gérer
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'commandes' && (
                <motion.div 
                  key="commandes"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-charcoal/30 rounded-2xl border border-white/5"
                >
                  <div className="divide-y divide-white/5">
                    {orders.map(order => (
                      <div key={order.id} className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white/5 transition-colors">
                        <div className="flex gap-6">
                          <div className="size-12 bg-white/5 rounded flex items-center justify-center text-primary">
                            <Package size={20} />
                          </div>
                          <div>
                            <h4 className="font-black text-sm uppercase">{order.id}</h4>
                            <p className="text-[10px] text-sand/40 font-bold uppercase tracking-widest">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-12 w-full md:w-auto justify-between">
                          <div className="text-right">
                            <p className="font-black">€{order.total}.00</p>
                            <p className="text-[9px] uppercase text-primary font-black">{order.status}</p>
                          </div>
                          <button 
                            onClick={() => showNotification(`Commande ${order.id} en cours de suivi.`)}
                            className="bg-white/5 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
                          >
                            Détails
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'adresses' && (
                <motion.div 
                  key="adresses"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 gap-6"
                >
                  <div className="p-8 bg-charcoal/30 rounded-2xl border-2 border-primary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-6">
                      <div className="size-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Principale</h4>
                        <p className="text-sm font-bold uppercase">Amara Diop</p>
                        <p className="text-xs text-sand/50 leading-relaxed uppercase">Victoria Island, Lagos, Nigeria</p>
                      </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <button 
                        onClick={() => showNotification("Interface d'édition d'adresse...")}
                        className="flex-1 md:flex-none border border-white/10 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5"
                      >
                        Éditer
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => showNotification("Ouverture du formulaire nouvelle adresse...")}
                    className="p-8 border-2 border-dashed border-white/5 rounded-2xl text-sand/30 hover:text-primary hover:border-primary/20 transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3"
                  >
                    <PlusIcon /> Ajouter une adresse
                  </button>
                </motion.div>
              )}

              {activeTab === 'paiement' && (
                <motion.div 
                  key="paiement"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-8 bg-charcoal/30 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-6">
                      <div className="size-12 bg-white/5 text-white rounded-full flex items-center justify-center shrink-0">
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-sand/40 mb-1">Mode de paiement</h4>
                        <p className="text-sm font-bold uppercase">Visa se terminant par **** 4492</p>
                        <p className="text-xs text-sand/50 uppercase">Expire le 12/26</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => showNotification("Suppression sécurisée du moyen de paiement...")}
                      className="text-[9px] font-black uppercase text-red-500 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                  <button 
                    onClick={() => showNotification("Ajout d'une nouvelle carte...")}
                    className="w-full p-8 border-2 border-dashed border-white/5 rounded-2xl text-sand/30 hover:text-primary hover:border-primary/20 transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3"
                  >
                    <PlusIcon /> Lier une nouvelle carte
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple plus icon for reusable buttons
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default UserDashboard;
