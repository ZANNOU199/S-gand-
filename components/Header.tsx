
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
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-8 py-4 md:py-5">
        
        {/* Left: Dynamic Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/category/all" className="text-[9px] font-black tracking-[0.25em] uppercase transition-all text-white/40 hover:text-primary">Univers</Link>
          {sectors.map(sector => (
            <Link key={sector.slug} to={`/category/${sector.slug}`} className="text-[9px] font-black tracking-[0.25em] uppercase transition-all text-white/40 hover:text-primary">{sector.name}</Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white" aria-label="Toggle Menu">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Center: Reimagined Logo "SÈ [Clock] DÉ" */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 group">
          <span className="text-lg md:text-2xl font-black brand-font tracking-tighter text-white">SÈ</span>
          <div className="w-8 h-8 md:w-10 md:h-10 text-mint drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
            {LOGO_SVG}
          </div>
          <span className="text-lg md:text-2xl font-black brand-font tracking-tighter text-white">DÉ</span>
        </Link>

        {/* Right: Utilities */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="hidden sm:block text-white/40 hover:text-white transition-colors">
            <Search size={18} />
          </button>
          <button onClick={() => navigate('/profile')} className="text-white/40 hover:text-white transition-colors">
            <User size={19} />
          </button>
          <Link to="/cart" className="relative flex items-center gap-1 text-white/40 hover:text-primary transition-colors">
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
            className="lg:hidden absolute top-full left-0 w-full bg-charcoal border-b border-white/10 px-8 py-10 flex flex-col gap-6 z-50 shadow-2xl overflow-hidden"
          >
            <Link to="/category/all" className="text-lg font-black uppercase text-white tracking-widest" onClick={closeMenu}>Tout</Link>
            {sectors.map(sector => (
              <Link key={sector.slug} to={`/category/${sector.slug}`} className="text-lg font-black uppercase text-white/60 tracking-widest hover:text-primary" onClick={closeMenu}>{sector.name}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
