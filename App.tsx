
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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

// --- CMS Types ---
interface EditorialSection {
  title: string;
  quote: string;
  text: string;
  image: string;
}

interface Sector {
  name: string;
  slug: string;
  image: string;
}

interface CMSContextType {
  siteConfig: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    announcement: string;
    contact: {
      title: string;
      subtitle: string;
      email: string;
      phone1: string;
      phone2: string;
      address: string;
    };
    featuredProductIds: string[];
    editorial: {
      heroTitle: string;
      heroImage: string;
      sections: EditorialSection[];
    };
    footer: {
      aboutText: string;
    };
  };
  sectors: Sector[];
  products: Product[];
  isAdminAuthenticated: boolean;
  setAdminAuthenticated: (val: boolean) => void;
  updateSiteConfig: (config: any) => void;
  updateSectors: (sectors: Sector[]) => void;
  updateProducts: (products: Product[]) => void;
  toggleFeaturedProduct: (productId: string) => void;
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

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('segande_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('segande_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('segande_site_config');
    return saved ? JSON.parse(saved) : {
      heroTitle: "THE MODERN SOUL OF AFRICA",
      heroSubtitle: "Authentic craftsmanship meets contemporary luxury. Discover the soul of artisanal heritage through the Sahel Collection.",
      heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBYQmVC8vZfGs0ngaCbdT5xtxUTngbs-h4NHeitJaxHnviefXNQBZTjJcLAP82o9MS5sLQaSnc8bcg5sGmGFbIdDvht7ukSV8GdFMC-JQw3x7sN3ychXmMLhPuSq1KhZdR-98ElfhTrvFPTas00RrYfakji60hzlLK-BN6-qto-oZmQlVQJ_4As3FN5FR0lb5mgcNUlqUapkOeHqhNIRdRNqq44HrZMH41WoMfCjpUfEDmVYmqsyVwvtI7KmjfETuSbUZ2vKg1rKDu",
      announcement: "LIVRAISON MONDE OFFERTE | COLLECTION SAHEL DISPONIBLE",
      contact: {
        title: "Personal Concierge",
        subtitle: "Our specialized team is available to assist you with bespoke requests, international shipping inquiries, or private collection viewings.",
        email: "concierge@segande.com",
        phone1: "+229 96 11 37 38",
        phone2: "+229 64 01 70 66",
        address: "Victoria Island, Lagos, Nigeria"
      },
      featuredProductIds: FEATURED_PRODUCTS.slice(0, 4).map(p => p.id),
      editorial: {
        heroTitle: "Savoir-Faire & Héritage",
        heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfJlmBSowEjlbIFfda3GxFvnQdRa6cYM_Ll4IaA7gSE6BAKNsx657dPZqJK-20U4b-JfvY0q9NN1krfY8oPbxxxCtRpkgE7MgoPtnM9ml-q6wVZQk1TvKe8Vz3cPWosvtHk_wrz6fZz-saNYECI86SaTKxLvWjm6ONSqHaYzv4MAIOm-lqyJ8-c0nJAWx5JPVN6a8upMqKrNSPtB8OqHnd2Eaxl1dFbEuanBMMRzmBaeg1RGOBh-m3e5dCI4RRH-brbb2ZekHqLnCT",
        sections: [
          {
            title: "Le Geste Auguste",
            quote: "Chaque point de couture, chaque coup de ciseau sur le bois, est un dialogue entre le passé et le futur.",
            text: "Chez SÈGANDÉ, le savoir-faire n'est pas seulement une technique, c'est un héritage vivant. Nous travaillons avec des maîtres artisans au Bénin, au Mali et au Nigeria qui utilisent des méthodes de tannage végétal et de tissage à la main inchangées depuis des siècles.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbqRE-SdeillU7VtjhWINQ67vBXlFwlB595kbU_k-0YxwNUwaDepWnsrGxNPU2wKF2odLhLCCYFgZOIBTcypLcE4PgAfSqcBy2aifoLonGwlOY0XG0wULCXxQxfa7_L8m4_zT3328jMEumQFLaMnJZWejSx9Jgeyjfv5Mvd54--tF_h0JVaU10c0hIC3s__Bh0Mt4RN7xc5WoU6v9de4sSpMxEjipKL4Z8-fAZBArFdBLjWN_G49lVxeQwzj3ObL6_ke6vGln5iQAA"
          }
        ]
      },
      footer: {
        aboutText: "Le temps est l'artisan ultime. Nos collections célèbrent l'héritage africain à travers une vision contemporaine et durable."
      }
    };
  });

  const [sectors, setSectors] = useState<Sector[]>(() => {
    const saved = localStorage.getItem('segande_sectors');
    if (saved) return JSON.parse(saved);
    return SECTORS.map(s => ({
      name: s.name,
      slug: s.slug,
      image: s.image
    }));
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

  const toggleFeaturedProduct = (id: string) => {
    setSiteConfig(prev => {
      const isFeatured = prev.featuredProductIds.includes(id);
      let newIds = [...prev.featuredProductIds];
      if (isFeatured) {
        newIds = newIds.filter(fid => fid !== id);
      } else {
        newIds = [...newIds, id].slice(-4);
      }
      return { ...prev, featuredProductIds: newIds };
    });
  };

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
      siteConfig, sectors, products, isAdminAuthenticated, setAdminAuthenticated,
      updateSiteConfig: (c) => setSiteConfig(prev => ({...prev, ...c})),
      updateSectors: setSectors,
      updateProducts: setProducts,
      toggleFeaturedProduct
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
