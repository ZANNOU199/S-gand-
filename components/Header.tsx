
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useCMS } from '../App';
import { LOGO_SVG } from '../constants';
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { sectors } = useCMS();
  const navigate = useNavigate();
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/95 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-5">
        
        {/* Left: Dynamic Menu from Sectors */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link 
            to="/category/all" 
            className="text-[10px] font-black tracking-[0.25em] uppercase transition-all text-white/60 hover:text-primary"
          >
            Universes
          </Link>
          {sectors.map(sector => (
            <Link 
              key={sector.slug}
              to={`/category/${sector.slug}`} 
              className="text-[10px] font-black tracking-[0.25em] uppercase transition-all text-white/60 hover:text-primary"
            >
              {sector.name}
            </Link>
          ))}
          <Link 
            to="/journal" 
            className="text-[10px] font-black tracking-[0.25em] uppercase transition-all text-white/60 hover:text-primary"
          >
            Savoir-faire
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white" aria-label="Toggle Menu">
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Center: Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 group">
          <div className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500">
            {LOGO_SVG}
          </div>
          <h1 className="text-xl font-black brand-font tracking-tighter text-white">SÈGANDÉ</h1>
        </Link>

        {/* Right: Utilities */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-white/60 hover:text-white transition-colors">
            <Search size={18} />
          </button>
          <button onClick={() => navigate('/profile')} className="text-white/60 hover:text-white transition-colors">
            <User size={19} />
          </button>
          <Link to="/cart" className="relative flex items-center gap-1 text-white/60 hover:text-primary transition-colors">
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-[9px] text-background-dark font-black size-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-charcoal border-b border-white/10 px-8 py-10 flex flex-col gap-6 z-50 shadow-2xl"
          >
            <Link to="/category/all" className="text-lg font-black uppercase text-white tracking-widest" onClick={closeMenu}>Tout</Link>
            {sectors.map(sector => (
              <Link 
                key={sector.slug} 
                to={`/category/${sector.slug}`} 
                className="text-lg font-black uppercase text-white/60 tracking-widest hover:text-primary" 
                onClick={closeMenu}
              >
                {sector.name}
              </Link>
            ))}
            <Link to="/journal" className="text-lg font-black uppercase text-white/60 tracking-widest" onClick={closeMenu}>Savoir-faire</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
