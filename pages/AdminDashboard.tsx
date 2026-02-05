
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../App';
import { GoogleGenAI } from '@google/genai';
import { 
  LayoutDashboard, Package, Settings, Plus, 
  FileText, BarChart3, Edit, Trash2, Menu, X, Globe, Layout, Loader2, Sparkles, Info, Star
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { sectors, products, updateProducts, siteConfig, toggleFeaturedProduct } = useCMS();
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

  const AIImageGenerator = ({ productName, productDescription, onImageGenerated }: { productName: string, productDescription: string, onImageGenerated: (url: string) => void }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateImage = async () => {
      setLoading(true);
      setError(null);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Professional studio product photography for high-end African luxury brand. Item: ${productName}. Description: ${productDescription}. Perfect center framing, minimal margins. Pure White Studio Background. Soft studio lighting, no distractions. 8k resolution, minimalist high-end e-commerce aesthetic.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: { aspectRatio: "1:1" }
          }
        });

        const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (imagePart?.inlineData?.data) {
          const base64Url = `data:image/png;base64,${imagePart.inlineData.data}`;
          onImageGenerated(base64Url);
        } else {
          throw new Error("No image returned.");
        }
      } catch (err) {
        setError("Erreur de génération IA");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <button 
          onClick={generateImage}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          {loading ? 'Génération...' : 'IA Studio'}
        </button>
        {error && <span className="text-[8px] text-red-500 font-bold uppercase">{error}</span>}
      </div>
    );
  };

  const InventoryManager = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">Catalogue Produits</h2>
            <p className="text-sand/40 text-[10px] uppercase font-bold tracking-widest">Gérez vos pièces et sélectionnez les 4 vedettes pour l'accueil.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg">
              <Plus size={14} /> Nouveau
            </button>
          </div>
        </div>

        <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-sand/40">
                <tr>
                  <th className="p-6">Sahel (4 max)</th>
                  <th className="p-6">Produit & IA</th>
                  <th className="p-6">Catégorie</th>
                  <th className="p-6">Prix (FCFA)</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {products.map((p, idx) => {
                  const isFeatured = siteConfig.featuredProductIds.includes(p.id);
                  return (
                    <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                      <td className="p-6">
                        <button 
                          onClick={() => toggleFeaturedProduct(p.id)}
                          className={`size-10 rounded-xl flex items-center justify-center transition-all ${isFeatured ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-white/5 text-sand/20 hover:text-primary/50'}`}
                          title={isFeatured ? "Retirer de l'accueil" : "Afficher sur l'accueil (Sahel Collection)"}
                        >
                          <Star size={16} fill={isFeatured ? "currentColor" : "none"} />
                        </button>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="size-16 rounded-lg bg-white shrink-0 overflow-hidden border border-white/5">
                            <img src={p.images[0]} className="w-full h-full object-contain p-1" alt={p.name} />
                          </div>
                          <div className="space-y-2">
                             <input 
                               value={p.name}
                               onChange={e => {
                                 const newP = [...products];
                                 newP[idx].name = e.target.value;
                                 updateProducts(newP);
                               }}
                               className="bg-transparent border-none p-0 font-black uppercase text-xs focus:ring-0 text-white w-full"
                             />
                             <AIImageGenerator 
                               productName={p.name} 
                               productDescription={p.description} 
                               onImageGenerated={(newUrl) => {
                                 const newP = [...products];
                                 newP[idx].images = [newUrl];
                                 updateProducts(newP);
                               }} 
                             />
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-[10px] uppercase font-bold text-sand/40 bg-white/5 px-2 py-1 rounded-md">{p.category}</span>
                      </td>
                      <td className="p-6">
                         <div className="flex items-center gap-1 font-black text-primary">
                           <input 
                             type="number"
                             value={p.price}
                             onChange={e => {
                               const newP = [...products];
                               newP[idx].price = Number(e.target.value);
                               updateProducts(newP);
                             }}
                             className="bg-transparent border-none p-0 w-24 focus:ring-0 font-black text-right"
                           />
                           <span className="text-[10px]">FCFA</span>
                         </div>
                      </td>
                      <td className="p-6">
                         <div className="flex gap-4 justify-end">
                           <button className="text-sand/30 hover:text-primary transition-colors"><Edit size={16} /></button>
                           <button className="text-sand/30 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                         </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background-dark min-h-screen flex flex-col md:flex-row text-white overflow-hidden selection:bg-primary selection:text-black">
      <div className="md:hidden flex items-center justify-between p-6 bg-charcoal border-b border-white/5 z-[100] sticky top-0">
        <div className="flex items-center gap-2 text-primary">
          <div className="size-6 bg-primary/20 rounded flex items-center justify-center font-black text-xs">S</div>
          <span className="font-black brand-font tracking-tighter">SÈGANDÉ CMS</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-primary">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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

      <aside className="hidden md:flex w-72 bg-charcoal border-r border-white/10 h-screen sticky top-0 flex-col shrink-0 z-50">
        <SidebarContent />
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto h-[calc(100vh-80px)] md:h-screen bg-black/10">
        <Routes>
          <Route index element={
            <div className="space-y-12 animate-in fade-in duration-500">
              <header className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Tableau de Bord</h1>
                <p className="text-sand/40 text-xs md:text-sm font-bold uppercase tracking-widest">Statistiques et pilotage de la marque.</p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Revenu Mensuel', value: '45,240,000 FCFA', trend: '+14%', icon: BarChart3 },
                  { label: 'Commandes VIP', value: '08', trend: 'Urgent', icon: Package },
                  { label: 'Visites Uniques', value: '12.4K', trend: '+22%', icon: FileText },
                  { label: 'Stock Artisanat', value: '428', trend: 'Stable', icon: Package },
                ].map(s => (
                  <div key={s.label} className="bg-charcoal p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="absolute -right-6 -top-6 size-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                    <s.icon size={20} className="text-primary mb-6 relative z-10" />
                    <p className="text-[9px] uppercase font-black text-sand/40 tracking-[0.2em] mb-1 relative z-10">{s.label}</p>
                    <h4 className="text-xl font-black relative z-10">{s.value}</h4>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="site-config" element={<div>Configuration Accueil</div>} />
          <Route path="sectors" element={<div>Secteurs</div>} />
          <Route path="inventory" element={<InventoryManager />} />
          <Route path="editorial" element={<div className="py-40 text-center opacity-10 font-black uppercase text-5xl tracking-widest">Editorial CMS</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
