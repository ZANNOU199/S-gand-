
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../App';
// Fix: Import missing Product type
import { Product } from '../types';
import { 
  LayoutDashboard, Package, Settings, Plus, 
  FileText, BarChart3, Edit, Trash2, Menu, X, Globe, Layout, Lock, Star, Phone, Info, ChevronRight, Save
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { sectors, products, updateProducts, siteConfig, updateSiteConfig, toggleFeaturedProduct, isAdminAuthenticated, setAdminAuthenticated } = useCMS();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
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
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">SÈGANDÉ VAULT</h1>
          <p className="text-sand/40 text-[9px] uppercase font-bold tracking-[0.2em] mb-8">Espace de gestion ultra-confidentiel</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" maxLength={4} value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder="****"
              className={`w-full bg-white/5 border ${pinError ? 'border-red-500' : 'border-white/10'} text-center text-4xl py-4 rounded-xl font-black tracking-[0.5em] outline-none focus:border-primary transition-all`}
            />
            <button className="w-full bg-primary text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-all">Déverrouiller</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Stats', path: '/admin' },
    { icon: Layout, label: 'Accueil & Footer', path: '/admin/site-config' },
    { icon: Phone, label: 'Contact & Catégories', path: '/admin/pages' },
    { icon: FileText, label: 'Journal', path: '/admin/editorial' },
    { icon: Package, label: 'Inventaire', path: '/admin/inventory' },
  ];

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full bg-charcoal ${mobile ? 'w-full' : ''}`}>
      <div className="p-8 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3 text-primary">
          <div className="size-8 bg-primary/20 rounded flex items-center justify-center font-black">S</div>
          <span className="font-black text-lg tracking-tighter">SÈGANDÉ CMS</span>
        </div>
        {mobile && <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>}
      </div>
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map(item => (
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
      <div className="p-6">
        <button onClick={() => setAdminAuthenticated(false)} className="w-full text-[9px] font-black uppercase text-red-500/60 hover:text-red-500 p-4 rounded-xl transition-all border border-red-500/10 hover:bg-red-500/5">Déconnexion</button>
      </div>
    </div>
  );

  const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <header className="mb-10">
      <h2 className="text-3xl font-black uppercase tracking-tight">{title}</h2>
      <p className="text-sand/40 text-[9px] uppercase font-bold tracking-widest mt-1">{subtitle}</p>
    </header>
  );

  const SiteConfigEditor = () => (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl">
      <SectionTitle title="Maison & Footer" subtitle="Configuration globale de l'interface principale." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5">
          <h3 className="text-primary text-[10px] font-black uppercase tracking-widest mb-4">Hero Accueil</h3>
          <div className="space-y-4">
            {/* Fix: Replaced invalid 'label' attribute with 'placeholder' */}
            <input placeholder="Titre Hero" value={siteConfig.heroTitle} onChange={e => updateSiteConfig({ heroTitle: e.target.value })} className="admin-input" />
            <textarea placeholder="Sous-titre" value={siteConfig.heroSubtitle} onChange={e => updateSiteConfig({ heroSubtitle: e.target.value })} className="admin-input h-24" />
            <input placeholder="Image Hero" value={siteConfig.heroImage} onChange={e => updateSiteConfig({ heroImage: e.target.value })} className="admin-input" />
          </div>
        </div>
        <div className="space-y-6 bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5">
          <h3 className="text-primary text-[10px] font-black uppercase tracking-widest mb-4">Annonce & Footer</h3>
          <div className="space-y-4">
            {/* Fix: Replaced invalid 'label' attribute with 'placeholder' */}
            <input placeholder="Barre d'annonce" value={siteConfig.announcement} onChange={e => updateSiteConfig({ announcement: e.target.value })} className="admin-input" />
            <textarea placeholder="Texte 'À propos' Footer" value={siteConfig.footer.aboutText} onChange={e => updateSiteConfig({ footer: { aboutText: e.target.value } })} className="admin-input h-32" />
          </div>
        </div>
      </div>
    </div>
  );

  const PagesEditor = () => (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl">
      <SectionTitle title="Pages & Catégories" subtitle="Gérez les textes de contact et le SEO des univers." />
      <div className="space-y-8">
        <div className="bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5">
          <h3 className="text-primary text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2"><Phone size={14}/> Page Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fix: Replaced invalid 'label' attribute with 'placeholder' */}
            <input placeholder="Titre Conciergerie" value={siteConfig.contact.title} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, title: e.target.value } })} className="admin-input" />
            <input placeholder="Email" value={siteConfig.contact.email} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, email: e.target.value } })} className="admin-input" />
            <input placeholder="Téléphone 1" value={siteConfig.contact.phone1} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, phone1: e.target.value } })} className="admin-input" />
            <input placeholder="Téléphone 2" value={siteConfig.contact.phone2} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, phone2: e.target.value } })} className="admin-input" />
            <input placeholder="Adresse" value={siteConfig.contact.address} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, address: e.target.value } })} className="admin-input md:col-span-2" />
          </div>
        </div>
        <div className="bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5">
          <h3 className="text-primary text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2"><Globe size={14}/> Slogans Catégories</h3>
          {Object.entries(siteConfig.categoryMeta).map(([slug, meta]) => (
            <div key={slug} className="mb-8 last:mb-0 border-t border-white/5 pt-6 first:border-none first:pt-0">
              <span className="text-[9px] font-black text-sand/20 uppercase mb-2 block">Slug: {slug}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fix: Cast meta to any to resolve property access and spread issues on 'unknown' type from Object.entries */}
                <input value={(meta as any).title} onChange={e => {
                  const newMeta = { ...siteConfig.categoryMeta, [slug]: { ...(meta as any), title: e.target.value } };
                  updateSiteConfig({ categoryMeta: newMeta });
                }} className="admin-input" />
                <input value={(meta as any).description} onChange={e => {
                  const newMeta = { ...siteConfig.categoryMeta, [slug]: { ...(meta as any), description: e.target.value } };
                  updateSiteConfig({ categoryMeta: newMeta });
                }} className="admin-input" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const InventoryManager = () => {
    // Fix: Missing Product type is now imported
    const startEdit = (p: Product) => setEditingProduct({...p});
    const addNew = () => {
      const id = `prod_${Date.now()}`;
      const newP = { id, name: "NOUVEAU PRODUIT", slug: `new-${id}`, price: 0, description: "Description...", images: [""], sector: "bien-etre", category: "Accessoire", variants: [{id: 'v1', color: 'Gold', size: 'U', stock: 10, sku: id}], rating: 5, reviewsCount: 0, badges: [] };
      updateProducts([newP, ...products]);
      setEditingProduct(newP);
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <SectionTitle title="Inventaire" subtitle="Modifiez, supprimez ou ajoutez des pièces uniques." />
          <button onClick={addNew} className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase flex items-center gap-2"><Plus size={14} /> Ajouter</button>
        </div>

        {editingProduct ? (
          <div className="bg-charcoal p-6 md:p-10 rounded-3xl border border-primary/20 space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <h3 className="text-xl font-black uppercase">Édition: {editingProduct.name}</h3>
              <button onClick={() => setEditingProduct(null)} className="text-sand/40 hover:text-white"><X /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {/* Fix: Replaced invalid 'label' attribute with 'placeholder' */}
                <input placeholder="Nom du produit" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="admin-input" />
                <input placeholder="Prix (FCFA)" type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="admin-input" />
                <input placeholder="Secteur" value={editingProduct.sector} onChange={e => setEditingProduct({...editingProduct, sector: e.target.value})} className="admin-input" />
                <input placeholder="Catégorie" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="admin-input" />
                <input placeholder="Image URL" value={editingProduct.images[0]} onChange={e => setEditingProduct({...editingProduct, images: [e.target.value]})} className="admin-input" />
              </div>
              <textarea placeholder="Description" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="admin-input h-full" />
            </div>
            <button 
              onClick={() => {
                updateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
                setEditingProduct(null);
              }} 
              className="w-full bg-primary text-black font-black py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl shadow-primary/10"
            >
              <Save size={18} /> Enregistrer les modifications
            </button>
          </div>
        ) : (
          <div className="bg-charcoal rounded-3xl border border-white/5 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-sand/40">
                <tr>
                  <th className="p-6">Produit</th>
                  <th className="p-6">Prix</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 group">
                    <td className="p-6 flex items-center gap-4">
                      <img src={p.images[0]} className="size-10 object-contain bg-white/10 rounded p-1" />
                      <div>
                        <p className="font-black uppercase">{p.name}</p>
                        <p className="text-[9px] text-sand/30 font-bold uppercase">{p.category}</p>
                      </div>
                    </td>
                    <td className="p-6 font-black text-primary">{p.price.toLocaleString()} FCFA</td>
                    <td className="p-6">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => toggleFeaturedProduct(p.id)} className={`p-2 rounded-lg ${siteConfig.featuredProductIds.includes(p.id) ? 'text-primary' : 'text-sand/20'}`}><Star size={16} fill={siteConfig.featuredProductIds.includes(p.id) ? "currentColor" : "none"}/></button>
                        <button onClick={() => startEdit(p)} className="p-2 text-white/40 hover:text-white"><Edit size={16} /></button>
                        <button onClick={() => updateProducts(products.filter(item => item.id !== p.id))} className="p-2 text-red-500/40 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-background-dark min-h-screen flex text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-charcoal border-r border-white/10 h-screen sticky top-0 flex-col shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-20 left-0 w-full bg-charcoal/95 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center border-b border-white/10">
        <span className="text-[10px] font-black uppercase text-primary">Master Dashboard</span>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2"><Menu /></button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            <Sidebar mobile />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <main className="flex-1 p-6 md:p-12 mt-32 lg:mt-0 overflow-y-auto h-screen custom-scrollbar">
        <Routes>
          <Route index element={
            <div className="space-y-12">
              <header>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Bienvenue Admin</h1>
                <p className="text-sand/40 text-[10px] font-black uppercase tracking-widest mt-2">Pilotage de la Maison SÈGANDÉ.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Visiteurs", value: "24.5k", icon: Globe },
                  { label: "Produits", value: products.length, icon: Package },
                  { label: "Revenue", value: "154M", icon: BarChart3 }
                ].map(stat => (
                  <div key={stat.label} className="bg-charcoal p-8 rounded-3xl border border-white/5">
                    <stat.icon className="text-primary mb-6" size={24} />
                    <p className="text-[9px] uppercase font-black text-sand/40 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-black">{stat.value}</h3>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="site-config" element={<SiteConfigEditor />} />
          <Route path="pages" element={<PagesEditor />} />
          <Route path="editorial" element={<div className="text-white">Éditeur Journal (En développement)</div>} />
          <Route path="inventory" element={<InventoryManager />} />
        </Routes>
      </main>

      <style>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 16px;
          border-radius: 12px;
          color: white;
          font-size: 13px;
          outline: none;
          transition: all 0.2s;
        }
        .admin-input:focus { border-color: #ec9213; background: rgba(255,255,255,0.08); }
        input[label], textarea[label] { position: relative; }
        input[label]::placeholder { color: transparent; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
