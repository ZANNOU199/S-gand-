
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useCMS } from '../App';
import { GoogleGenAI } from '@google/genai';
import { 
  LayoutDashboard, Package, Plus, 
  Edit, Trash2, Layout, Lock, Star, Layers, Save, RefreshCw, Cloud,
  Users, ShoppingCart, DollarSign, Menu, X, Eye, Mail, Send, Copy, Sparkles, CheckCircle, History, ChevronLeft, ChevronRight, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const { 
    sectors, addSector, updateSector, deleteSector,
    products, addProduct, updateProduct, deleteProduct, toggleFeaturedProduct,
    orders, subscribers, campaigns, contactMessages, deleteContactMessage, saveCampaign, siteConfig, updateSiteConfig, 
    isAdminAuthenticated, setAdminAuthenticated 
  } = useCMS();

  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === '9090') {
      setAdminAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinCode('');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-charcoal p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl text-center">
          <Lock size={40} className="mx-auto text-primary mb-6" />
          <h1 className="text-2xl font-black uppercase mb-8 tracking-tighter">ADMIN VAULT</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" maxLength={4} value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder="PIN" className="w-full bg-white/5 border border-white/10 text-center text-4xl py-6 rounded-2xl font-black tracking-[0.5em] text-white outline-none focus:border-primary transition-all" />
            {pinError && <p className="text-red-500 text-[10px] font-bold uppercase">Code incorrect</p>}
            <button className="w-full bg-primary text-black font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-white">ACCÉDER</button>
          </form>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-charcoal w-full">
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cloud className="text-primary" />
          <span className="font-black text-xl uppercase text-white">ADMIN</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-white/40"><X size={24} /></button>
      </div>
      <nav className="flex-1 p-6 space-y-2">
        {[
          { icon: LayoutDashboard, label: 'Vue Globale', path: '/admin' },
          { icon: ShoppingCart, label: 'Ventes', path: '/admin/sales' },
          { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
          { icon: Layers, label: 'Univers', path: '/admin/sectors' },
          { icon: Package, label: 'Inventaire', path: '/admin/inventory' },
          { icon: Mail, label: 'Newsletters', path: '/admin/newsletters' },
          { icon: Layout, label: 'Vitrine', path: '/admin/site-config' },
        ].map(item => (
          <Link key={item.label} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === item.path ? 'bg-primary text-black shadow-xl shadow-primary/20' : 'text-sand/50 hover:bg-white/5'}`}>
            <item.icon size={18} /> {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-6">
        <button onClick={() => setAdminAuthenticated(false)} className="w-full text-[10px] font-black uppercase text-red-500/60 p-4 border border-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all">Déconnexion</button>
      </div>
    </div>
  );

  const MessagesManager = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <h2 className="text-3xl font-black uppercase text-white tracking-tighter">Messages Clients</h2>
      <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden shadow-2xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] font-black uppercase text-sand/40 tracking-widest">
            <tr>
              <th className="p-8">Date</th>
              <th className="p-8">Expéditeur</th>
              <th className="p-8">Email</th>
              <th className="p-8">Aperçu</th>
              <th className="p-8 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white">
            {contactMessages.map(m => (
              <tr key={m.id} className="hover:bg-white/5 group transition-all">
                <td className="p-8 text-xs text-sand/40">{new Date(m.created_at).toLocaleDateString()}</td>
                <td className="p-8 text-xs font-black uppercase">{m.first_name} {m.last_name}</td>
                <td className="p-8 text-xs text-primary">{m.email}</td>
                <td className="p-8 text-xs opacity-50 truncate max-w-[200px]">{m.message}</td>
                <td className="p-8 text-right space-x-2">
                  <button onClick={() => setSelectedMessage(m)} className="p-3 bg-white/5 rounded-xl hover:text-primary transition-all"><Eye size={16}/></button>
                  <button onClick={() => { if(confirm('Supprimer ce message ?')) deleteContactMessage(m.id); }} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
            {contactMessages.length === 0 && <tr><td colSpan={5} className="p-20 text-center text-sand/10 uppercase font-black">Aucun message</td></tr>}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMessage(null)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-charcoal w-full max-w-lg p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black uppercase">{selectedMessage.first_name} {selectedMessage.last_name}</h3>
                    <p className="text-xs text-primary">{selectedMessage.email}</p>
                  </div>
                  <button onClick={() => setSelectedMessage(null)} className="p-2 hover:text-primary"><X size={20}/></button>
               </div>
               <div className="bg-white/5 p-6 rounded-2xl text-sm leading-relaxed text-sand/80 whitespace-pre-wrap italic">
                 "{selectedMessage.message}"
               </div>
               <button onClick={() => setSelectedMessage(null)} className="w-full bg-primary text-black font-black py-4 rounded-xl uppercase text-[10px]">Fermer</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-background-dark min-h-screen flex text-white relative">
      <div className="lg:hidden absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-background-dark border-b border-white/5">
        <div className="flex items-center gap-2"><Cloud className="text-primary size-5" /><span className="font-black text-xs uppercase">ADMIN</span></div>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-primary"><Menu size={24} /></button>
      </div>

      <aside className={`fixed lg:static inset-0 z-[100] lg:z-0 lg:flex w-full lg:w-80 bg-charcoal border-r border-white/10 h-screen transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <SidebarContent />
      </aside>

      <main className="flex-1 p-6 pt-24 md:p-16 lg:pt-16 overflow-y-auto h-screen custom-scrollbar">
        <Routes>
          <Route index element={<div className="text-3xl font-black uppercase">Bienvenue Admin</div>} />
          <Route path="sales" element={<div>Ventes</div>} />
          <Route path="messages" element={<MessagesManager />} />
          <Route path="sectors" element={<div>Univers</div>} />
          <Route path="inventory" element={<div>Inventaire</div>} />
          <Route path="newsletters" element={<div>Newsletters</div>} />
          <Route path="site-config" element={<div>Config</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
