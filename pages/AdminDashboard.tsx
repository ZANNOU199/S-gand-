
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, Settings, Plus, 
  Search, FileText, Truck, BarChart3, Edit, Trash2, ArrowLeft, 
  Save, Image as ImageIcon, Menu, X, Globe, Type, Layout
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Produits', path: '/admin/inventory' },
    { icon: FileText, label: 'Editorial (CMS)', path: '/admin/editorial' },
    { icon: ShoppingCart, label: 'Commandes', path: '/admin/orders' },
    { icon: Users, label: 'CRM Clients', path: '/admin/crm' },
    { icon: Layout, label: 'Config Site', path: '/admin/site-config' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-8 flex items-center gap-3 text-primary border-b border-white/5">
        <div className="size-8 bg-primary/20 rounded flex items-center justify-center font-black">S</div>
        <span className="font-black brand-font text-lg tracking-tighter">SÈGANDÉ CMS</span>
      </div>
      
      <nav className="flex-1 p-6 space-y-1">
        <p className="text-[9px] uppercase font-black text-sand/30 tracking-[0.3em] mb-4 px-2">Gestion</p>
        {navItems.map(item => (
          <Link 
            key={item.label}
            to={item.path}
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
              location.pathname === item.path ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-sand/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sand/40 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors">
          <Settings size={16} /> Paramètres
        </button>
      </div>
    </div>
  );

  // --- CMS SECTIONS ---

  const SiteConfig = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Configuration Site</h2>
        <button className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
          <Save size={14} /> Enregistrer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><Globe size={14}/> En-tête & Annonces</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[9px] font-black uppercase text-sand/40 mb-2 block">Barre d'annonce (Text)</label>
              <input defaultValue="Livraison Monde Offerte | Collection Sahel disponible" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase text-sand/40 mb-2 block">Slogan Hero</label>
              <textarea defaultValue="THE MODERN SOUL OF AFRICA" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-primary resize-none" rows={2} />
            </div>
          </div>
        </div>

        <div className="bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><Type size={14}/> Identité Visuelle</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="size-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-black">S</div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase">Logo Principal</p>
                <p className="text-[9px] text-sand/30">Format SVG recommandé</p>
              </div>
              <button className="text-[10px] font-black uppercase text-primary">Changer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EditorialCMS = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Editorial & Journal</h2>
        <button className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
          <Plus size={14} /> Nouvel Article
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[
          { title: "Le Souffle du Niger", date: "14 Mars 2024", status: "Publié", author: "Team Sèganndé" },
          { title: "L'Indigo : Plus qu'une couleur", date: "02 Mars 2024", status: "Brouillon", author: "Marie K." },
        ].map((art, i) => (
          <div key={i} className="bg-charcoal p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="size-16 bg-white/10 rounded-xl flex-shrink-0" />
              <div>
                <h4 className="font-black uppercase text-sm">{art.title}</h4>
                <p className="text-[10px] text-sand/40 font-bold uppercase tracking-widest mt-1">Par {art.author} • {art.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${art.status === 'Publié' ? 'bg-green-500/10 text-green-500' : 'bg-sand/10 text-sand/40'}`}>
                {art.status}
              </span>
              <div className="flex gap-4">
                <button className="text-sand/30 hover:text-primary transition-colors"><Edit size={16} /></button>
                <button className="text-sand/30 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-background-dark min-h-screen flex flex-col md:flex-row text-white overflow-hidden selection:bg-primary selection:text-black">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-6 bg-charcoal border-b border-white/5 z-50">
        <div className="flex items-center gap-2 text-primary">
          <div className="size-6 bg-primary/20 rounded flex items-center justify-center font-black text-xs">S</div>
          <span className="font-black brand-font tracking-tighter">SÈGANDÉ CMS</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-primary">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-charcoal z-[100] md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="p-8 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-3 text-primary">
                  <div className="size-8 bg-primary/20 rounded flex items-center justify-center font-black">S</div>
                  <span className="font-black brand-font text-lg tracking-tighter">SÈGANDÉ CMS</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-sand/40"><X size={24} /></button>
              </div>
              <SidebarContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-72 bg-charcoal border-r border-white/10 h-screen sticky top-0 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto custom-scrollbar h-[calc(100vh-80px)] md:h-screen">
        <Routes>
          <Route index element={
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Revenu Mensuel', value: '€82,490', trend: '+14%', icon: BarChart3, color: 'text-primary' },
                  { label: 'Commandes en attente', value: '08', trend: 'Urgent', icon: ShoppingCart, color: 'text-white' },
                  { label: 'Vues Journal', value: '12.4K', trend: '+22%', icon: FileText, color: 'text-white' },
                  { label: 'Produits Actifs', value: '428', trend: 'Stable', icon: Package, color: 'text-white' },
                ].map(s => (
                  <div key={s.label} className="bg-charcoal p-6 rounded-3xl border border-white/5 hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="size-10 bg-white/5 rounded-xl flex items-center justify-center text-sand/40"><s.icon size={20} /></div>
                      <span className="text-[10px] font-black text-primary">{s.trend}</span>
                    </div>
                    <p className="text-[9px] uppercase font-black text-sand/40 tracking-widest mb-1">{s.label}</p>
                    <h4 className={`text-2xl font-black ${s.color}`}>{s.value}</h4>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-charcoal p-8 rounded-3xl border border-white/5">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-sm font-black uppercase tracking-widest">Commandes à traiter</h3>
                    <Link to="/admin/orders" className="text-[10px] font-black uppercase text-primary border-b border-primary/20 pb-0.5">Tout gérer</Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-[9px] font-black uppercase text-sand/40 border-b border-white/5">
                        <tr><th className="pb-4">ID</th><th className="pb-4">Client</th><th className="pb-4">Statut</th><th className="pb-4 text-right">Montant</th></tr>
                      </thead>
                      <tbody className="text-xs">
                        {[1, 2, 3].map(i => (
                          <tr key={i} className="border-b border-white/5 last:border-0">
                            <td className="py-4 font-black">#SEG-100{i}</td>
                            <td className="py-4 uppercase font-bold text-sand/60">Client VIP {i}</td>
                            <td className="py-4"><span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black">NEW</span></td>
                            <td className="py-4 text-right font-black">€450.00</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-8">
                   <h3 className="text-sm font-black uppercase tracking-widest">Santé du Stock</h3>
                   <div className="space-y-6">
                      {['Maroquinerie', 'Artisanat', 'Textiles'].map((c, i) => (
                        <div key={c} className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span>{c}</span>
                            <span className={i === 1 ? 'text-red-500' : 'text-sand/40'}>{i === 1 ? 'ALERTE' : 'OK'}</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${i === 1 ? 15 : 85 - i * 15}%` }} 
                              className={`h-full ${i === 1 ? 'bg-red-500' : 'bg-primary'}`} 
                            />
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          } />

          <Route path="inventory" element={
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">Inventaire CMS</h2>
                <button className="bg-primary text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20">
                  <Plus size={16} /> Nouveau Produit
                </button>
              </div>
              
              <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <div className="flex gap-4">
                    {['Tous', 'Mode', 'Art de Vivre', 'Galerie'].map(cat => (
                      <button key={cat} className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/5 hover:border-primary transition-all">
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-sand/40">
                      <tr><th className="p-6">Produit</th><th className="p-6">Catégorie</th><th className="p-6">Prix</th><th className="p-6">Stock</th><th className="p-6"></th></tr>
                    </thead>
                    <tbody className="text-xs">
                      {[1, 2, 3, 4, 5].map(i => (
                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="size-12 rounded-lg bg-white/10 shrink-0" />
                              <span className="font-black uppercase text-xs">Produit Sèganndé #{i}</span>
                            </div>
                          </td>
                          <td className="p-6 text-[10px] uppercase font-bold text-sand/40">Collection Sahel</td>
                          <td className="p-6 font-black text-primary">€450.00</td>
                          <td className="p-6"><span className="text-green-500 font-bold text-[10px] uppercase tracking-widest">24 Unités</span></td>
                          <td className="p-6 text-right">
                             <div className="flex gap-4 justify-end opacity-20 group-hover:opacity-100 transition-opacity">
                               <Edit size={14} className="cursor-pointer hover:text-primary" />
                               <Trash2 size={14} className="cursor-pointer hover:text-red-500" />
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          } />

          <Route path="editorial" element={<EditorialCMS />} />
          <Route path="site-config" element={<SiteConfig />} />
          <Route path="orders" element={<div className="py-40 text-center opacity-10 font-black uppercase text-5xl tracking-widest">Gestion Commandes</div>} />
          <Route path="crm" element={<div className="py-40 text-center opacity-10 font-black uppercase text-5xl tracking-widest">CRM Clients</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
