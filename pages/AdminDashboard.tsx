
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useCMS } from '../App';
import { 
  LayoutDashboard, Package, Plus, 
  Edit, Trash2, Layout, Lock, Star, Layers, Save, RefreshCw, Cloud, ArrowLeft
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { 
    sectors, addSector, updateSector, deleteSector,
    products, addProduct, updateProduct, deleteProduct, toggleFeaturedProduct,
    siteConfig, updateSiteConfig, 
    isAdminAuthenticated, setAdminAuthenticated 
  } = useCMS();

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
      <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-charcoal p-12 rounded-3xl border border-white/5 shadow-2xl text-center">
          <Lock size={48} className="mx-auto text-primary mb-8" />
          <h1 className="text-3xl font-black uppercase mb-8">ADMIN VAULT</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" maxLength={4} value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder="PIN"
              className="w-full bg-white/5 border border-white/10 text-center text-4xl py-6 rounded-2xl font-black tracking-[0.5em] text-white outline-none focus:border-primary transition-all"
            />
            {pinError && <p className="text-red-500 text-[10px] font-bold uppercase">Code incorrect</p>}
            <button className="w-full bg-primary text-black font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-white transition-all">ACCÉDER</button>
          </form>
        </div>
      </div>
    );
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-charcoal w-full">
      <div className="p-8 flex items-center gap-3 border-b border-white/5">
        <Cloud className="text-primary" />
        <span className="font-black text-xl uppercase text-white">SÈGANDÉ CLOUD</span>
      </div>
      <nav className="flex-1 p-6 space-y-4">
        {[
          { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
          { icon: Layers, label: 'Univers', path: '/admin/sectors' },
          { icon: Package, label: 'Inventaire', path: '/admin/inventory' },
          { icon: Layout, label: 'Vitrine', path: '/admin/site-config' },
        ].map(item => (
          <Link 
            key={item.label} to={item.path} 
            className={`flex items-center gap-4 px-6 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
              location.pathname === item.path ? 'bg-primary text-black shadow-xl shadow-primary/20' : 'text-sand/50 hover:bg-white/5'
            }`}
          >
            <item.icon size={18} /> {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-6">
        <button onClick={() => setAdminAuthenticated(false)} className="w-full text-[10px] font-black uppercase text-red-500/60 p-4 border border-red-500/10 rounded-xl">Quitter</button>
      </div>
    </div>
  );

  const SectorsEditor = () => {
    const handleSave = async () => {
      if (!editingSector.name || !editingSector.slug) return alert("Nom et Slug requis");
      setIsSaving(true);
      try {
        if (editingSector.id) {
          // Cas de modification : on a un ID
          await updateSector(editingSector.id, editingSector);
        } else {
          // Est-ce que le slug existe déjà dans la liste locale ? Si oui, on tente un update par slug
          const existing = sectors.find(s => s.slug === editingSector.slug);
          if (existing) {
            await updateSector(existing.id, editingSector);
          } else {
            await addSector(editingSector);
          }
        }
        setEditingSector(null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(false);
      }
    };

    if (editingSector) {
      return (
        <div className="max-w-4xl space-y-10 animate-in fade-in duration-300">
          <button onClick={() => setEditingSector(null)} className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest"><ArrowLeft size={16}/> Annuler</button>
          <div className="bg-charcoal p-10 rounded-3xl border border-primary/20 space-y-8 shadow-2xl">
            <h2 className="text-2xl font-black uppercase text-white">{editingSector.id ? 'Éditer l\'Univers' : 'Nouvel Univers'}</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Nom de l'Univers</label>
                <input value={editingSector.name} onChange={e => setEditingSector({...editingSector, name: e.target.value})} className="admin-input" placeholder="ex: Nid du Bien-Être" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Slug (Identifiant Unique)</label>
                <input value={editingSector.slug} onChange={e => setEditingSector({...editingSector, slug: e.target.value})} className="admin-input" placeholder="ex: bien-etre" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Image de couverture (URL)</label>
                <input value={editingSector.image} onChange={e => setEditingSector({...editingSector, image: e.target.value})} className="admin-input" placeholder="URL HTTPS" />
              </div>
            </div>
            <button onClick={handleSave} disabled={isSaving} className="w-full bg-primary text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 shadow-lg">
              {isSaving ? <RefreshCw className="animate-spin" /> : <Save size={18}/>} ENREGISTRER L'UNIVERS
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-black uppercase text-white">Univers de Marque</h2>
          <button onClick={() => setEditingSector({ name: '', slug: '', image: '' })} className="bg-primary text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase flex items-center gap-2">
            <Plus size={16} /> Créer
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map(s => (
            <div key={s.id || s.slug} className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden shadow-xl group">
              <div className="aspect-video relative bg-black">
                <img src={s.image || "https://via.placeholder.com/800x600"} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="font-black text-white uppercase text-xl">{s.name}</p>
                  <p className="text-[9px] text-primary font-bold tracking-widest uppercase">
                    {s.id ? `ID: ${s.id}` : `SLUG: ${s.slug}`}
                  </p>
                </div>
              </div>
              <div className="p-4 flex gap-2 bg-charcoal">
                <button onClick={() => setEditingSector({...s})} className="flex-1 bg-white/5 py-4 rounded-xl text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"><Edit size={14}/> Éditer</button>
                <button onClick={() => { if(confirm(`Supprimer définitivement l'univers ${s.name} ?`)) deleteSector(s.id); }} className="p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
          {sectors.length === 0 && (
            <div className="col-span-full py-20 text-center text-sand/20 font-black uppercase tracking-widest border border-dashed border-white/10 rounded-3xl">
              Aucun univers dans le cloud.
            </div>
          )}
        </div>
      </div>
    );
  };

  const InventoryManager = () => {
    const handleSave = async () => {
      if (!editingProduct.name || !editingProduct.price) return alert("Nom et Prix requis");
      setIsSaving(true);
      try {
        if (editingProduct.id) await updateProduct(editingProduct);
        else await addProduct(editingProduct);
        setEditingProduct(null);
      } finally { setIsSaving(false); }
    };

    if (editingProduct) {
      return (
        <div className="max-w-5xl space-y-10 animate-in fade-in duration-300">
          <button onClick={() => setEditingProduct(null)} className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest"><ArrowLeft size={16}/> Annuler</button>
          <div className="bg-charcoal p-12 rounded-3xl border border-primary/20 space-y-10 shadow-2xl">
            <h2 className="text-3xl font-black uppercase text-white">{editingProduct.id ? 'Éditer la pièce' : 'Nouvelle création'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Nom du produit</label>
                  <input value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="admin-input" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Slug (URL)</label>
                  <input value={editingProduct.slug} onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})} className="admin-input" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Prix (FCFA)</label>
                    <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="admin-input" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Univers</label>
                    <select value={editingProduct.sector} onChange={e => setEditingProduct({...editingProduct, sector: e.target.value})} className="admin-input">
                      {sectors.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Image (URL)</label>
                  <input value={editingProduct.images?.[0] || ""} onChange={e => setEditingProduct({...editingProduct, images: [e.target.value]})} className="admin-input" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Description</label>
                  <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="admin-input h-[214px] resize-none" />
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <label className="flex-1 text-[10px] font-black uppercase tracking-widest text-white">Mettre en avant sur l'accueil</label>
                  <input type="checkbox" checked={editingProduct.isFeatured} onChange={e => setEditingProduct({...editingProduct, isFeatured: e.target.checked})} className="size-6 accent-primary" />
                </div>
              </div>
            </div>

            <button onClick={handleSave} disabled={isSaving} className="w-full bg-primary text-black font-black py-6 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest shadow-2xl shadow-primary/20 hover:bg-white transition-all">
              {isSaving ? <RefreshCw className="animate-spin" /> : <Save size={20}/>} PUBLIER DANS LE CLOUD
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-black uppercase text-white">Inventaire</h2>
          <button onClick={() => setEditingProduct({ name: '', slug: '', price: 0, sector: sectors[0]?.slug || '', images: [''], description: '', isFeatured: false, variants: [], badges: [] })} className="bg-primary text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase flex items-center gap-2">
            <Plus size={16} /> Ajouter une pièce
          </button>
        </div>
        <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-sand/40">
                <tr>
                  <th className="p-8">Produit</th>
                  <th className="p-8">Univers</th>
                  <th className="p-8">Prix</th>
                  <th className="p-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white">
                {products.length > 0 ? products.map(p => (
                  <tr key={p.id || p.slug} className="hover:bg-white/5 transition-colors group">
                    <td className="p-8 flex items-center gap-6">
                      <div className="size-16 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden border border-white/5">
                        <img src={p.images[0]} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-lg uppercase">{p.name}</span>
                        <span className="text-[8px] text-white/20 uppercase tracking-widest">ID: {p.id || p.slug}</span>
                      </div>
                    </td>
                    <td className="p-8">
                      <span className="text-[10px] font-black uppercase text-sand/60 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        {sectors.find(s => s.slug === p.sector)?.name || p.sector}
                      </span>
                    </td>
                    <td className="p-8 font-black text-primary text-lg">{p.price.toLocaleString()} FCFA</td>
                    <td className="p-8">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => toggleFeaturedProduct(p.id)} title="Mettre en avant" className={`p-3 rounded-xl transition-all ${p.isFeatured ? 'bg-primary text-black' : 'bg-white/5 text-white/20 hover:text-white/40'}`}>
                          <Star size={18} fill={p.isFeatured ? 'currentColor' : 'none'} />
                        </button>
                        <button onClick={() => setEditingProduct({...p})} className="p-3 bg-white/5 text-white/40 hover:text-white rounded-xl border border-white/5 transition-all"><Edit size={18}/></button>
                        <button onClick={() => { if(confirm(`Supprimer ${p.name} ?`)) deleteProduct(p.id); }} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-sand/20 uppercase font-black tracking-widest">
                      L'inventaire est vide.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background-dark min-h-screen flex text-white overflow-hidden">
      <aside className="hidden lg:flex w-80 bg-charcoal border-r border-white/10 h-screen sticky top-0 shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto h-screen custom-scrollbar">
        <Routes>
          <Route index element={
            <div className="space-y-16">
              <h1 className="text-6xl font-black uppercase tracking-tighter text-white">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { label: "Univers", value: sectors.length, icon: Layers },
                  { label: "Pièces", value: products.length, icon: Package },
                  { label: "En Vedette", value: products.filter(p => p.isFeatured).length, icon: Star }
                ].map(stat => (
                  <div key={stat.label} className="bg-charcoal p-12 rounded-3xl border border-white/5 shadow-xl hover:border-primary/20 transition-all">
                    <stat.icon className="text-primary mb-8" size={32} />
                    <p className="text-[10px] uppercase font-black text-sand/40 mb-2 tracking-widest">{stat.label}</p>
                    <p className="text-5xl font-black text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="sectors" element={<SectorsEditor />} />
          <Route path="inventory" element={<InventoryManager />} />
          <Route path="site-config" element={
            <div className="max-w-4xl space-y-12">
              <h2 className="text-4xl font-black uppercase text-white">Configuration Vitrine</h2>
              <div className="bg-charcoal p-10 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Titre Hero</label>
                  <input value={siteConfig.heroTitle} onChange={e => updateSiteConfig({ heroTitle: e.target.value })} className="admin-input" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Sous-titre Hero</label>
                  <textarea value={siteConfig.heroSubtitle} onChange={e => updateSiteConfig({ heroSubtitle: e.target.value })} className="admin-input h-32 resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Image Hero</label>
                  <input value={siteConfig.heroImage} onChange={e => updateSiteConfig({ heroImage: e.target.value })} className="admin-input" />
                </div>
                <button onClick={() => alert("Configuration sauvegardée")} className="w-full bg-white text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-primary transition-all">Sauvegarder Globalement</button>
              </div>
            </div>
          } />
        </Routes>
      </main>

      <style>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 18px 24px;
          border-radius: 16px;
          color: white;
          font-weight: 700;
          font-size: 15px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-input:focus {
          border-color: #ec9213;
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 20px rgba(236, 146, 19, 0.1);
        }
        select.admin-input {
          appearance: none;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
