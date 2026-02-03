
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useCMS } from '../App';
import { LOGO_SVG } from '../constants';
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react';
// Added missing import for AnimatePresence to fix build errors
import { AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { sectors } = useCMS();
  const navigate = useNavigate();
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/90 backdrop-blur-xl">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-5">
        
        {/* Left: Dynamic Sectors Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link to="/category/all" className="text-[10px] font-black tracking-[0.25em] uppercase hover:text-primary transition-colors text-white/70 hover:text-white">Universes</Link>
          {sectors.map(sector => (
            <Link 
              key={sector.slug}
              to={`/category/${sector.slug}`} 
              className="text-[10px] font-black tracking-[0.25em] uppercase hover:text-primary transition-colors text-white/70 hover:text-white"
            >
              {sector.name}
            </Link>
          ))}
          <Link to="/journal" className="text-[10px] font-black tracking-[0.25em] uppercase hover:text-primary transition-colors text-white/70 hover:text-white">Craftsmanship</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white" aria-label="Toggle Menu">
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Center: Logo (Perfectly Centered) */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 group">
          <div className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500">
            {LOGO_SVG}
          </div>
          <h1 className="text-xl font-black brand-font tracking-tighter text-white">SÈGANDÉ</h1>
        </Link>

        {/* Right: Utilities */}
        <div className="flex items-center gap-7">
          <div className="hidden xl:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-primary/50 transition-all">
            <Search size={14} className="text-sand/40" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-[10px] font-bold placeholder:text-sand/20 text-white w-32 uppercase tracking-widest" 
              placeholder="Search..." 
              type="text"
            />
          </div>
          <button onClick={() => navigate('/profile')} className="hover:text-primary transition-colors text-white/80" aria-label="Account">
            <User size={19} />
          </button>
          <Link to="/cart" className="relative flex items-center gap-1 hover:text-primary transition-colors text-white/80">
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-[9px] text-background-dark font-black size-4.5 flex items-center justify-center rounded-full border-2 border-background-dark">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="lg:hidden bg-background-dark border-b border-white/10 px-8 py-10 flex flex-col gap-6 animate-in slide-in-from-top duration-500">
            <Link to="/category/all" className="text-sm font-black uppercase text-white tracking-[0.2em]" onClick={closeMenu}>All Universes</Link>
            {sectors.map(sector => (
              <Link key={sector.slug} to={`/category/${sector.slug}`} className="text-sm font-black uppercase text-white/70 tracking-[0.2em]" onClick={closeMenu}>
                {sector.name}
              </Link>
            ))}
            <Link to="/journal" className="text-sm font-black uppercase text-white/70 tracking-[0.2em]" onClick={closeMenu}>Craftsmanship</Link>
            <div className="mt-6 pt-6 border-t border-white/5 flex gap-6">
               <Link to="/profile" className="text-primary font-black uppercase text-xs tracking-widest">Login</Link>
               <Link to="/contact" className="text-white/40 font-black uppercase text-xs tracking-widest">Help</Link>
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
