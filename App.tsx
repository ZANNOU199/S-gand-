
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { CartItem, Product } from './types';
import { SECTORS, FEATURED_PRODUCTS } from './constants';
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

interface CMSContextType {
  siteConfig: any;
  sectors: Sector[];
  products: Product[];
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
  contact: { title: "Contact", subtitle: "Nous sommes à votre écoute", email: "contact@segande.com", phone1: "+229 01010101", phone2: "+229 02020202", address: "Cotonou, Bénin" },
  footer: { aboutText: "Maison de luxe africaine dédiée à l'artisanat d'exception." },
  editorial: { heroTitle: "L'Art de Créer", heroImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d", sections: [] }
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>(DEFAULT_CONFIG);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('segande_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const mapProductFromDB = (p: any): Product => ({
    id: String(p.id),
    name: p.name || 'Sans nom',
    slug: p.slug || `piece-${p.id}`,
    description: p.description || '',
    price: Number(p.price) || 0,
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : ["https://via.placeholder.com/600x800?text=SÈGANDÉ"],
    variants: Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : [{ id: "v1", color: "Unique", size: "Standard", stock: 10, sku: "SKU" }],
    category: p.category || '',
    sector: p.sector || '',
    rating: Number(p.rating) || 5,
    reviewsCount: Number(p.reviews_count) || 0,
    badges: Array.isArray(p.badges) ? p.badges : [],
    isFeatured: !!p.is_featured
  });

  const fetchData = async () => {
    try {
      const [sectorsRes, productsRes, configRes] = await Promise.all([
        supabase.from('sectors').select('*').order('id'),
        supabase.from('products').select('*').order('id'),
        supabase.from('site_config').select('*').eq('id', 'global')
      ]);

      if (sectorsRes.data && sectorsRes.data.length > 0) {
        setSectors(sectorsRes.data);
      } else {
        setSectors(SECTORS.map((s, i) => ({ ...s, id: i + 1 })));
      }

      if (productsRes.data && productsRes.data.length > 0) {
        setProducts(productsRes.data.map(mapProductFromDB));
      } else {
        setProducts(FEATURED_PRODUCTS.map(p => ({ ...p, isFeatured: true })));
      }

      if (configRes.data && configRes.data.length > 0) {
        const cloudData = configRes.data[0].data || {};
        setSiteConfig((prev: any) => ({
          ...prev,
          ...cloudData,
          contact: { ...prev.contact, ...(cloudData.contact || {}) },
          footer: { ...prev.footer, ...(cloudData.footer || {}) },
          editorial: { ...prev.editorial, ...(cloudData.editorial || {}) }
        }));
      }
    } catch (e) {
      console.error("Erreur de synchronisation Cloud:", e);
      // Fallback local
      setSectors(SECTORS.map((s, i) => ({ ...s, id: i + 1 })));
      setProducts(FEATURED_PRODUCTS.map(p => ({ ...p, isFeatured: true })));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  // CRUD Functions...
  const addSector = async (sector: any) => { await supabase.from('sectors').insert([sector]); await fetchData(); };
  const updateSector = async (id: number, sector: any) => { await supabase.from('sectors').update(sector).eq('id', id); await fetchData(); };
  const deleteSector = async (id: number) => { await supabase.from('sectors').delete().eq('id', id); await fetchData(); };
  const addProduct = async (p: any) => { await supabase.from('products').insert([p]); await fetchData(); };
  const updateProduct = async (p: any) => { await supabase.from('products').update(p).eq('id', Number(p.id)); await fetchData(); };
  const deleteProduct = async (id: number) => { await supabase.from('products').delete().eq('id', id); await fetchData(); };
  const toggleFeaturedProduct = async (id: string) => { 
    const p = products.find(prod => prod.id === id);
    if (p) { await supabase.from('products').update({ is_featured: !p.isFeatured }).eq('id', Number(id)); await fetchData(); }
  };
  const updateSiteConfig = async (newConfig: any) => {
    const updated = { ...siteConfig, ...newConfig };
    await supabase.from('site_config').upsert({ id: 'global', data: updated });
    setSiteConfig(updated);
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
  const toggleWishlist = (id: string) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('segande_cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center animate-in fade-in duration-1000">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-primary font-black uppercase tracking-[0.5em] mb-2">SÈGANDÉ</h2>
          <p className="text-sand/20 text-[9px] uppercase font-bold tracking-widest">Initialisation Cloud...</p>
        </div>
      </div>
    );
  }

  return (
    <CMSContext.Provider value={{ 
      siteConfig, sectors, products, isAdminAuthenticated, isLoading, setAdminAuthenticated,
      addSector, updateSector, deleteSector, addProduct, updateProduct, deleteProduct, toggleFeaturedProduct, updateSiteConfig,
      refreshData: fetchData
    }}>
      <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, total }}>
        {children}
      </CartContext.Provider>
    </CMSContext.Provider>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-background-dark text-white">
        <Header />
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
        <Footer />
        <LiveSupport />
      </div>
    </HashRouter>
  </AppProvider>
);

export default App;
