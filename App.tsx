
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { CartItem, Product, Order, Campaign } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Editorial from './pages/Editorial';
import UserDashboard from './pages/UserDashboard';
import Wishlist from './pages/Wishlist';
import StyleQuiz from './pages/StyleQuiz';
import AdminDashboard from './pages/AdminDashboard';
import LiveSupport from './components/LiveSupport';

const supabase = createClient(
  'https://szcrmuhibgvkrwtkhxnt.supabase.co',
  'sb_publishable_u99W3zlTupZ0Ia0MP1wp9g_C_lcJVMO'
);

interface Sector {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

interface CMSContextType {
  siteConfig: any;
  sectors: Sector[];
  products: Product[];
  orders: Order[];
  subscribers: Subscriber[];
  campaigns: Campaign[];
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  setAdminAuthenticated: (val: boolean) => void;
  addSector: (sector: any) => Promise<void>;
  updateSector: (id: number, sector: any) => Promise<void>;
  deleteSector: (id: number) => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (product: any) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  toggleFeaturedProduct: (productId: string) => Promise<void>;
  updateSiteConfig: (config: any) => Promise<void>;
  createOrder: (order: Partial<Order>) => Promise<any>;
  subscribeNewsletter: (email: string) => Promise<{ success: boolean; message: string }>;
  saveCampaign: (campaign: any) => Promise<void>;
  refreshData: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);
export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within CMSProvider');
  return context;
};

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, variantId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

