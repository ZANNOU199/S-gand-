
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../App';
import { LOGO_SVG } from '../constants';
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-4">
        {/* Left: Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/category/all" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors text-white">Universes</Link>
          <Link to="/category/fashion" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors text-white">Fashion</Link>
          <Link to="/category/art" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors text-white">Art</Link>
          <Link to="/contact" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors text-white">Craftsmanship</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white" aria-label="Toggle Menu">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Center: Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group">
          <div className="w-8 h-8 text-primary group-hover:scale-110 transition-transform">
            {LOGO_SVG}
          </div>
          <h1 className="text-xl font-black brand-font tracking-tighter text-white">SÈGANDÉ</h1>
        </Link>

        {/* Right: Utilities */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-primary transition-all">
            <Search size={14} className="text-sand/50" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-[10px] font-medium placeholder:text-sand/30 text-white w-40" 
              placeholder="Search curated luxury" 
              type="text"
            />
          </div>
          <button onClick={() => navigate('/contact')} className="flex items-center gap-1 hover:text-primary transition-colors text-white" aria-label="Account">
            <User size={18} />
          </button>
          <Link to="/cart" className="relative flex items-center gap-1 hover:text-primary transition-colors text-white">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-[10px] text-background-dark font-bold size-4 flex items-center justify-center rounded-full border border-background-dark">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background-dark border-b border-white/10 px-8 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top duration-300">
          <Link to="/category/all" className="text-sm font-bold uppercase text-white tracking-widest" onClick={closeMenu}>Universes</Link>
          <Link to="/category/fashion" className="text-sm font-bold uppercase text-white tracking-widest" onClick={closeMenu}>Fashion</Link>
          <Link to="/category/art" className="text-sm font-bold uppercase text-white tracking-widest" onClick={closeMenu}>Art</Link>
          <Link to="/contact" className="text-sm font-bold uppercase text-white tracking-widest" onClick={closeMenu}>Craftsmanship</Link>
          <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
             <Link to="/cart" className="text-white hover:text-primary"><ShoppingBag size={20} /></Link>
             <Link to="/contact" className="text-white hover:text-primary"><User size={20} /></Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
