
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCMS, useCart } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Minus, Plus, ChevronDown, CheckCircle } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useCMS();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0].id || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showToast, setShowToast] = useState(false);

  if (!product) return <div className="p-20 text-center text-white">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart(product as any, selectedVariant, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-background-dark min-h-screen pt-12 pb-24">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] bg-white text-background-dark px-8 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[300px]"
          >
            <CheckCircle className="text-green-600" />
            <div className="flex-1">
              <p className="font-bold text-sm">Added to Bag</p>
              <button onClick={() => navigate('/cart')} className="text-xs underline text-primary font-bold uppercase tracking-wider">View Bag</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-sand/50 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${product.sector.toLowerCase() === 'fashion' ? 'mode' : product.sector.toLowerCase()}`} className="hover:text-primary transition-colors">{product.sector}</Link>
          <ChevronRight size={12} />
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Gallery */}
          <div className="flex-1 flex gap-6">
            <div className="hidden md:flex flex-col gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} view ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative aspect-[3/4] rounded-xl overflow-hidden bg-charcoal">
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

          {/* Info */}
          <div className="w-full lg:w-[450px] space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded">Artisanal Edition</span>
                <div className="flex items-center gap-1 text-primary">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-sand/50 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">{product.name}</h1>
              <p className="text-2xl font-light text-primary">€{product.price}.00</p>
            </div>

            <p className="text-sm leading-relaxed text-sand/70">{product.description}</p>

            <div className="h-px bg-white/10"></div>

            {/* Selection */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-white">Select Variant</span>
                  <button className="text-primary hover:underline underline-offset-4">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map(v => (
                    <button 
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`px-6 py-3 rounded border font-bold text-xs uppercase transition-all ${selectedVariant === v.id ? 'border-primary bg-primary text-white shadow-lg' : 'border-white/10 text-sand/70 hover:border-primary/50'}`}
                    >
                      {v.color} - {v.size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="p-2 text-white hover:text-primary transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-white">{quantity}</span>
                  <button onClick={() => setQuantity(q => q+1)} className="p-2 text-white hover:text-primary transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-background-dark font-bold py-4 rounded-lg uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Accordions */}
            <div className="pt-8 space-y-4">
              {['Craftsmanship', 'Shipping & Returns', 'Composition'].map(item => (
                <details key={item} className="group border-b border-white/10 pb-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-bold uppercase tracking-widest text-white group-open:text-primary transition-colors">
                    {item}
                    <ChevronDown size={18} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-xs text-sand/60 leading-relaxed">
                    Details about {item.toLowerCase()} are meticulously verified by our boutique curators to ensure absolute quality and authenticity.
                  </p>
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
