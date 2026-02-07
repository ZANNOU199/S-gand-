
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../App';
import { 
  LayoutDashboard, Package, Plus, 
  Edit, Trash2, Menu, X, Layout, Lock, Star, Phone, Layers, Save, RefreshCw, Cloud
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { 
    sectors, addSector, updateSector, deleteSector,
    products, addProduct, updateProduct, deleteProduct, toggleFeaturedProduct,
    siteConfig, updateSiteConfig, 
    isAdminAuthenticated, setAdminAuthenticated, isLoading 
  } = useCMS();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingSector, setEditingSector] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
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
      <div className="min-h-screen bg-background-dark flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-charcoal p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl text-center"
        >
          <div className="size-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 text-white">SÈGANDÉ VAULT</h1>
          <p className="text-sand/40 text-[9px] uppercase font-bold tracking-[0.2em] mb-8">Accès Cloud Sécurisé</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" maxLength={4} value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder="****"
              className={`w-full bg-white/5 border ${pinError ? 'border-red-500' : 'border-white/10'} text-center text-4xl py-4 rounded-xl font-black tracking-[0.5em] text-white outline-none focus:border-primary transition-all`}
            />
            <button className="w-full bg-primary text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-all">DÉVERROUILLER</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full bg-charcoal ${mobile ? 'w-full' : ''}`}>
      <div className="p-8 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3 text-primary">
          <Cloud size={20} className="animate-pulse" />
          <span className="font-black text-lg tracking-tighter uppercase">CLOUD ADMIN</span>
        </div>
        {mobile && <button onClick={() => setIsMobileMenuOpen(false)} className="text-white"><X /></button>}
      </div>
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {[
          { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
          { icon: Layers, label: 'Univers', path: '/admin/sectors' },
          { icon: Package, label: 'Inventaire', path: '/admin/inventory' },
          { icon: Layout, label: 'Configuration', path: '/admin/site-config' },
        ].map(item => (
          <Link 
            key={item.label} to={item.path} onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              location.pathname === item.path ? 'bg-primary text-black' : 'text-sand/50 hover:bg-white/5'
            }`}
          >
            <item.icon size={16} /> {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t border-white/5">
        <button onClick={() => setAdminAuthenticated(false)} className="w-full text-[9px] font-black uppercase text-red-500/60 hover:text-red-500 p-4 rounded-xl transition-all border border-red-500/10 hover:bg-red-500/5">Fermer la session</button>
      </div>
    </div>
  );

  const SectorsEditor = () => {
    const handleSave = async () => {
      setIsSaving(true);
      if (sectors.find(s => s.slug === editingSector.originalSlug)) {
        const { originalSlug, ...cleanSector } = editingSector;
        await updateSector(originalSlug, cleanSector);
      } else {
        await addSector(editingSector);
      }
      setIsSaving(false);
      setEditingSector(null);
    };

    return (
      <div className="space-y-12 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black uppercase text-white">Univers de Marque</h2>
          <button onClick={() => setEditingSector({ name: '', slug: '', image: '' })} className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase flex items-center gap-2"><Plus size={14} /> Nouvel Univers</button>
        </div>

        {editingSector ? (
          <div className="bg-charcoal p-8 rounded-3xl border border-primary/20 space-y-8 max-w-4xl">
             <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="font-black uppercase text-white">Éditeur d'Univers</h3>
                <button onClick={() => setEditingSector(null)} className="text-white/40"><X /></button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Nom de l'Univers</label>
                  <input placeholder="ex: Nid du Bien-Être" value={editingSector.name} onChange={e => setEditingSector({...editingSector, name: e.target.value})} className="admin-input" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Identifiant URL (slug)</label>
                  <input placeholder="ex: bien-etre" value={editingSector.slug} onChange={e => setEditingSector({...editingSector, slug: e.target.value})} className="admin-input" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Lien de l'image de couverture</label>
                  <input placeholder="URL de l'image" value={editingSector.image} onChange={e => setEditingSector({...editingSector, image: e.target.value})} className="admin-input" />
                </div>
             </div>
             <button onClick={handleSave} disabled={isSaving} className="w-full bg-primary text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest shadow-xl shadow-primary/20">
               {isSaving ? <RefreshCw className="animate-spin" /> : <Save size={16}/>} Publier sur Supabase
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map(sector => (
              <div key={sector.slug} className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden group">
                <div className="aspect-video relative">
                  <img src={sector.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-black text-white uppercase">{sector.name}</h3>
                  </div>
                </div>
                <div className="p-4 flex gap-2">
                  <button onClick={() => setEditingSector({...sector, originalSlug: sector.slug})} className="flex-1 bg-white/5 py-3 rounded-xl text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"><Edit size={14}/> Éditer</button>
                  <button onClick={() => deleteSector(sector.slug)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const InventoryManager = () => {
    const handleSave = async () => {
      setIsSaving(true);
      if (products.find(p => p.id === editingProduct.id)) {
        await updateProduct(editingProduct);
      } else {
        await addProduct(editingProduct);
      }
      setIsSaving(false);
      setEditingProduct(null);
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black uppercase text-white">Inventaire Cloud</h2>
          <button onClick={() => setEditingProduct({
            name: "Nouvelle Pièce", slug: "new-" + Date.now(), price: 0, description: "", images: [""], 
            sector: sectors[0]?.slug || '', variants: [{id: 'v1', color: 'Standard', size: 'U', stock: 1, sku: 'SKU'}], 
            rating: 5, reviews_count: 0, badges: ["Nouveauté"]
          })} className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase flex items-center gap-2"><Plus size={14} /> Ajouter un produit</button>
        </div>

        {editingProduct ? (
          <div className="bg-charcoal p-8 rounded-3xl border border-primary/20 space-y-8 max-w-5xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-xl font-black uppercase text-white">Détails du Produit</h3>
              <button onClick={() => setEditingProduct(null)} className="text-white/40"><X /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Nom</label>
                  <input value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="admin-input" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Slug</label>
                  <input value={editingProduct.slug} onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})} className="admin-input" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Prix (FCFA)</label>
                  <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="admin-input" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Univers</label>
                  <select value={editingProduct.sector} onChange={e => setEditingProduct({...editingProduct, sector: e.target.value})} className="admin-input">
                    {sectors.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Image URL</label>
                  <input value={editingProduct.images[0]} onChange={e => setEditingProduct({...editingProduct, images: [e.target.value]})} className="admin-input" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Description</label>
                  <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="admin-input h-32 resize-none" />
                </div>
              </div>
            </div>
            <button onClick={handleSave} disabled={isSaving} className="w-full bg-primary text-black font-black py-4 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
              {isSaving ? <RefreshCw className="animate-spin" /> : <Save size={18}/>} Mettre à jour la base de données
            </button>
          </div>
        ) : (
          <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-sand/40">
                    <tr>
                      <th className="p-6">Produit</th>
                      <th className="p-6">Univers</th>
                      <th className="p-6">Prix</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-white/5 text-white">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-white/5 group transition-colors">
                        <td className="p-6 flex items-center gap-4">
                          <img src={p.images[0]} className="size-10 object-contain bg-white/10 rounded p-1" />
                          <p className="font-black uppercase tracking-tight">{p.name}</p>
                        </td>
                        <td className="p-6 text-sand/60 font-bold uppercase">{sectors.find(s => s.slug === p.sector)?.name || p.sector}</td>
                        <td className="p-6 font-black text-primary">{p.price.toLocaleString()} FCFA</td>
                        <td className="p-6">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => toggleFeaturedProduct(p.id)} className={`p-2 rounded-lg ${p.is_featured ? 'text-primary' : 'text-sand/20'}`}><Star size={16} fill={p.is_featured ? "currentColor" : "none"}/></button>
                            <button onClick={() => setEditingProduct({...p})} className="p-2 text-white/40 hover:text-white transition-colors"><Edit size={16} /></button>
                            <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-background-dark min-h-screen flex text-white overflow-hidden">
      <aside className="hidden lg:flex w-72 bg-charcoal border-r border-white/10 h-screen sticky top-0 flex-col shrink-0">
        <Sidebar />
      </aside>

      <div className="lg:hidden fixed top-20 left-0 w-full bg-charcoal/95 backdrop-blur-xl z-[90] px-6 py-4 flex justify-between items-center border-b border-white/10">
        <span className="text-[10px] font-black uppercase text-primary flex items-center gap-2"><Cloud size={14} /> SÈGANDÉ CLOUD</span>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-white"><Menu /></button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-0 z-[100] lg:hidden">
            <Sidebar mobile />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 p-6 md:p-12 mt-32 lg:mt-0 overflow-y-auto h-screen custom-scrollbar">
        {isLoading ? (
          <div className="h-full flex items-center justify-center animate-pulse text-primary font-black uppercase tracking-widest">Synchronisation...</div>
        ) : (
          <Routes>
            <Route index element={
              <div className="space-y-12">
                <header><h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Tableau de bord</h1></header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Univers Actifs", value: sectors.length, icon: Layers },
                    { label: "Total Produits", value: products.length, icon: Package },
                    { label: "Pièces en Vedette", value: products.filter(p => p.is_featured).length, icon: Star }
                  ].map(stat => (
                    <div key={stat.label} className="bg-charcoal p-8 rounded-3xl border border-white/5">
                      <stat.icon className="text-primary mb-6" size={24} />
                      <p className="text-[9px] uppercase font-black text-sand/40 mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="sectors" element={<SectorsEditor />} />
            <Route path="inventory" element={<InventoryManager />} />
            <Route path="site-config" element={
              <div className="space-y-12 max-w-4xl">
                <header><h2 className="text-3xl font-black uppercase">Design & Hero</h2></header>
                <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-8">
                   <div className="space-y-1">
                     <label className="text-[9px] font-black text-primary uppercase pl-2">Titre Principal Hero</label>
                     <input value={siteConfig.heroTitle} onChange={e => updateSiteConfig({ heroTitle: e.target.value })} className="admin-input" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[9px] font-black text-primary uppercase pl-2">Sous-titre Hero</label>
                     <textarea value={siteConfig.heroSubtitle} onChange={e => updateSiteConfig({ heroSubtitle: e.target.value })} className="admin-input h-24" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[9px] font-black text-primary uppercase pl-2">Lien Image de Fond Hero</label>
                     <input value={siteConfig.heroImage} onChange={e => updateSiteConfig({ heroImage: e.target.value })} className="admin-input" />
                   </div>
                </div>
              </div>
            } />
          </Routes>
        )}
      </main>

      <style>{`
        .admin-input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 14px 18px; border-radius: 14px; color: white; font-size: 13px; outline: none; transition: all 0.2s; }
        .admin-input:focus { border-color: #ec9213; background: rgba(255,255,255,0.06); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
