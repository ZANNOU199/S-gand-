
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, Settings, Plus, 
  ArrowUpRight, Search, FileText, Truck, UserCheck, BarChart3, 
  Edit, Trash2, ArrowLeft, Save, Image as ImageIcon, CheckCircle2,
  Box, CreditCard, ExternalLink, Mail, Phone, MapPin
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const ProductForm = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      <div className="flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sand/50 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">
          <ArrowLeft size={14} /> Retour à l'inventaire
        </button>
        <button className="bg-primary text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20">
          <Save size={16} /> Publier le produit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Informations Générales</h3>
            <div className="space-y-4">
              <input placeholder="Nom du produit (ex: Vase Sahel)" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-primary" />
              <textarea placeholder="Description narrative..." rows={6} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-primary resize-none" />
            </div>
          </div>

          <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Médias</h3>
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer">
              <ImageIcon className="mx-auto text-sand/20" size={40} />
              <p className="text-xs text-sand/40 font-bold uppercase tracking-widest">Glissez-déposez vos images haute résolution</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Tarification & Stock</h3>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sand/30 font-bold">€</span>
                <input placeholder="Prix" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-8 text-sm outline-none focus:border-primary" />
              </div>
              <input placeholder="Quantité initiale" type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-primary" />
            </div>
          </div>

          <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Catégorisation</h3>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-primary appearance-none text-sand/50">
              <option>La Mode</option>
              <option>Art de Vivre</option>
              <option>Galerie d'Art</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <div className="flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sand/50 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">
          <ArrowLeft size={14} /> Liste des commandes
        </button>
        <div className="flex gap-4">
          <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Imprimer facture</button>
          <button className="bg-primary text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Confirmer l'expédition</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-charcoal p-8 rounded-3xl border border-white/5">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black uppercase">Commande #{id || 'SEG-4492'}</h2>
                <p className="text-[10px] text-sand/40 font-bold uppercase mt-1">Passée le 14 Mars 2024 à 14:32</p>
              </div>
              <span className="bg-green-500/10 text-green-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Payée</span>
            </div>

            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl">
                  <div className="size-20 bg-white/10 rounded-xl overflow-hidden" />
                  <div className="flex-1">
                    <p className="font-black uppercase text-sm">Produit Luxe Artisanat #{i}</p>
                    <p className="text-[10px] text-sand/40 uppercase font-bold tracking-widest">Variant: Indigo / M</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black">€320.00</p>
                    <p className="text-[10px] text-sand/40">Qté: 1</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm text-sand/40"><span>Sous-total</span><span>€640.00</span></div>
                <div className="flex justify-between text-sm text-sand/40"><span>Livraison DHL</span><span>€0.00</span></div>
                <div className="flex justify-between text-xl font-black text-white pt-4"><span>TOTAL</span><span>€640.00</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Client</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-primary/20 text-primary rounded-full flex items-center justify-center font-black">AD</div>
                <div>
                  <p className="font-black uppercase text-xs">Amara Diop</p>
                  <p className="text-[10px] text-sand/40">amara@paris.fr</p>
                </div>
              </div>
              <button className="w-full py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">Voir le profil</button>
            </div>
          </div>

          <div className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Livraison</h3>
            <div className="text-sm text-sand/70 space-y-2">
              <p>12 Avenue des Champs-Élysées</p>
              <p>75008 Paris, France</p>
              <div className="pt-4 flex items-center gap-2 text-primary">
                <Truck size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">DHL Express World</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdminDashboard: React.FC = () => {
  const location = useLocation();

  const Sidebar = () => (
    <aside className="w-72 bg-charcoal border-r border-white/10 h-screen sticky top-0 p-8 flex flex-col">
      <Link to="/" className="flex items-center gap-3 text-primary mb-12">
        <div className="size-8 bg-primary/20 rounded flex items-center justify-center font-black">S</div>
        <span className="font-black brand-font text-lg tracking-tighter">SÈGANDÉ ADMIN</span>
      </Link>
      <nav className="space-y-1 flex-1">
        <p className="text-[9px] uppercase font-black text-sand/30 tracking-[0.3em] mb-4 mt-6">Navigation</p>
        {[
          { icon: LayoutDashboard, label: 'Vue d\'ensemble', path: '/admin' },
          { icon: Package, label: 'Inventaire', path: '/admin/inventory' },
          { icon: ShoppingCart, label: 'Commandes', path: '/admin/orders' },
          { icon: Users, label: 'Clients & CRM', path: '/admin/crm' },
        ].map(item => (
          <Link 
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${location.pathname === item.path ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-sand/50 hover:bg-white/5 hover:text-white'}`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        ))}

        <p className="text-[9px] uppercase font-black text-sand/30 tracking-[0.3em] mb-4 mt-8">Logistique</p>
        {[
          { icon: Truck, label: 'Expéditions', path: '/admin/shipping' },
          { icon: FileText, label: 'Facturation', path: '/admin/billing' },
        ].map(item => (
          <Link 
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${location.pathname === item.path ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-sand/50 hover:bg-white/5 hover:text-white'}`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="pt-8 border-t border-white/5">
        <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sand/40 hover:text-white text-[11px] font-bold uppercase tracking-widest">
          <Settings size={16} /> Paramètres
        </Link>
      </div>
    </aside>
  );

  const Overview = () => (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Revenu Mensuel', value: '€82,490', trend: '+14.2%', icon: BarChart3, color: 'text-primary' },
          { label: 'Ventes du Jour', value: '12', trend: '+8.1%', icon: ShoppingCart, color: 'text-white' },
          { label: 'Clients Actifs', value: '1,202', trend: '+2.4%', icon: Users, color: 'text-white' },
          { label: 'Inventaire', value: '428', trend: '-2.1%', icon: Package, color: 'text-white' },
        ].map(s => (
          <div key={s.label} className="bg-charcoal p-6 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="size-10 bg-white/5 rounded-xl flex items-center justify-center text-sand/40 group-hover:text-primary transition-colors">
                <s.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold ${s.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {s.trend}
              </span>
            </div>
            <p className="text-[9px] uppercase font-black text-sand/40 tracking-widest mb-1">{s.label}</p>
            <h4 className={`text-2xl font-black ${s.color}`}>{s.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-charcoal p-8 rounded-3xl border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest">Commandes Récentes</h3>
            <Link to="/admin/orders" className="text-[10px] font-black uppercase text-primary border-b border-primary/20 pb-0.5">Voir tout</Link>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black">#{i}</div>
                  <div>
                    <p className="text-xs font-black uppercase">Amara Diop</p>
                    <p className="text-[9px] text-sand/30 font-bold">14 Mars 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-xs">€320.00</p>
                  <span className="text-[8px] uppercase font-black text-green-500">Prêt</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-charcoal p-8 rounded-3xl border border-white/5">
           <h3 className="text-sm font-black uppercase tracking-widest mb-8">Performance par Catégorie</h3>
           <div className="space-y-6">
              {['Maroquinerie', 'Artisanat', 'Textiles'].map((c, i) => (
                <div key={c} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>{c}</span>
                    <span>{85 - i * 15}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${85 - i * 15}%` }} transition={{ duration: 1 }} className="h-full bg-primary" />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background-dark min-h-screen flex text-white overflow-hidden selection:bg-primary selection:text-black">
      <Sidebar />
      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="inventory" element={
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black uppercase">Inventaire</h2>
                <Link to="/admin/inventory/new" className="bg-primary text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20">
                  <Plus size={16} /> Ajouter un produit
                </Link>
              </div>
              <div className="bg-charcoal rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-sand/40">
                    <tr><th className="p-6">Produit</th><th className="p-6">Catégorie</th><th className="p-6">Prix</th><th className="p-6">Stock</th><th className="p-6">Actions</th></tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map(i => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                        <td className="p-6 font-bold uppercase text-xs">Produit Artisanat #{i}</td>
                        <td className="p-6 text-[10px] uppercase font-bold text-sand/40">Mode</td>
                        <td className="p-6 font-black text-primary">€450.00</td>
                        <td className="p-6"><span className="text-green-500 font-bold text-[10px]">EN STOCK</span></td>
                        <td className="p-6 flex gap-4"><Edit size={14} className="cursor-pointer text-sand/30 hover:text-white" /><Trash2 size={14} className="cursor-pointer text-sand/30 hover:text-red-500" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          } />
          <Route path="inventory/new" element={<ProductForm />} />
          <Route path="orders" element={
            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase">Commandes</h2>
              <div className="bg-charcoal rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-sand/40">
                    <tr><th className="p-6">ID</th><th className="p-6">Client</th><th className="p-6">Total</th><th className="p-6">Statut</th><th className="p-6"></th></tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map(i => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                        <td className="p-6 font-black text-xs">#SEG-100{i}</td>
                        <td className="p-6 font-bold uppercase text-xs">Amara Diop</td>
                        <td className="p-6 font-black">€320.00</td>
                        <td className="p-6"><span className="bg-green-500/10 text-green-500 px-3 py-1 rounded text-[8px] font-black">PAYÉ</span></td>
                        <td className="p-6 text-right"><Link to={`/admin/orders/SEG-100${i}`} className="text-[10px] font-black uppercase text-primary">Détails</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          } />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="crm" element={
            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase">Clients</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Amara Diop', spent: '€2,450', segment: 'ELITE' },
                  { name: 'Julian Smith', spent: '€890', segment: 'PREMIUM' },
                  { name: 'Elena Rossi', spent: '€1,120', segment: 'ELITE' }
                ].map(c => (
                  <div key={c.name} className="bg-charcoal p-8 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="size-12 bg-primary/20 text-primary rounded-full flex items-center justify-center font-black">{c.name[0]}</div>
                      <span className="text-[8px] font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded">{c.segment}</span>
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm">{c.name}</h4>
                      <p className="text-[10px] text-sand/40 uppercase font-bold tracking-widest mt-1">Total dépensé: <span className="text-white">{c.spent}</span></p>
                    </div>
                    <button className="w-full py-3 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all">Consulter historique</button>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="settings" element={<div className="p-40 text-center uppercase tracking-widest font-black opacity-10 text-5xl">Simulation: Boutique Settings</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
