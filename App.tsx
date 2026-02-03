
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import { SECTORS, FEATURED_PRODUCTS } from './constants';

// --- CMS Context ---
interface CMSContextType {
  siteConfig: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    announcement: string;
  };
  sectors: typeof SECTORS;
  products: Product[];
  updateSiteConfig: (config: any) => void;
  updateSectors: (sectors: any[]) => void;
  updateProducts: (products: Product[]) => void;
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
  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('segande_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('segande_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // CMS State
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('segande_site_config');
    return saved ? JSON.parse(saved) : {
      heroTitle: "THE MODERN SOUL OF AFRICA",
      heroSubtitle: "Authentic craftsmanship meets contemporary luxury. Discover the soul of artisanal heritage through the Sahel Collection.",
      heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBYQmVC8vZfGs0ngaCbdT5xtxUTngbs-h4NHeitJaxHnviefXNQBZTjJcLAP82o9MS5sLQaSnc8bcg5sGmGFbIdDvht7ukSV8GdFMC-JQw3x7sN3ychXmMLhPuSq1KhZdR-98ElfhTrvFPTas00RrYfakji60hzlLK-BN6-qto-oZmQlVQJ_4As3FN5FR0lb5mgcNUlqUapkOeHqhNIRdRNqq44HrZMH41WoMfCjpUfEDmVYmqsyVwvtI7KmjfETuSbUZ2vKg1rKDu",
      announcement: "LIVRAISON MONDE OFFERTE | COLLECTION SAHEL DISPONIBLE"
    };
  });

  const [sectors, setSectors] = useState(() => {
    const saved = localStorage.getItem('segande_sectors');
    return saved ? JSON.parse(saved) : SECTORS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('segande_products');
    return saved ? JSON.parse(saved) : FEATURED_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('segande_cart', JSON.stringify(cart));
    localStorage.setItem('segande_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('segande_site_config', JSON.stringify(siteConfig));
    localStorage.setItem('segande_sectors', JSON.stringify(sectors));
    localStorage.setItem('segande_products', JSON.stringify(products));
  }, [cart, wishlist, siteConfig, sectors, products]);

  const addToCart = (product: Product, variantId: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id && item.variantId === variantId);
      const variant = product.variants.find(v => v.id === variantId);
      if (existing) {
        return prev.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        variantId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.images[0],
        variantName: `${variant?.color} - ${variant?.size}`
      }];
    });
  };

  const removeFromCart = (itemId: string) => setCart(prev => prev.filter(i => i.id !== itemId));
  const updateQuantity = (itemId: string, quantity: number) => {
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i));
  };
  const toggleWishlist = (id: string) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CMSContext.Provider value={{ 
      siteConfig, sectors, products, 
      updateSiteConfig: (c) => setSiteConfig(prev => ({...prev, ...c})),
      updateSectors: setSectors,
      updateProducts: setProducts
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

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-background-dark selection:bg-primary selection:text-white">
          <Header />
          <main className="flex-grow">
            <PageWrapper>
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
            </PageWrapper>
          </main>
          <Footer />
          <LiveSupport />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
