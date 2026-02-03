
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../App';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, Settings, Plus, 
  FileText, BarChart3, Edit, Trash2, Save, Menu, X, Globe, Type, Layout, Image as ImageIcon
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { siteConfig, sectors, products, updateSiteConfig, updateSectors, updateProducts } = useCMS();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
    { icon: Layout, label: 'Page Accueil', path: '/admin/site-config' },
    { icon: Globe, label: 'Domaines d\'Activité', path: '/admin/sectors' },
    { icon: Package, label: 'Inventaire Produits', path: '/admin/inventory' },
    { icon: FileText, label: 'Journal (Editorial)', path: '/admin/editorial' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-charcoal">
      <div className="p-8 flex items-center gap-3 text-primary border-b border-white/5">
        <div className="size-8 bg-primary/20 rounded flex items-center justify-center font-black">S</div>
        <span className="font-black brand-font text-lg tracking-tighter">SÈGANDÉ CMS</span>
      </div>
      
      <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
        <p className="text-[9px] uppercase font-black text-sand/30 tracking-[0.3em] mb-4 px-2">CMS Management</p>
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

      <div className="p-6 border-t border-white/5 bg-charcoal/50">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-white/5 rounded-xl text-sand/40 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
          <Settings size={14} /> Paramètres Généraux
        </button>
      </div>
    </div>
  );

  // --- CMS COMPONENTS ---

  const HeroManager = () => {
    const [localConfig, setLocalConfig] = useState(siteConfig);
    const [saved, setSaved] = useState(false);

    const save = () => {
      updateSiteConfig(localConfig);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    };

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black uppercase tracking-tight">Configuration Accueil</h2>
          <button onClick={save} className={`${saved ? 'bg-green-500' : 'bg-primary'} text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl transition-all`}>
            <Save size={14} /> {saved ? 'Enregistré' : 'Enregistrer'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><Type size={14}/> Textes Hero</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-black uppercase text-sand/40 mb-2 block tracking-widest">Titre Principal</label>
                <textarea 
                  value={localConfig.heroTitle}
                  onChange={e => setLocalConfig({...localConfig, heroTitle: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-white resize-none" 
                  rows={2}
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-sand/40 mb-2 block tracking-widest">Description</label>
                <textarea 
                  value={localConfig.heroSubtitle}
                  onChange={e => setLocalConfig({...localConfig, heroSubtitle: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-primary resize-none h-32 text-white" 
                />
              </div>
            </div>
          </div>

          <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><ImageIcon size={14}/> Image Hero</h3>
            <div className="space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative group">
                <img src={localConfig.heroImage} className="w-full h-full object-cover opacity-80" alt="Preview" />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-sand/40 mb-2 block tracking-widest">URL de l'image de fond</label>
                <input 
                  value={localConfig.heroImage}
                  onChange={e => setLocalConfig({...localConfig, heroImage: e.target.value})}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs outline-none focus:border-primary text-white" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SectorsManager = () => {
    const remove = (slug: string) => updateSectors(sectors.filter(s => s.slug !== slug));
    const add = () => {
      const newSector = { 
        name: "Nouveau Domaine", 
        slug: `nouveau-${Date.now()}`, 
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFtQq4SKIJ1tBTQDr_KTdHSlBC9_5C4DgZnSdMyq6cRDomP4iZdMXbVJfyGBh7EwOHsF-Go-PSB01feh_csQaRlliVU0gv0nAb2CqAgg_ensxurMtLwG_u7yNaqm0nIJc80auQeKJgK-9NR_qo1T9b98dOt9OgP6tKQfWVDRsI1ysFJINaYlwzTMEVdJwGoAoSm9ner2dkHKYJILs1QKDmrBRw_y89kWEnyK1fRFrv3tyEq2oJM2YCu--4w4UHZgqLG4Jt8xMcxzb9" 
      };
      updateSectors([...sectors, newSector]);
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-3xl font-black uppercase tracking-tight">Domaines d'Activité</h2>
          <button onClick={add} className="bg-primary text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg">
            <Plus size={14} /> Ajouter un domaine
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((s, idx) => (
            <div key={s.slug} className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden flex flex-col group">
              <div className="aspect-[3/2] bg-white/5 relative overflow-hidden">
                <img src={s.image} className="w-full h-full object-cover opacity-60 transition-transform group-hover:scale-105" alt={s.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <label className="text-[9px] font-black uppercase text-primary mb-2 tracking-widest">Nom du secteur</label>
                  <input 
                    value={s.name}
                    onChange={e => {
                      const newS = [...sectors];
                      newS[idx].name = e.target.value;
                      newS[idx].slug = e.target.value.toLowerCase().replace(/\s+/g, '-');
                      updateSectors(newS);
                    }}
                    className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-3 text-xs font-black uppercase w-full outline-none focus:border-primary text-white"
                  />
                </div>
              </div>
              <div className="p-4 bg-charcoal/80 space-y-4">
                 <div>
                    <label className="text-[8px] font-black uppercase text-sand/40 mb-1 block tracking-widest">Image URL</label>
                    <input 
                      value={s.image}
                      onChange={e => {
                        const newS = [...sectors];
                        newS[idx].image = e.target.value;
                        updateSectors(newS);
                      }}
                      placeholder="URL Image"
                      className="w-full bg-white/5 border border-white/5 rounded p-2 text-[9px] outline-none text-white focus:border-primary/40"
                    />
                 </div>
                 <button onClick={() => remove(s.slug)} className="w-full py-2 text-[9px] font-black uppercase text-red-500/50 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all flex items-center justify-center gap-1">
                   <Trash2 size={10} /> Supprimer le secteur
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const InventoryManager = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-3xl font-black uppercase tracking-tight">Catalogue Produits</h2>
          <button className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg">
            <Plus size={14} /> Nouveau Produit
          </button>
        </div>

        <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-sand/40">
                <tr>
                  <th className="p-6">Produit</th>
                  <th className="p-6">Catégorie</th>
                  <th className="p-6">Prix</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {products.map((p, idx) => (
                  <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-white/10 shrink-0 overflow-hidden">
                          <img src={p.images[0]} className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <input 
                             value={p.name}
                             onChange={e => {
                               const newP = [...products];
                               newP[idx].name = e.target.value;
                               updateProducts(newP);
                             }}
                             className="bg-transparent border-none p-0 font-black uppercase text-xs focus:ring-0 text-white w-full"
                           />
                           <p className="text-[10px] text-sand/40 font-bold uppercase tracking-tighter">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-[10px] uppercase font-bold text-sand/40 bg-white/5 px-2 py-1 rounded-md">{p.category}</span>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center gap-1 font-black text-primary">
                         <span>€</span>
                         <input 
                           type="number"
                           value={p.price}
                           onChange={e => {
                             const newP = [...products];
                             newP[idx].price = Number(e.target.value);
                             updateProducts(newP);
                           }}
                           className="bg-transparent border-none p-0 w-16 focus:ring-0 font-black"
                         />
                       </div>
                    </td>
                    <td className="p-6">
                       <div className="flex gap-4 justify-end">
                         <button className="text-sand/30 hover:text-primary transition-colors"><Edit size={16} /></button>
                         <button className="text-sand/30 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background-dark min-h-screen flex flex-col md:flex-row text-white overflow-hidden selection:bg-primary selection:text-black">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-6 bg-charcoal border-b border-white/5 z-[100] sticky top-0">
        <div className="flex items-center gap-2 text-primary">
          <div className="size-6 bg-primary/20 rounded flex items-center justify-center font-black text-xs">S</div>
          <span className="font-black brand-font tracking-tighter">SÈGANDÉ CMS</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-primary">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 bg-charcoal z-[101] md:hidden"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-72 bg-charcoal border-r border-white/10 h-screen sticky top-0 flex-col shrink-0 z-50">
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto h-[calc(100vh-80px)] md:h-screen bg-black/10">
        <Routes>
          <Route index element={
            <div className="space-y-12 animate-in fade-in duration-500">
              <header className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Bienvenue Admin</h1>
                <p className="text-sand/40 text-xs md:text-sm font-bold uppercase tracking-widest">Pilotez votre marque de luxe en temps réel.</p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Revenu Mensuel', value: '€82,490', trend: '+14%', icon: BarChart3 },
                  { label: 'Commandes VIP', value: '08', trend: 'Urgent', icon: ShoppingCart },
                  { label: 'Visites Uniques', value: '12.4K', trend: '+22%', icon: FileText },
                  { label: 'Stock Artisanat', value: '428', trend: 'Stable', icon: Package },
                ].map(s => (
                  <div key={s.label} className="bg-charcoal p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="absolute -right-6 -top-6 size-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                    <s.icon size={20} className="text-primary mb-6 relative z-10" />
                    <p className="text-[9px] uppercase font-black text-sand/40 tracking-[0.2em] mb-1 relative z-10">{s.label}</p>
                    <h4 className="text-2xl font-black relative z-10">{s.value}</h4>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="site-config" element={<HeroManager />} />
          <Route path="sectors" element={<SectorsManager />} />
          <Route path="inventory" element={<InventoryManager />} />
          <Route path="editorial" element={<div className="py-40 text-center opacity-10 font-black uppercase text-5xl tracking-widest">Editorial CMS</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
