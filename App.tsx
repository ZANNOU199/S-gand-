
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
  id: any;
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
  updateSector: (id: any, sector: any) => Promise<void>;
  deleteSector: (id: any) => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (product: any) => Promise<void>;
  deleteProduct: (id: any) => Promise<void>;
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

  const mapProductFromDB = (p: any): Product => {
    let imgs = Array.isArray(p.images) ? p.images.filter((img: any) => img && img.trim() !== "") : [];
    if (imgs.length === 0) imgs = ["https://via.placeholder.com/600x800?text=SÈGANDÉ+LUXE"];

    return {
      id: p.id,
      name: p.name || 'Sans nom',
      slug: p.slug || `piece-${p.id}`,
      description: p.description || '',
      price: Number(p.price) || 0,
      images: imgs,
      variants: Array.isArray(p.variants) ? p.variants : [],
      category: p.category || '',
      sector: p.sector || '',
      rating: p.rating || 5,
      reviewsCount: p.reviews_count || 0,
      badges: Array.isArray(p.badges) ? p.badges : [],
      isFeatured: !!p.is_featured
    };
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: sData, error: sError } = await supabase.from('sectors').select('*');
      if (sError) console.error("Fetch Sectors Error:", sError);
      if (sData) setSectors(sData);

      const { data: pData, error: pError } = await supabase.from('products').select('*');
      if (pError) console.error("Fetch Products Error:", pError);
      setProducts((pData || []).map(mapProductFromDB));

      const { data: cData } = await supabase.from('site_config').select('*').eq('id', 'global');
      if (cData && cData.length > 0) setSiteConfig(cData[0].data);
    } catch (e) {
      console.error("Critical error in fetchData:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const addSector = async (sector: any) => {
    const { error } = await supabase.from('sectors').insert([{ name: sector.name, slug: sector.slug, image: sector.image }]);
    if (error) {
      alert("ERREUR SUPABASE (INSERT) : " + error.message + "\nCode: " + error.code);
    }
    await fetchData();
  };

  const updateSector = async (id: any, sector: any) => {
    // Utilisation du slug comme identifiant si l'id est absent (cas fréquent avec SQL manuel sans serial id)
    const filterField = id ? 'id' : 'slug';
    const filterValue = id || sector.slug;

    console.log(`Tentative de mise à jour du secteur via ${filterField}=${filterValue}`);
    
    const { error } = await supabase.from('sectors')
      .update({ name: sector.name, slug: sector.slug, image: sector.image })
      .eq(filterField, filterValue);

    if (error) {
      alert(`ERREUR SUPABASE (UPDATE via ${filterField}) : ` + error.message);
      console.error("Update Error details:", error);
    } else {
      console.log("Mise à jour réussie");
    }
    await fetchData();
  };

  const deleteSector = async (id: any) => {
    const target = sectors.find(s => s.id === id);
    const filterField = id ? 'id' : 'slug';
    const filterValue = id || target?.slug;

    if (!filterValue) {
      alert("Impossible de supprimer : aucun identifiant trouvé.");
      return;
    }

    const { error } = await supabase.from('sectors').delete().eq(filterField, filterValue);
    if (error) {
      alert(`ERREUR SUPABASE (DELETE via ${filterField}) : ` + error.message);
    }
    await fetchData();
  };

  const addProduct = async (product: any) => {
    const dbData = {
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      description: product.description,
      sector: product.sector,
      category: product.category,
      images: product.images,
      is_featured: !!product.isFeatured
    };
    const { error } = await supabase.from('products').insert([dbData]);
    if (error) alert("Erreur ajout produit: " + error.message);
    await fetchData();
  };

  const updateProduct = async (product: any) => {
    const dbData = {
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      description: product.description,
      sector: product.sector,
      category: product.category,
      images: product.images,
      is_featured: !!product.isFeatured
    };
    const filterField = product.id ? 'id' : 'slug';
    const filterValue = product.id || product.slug;

    const { error } = await supabase.from('products').update(dbData).eq(filterField, filterValue);
    if (error) alert(`Erreur modif produit via ${filterField}: ` + error.message);
    await fetchData();
  };

  const deleteProduct = async (id: any) => {
    const target = products.find(p => p.id === id);
    const filterField = id ? 'id' : 'slug';
    const filterValue = id || target?.slug;
    const { error } = await supabase.from('products').delete().eq(filterField, filterValue);
    if (error) alert(`Erreur suppression produit: ` + error.message);
    await fetchData();
  };

  const toggleFeaturedProduct = async (id: string) => {
    const p = products.find(prod => prod.id === id);
    if (!p) return;
    await supabase.from('products').update({ is_featured: !p.isFeatured }).eq('id', id);
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
      if (existing) return prev.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        variantId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.images[0],
        variantName: "Standard"
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

  if (isLoading || !siteConfig) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-primary font-black uppercase tracking-[0.5em] animate-pulse mb-2">SÈGANDÉ</h2>
          <p className="text-sand/20 text-[9px] uppercase font-bold tracking-widest">Connexion au Cloud...</p>
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
