
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_SVG } from '../constants';
import { Globe, Share2, ShieldCheck, Truck, Leaf } from 'lucide-react';
import { useCMS } from '../App';

const Footer: React.FC = () => {
  const { sectors } = useCMS();

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
              Redéfinir le luxe contemporain à travers le prisme de l'artisanat africain. Découvrez l'âme du continent.
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
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Univers</h4>
            <ul className="space-y-4 text-sand/60 text-sm">
              {sectors.map(sector => (
                <li key={sector.slug}>
                  <Link to={`/category/${sector.slug}`} className="hover:text-primary transition-colors">{sector.name}</Link>
                </li>
              ))}
              <li><Link to="/category/all" className="hover:text-primary transition-colors">Collections limitées</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Concierge</h4>
            <ul className="space-y-4 text-sand/60 text-sm">
              <li><Link to="#" className="hover:text-primary transition-colors">Expédition et retours</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Paiement sécurisé</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Guide des tailles</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contactez-nous</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Rejoignez le monde</h4>
            <p className="text-sand/60 text-xs mb-4">Soyez parmi les premiers à découvrir les nouvelles collections et les histoires d'artisans.</p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:ring-primary focus:border-primary outline-none transition-all" 
                placeholder="Votre adresse e-mail" 
                type="email" 
              />
              <button className="bg-primary text-background-dark font-bold text-xs uppercase py-3 rounded-lg tracking-widest hover:bg-white transition-all">S'abonner</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sand/40 text-[10px] uppercase tracking-widest">© 2024 SÈGANDÉ Luxury. Tous droits réservés.</p>
          <div className="flex items-center gap-8 text-sand/30 grayscale hover:grayscale-0 transition-all">
             <ShieldCheck size={20} />
             <Truck size={20} />
             <Leaf size={20} />
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-sand/40 font-bold">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Termes</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
