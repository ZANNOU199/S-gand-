
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useCMS } from '../App';
import { 
  LayoutDashboard, Package, Plus, 
  Edit, Trash2, Layout, Lock, Star, Layers, Save, RefreshCw, Cloud, ArrowLeft,
  TrendingUp, Users, ShoppingCart, DollarSign, Menu, X, MapPin, Eye, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const { 
    sectors, addSector, updateSector, deleteSector,
    products, addProduct, updateProduct, deleteProduct, toggleFeaturedProduct,
    orders, siteConfig, updateSiteConfig, 
    isAdminAuthenticated, setAdminAuthenticated 
  } = useCMS();

  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingSector, setEditingSector] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
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
          <Lock size={40} className="mx-auto text-primary mb-6 md:mb-8" />
          <h1 className="text-2xl md:text-3xl font-black uppercase mb-6 md:mb-8 tracking-tighter">ADMIN VAULT</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" maxLength={4} value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder="PIN"
              className="w-full bg-white/5 border border-white/10 text-center text-3xl md:text-4xl py-5 md:py-6 rounded-2xl font-black tracking-[0.5em] text-white outline-none focus:border-primary transition-all"
            />
            {pinError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Code incorrect</p>}
            <button className="w-full bg-primary text-black font-black py-4 md:py-5 rounded-2xl uppercase tracking-widest hover:bg-white transition-all">ACCÉDER</button>
          </form>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-charcoal w-full">
      <div className="p-8 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <Cloud className="text-primary" />
          <span className="font-black text-lg md:text-xl uppercase text-white tracking-tighter">SÈGANDÉ CLOUD</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-white/40">
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1 p-6 space-y-2">
        {[
          { icon: LayoutDashboard, label: 'Vue Globale', path: '/admin' },
          { icon: ShoppingCart, label: 'Ventes', path: '/admin/sales' },
          { icon: Layers, label: 'Univers', path: '/admin/sectors' },
          { icon: Package, label: 'Inventaire', path: '/admin/inventory' },
          { icon: Layout, label: 'Vitrine', path: '/admin/site-config' },
        ].map(item => (
          <Link 
            key={item.label} to={item.path} 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              location.pathname === item.path ? 'bg-primary text-black shadow-xl shadow-primary/20' : 'text-sand/50 hover:bg-white/5'
            }`}
          >
            <item.icon size={18} /> {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-6">
        <button onClick={() => setAdminAuthenticated(false)} className="w-full text-[10px] font-black uppercase text-red-500/60 p-4 border border-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all">Déconnexion</button>
      </div>
    </div>
  );

  const DashboardOverview = () => {
    const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
    const totalClients = new Set(orders.map(o => o.customer_email)).size;

    return (
      <div className="space-y-10 md:space-y-12 animate-in fade-in duration-700">
        <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tighter">Tableau de Bord</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><DollarSign /></div>
            <div>
              <p className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Revenu Total</p>
              <p className="text-xl md:text-2xl font-black text-white">{totalRevenue.toLocaleString()} <span className="text-xs">FCFA</span></p>
            </div>
          </div>
          <div className="bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="size-12 bg-mint/10 rounded-2xl flex items-center justify-center text-mint"><ShoppingCart /></div>
            <div>
              <p className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Ventes</p>
              <p className="text-xl md:text-2xl font-black text-white">{orders.length}</p>
            </div>
          </div>
          <div className="bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="size-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500"><Users /></div>
            <div>
              <p className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Clients</p>
              <p className="text-xl md:text-2xl font-black text-white">{totalClients}</p>
            </div>
          </div>
          <div className="bg-charcoal p-6 md:p-8 rounded-3xl border border-white/5 space-y-4">
            <div className="size-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500"><TrendingUp /></div>
            <div>
              <p className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Panier Moyen</p>
              <p className="text-xl md:text-2xl font-black text-white">{orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString() : 0} <span className="text-xs">FCFA</span></p>
            </div>
          </div>
        </div>

        <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-black uppercase text-[10px] md:text-xs tracking-widest">Ventes Récentes</h3>
            <Link to="/admin/sales" className="text-[10px] font-black uppercase text-primary hover:underline">Voir Tout</Link>
          </div>
          <div className="divide-y divide-white/5">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="p-6 md:p-8 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="size-10 md:size-12 rounded-full bg-white/5 flex items-center justify-center font-black text-primary text-[10px]">
                    {o.customer_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black uppercase text-xs md:text-sm text-white truncate max-w-[120px] md:max-w-none">{o.customer_name}</p>
                    <p className="text-[9px] text-sand/40 font-bold uppercase tracking-widest">{new Date(o.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-xs md:text-sm text-primary">{o.total.toLocaleString()} FCFA</p>
                  <span className="text-[8px] font-black uppercase tracking-widest bg-mint/10 text-mint px-2 py-0.5 rounded-full">Payé</span>
                </div>
              </div>
            ))}
            {orders.length === 0 && <div className="p-12 text-center text-sand/20 font-black uppercase text-[10px] tracking-widest">En attente de commandes...</div>}
          </div>
        </div>
      </div>
    );
  };

  const SalesManager = () => (
    <div className="space-y-10 md:space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tighter">Gestion des Ventes</h2>
        <div className="bg-charcoal px-4 md:px-6 py-2 md:py-3 rounded-xl border border-white/5 text-[10px] font-black uppercase text-sand/40 tracking-widest">
          Total: <span className="text-primary">{orders.length} commandes</span>
        </div>
      </div>
      
      <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden shadow-2xl overflow-x-auto">
        <div className="min-w-[1000px]">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] font-black uppercase text-sand/40 tracking-widest">
              <tr>
                <th className="p-6 md:p-8">Client & Livraison</th>
                <th className="p-6 md:p-8">Contact</th>
                <th className="p-6 md:p-8">Articles</th>
                <th className="p-6 md:p-8">Montant</th>
                <th className="p-6 md:p-8">Transaction</th>
                <th className="p-6 md:p-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors group text-xs">
                  <td className="p-6 md:p-8 max-w-[250px]">
                    <div className="space-y-2">
                      <span className="font-black uppercase text-white group-hover:text-primary transition-colors block">{o.customer_name}</span>
                      <div className="flex items-start gap-2 opacity-40">
                        <MapPin size={12} className="shrink-0 mt-0.5" />
                        <p className="text-[9px] leading-relaxed italic">{o.customer_address || "Adresse non fournie"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 md:p-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-sand/40 lowercase">{o.customer_email}</p>
                      <p className="text-[10px] font-black text-sand/60">{o.customer_phone}</p>
                    </div>
                  </td>
                  <td className="p-6 md:p-8">
                    <div className="flex flex-col gap-1">
                      <span className="bg-white/5 px-3 py-1 rounded-lg text-[10px] font-black w-fit">{o.items.length} pièces</span>
                      <p className="text-[8px] opacity-30 truncate max-w-[120px]">
                        {o.items.map((i: any) => i.name).join(', ')}
                      </p>
                    </div>
                  </td>
                  <td className="p-6 md:p-8">
                    <p className="font-black text-primary">{o.total.toLocaleString()} FCFA</p>
                    <p className="text-[8px] text-sand/20">{new Date(o.created_at).toLocaleDateString()}</p>
                  </td>
                  <td className="p-6 md:p-8">
                    <p className="text-[9px] font-mono opacity-50 uppercase">{o.transaction_id || "N/A"}</p>
                    <span className="text-[8px] font-black uppercase tracking-widest bg-mint/10 text-mint px-2 py-0.5 rounded-full mt-1 inline-block">Succès</span>
                  </td>
                  <td className="p-6 md:p-8 text-right">
                    <button 
                      onClick={() => setSelectedOrder(o)}
                      className="p-3 bg-white/5 rounded-xl hover:bg-primary hover:text-black transition-all"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="p-20 md:p-32 text-center text-sand/10 uppercase font-black tracking-[0.5em]">Aucune vente enregistrée</div>
        )}
      </div>

      {/* Modal Détails Commande */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-charcoal w-full max-w-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Détails Commande</h3>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Ref: {selectedOrder.transaction_id || selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-4 bg-white/5 rounded-full hover:bg-red-500 transition-colors"><X size={20}/></button>
              </div>
              
              <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar space-y-10">
                <section className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase text-sand/40 tracking-widest">Client</p>
                    <p className="font-black text-sm uppercase">{selectedOrder.customer_name}</p>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="text-[9px] font-black uppercase text-sand/40 tracking-widest">Date</p>
                    <p className="font-black text-sm uppercase">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                  </div>
                  <div className="col-span-2 p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                     <p className="text-[9px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                       <MapPin size={12}/> Adresse de Livraison
                     </p>
                     <p className="text-xs italic leading-relaxed text-sand/80">{selectedOrder.customer_address || "Non spécifiée"}</p>
                  </div>
                </section>

                <section className="space-y-6">
                  <p className="text-[9px] font-black uppercase text-sand/40 tracking-widest border-b border-white/5 pb-2">Articles ({selectedOrder.items.length})</p>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                        <div className="flex items-center gap-4">
                          <img src={item.image} className="size-10 object-cover rounded-lg" />
                          <div>
                            <p className="text-[10px] font-black uppercase">{item.name}</p>
                            <p className="text-[9px] opacity-40 uppercase tracking-widest">{item.variantName} x{item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-xs font-black text-primary">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest">Montant Total Payé</span>
                  <span className="text-3xl font-black text-primary leading-none">{selectedOrder.total.toLocaleString()} <span className="text-xs">FCFA</span></span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const DashboardRoutes = () => (
    <Routes>
      <Route index element={<DashboardOverview />} />
      <Route path="sales" element={<SalesManager />} />
      <Route path="sectors" element={<SectorsEditor />} />
      <Route path="inventory" element={<InventoryManager />} />
      <Route path="site-config" element={
        <div className="max-w-4xl bg-charcoal p-8 md:p-10 rounded-3xl space-y-8 animate-in fade-in duration-700 shadow-2xl border border-white/5">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Configuration Vitrine</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sand/40">Titre Hero Page d'Accueil</label>
              <input value={siteConfig.heroTitle} onChange={e => updateSiteConfig({heroTitle: e.target.value})} className="admin-input" placeholder="SÈGANDÉ" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sand/40">Image Hero (Full HD)</label>
              <input value={siteConfig.heroImage} onChange={e => updateSiteConfig({heroImage: e.target.value})} className="admin-input" placeholder="HTTPS Image URL" />
            </div>
          </div>
          <button onClick={() => alert('Vitrine mise à jour avec succès.')} className="w-full bg-primary text-black py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-white transition-all">
            SAUVEGARDER LES MODIFICATIONS
          </button>
        </div>
      } />
    </Routes>
  );

  const SectorsEditor = () => {
    const handleSave = async () => {
      if (!editingSector.name || !editingSector.slug) return alert("Nom et Slug requis");
      setIsSaving(true);
      try {
        if (editingSector.id) await updateSector(Number(editingSector.id), editingSector);
        else await addSector(editingSector);
        setEditingSector(null);
      } finally { setIsSaving(false); }
    };

    if (editingSector) {
      return (
        <div className="max-w-4xl space-y-8 md:space-y-10 animate-in fade-in duration-300">
          <button onClick={() => setEditingSector(null)} className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest"><ArrowLeft size={16}/> Annuler</button>
          <div className="bg-charcoal p-8 md:p-10 rounded-3xl border border-primary/20 space-y-8 shadow-2xl">
            <h2 className="text-xl md:text-2xl font-black uppercase text-white">{editingSector.id ? 'Éditer l\'Univers' : 'Nouvel Univers'}</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Nom</label>
                <input value={editingSector.name} onChange={e => setEditingSector({...editingSector, name: e.target.value})} className="admin-input" placeholder="ex: Nid du Bien-Être" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Slug</label>
                <input value={editingSector.slug} onChange={e => setEditingSector({...editingSector, slug: e.target.value})} className="admin-input" placeholder="ex: bien-etre" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-sand/40 tracking-widest">Image URL</label>
                <input value={editingSector.image} onChange={e => setEditingSector({...editingSector, image: e.target.value})} className="admin-input" placeholder="HTTPS URL" />
              </div>
            </div>
            <button onClick={handleSave} disabled={isSaving} className="w-full bg-primary text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white transition-all">
              {isSaving ? <RefreshCw className="animate-spin" /> : <Save size={18}/>} ENREGISTRER
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-10 md:space-y-12">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tighter">Univers</h2>
          <button onClick={() => setEditingSector({ name: '', slug: '', image: '' })} className="bg-primary text-black px-6 py-3 md:px-8 md:py-4 rounded-xl font-black text-[10px] uppercase flex items-center gap-2">
            <Plus size={16} /> Créer
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sectors.map(s => (
            <div key={s.id} className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden shadow-xl group">
              <div className="aspect-video relative bg-black">
                <img src={s.image} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="font-black text-white uppercase text-lg md:text-xl">{s.name}</p>
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
          <div className="bg-charcoal p-8 md:p-12 rounded-3xl border border-primary/20 space-y-10">
            <h2 className="text-2xl md:text-3xl font-black uppercase text-white">{editingProduct.id ? 'Éditer Article' : 'Nouveau Produit'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <input value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="admin-input" placeholder="Nom du produit" />
                <input value={editingProduct.slug} onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})} className="admin-input" placeholder="Slug (URL)" />
                <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="admin-input" placeholder="Prix (FCFA)" />
                <select value={editingProduct.sector} onChange={e => setEditingProduct({...editingProduct, sector: e.target.value})} className="admin-input">
                  {sectors.map(s => <option key={s.slug} value={s.slug} className="bg-charcoal">{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-6">
                <input value={editingProduct.images[0]} onChange={e => setEditingProduct({...editingProduct, images: [e.target.value]})} className="admin-input" placeholder="Image URL" />
                <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="admin-input h-32" placeholder="Description courte..." />
                <label className="flex items-center gap-4 text-xs font-black uppercase cursor-pointer bg-white/5 p-4 rounded-xl border border-white/5">
                  <input type="checkbox" checked={editingProduct.isFeatured} onChange={e => setEditingProduct({...editingProduct, isFeatured: e.target.checked})} className="size-6 rounded border-white/20 accent-primary bg-transparent" />
                  Mettre en avant (Home)
                </label>
              </div>
            </div>
            <button onClick={handleSave} disabled={isSaving} className="w-full bg-primary text-black font-black py-5 md:py-6 rounded-2xl uppercase tracking-widest shadow-xl">
              {isSaving ? 'Synchronisation...' : 'SAUVEGARDER'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-10 md:space-y-12">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tighter">Inventaire</h2>
          <button onClick={() => setEditingProduct({ name: '', slug: '', price: 0, sector: sectors[0]?.slug || '', images: [''], description: '', isFeatured: false, variants: [] })} className="bg-primary text-black px-6 py-3 md:px-8 md:py-4 rounded-xl font-black text-[10px] uppercase flex items-center gap-2">
            <Plus size={16} /> Ajouter
          </button>
        </div>
        <div className="bg-charcoal rounded-3xl border border-white/5 overflow-hidden shadow-2xl overflow-x-auto">
          <div className="min-w-[700px]">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] font-black uppercase text-sand/40 tracking-widest">
                <tr>
                  <th className="p-8">Produit</th>
                  <th className="p-8">Prix</th>
                  <th className="p-8 text-center">Featured</th>
                  <th className="p-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white text-xs">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-white/5">
                    <td className="p-8 flex items-center gap-4 md:gap-6">
                      <img src={p.images[0]} className="size-10 md:size-12 object-contain bg-white/5 rounded-lg shrink-0" />
                      <span className="font-black uppercase truncate max-w-[150px]">{p.name}</span>
                    </td>
                    <td className="p-8 font-black text-primary">{p.price.toLocaleString()} FCFA</td>
                    <td className="p-8 text-center">
                      <button 
                        onClick={() => toggleFeaturedProduct(p.id)}
                        className={`transition-all hover:scale-125 ${p.isFeatured ? 'text-primary' : 'text-white/10'}`}
                      >
                        <Star size={20} fill={p.isFeatured ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="p-8 text-right space-x-2">
                      <button onClick={() => setEditingProduct({...p})} className="p-2 md:p-3 bg-white/5 rounded-xl hover:text-primary transition-colors"><Edit size={16}/></button>
                      <button onClick={() => { if(confirm('Supprimer ce produit ?')) deleteProduct(Number(p.id)); }} className="p-2 md:p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && <div className="p-20 text-center text-sand/10 uppercase font-black tracking-widest">Aucun produit en stock</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background-dark min-h-screen flex text-white overflow-hidden relative">
      {/* Mobile Header Toggle */}
      <div className="lg:hidden absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
           <Cloud className="text-primary size-5" />
           <span className="font-black text-xs uppercase tracking-widest">SÈGANDÉ CLOUD</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-primary">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside className={`
        fixed lg:static inset-0 z-[100] lg:z-0 lg:flex w-full lg:w-80 bg-charcoal border-r border-white/10 h-screen transition-transform duration-500
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarContent />
      </aside>

      <main className="flex-1 p-6 pt-24 md:p-16 lg:pt-16 overflow-y-auto h-screen custom-scrollbar">
        <DashboardRoutes />
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
          font-size: 13px;
          outline: none;
          transition: all 0.3s;
        }
        .admin-input:focus { border-color: #ec9213; background: rgba(255,255,255,0.04); box-shadow: 0 0 20px rgba(236,146,19,0.05); }
        .admin-input::placeholder { color: rgba(255,255,255,0.1); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
