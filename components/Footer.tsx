
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_SVG } from '../constants';
import { Globe, Share2, ShieldCheck, Truck, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal border-t border-white/5 pt-20 pb-10 text-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="size-6 text-primary">
                {LOGO_SVG}
              </div>
              <h2 className="text-xl font-black brand-font tracking-tighter">SÈGANDÉ</h2>
            </div>
            <p className="text-sand/60 text-sm leading-relaxed mb-6">
              Redefining contemporary luxury through the lens of African craftsmanship. Discover the soul of the continent.
            </p>
            <div className="flex gap-4">
              <a href="#" className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                <Share2 size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Universe</h4>
            <ul className="space-y-4 text-sand/60 text-sm">
              <li><Link to="/category/fashion" className="hover:text-primary transition-colors">The Fashion Edit</Link></li>
              <li><Link to="/category/living" className="hover:text-primary transition-colors">Home & Living</Link></li>
              <li><Link to="/category/art" className="hover:text-primary transition-colors">The Art Gallery</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Limited Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Concierge</h4>
            <ul className="space-y-4 text-sand/60 text-sm">
              <li><Link to="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Secure Payment</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Join the World</h4>
            <p className="text-sand/60 text-xs mb-4">Be the first to explore new collections and artisan stories.</p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:ring-primary focus:border-primary outline-none transition-all" 
                placeholder="Your email address" 
                type="email" 
              />
              <button className="bg-primary text-background-dark font-bold text-xs uppercase py-3 rounded-lg tracking-widest hover:bg-white transition-all">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sand/40 text-[10px] uppercase tracking-widest">© 2024 SÈGANDÉ Luxury. All rights reserved.</p>
          <div className="flex items-center gap-8 text-sand/30 grayscale hover:grayscale-0 transition-all">
             <ShieldCheck size={20} />
             <Truck size={20} />
             <Leaf size={20} />
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-sand/40 font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
