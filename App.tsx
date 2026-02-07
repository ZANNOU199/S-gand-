
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { CartItem, Product } from './types';
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
  error: string | null;
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

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>(null);

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
    name: p.name || '',
    slug: p.slug || '',
    description: p.description || '',
    price: Number(p.price) || 0,
    images: Array.isArray(p.images) ? p.images : [],
    variants: Array.isArray(p.variants) ? p.variants : [],
    category: p.category || '',
    sector: p.sector || '',
    rating: Number(p.rating) || 5,
    reviewsCount: Number(p.reviews_count) || 0,
    badges: Array.isArray(p.badges) ? p.badges : [],
    isFeatured: !!p.is_featured
  });

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [sectorsRes, productsRes, configRes] = await Promise.all([
        supabase.from('sectors').select('*').order('id'),
        supabase.from('products').select('*').order('id'),
        supabase.from('site_config').select('*').eq('id', 'global').maybeSingle()
      ]);

      if (sectorsRes.error) throw sectorsRes.error;
      if (productsRes.error) throw productsRes.error;

      setSectors(sectorsRes.data || []);
      setProducts((productsRes.data || []).map(mapProductFromDB));
      
      if (configRes.data && configRes.data.data) {
        setSiteConfig(configRes.data.data);
      } else {
        // Strictement null si rien en DB
        setSiteConfig(null);
      }
    } catch (e: any) {
      console.error("DB Fetch Error:", e);
      setError(e.message || "Impossible d'accéder au Cloud SÈGANDÉ.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

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
    await supabase.from('site_config').upsert({ id: 'global', data: newConfig });
    setSiteConfig(newConfig);
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

  return (
    <CMSContext.Provider value={{ 
      siteConfig, sectors, products, isAdminAuthenticated, isLoading, error, setAdminAuthenticated,
      addSector, updateSector, deleteSector, addProduct, updateProduct, deleteProduct, toggleFeaturedProduct, updateSiteConfig,
      refreshData: fetchData
    }}>
      <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, total }}>
        {isLoading ? (
          <div className="min-h-screen bg-background-dark flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-primary font-black uppercase tracking-[0.5em] mb-2 text-xs">SÈGANDÉ</h2>
              <p className="text-sand/20 text-[8px] uppercase font-bold tracking-[0.3em]">Lecture Base de Données...</p>
            </div>
          </div>
        ) : error ? (
          <div className="min-h-screen bg-background-dark flex items-center justify-center p-8">
            <div className="max-w-md text-center space-y-6">
              <div className="text-red-500/50 text-6xl font-black">!</div>
              <h2 className="text-xl font-black uppercase tracking-widest text-white">Connexion DB Échouée</h2>
              <p className="text-sand/40 text-[10px] uppercase font-bold leading-relaxed">{error}</p>
              <button onClick={() => fetchData()} className="bg-primary text-black px-8 py-3 rounded-lg font-black text-[10px] uppercase">Réessayer</button>
            </div>
          </div>
        ) : children}
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
