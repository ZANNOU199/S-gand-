
import React from 'react';
import { useCart } from '../App';
import { FEATURED_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const { wishlist } = useCart();
  
  const wishlistProducts = FEATURED_PRODUCTS.filter(p => wishlist.includes(p.id));

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
        <header className="mb-16">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-2 block">Ma Sélection</span>
          <h1 className="text-6xl font-black uppercase tracking-tighter">Favoris</h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {wishlistProducts.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product as any} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
