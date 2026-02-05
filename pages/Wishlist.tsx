
import React, { useState } from 'react';
import { useCart } from '../App';
import { useCMS } from '../App';
import ProductCard from '../components/ProductCard';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 6;

const Wishlist: React.FC = () => {
  const { wishlist } = useCart();
  const { products } = useCMS();
  const [currentPage, setCurrentPage] = useState(1);
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));
  const totalPages = Math.ceil(wishlistProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = wishlistProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (wishlistProducts.length === 0) {
    return (
      <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center text-center p-8 text-white">
        <Heart size={64} className="text-white/10 mb-8" />
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Votre liste est vide</h2>
        <p className="text-sand/50 max-w-sm mb-10">Laissez-vous inspirer par nos créations artisanales et sauvegardez vos pièces favorites ici.</p>
        <Link to="/category/all" className="bg-primary text-black px-10 py-4 rounded-lg font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all">
          Découvrir les collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background-dark min-h-screen py-24 px-8 text-white">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-2 block">Ma Sélection</span>
            <h1 className="text-6xl font-black uppercase tracking-tighter">Favoris</h1>
          </div>
          {totalPages > 1 && (
            <div className="text-[10px] font-black uppercase tracking-widest text-sand/40">
              Page {currentPage} / {totalPages}
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-20 flex justify-center gap-6">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="flex items-center gap-3 px-8 py-4 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:border-primary disabled:opacity-0 transition-all"
            >
              <ChevronLeft size={16} /> Précédent
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="flex items-center gap-3 px-8 py-4 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary hover:border-primary disabled:opacity-0 transition-all"
            >
              Suivant <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
