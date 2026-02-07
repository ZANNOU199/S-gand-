
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
          await updateSector(Number(editingSector.id), editingSector);
        } else {
          await addSector(editingSector);
        }
        setEditingSector(null);
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
                <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Slug (ID URL)</label>
                <input value={editingSector.slug} onChange={e => setEditingSector({...editingSector, slug: e.target.value})} className="admin-input" placeholder="ex: bien-etre" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Image (URL)</label>
                <input value={editingSector.image} onChange={e => setEditingSector({...editingSector, image: e.target.value})} className="admin-input" placeholder="URL HTTPS" />
              </div>
            </div>
            <button onClick={handleSave} disabled={isSaving} className="w-full bg-primary text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50">
              {isSaving ? <RefreshCw className="animate-spin" /> : <Save size={18}/>} ENREGISTRER L'UNIVERS
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-black uppercase text-white">Univers</h2>
          <button onClick={() => setEditingSector({ name: '', slug: '', image: '' })} className="bg-primary text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase flex items-center gap-2">
            <Plus size={16} /> Créer
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map(s => (
            <div key={s.id} className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden shadow-xl group">
              <div className="aspect-video relative bg-black">
                <img src={s.image} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="font-black text-white uppercase text-xl">{s.name}</p>
                </div>
              </div>
              <div className="p-4 flex gap-2">
                <button onClick={() => setEditingSector({...s})} className="flex-1 bg-white/5 py-4 rounded-xl text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"><Edit size={14}/> Éditer</button>
                <button onClick={() => { if(confirm('Supprimer ?')) deleteSector(s.id); }} className="p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 transition-all"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
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
        <div className="max-w-5xl space-y-10">
          <button onClick={() => setEditingProduct(null)} className="flex items-center gap-2 text-primary font-black uppercase text-[10px]"><ArrowLeft size={16}/> Annuler</button>
          <div className="bg-charcoal p-12 rounded-3xl border border-primary/20 space-y-10">
            <h2 className="text-3xl font-black uppercase text-white">{editingProduct.id ? 'Éditer' : 'Ajouter'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <input value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="admin-input" placeholder="Nom" />
                <input value={editingProduct.slug} onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})} className="admin-input" placeholder="Slug" />
                <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="admin-input" placeholder="Prix" />
                <select value={editingProduct.sector} onChange={e => setEditingProduct({...editingProduct, sector: e.target.value})} className="admin-input">
                  {sectors.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-6">
                <input value={editingProduct.images[0]} onChange={e => setEditingProduct({...editingProduct, images: [e.target.value]})} className="admin-input" placeholder="Image URL" />
                <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="admin-input h-32" placeholder="Description" />
                <label className="flex items-center gap-4 text-xs font-black uppercase">
                  <input type="checkbox" checked={editingProduct.isFeatured} onChange={e => setEditingProduct({...editingProduct, isFeatured: e.target.checked})} className="size-6 accent-primary" />
                  Mettre en avant
                </label>
              </div>
            </div>
            <button onClick={handleSave} disabled={isSaving} className="w-full bg-primary text-black font-black py-6 rounded-2xl uppercase">
              {isSaving ? 'Envoi en cours...' : 'Enregistrer dans le Cloud'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-black uppercase text-white">Inventaire</h2>
          <button onClick={() => setEditingProduct({ name: '', slug: '', price: 0, sector: sectors[0]?.slug || '', images: [''], description: '', isFeatured: false })} className="bg-primary text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase flex items-center gap-2">
            <Plus size={16} /> Ajouter
          </button>
        </div>
        <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] font-black uppercase text-sand/40">
              <tr>
                <th className="p-8">Produit</th>
                <th className="p-8">Prix</th>
                <th className="p-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/5">
                  <td className="p-8 flex items-center gap-6">
                    <img src={p.images[0]} className="size-12 object-contain bg-white/5 rounded-lg" />
                    <span className="font-black uppercase">{p.name}</span>
                  </td>
                  <td className="p-8 font-black text-primary">{p.price.toLocaleString()} FCFA</td>
                  <td className="p-8 text-right space-x-2">
                    <button onClick={() => setEditingProduct({...p})} className="p-3 bg-white/5 rounded-xl"><Edit size={18}/></button>
                    <button onClick={() => deleteProduct(Number(p.id))} className="p-3 bg-red-500/10 text-red-500 rounded-xl"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <Route index element={<div className="text-4xl font-black uppercase">Sélectionnez une section</div>} />
          <Route path="sectors" element={<SectorsEditor />} />
          <Route path="inventory" element={<InventoryManager />} />
          <Route path="site-config" element={
            <div className="bg-charcoal p-10 rounded-3xl space-y-8">
              <h2 className="text-3xl font-black uppercase">Site Config</h2>
              <input value={siteConfig.heroTitle} onChange={e => updateSiteConfig({heroTitle: e.target.value})} className="admin-input" placeholder="Hero Title" />
              <button onClick={() => alert('OK')} className="w-full bg-primary text-black py-4 rounded-xl font-black">SAUVEGARDER</button>
            </div>
          } />
        </Routes>
      </main>

      <style>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 16px 20px;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          outline: none;
        }
        .admin-input:focus { border-color: #ec9213; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
