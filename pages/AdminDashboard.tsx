
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../App';
import { GoogleGenAI } from '@google/genai';
import { 
  LayoutDashboard, Package, Settings, Plus, 
  FileText, BarChart3, Edit, Trash2, Menu, X, Globe, Layout, Loader2, Sparkles, Star, Lock, Eye, Image as ImageIcon
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { sectors, products, updateProducts, siteConfig, updateSiteConfig, toggleFeaturedProduct, isAdminAuthenticated, setAdminAuthenticated } = useCMS();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-charcoal p-10 rounded-3xl border border-white/5 shadow-2xl text-center"
        >
          <div className="size-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">SÈGANDÉ VAULT</h1>
          <p className="text-sand/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-8">Espace de gestion ultra-confidentiel</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <input 
                type="password" 
                maxLength={4}
                value={pinCode}
                onChange={e => setPinCode(e.target.value)}
                placeholder="****"
                className={`w-full bg-white/5 border ${pinError ? 'border-red-500' : 'border-white/10'} text-center text-4xl py-4 rounded-xl font-black tracking-[0.5em] outline-none focus:border-primary transition-all`}
              />
              {pinError && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest">Code Incorrect</p>}
            </div>
            <button className="w-full bg-primary text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-white transition-all">Déverrouiller</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
    { icon: Layout, label: 'Éditeur Accueil', path: '/admin/site-config' },
    { icon: FileText, label: 'Éditeur Journal', path: '/admin/editorial' },
    { icon: Package, label: 'Gestion Inventaire', path: '/admin/inventory' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-charcoal">
      <div className="p-8 flex items-center gap-3 text-primary border-b border-white/5">
        <div className="size-8 bg-primary/20 rounded flex items-center justify-center font-black">S</div>
        <span className="font-black brand-font text-lg tracking-tighter">SÈGANDÉ CMS</span>
      </div>
      <nav className="flex-1 p-6 space-y-1">
        {navItems.map(item => (
          <Link 
            key={item.label}
            to={item.path}
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
        <button onClick={() => setAdminAuthenticated(false)} className="w-full text-[10px] font-black uppercase text-red-500 hover:bg-red-500/10 p-4 rounded-xl transition-all">Verrouiller</button>
      </div>
    </div>
  );

  const SiteConfigEditor = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-black uppercase tracking-tight">Configuration Accueil</h2>
        <p className="text-sand/40 text-[10px] uppercase font-bold tracking-widest">Modifiez les textes et l'image du Hero en temps réel.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-primary tracking-widest">Titre Hero</label>
            <input 
              value={siteConfig.heroTitle}
              onChange={e => updateSiteConfig({ heroTitle: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-black uppercase text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-primary tracking-widest">Sous-titre Hero</label>
            <textarea 
              value={siteConfig.heroSubtitle}
              onChange={e => updateSiteConfig({ heroSubtitle: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-xs h-32 resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-primary tracking-widest">Annonce Barre du Haut</label>
            <input 
              value={siteConfig.announcement}
              onChange={e => updateSiteConfig({ announcement: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-xs uppercase font-bold"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-primary tracking-widest">Image de Fond (URL)</label>
            <input 
              value={siteConfig.heroImage}
              onChange={e => updateSiteConfig({ heroImage: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-[10px]"
            />
            <div className="aspect-video rounded-xl overflow-hidden border border-white/10 mt-4 bg-black/20">
              <img src={siteConfig.heroImage} className="w-full h-full object-cover" alt="Preview" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const InventoryManager = () => {
    const addNewProduct = () => {
      const newId = `prod_${Date.now()}`;
      const newP = {
        id: newId,
        name: "NOUVEL ART",
        slug: `nouvel-art-${newId}`,
        description: "DESCRIPTION DE L'ŒUVRE",
        price: 0,
        images: ["https://images.unsplash.com/photo-1549490349-8643362247b5"],
        variants: [{ id: `v_${newId}`, color: "Standard", size: "Unique", stock: 1, sku: "NEW-SKU" }],
        category: "Artisanat",
        sector: "bien-etre",
        rating: 5.0,
        reviewsCount: 0,
        badges: ["Nouveauté"]
      };
      updateProducts([newP, ...products]);
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black uppercase tracking-tight">Catalogue</h2>
          <button onClick={addNewProduct} className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase flex items-center gap-2"><Plus size={14} /> Ajouter</button>
        </div>
        <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-sand/40">
                <tr>
                  <th className="p-6">Statut</th>
                  <th className="p-6">Produit</th>
                  <th className="p-6">Prix (FCFA)</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {products.map((p, idx) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-6">
                      <button onClick={() => toggleFeaturedProduct(p.id)} className={`size-10 rounded-xl flex items-center justify-center transition-all ${siteConfig.featuredProductIds.includes(p.id) ? 'bg-primary text-black' : 'bg-white/5 text-sand/20'}`}>
                        <Star size={16} fill={siteConfig.featuredProductIds.includes(p.id) ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="p-6 flex items-center gap-4">
                      <img src={p.images[0]} className="size-12 object-contain bg-white rounded" />
                      <div className="space-y-1">
                        <input value={p.name} onChange={e => {
                          const newProducts = [...products];
                          newProducts[idx].name = e.target.value;
                          updateProducts(newProducts);
                        }} className="bg-transparent border-none p-0 text-white font-black uppercase w-full" />
                        <input value={p.description} onChange={e => {
                          const newProducts = [...products];
                          newProducts[idx].description = e.target.value;
                          updateProducts(newProducts);
                        }} className="bg-transparent border-none p-0 text-sand/40 text-[10px] uppercase w-full" />
                      </div>
                    </td>
                    <td className="p-6">
                      <input type="number" value={p.price} onChange={e => {
                        const newProducts = [...products];
                        newProducts[idx].price = Number(e.target.value);
                        updateProducts(newProducts);
                      }} className="bg-transparent border-none p-0 text-primary font-black w-24" />
                    </td>
                    <td className="p-6">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => updateProducts(products.filter(item => item.id !== p.id))} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg"><Trash2 size={16} /></button>
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

  const EditorialEditor = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-black uppercase tracking-tight">Gestion du Journal</h2>
        <p className="text-sand/40 text-[10px] uppercase font-bold tracking-widest">Éditez les articles et les visuels de l'éditorial.</p>
      </header>
      <div className="space-y-10">
        <div className="p-8 bg-charcoal rounded-3xl border border-white/5 space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-primary">Titre Principal Journal</label>
            <input 
              value={siteConfig.editorial.heroTitle}
              onChange={e => updateSiteConfig({ editorial: { ...siteConfig.editorial, heroTitle: e.target.value } })}
              className="w-full bg-white/10 border-none p-4 rounded-xl text-white font-black uppercase"
            />
          </div>
          {siteConfig.editorial.sections.map((section: any, sIdx: number) => (
            <div key={sIdx} className="pt-10 border-t border-white/10 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-sand/40">Titre Section</label>
                    <input 
                      value={section.title}
                      onChange={e => {
                        const newSections = [...siteConfig.editorial.sections];
                        newSections[sIdx].title = e.target.value;
                        updateSiteConfig({ editorial: { ...siteConfig.editorial, sections: newSections } });
                      }}
                      className="w-full bg-white/5 border-none p-3 rounded-lg text-white font-bold uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-sand/40">Citation</label>
                    <textarea 
                      value={section.quote}
                      onChange={e => {
                        const newSections = [...siteConfig.editorial.sections];
                        newSections[sIdx].quote = e.target.value;
                        updateSiteConfig({ editorial: { ...siteConfig.editorial, sections: newSections } });
                      }}
                      className="w-full bg-white/5 border-none p-3 rounded-lg text-sand italic text-sm resize-none h-20"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-sand/40">Contenu</label>
                    <textarea 
                      value={section.text}
                      onChange={e => {
                        const newSections = [...siteConfig.editorial.sections];
                        newSections[sIdx].text = e.target.value;
                        updateSiteConfig({ editorial: { ...siteConfig.editorial, sections: newSections } });
                      }}
                      className="w-full bg-white/5 border-none p-3 rounded-lg text-white/70 text-xs h-40 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background-dark min-h-screen flex text-white overflow-hidden selection:bg-primary selection:text-black">
      <aside className="hidden md:flex w-72 bg-charcoal border-r border-white/10 h-screen sticky top-0 flex-col shrink-0 z-50">
        <SidebarContent />
      </aside>
      <main className="flex-1 p-12 overflow-y-auto h-screen bg-black/10">
        <Routes>
          <Route index element={
            <div className="space-y-12">
              <header className="flex justify-between items-center">
                <div>
                  <h1 className="text-5xl font-black uppercase tracking-tighter">Bienvenue Admin</h1>
                  <p className="text-sand/40 text-xs font-bold uppercase tracking-widest mt-2">Pilotez votre maison de luxe africaine.</p>
                </div>
                <div className="bg-primary/10 border border-primary/20 px-8 py-4 rounded-2xl flex items-center gap-4">
                  <BarChart3 className="text-primary" />
                  <div>
                    <p className="text-[9px] uppercase font-black text-sand/40 tracking-widest">Revenu Total</p>
                    <p className="text-xl font-black">154.2M FCFA</p>
                  </div>
                </div>
              </header>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Visiteurs", value: "24.5k", icon: Globe },
                  { label: "Ventes", value: "842", icon: Package },
                  { label: "Conversion", value: "3.2%", icon: Star }
                ].map(stat => (
                  <div key={stat.label} className="bg-charcoal p-8 rounded-3xl border border-white/5">
                    <stat.icon className="text-primary mb-6" size={24} />
                    <p className="text-[10px] uppercase font-black text-sand/40 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-black">{stat.value}</h3>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="site-config" element={<SiteConfigEditor />} />
          <Route path="editorial" element={<EditorialEditor />} />
          <Route path="inventory" element={<InventoryManager />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
