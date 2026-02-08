
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
import AdminDashboard from './pages/AdminDashboard';
import LiveSupport from './components/LiveSupport';

const supabase = createClient(
  'https://szcrmuhibgvkrwtkhxnt.supabase.co',
  'sb_publishable_u99W3zlTupZ0Ia0MP1wp9g_C_lcJVMO'
);

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

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

interface ContactMessage {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
}

interface CMSContextType {
  siteConfig: any;
  sectors: Sector[];
  products: Product[];
  orders: Order[];
  subscribers: Subscriber[];
  campaigns: Campaign[];
  contactMessages: ContactMessage[];
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
  sendContactMessage: (msg: Partial<ContactMessage>) => Promise<void>;
  deleteContactMessage: (id: number) => Promise<void>;
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
  contact: { 
    title: "Contact", 
    subtitle: "Notre équipe spécialisée est disponible pour vous accompagner.", 
    email: "contact@segande.com", 
    phone1: "+229 01 96 11 37 38", 
    phone2: "+229 01 64 01 70 66", 
    address: "Porto-Novo" 
  },
  footer: { aboutText: "SÈGANDÉ : Des créations artisanales pour le bien-être, la mode et la cuisine, pensées pour la vie moderne." }
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>(DEFAULT_CONFIG);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('segande_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchData = async () => {
    try {
      const { data: sData } = await supabase.from('sectors').select('*').order('id');
      const { data: pData } = await supabase.from('products').select('*').order('id');
      const { data: cData } = await supabase.from('site_config').select('*').eq('id', 'global');
      const { data: oData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      const { data: subData } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
      const { data: campData } = await supabase.from('newsletter_campaigns').select('*').order('sent_at', { ascending: false });
      const { data: mData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });

      if (sData) setSectors(sData);
      if (pData) setProducts(pData.map(p => ({
        id: String(p.id),
        name: p.name,
        slug: p.slug,
        price: Number(p.price),
        description: p.description,
        sector: p.sector,
        images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
        isFeatured: p.is_featured,
        category: p.category || '',
        variants: typeof p.variants === 'string' ? JSON.parse(p.variants) : p.variants,
        badges: typeof p.badges === 'string' ? JSON.parse(p.badges) : p.badges,
        rating: p.rating || 5,
        reviewsCount: p.reviews_count || 0
      })));
      if (cData && cData.length > 0) setSiteConfig(cData[0].data);
      if (oData) setOrders(oData);
      if (subData) setSubscribers(subData);
      if (campData) setCampaigns(campData);
      if (mData) setContactMessages(mData);
      
    } catch (e) {
      console.error("Erreur fetchData:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const sendContactMessage = async (msg: Partial<ContactMessage>) => {
    await supabase.from('contact_messages').insert([msg]);
    await fetchData();
  };

  const deleteContactMessage = async (id: number) => {
    await supabase.from('contact_messages').delete().eq('id', id);
    await fetchData();
  };

  const subscribeNewsletter = async (email: string) => {
    const { error } = await supabase.from('newsletter_subscribers').insert([{ email }]);
    if (error) return { success: false, message: "Cet email est déjà inscrit." };
    fetchData();
    return { success: true, message: "Bienvenue dans la Maison SÈGANDÉ." };
  };

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
      sector: p.sector, images: JSON.stringify(p.images), is_featured: p.isFeatured
    }]);
    await fetchData();
  };

  const updateProduct = async (p: any) => {
    await supabase.from('products').update({
      name: p.name, slug: p.slug, price: p.price, description: p.description, 
      sector: p.sector, images: JSON.stringify(p.images), is_featured: p.isFeatured
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

  return (
    <CMSContext.Provider value={{ 
      siteConfig, sectors, products, orders, subscribers, campaigns, contactMessages, isAdminAuthenticated, isLoading, setAdminAuthenticated,
      addSector, updateSector, deleteSector, addProduct, updateProduct, deleteProduct, toggleFeaturedProduct, updateSiteConfig,
      createOrder, subscribeNewsletter, saveCampaign, sendContactMessage, deleteContactMessage, refreshData: fetchData
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
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-charcoal dark:text-white">
      <ScrollToTop />
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
