
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../App';
import { Product } from '../types';
import { 
  LayoutDashboard, Package, Settings, Plus, 
  FileText, BarChart3, Edit, Trash2, Menu, X, Globe, Layout, Lock, Star, Phone, Layers, Save, Image as ImageIcon
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { sectors, updateSectors, products, updateProducts, siteConfig, updateSiteConfig, toggleFeaturedProduct, isAdminAuthenticated, setAdminAuthenticated } = useCMS();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingSector, setEditingSector] = useState<any>(null);
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
          <p className="text-sand/40 text-[9px] uppercase font-bold tracking-[0.2em] mb-8">Espace de gestion ultra-confidentiel</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" maxLength={4} value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder="****"
              className={`w-full bg-white/5 border ${pinError ? 'border-red-500' : 'border-white/10'} text-center text-4xl py-4 rounded-xl font-black tracking-[0.5em] text-white outline-none focus:border-primary transition-all`}
            />
            <button className="w-full bg-primary text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-all">Déverrouiller</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Stats', path: '/admin' },
    { icon: Layers, label: 'Univers & Secteurs', path: '/admin/sectors' },
    { icon: Package, label: 'Inventaire', path: '/admin/inventory' },
    { icon: Layout, label: 'Accueil & Footer', path: '/admin/site-config' },
    { icon: Phone, label: 'Contact', path: '/admin/contact' },
    { icon: FileText, label: 'Journal', path: '/admin/editorial' },
  ];

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full bg-charcoal ${mobile ? 'w-full' : ''}`}>
      <div className="p-8 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3 text-primary">
          <div className="size-8 bg-primary/20 rounded flex items-center justify-center font-black">S</div>
          <span className="font-black text-lg tracking-tighter uppercase">SÈGANDÉ CMS</span>
        </div>
        {mobile && <button onClick={() => setIsMobileMenuOpen(false)} className="text-white"><X /></button>}
      </div>
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
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
      <div className="p-6 border-t border-white/5">
        <button onClick={() => setAdminAuthenticated(false)} className="w-full text-[9px] font-black uppercase text-red-500/60 hover:text-red-500 p-4 rounded-xl transition-all border border-red-500/10 hover:bg-red-500/5">Déconnexion</button>
      </div>
    </div>
  );

  const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <header className="mb-10">
      <h2 className="text-3xl font-black uppercase tracking-tight text-white">{title}</h2>
      <p className="text-sand/40 text-[9px] uppercase font-bold tracking-widest mt-1">{subtitle}</p>
    </header>
  );

  const SectorsEditor = () => {
    const handleSaveSector = () => {
      const newSectors = sectors.map(s => s.slug === editingSector.slug ? editingSector : s);
      updateSectors(newSectors);
      setEditingSector(null);
    };

    const addNewSector = () => {
      const slug = `nouveau-${Date.now()}`;
      const newS = { name: "NOUVEL UNIVERS", slug, image: "", subCategories: ["Général"] };
      updateSectors([...sectors, newS]);
      setEditingSector(newS);
    };

    return (
      <div className="space-y-12 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <SectionTitle title="Univers & Secteurs" subtitle="Gérez les catégories principales et leurs visuels." />
          <button onClick={addNewSector} className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase flex items-center gap-2"><Plus size={14} /> Ajouter</button>
        </div>

        {editingSector ? (
          <div className="bg-charcoal p-8 rounded-3xl border border-primary/20 space-y-8 max-w-4xl">
             <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="font-black uppercase text-white">Édition de l'Univers</h3>
                <button onClick={() => setEditingSector(null)} className="text-white/40"><X /></button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-primary uppercase pl-2">Nom de l'Univers</label>
                    <input value={editingSector.name} onChange={e => setEditingSector({...editingSector, name: e.target.value})} className="admin-input" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-primary uppercase pl-2">URL Image de Couverture</label>
                    <input value={editingSector.image} onChange={e => setEditingSector({...editingSector, image: e.target.value})} className="admin-input" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-primary uppercase pl-2">Sous-catégories (Séparez par virgule)</label>
                    <textarea 
                      value={editingSector.subCategories.join(', ')} 
                      onChange={e => setEditingSector({...editingSector, subCategories: e.target.value.split(',').map(s => s.trim())})} 
                      className="admin-input h-32"
                    />
                  </div>
                </div>
             </div>
             <button onClick={handleSaveSector} className="w-full bg-primary text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest"><Save size={16}/> Enregistrer l'Univers</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map(sector => (
              <div key={sector.slug} className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden group">
                <div className="aspect-video relative">
                  <img src={sector.image || "https://images.unsplash.com/photo-1549490349-8643362247b5"} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-black text-white uppercase">{sector.name}</h3>
                    <p className="text-[9px] text-primary font-bold uppercase tracking-widest">{sector.subCategories.length} Sous-catégories</p>
                  </div>
                </div>
                <div className="p-4 flex gap-2">
                  <button onClick={() => setEditingSector({...sector})} className="flex-1 bg-white/5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white"><Edit size={14}/> Éditer</button>
                  <button onClick={() => updateSectors(sectors.filter(s => s.slug !== sector.slug))} className="bg-red-500/10 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const InventoryManager = () => {
    const handleSaveProduct = () => {
      if (products.find(p => p.id === editingProduct.id)) {
        updateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      } else {
        updateProducts([editingProduct, ...products]);
      }
      setEditingProduct(null);
    };

    const startNewProduct = () => {
      const id = `prod_${Date.now()}`;
      setEditingProduct({
        id, name: "NOUVEAU PRODUIT", slug: `new-${id}`, price: 0, description: "Description...", images: [""], 
        sector: sectors[0].slug, category: sectors[0].subCategories[0], variants: [{id: 'v1', color: 'Gold', size: 'U', stock: 10, sku: id}], 
        rating: 5, reviewsCount: 0, badges: ["Nouveauté"]
      });
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <SectionTitle title="Inventaire Pro" subtitle="Gérez vos pièces uniques avec précision." />
          <button onClick={startNewProduct} className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase flex items-center gap-2"><Plus size={14} /> Nouveau</button>
        </div>

        {editingProduct ? (
          <div className="bg-charcoal p-8 rounded-3xl border border-primary/20 space-y-10 max-w-5xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-xl font-black uppercase text-white">Éditeur de Produit</h3>
              <button onClick={() => setEditingProduct(null)} className="text-white/40"><X /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-primary uppercase pl-2">Nom de la pièce</label>
                    <input value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="admin-input" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-primary uppercase pl-2">Prix (FCFA)</label>
                    <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="admin-input" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">Description Courte</label>
                  <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="admin-input h-32 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-primary uppercase pl-2">Secteur / Univers</label>
                    <select value={editingProduct.sector} onChange={e => setEditingProduct({...editingProduct, sector: e.target.value, category: sectors.find(s => s.slug === e.target.value)?.subCategories[0] || ""})} className="admin-input">
                      {sectors.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-primary uppercase pl-2">Sous-catégorie</label>
                    <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="admin-input">
                      {sectors.find(s => s.slug === editingProduct.sector)?.subCategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-primary uppercase pl-2">URL Image Principale</label>
                  <input value={editingProduct.images[0]} onChange={e => setEditingProduct({...editingProduct, images: [e.target.value]})} className="admin-input" />
                  <div className="aspect-square rounded-2xl border border-white/5 mt-4 overflow-hidden bg-white/5">
                    {editingProduct.images[0] && <img src={editingProduct.images[0]} className="w-full h-full object-contain p-2" />}
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleSaveProduct} className="w-full bg-primary text-black font-black py-5 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest shadow-2xl shadow-primary/20"><Save size={20}/> Valider les changements</button>
          </div>
        ) : (
          <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-sand/40">
                    <tr>
                      <th className="p-6">Produit</th>
                      <th className="p-6">Secteur</th>
                      <th className="p-6">Prix</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-white/5 text-white">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-white/5 group transition-colors">
                        <td className="p-6 flex items-center gap-4">
                          <img src={p.images[0]} className="size-10 object-contain bg-white/10 rounded p-1" />
                          <div>
                            <p className="font-black uppercase tracking-tight">{p.name}</p>
                            <p className="text-[9px] text-sand/40 font-bold uppercase">{p.category}</p>
                          </div>
                        </td>
                        <td className="p-6 text-sand/60 font-bold uppercase">{sectors.find(s => s.slug === p.sector)?.name || p.sector}</td>
                        <td className="p-6 font-black text-primary">{p.price.toLocaleString()} FCFA</td>
                        <td className="p-6">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => toggleFeaturedProduct(p.id)} className={`p-2 rounded-lg transition-colors ${siteConfig.featuredProductIds.includes(p.id) ? 'text-primary' : 'text-sand/20 hover:text-sand/50'}`}><Star size={16} fill={siteConfig.featuredProductIds.includes(p.id) ? "currentColor" : "none"}/></button>
                            <button onClick={() => setEditingProduct({...p})} className="p-2 text-white/40 hover:text-white"><Edit size={16} /></button>
                            <button onClick={() => updateProducts(products.filter(item => item.id !== p.id))} className="p-2 text-red-500/40 hover:text-red-500"><Trash2 size={16} /></button>
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
    <div className="bg-background-dark min-h-screen flex text-white overflow-hidden selection:bg-primary selection:text-black">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-charcoal border-r border-white/10 h-screen sticky top-0 flex-col shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-20 left-0 w-full bg-charcoal/95 backdrop-blur-xl z-[90] px-6 py-4 flex justify-between items-center border-b border-white/10">
        <span className="text-[10px] font-black uppercase text-primary tracking-widest">Master Dashboard</span>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-white"><Menu /></button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            <Sidebar mobile />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Panel */}
      <main className="flex-1 p-6 md:p-12 mt-32 lg:mt-0 overflow-y-auto h-screen custom-scrollbar bg-black/5">
        <Routes>
          <Route index element={
            <div className="space-y-12">
              <header>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Administration SÈGANDÉ</h1>
                <p className="text-sand/40 text-[10px] font-black uppercase tracking-widest mt-2">Gestion intégrale de votre maison de luxe africaine.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Visiteurs", value: "24.5k", icon: Globe },
                  { label: "Secteurs", value: sectors.length, icon: Layers },
                  { label: "Produits", value: products.length, icon: Package }
                ].map(stat => (
                  <div key={stat.label} className="bg-charcoal p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-colors">
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
              <SectionTitle title="Maison & Footer" subtitle="Modifiez les visuels et textes globaux." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
                   <h4 className="text-primary text-[10px] font-black uppercase tracking-widest">Hero Principal</h4>
                   <input placeholder="Titre Hero" value={siteConfig.heroTitle} onChange={e => updateSiteConfig({ heroTitle: e.target.value })} className="admin-input" />
                   <textarea placeholder="Sous-titre" value={siteConfig.heroSubtitle} onChange={e => updateSiteConfig({ heroSubtitle: e.target.value })} className="admin-input h-24" />
                   <input placeholder="Image Hero (URL)" value={siteConfig.heroImage} onChange={e => updateSiteConfig({ heroImage: e.target.value })} className="admin-input" />
                </div>
                <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
                   <h4 className="text-primary text-[10px] font-black uppercase tracking-widest">Contenu Footer</h4>
                   <textarea placeholder="Texte 'À propos'" value={siteConfig.footer.aboutText} onChange={e => updateSiteConfig({ footer: { aboutText: e.target.value } })} className="admin-input h-40" />
                   <input placeholder="Annonce Haut de page" value={siteConfig.announcement} onChange={e => updateSiteConfig({ announcement: e.target.value })} className="admin-input" />
                </div>
              </div>
            </div>
          } />
          <Route path="contact" element={
             <div className="space-y-12 max-w-4xl">
              <SectionTitle title="Page Contact" subtitle="Gérez vos informations de conciergerie." />
              <div className="bg-charcoal p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="Titre Section" value={siteConfig.contact.title} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, title: e.target.value } })} className="admin-input" />
                <input placeholder="Email" value={siteConfig.contact.email} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, email: e.target.value } })} className="admin-input" />
                <input placeholder="Téléphone 1" value={siteConfig.contact.phone1} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, phone1: e.target.value } })} className="admin-input" />
                <input placeholder="Téléphone 2" value={siteConfig.contact.phone2} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, phone2: e.target.value } })} className="admin-input" />
                <input placeholder="Adresse Studio" value={siteConfig.contact.address} onChange={e => updateSiteConfig({ contact: { ...siteConfig.contact, address: e.target.value } })} className="admin-input md:col-span-2" />
              </div>
            </div>
          } />
          <Route path="editorial" element={<div className="text-white p-20 text-center font-black uppercase tracking-widest text-xs opacity-20">Éditeur Editorial - Prochainement</div>} />
        </Routes>
      </main>

      <style>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 14px 18px;
          border-radius: 14px;
          color: white;
          font-size: 13px;
          font-weight: 500;
          outline: none;
          transition: all 0.2s;
        }
        .admin-input:focus { border-color: #ec9213; background: rgba(255,255,255,0.06); }
        select.admin-input { appearance: none; cursor: pointer; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ec9213; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