const DEFAULT_CONFIG = {
  heroTitle: "SÈGANDÉ",
  heroSubtitle: "L'Âme Moderne de l'Afrique",
  heroImage: "https://images.unsplash.com/photo-1549490349-8643362247b5",
  contact: { title: "Contact", subtitle: "Nous sommes à votre écoute", email: "contact@segande.com", phone1: "+229 00000000", phone2: "", address: "Cotonou, Bénin" },
  footer: { aboutText: "Maison de luxe africaine." },
  editorial: { heroTitle: "Artisanat", heroImage: "", sections: [] }
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>(DEFAULT_CONFIG);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('segande_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const parseSafe = (data: any) => {
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch (e) { return []; }
    }
    return Array.isArray(data) ? data : [];
  };

  const mapProductFromDB = (p: any): Product => {
    const images = parseSafe(p.images);
    return {
      id: String(p.id),
      name: p.name || 'Sans nom',
      slug: p.slug || `piece-${p.id}`,
      description: p.description || '',
      price: Number(p.price) || 0,
      images: images.length > 0 ? images : ["https://via.placeholder.com/600x800?text=SÈGANDÉ"],
      variants: parseSafe(p.variants),
      category: p.category || 'Non classé',
      sector: p.sector || '',
      rating: p.rating || 5,
      reviewsCount: p.reviews_count || 0,
      badges: parseSafe(p.badges),
      isFeatured: !!p.is_featured
    };
  };

  const fetchData = async () => {
    try {
      const { data: sData } = await supabase.from('sectors').select('*').order('id');
      const { data: pData } = await supabase.from('products').select('*').order('id');
      const { data: cData } = await supabase.from('site_config').select('*').eq('id', 'global');
      const { data: oData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      const { data: subData } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
      const { data: campData } = await supabase.from('newsletter_campaigns').select('*').order('sent_at', { ascending: false });

      if (sData) setSectors(sData);
      if (pData) setProducts(pData.map(mapProductFromDB));
      if (cData && cData.length > 0) setSiteConfig(cData[0].data);
      if (oData) setOrders(oData);
      if (subData) setSubscribers(subData);
      if (campData) setCampaigns(campData);
      
    } catch (e) {
      console.error("Erreur fetchData:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const subscribeNewsletter = async (email: string) => {
    const { error } = await supabase.from('newsletter_subscribers').insert([{ email }]);
    if (error) {
      if (error.code === '23505') return { success: false, message: "Cet email est déjà inscrit." };
      return { success: false, message: "Une erreur est survenue." };
    }
    fetchData(); // Refresh subscribers for admin
    return { success: true, message: "Bienvenue dans la Maison SÈGANDÉ." };
  };

  // Function to save newsletter campaigns to database
  const saveCampaign = async (campaign: any) => {
    await supabase.from('newsletter_campaigns').insert([campaign]);
    await fetchData();
  };

  const addSector = async (sector: any) => {
    await supabase.from('sectors').insert([{ name: sector.name, slug: sector.slug, image: sector.image }]);
    await fetchData();
  };

  const updateSector = async (id: number, sector: any) => {
    await supabase.from('sectors').update({ name: sector.name, slug: sector.slug, image: sector.image }).eq('id', id);
    await fetchData();
  };

  const deleteSector = async (id: number) => {
    await supabase.from('sectors').delete().eq('id', id);
    await fetchData();
  };

  const addProduct = async (p: any) => {
    await supabase.from('products').insert([{
      name: p.name, slug: p.slug, price: p.price, description: p.description, 
      sector: p.sector, images: p.images, is_featured: p.isFeatured,
      category: p.category, variants: p.variants, badges: p.badges
    }]);
    await fetchData();
  };

  const updateProduct = async (p: any) => {
    await supabase.from('products').update({
      name: p.name, slug: p.slug, price: p.price, description: p.description, 
      sector: p.sector, images: p.images, is_featured: p.isFeatured,
      category: p.category, variants: p.variants, badges: p.badges
    }).eq('id', Number(p.id));
    await fetchData();
  };

  const deleteProduct = async (id: number) => {
    await supabase.from('products').delete().eq('id', id);
    await fetchData();
  };

  const toggleFeaturedProduct = async (id: string) => {
    const p = products.find(prod => prod.id === id);
    if (!p) return;
    
    const currentlyFeatured = products.filter(x => x.isFeatured);
    if (!p.isFeatured && currentlyFeatured.length >= 4) {
      alert("LA SÉLECTION D'EXCEPTION EST LIMITÉE À 4 ARTICLES. VEUILLEZ DÉCOCHER UNE AUTRE PIÈCE D'ABORD.");
      return;
    }

    await supabase.from('products').update({ is_featured: !p.isFeatured }).eq('id', Number(id));
    await fetchData();
  };

  const updateSiteConfig = async (newConfig: any) => {
    const updated = { ...siteConfig, ...newConfig };
    await supabase.from('site_config').upsert({ id: 'global', data: updated });
    setSiteConfig(updated);
  };

  const createOrder = async (orderData: Partial<Order>) => {
    const { data, error } = await supabase.from('orders').insert([orderData]).select();
    await fetchData();
    return { data, error };
  };

  const addToCart = (product: Product, variantId: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id && item.variantId === variantId);
      if (existing) return prev.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        variantId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.images[0],
        variantName: product.variants.find(v => v.id === variantId)?.color || "Standard"
      }];
    });
  };

  const removeFromCart = (itemId: string) => setCart(prev => prev.filter(i => i.id !== itemId));
  const updateQuantity = (itemId: string, quantity: number) => setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i));
  const clearCart = () => setCart([]);
  const toggleWishlist = (id: string) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('segande_cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-primary font-black uppercase tracking-[0.5em] animate-pulse mb-2">SÈGANDÉ</h2>
          <p className="text-sand/20 text-[9px] uppercase font-bold tracking-widest">Initialisation de la Maison...</p>
        </div>
      </div>
    );
  }

  return (
    <CMSContext.Provider value={{ 
      siteConfig, sectors, products, orders, subscribers, campaigns, isAdminAuthenticated, isLoading, setAdminAuthenticated,
      addSector, updateSector, deleteSector, addProduct, updateProduct, deleteProduct, toggleFeaturedProduct, updateSiteConfig,
      createOrder, subscribeNewsletter, saveCampaign, refreshData: fetchData
    }}>
      <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, total }}>
        {children}
      </CartContext.Provider>
    </CMSContext.Provider>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white">
      {!isAdminPath && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/journal" element={<Editorial />} />
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/quiz" element={<StyleQuiz />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <LiveSupport />}
    </div>
  );
}

const App: React.FC = () => (
  <AppProvider>
    <HashRouter>
      <AppContent />
    </HashRouter>
  </AppProvider>
);

export default App;
