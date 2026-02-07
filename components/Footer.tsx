
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_SVG } from '../constants';
import { ShieldCheck, Truck, Leaf, Phone } from 'lucide-react';
import { useCMS } from '../App';

const Footer: React.FC = () => {
  const { sectors, siteConfig } = useCMS();
  const { contact, footer } = siteConfig;

  return (
    <footer className="bg-charcoal border-t border-white/5 pt-20 pb-10 text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-8 text-mint drop-shadow-[0_0_5px_rgba(0,223,129,0.2)]">
                {LOGO_SVG}
              </div>
              <h2 className="text-xl font-black brand-font tracking-tighter text-mint">SÈGANDÉ</h2>
            </div>
            <p className="text-sand/40 text-xs md:text-sm leading-relaxed uppercase font-bold tracking-tight">
              {footer.aboutText}
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-[11px] font-black tracking-widest text-primary">
                <Phone size={14} />
                <a href={`tel:${contact.phone1.replace(/\s/g,'')}`} className="hover:text-white transition-colors">{contact.phone1}</a>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-black tracking-widest text-primary">
                <Phone size={14} />
                <a href={`tel:${contact.phone2.replace(/\s/g,'')}`} className="hover:text-white transition-colors">{contact.phone2}</a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-6">Collections</h4>
            <ul className="space-y-4 text-sand/40 text-[11px] uppercase font-black">
              {sectors.map(sector => (
                <li key={sector.slug}>
                  <Link to={`/category/${sector.slug}`} className="hover:text-primary transition-colors">{sector.name}</Link>
                </li>
              ))}
              <li><Link to="/category/all" className="hover:text-primary transition-colors">Meilleures ventes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-6">Conciergerie</h4>
            <ul className="space-y-4 text-sand/40 text-[11px] uppercase font-black">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Nous Contacter</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-6">Initié SÈGANDÉ</h4>
            <p className="text-sand/40 text-[10px] uppercase font-black leading-relaxed">Accédez aux ventes privées et découvrez l'histoire de nos artisans.</p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-[11px] font-black uppercase tracking-widest focus:ring-primary focus:border-primary outline-none transition-all" placeholder="VOTRE E-MAIL" type="email" />
              <button className="bg-primary text-background-dark font-black text-[10px] uppercase py-4 rounded-lg tracking-widest hover:bg-white transition-all">REJOINDRE</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sand/30 text-[9px] uppercase tracking-[0.3em] font-black">© 2024 SÈGANDÉ Shop.</p>
          <div className="flex items-center gap-8 text-sand/20">
             <ShieldCheck size={18} />
             <Truck size={18} />
             <Leaf size={18} />
          </div>
          <div className="flex gap-6 text-[9px] uppercase tracking-widest text-sand/30 font-black">
            <a href="#" className="hover:text-white">Confidentialité</a>
            <a href="#" className="hover:text-white">Mentions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
