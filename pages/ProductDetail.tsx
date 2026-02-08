
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCMS, useCart } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Minus, Plus, ChevronDown, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useCMS();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showToast, setShowToast] = useState(false);

  if (!product) return <div className="p-20 text-center text-white">Produit introuvable.</div>;

  const handleAddToCart = () => {
    addToCart(product as any, selectedVariant, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Structured Data for Google
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "SÈGANDÉ"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "XOF",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewsCount
    }
  };

  return (
    <div className="bg-background-dark min-h-screen pt-6 md:pt-12 pb-24">
      <SEO 
        title={product.name} 
        description={product.description} 
        image={product.images[0]}
        jsonLd={productJsonLd}
      />
      
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 md:bottom-10 left-1/2 z-[100] bg-white text-background-dark px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 w-[calc(100%-48px)] md:min-w-[300px]"
          >
            <CheckCircle className="text-green-600 shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-sm">Ajouté au sac</p>
              <button onClick={() => navigate('/cart')} className="text-xs underline text-primary font-bold uppercase tracking-wider">Voir le panier</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <nav className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-sand/50 mb-8 md:mb-12 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight size={10} />
          <Link to={`/category/${product.sector}`} className="hover:text-primary transition-colors">{product.sector}</Link>
          <ChevronRight size={10} />
          <span className="text-white truncate max-w-[150px]">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
          <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 md:w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-primary' : 'border-transparent opacity-50'}`}
                >
                  <img src={img} alt={`${product.name} - Vue ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative aspect-[3/4] rounded-xl overflow-hidden bg-charcoal order-1 md:order-2">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-[450px] space-y-6 md:space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded">Édition Artisanale</span>
                <div className="flex items-center gap-1 text-primary">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-sand/50 font-normal">({product.reviewsCount})</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">{product.name}</h1>
              <p className="text-xl md:text-2xl font-black text-primary">{product.price.toLocaleString()} FCFA</p>
            </div>

            <p className="text-sm leading-relaxed text-sand/70">{product.description}</p>

            <div className="h-px bg-white/10"></div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white uppercase tracking-widest">Variante</span>
                  <button className="text-primary hover:underline underline-offset-4 font-bold uppercase text-[10px]">Guide des tailles</button>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {product.variants.map(v => (
                    <button 
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`px-4 md:px-6 py-3 rounded border font-bold text-[10px] uppercase transition-all flex-1 md:flex-none text-center ${selectedVariant === v.id ? 'border-primary bg-primary text-white shadow-lg' : 'border-white/10 text-sand/70 hover:border-primary/50'}`}
                    >
                      {v.color} - {v.size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-1 sm:w-32">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="p-3 text-white hover:text-primary transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center font-bold text-white text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(q => q+1)} className="p-3 text-white hover:text-primary transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-background-dark font-black py-4 md:py-5 rounded-lg uppercase tracking-widest text-[11px] hover:bg-white transition-all shadow-xl"
                >
                  Ajouter au Panier
                </button>
              </div>
            </div>

            <div className="pt-4 md:pt-8 space-y-4">
              {['Artisanat', 'Livraison & Retours', 'Composition'].map(item => (
                <details key={item} className="group border-b border-white/10 pb-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-[11px] font-black uppercase tracking-widest text-white group-open:text-primary transition-colors">
                    {item}
                    <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-4 text-xs text-sand/60 leading-relaxed">
                    Les détails sur l'{item.toLowerCase()} sont méticuleusement vérifiés par nos conservateurs pour garantir une qualité absolue.
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
