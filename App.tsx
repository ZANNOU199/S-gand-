
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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

// Initialize Supabase client
const supabase = createClient(
  'https://szcrmuhibgvkrwtkhxnt.supabase.co',
  'sb_publishable_u99W3zlTupZ0Ia0MP1wp9g_C_lcJVMO'
);

interface Sector {
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
  addSector: (sector: Sector) => Promise<void>;
  updateSector: (oldSlug: string, sector: Sector) => Promise<void>;
  deleteSector: (slug: string) => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (product: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
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

// --- Cart Context ---
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
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('segande_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Normalisation des produits (SQL snake_case -> JS camelCase)
  const mapProduct = (p: any): Product => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    images: p.images || [],
    variants: p.variants || [],
    category: p.category || '',
    sector: p.sector || '',
    rating: p.rating || 5,
    reviewsCount: p.reviews_count || 0,
    badges: p.badges || [],
    is_featured: p.is_featured // On garde les deux pour compatibilité
  } as any);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: sData, error: sError } = await supabase.from('sectors').select('*').order('name');
      const { data: pData, error: pError } = await supabase.from('products').select('*');
      const { data: cData, error: cError } = await supabase.from('site_config').select('*').eq('id', 'global').single();

      if (sError) console.error("Sectors Error:", sError);
      if (pError) console.error("Products Error:", pError);
      if (cError) console.error("Config Error:", cError);

      if (sData) setSectors(sData);
      if (pData) setProducts(pData.map(mapProduct));
      if (cData) setSiteConfig(cData.data);
    } catch (e) {
      console.error("Cloud Error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addSector = async (sector: Sector) => {
    await supabase.from('sectors').insert([sector]);
    await fetchData();
  };

  const updateSector = async (oldSlug: string, sector: Sector) => {
    await supabase.from('sectors').update(sector).eq('slug', oldSlug);
    await fetchData();
  };

  const deleteSector = async (slug: string) => {
    await supabase.from('sectors').delete().eq('slug', slug);
    await fetchData();
  };

  const addProduct = async (product: any) => {
    await supabase.from('products').insert([product]);
    await fetchData();
  };

  const updateProduct = async (product: any) => {
    await supabase.from('products').update(product).eq('id', product.id);
    await fetchData();
  };

  const deleteProduct = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    await fetchData();
  };

  const toggleFeaturedProduct = async (id: string) => {
    const p = products.find(prod => prod.id === id);
    if (!p) return;
    await supabase.from('products').update({ is_featured: !(p as any).is_featured }).eq('id', id);
    await fetchData();
  };

  const updateSiteConfig = async (newConfig: any) => {
    const updated = { ...siteConfig, ...newConfig };
    await supabase.from('site_config').upsert({ id: 'global', data: updated });
    setSiteConfig(updated);
  };

  const addToCart = (product: Product, variantId: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id && item.variantId === variantId);
      if (existing) {
        return prev.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      const variant = product.variants.find(v => v.id === variantId);
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        variantId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.images[0],
        variantName: `${variant?.color || ''} - ${variant?.size || ''}`
      }];
    });
  };

  const removeFromCart = (itemId: string) => setCart(prev => prev.filter(i => i.id !== itemId));
  const updateQuantity = (itemId: string, quantity: number) => {
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i));
  };
  const toggleWishlist = (id: string) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('segande_cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  if (isLoading || !siteConfig) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-primary font-black uppercase tracking-[0.5em] animate-pulse mb-4">SÈGANDÉ</h2>
          <p className="text-sand/20 text-[10px] uppercase font-bold tracking-widest">Connexion sécurisée au Cloud...</p>
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-background-dark selection:bg-primary selection:text-white">
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
};

export default App;
