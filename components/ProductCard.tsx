
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group flex flex-col gap-4"
    >
      <Link to={`/product/${product.slug}`} className="relative overflow-hidden rounded-lg aspect-square bg-charcoal/50 flex items-center justify-center">
        {/* Skeleton Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-white/5 rounded-full border-t-primary animate-spin" />
          </div>
        )}
        
        <img 
          className={`w-full h-full object-contain p-4 transition-all duration-700 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
          style={{ imageRendering: 'auto' }}
          src={product.images[0]} 
          alt={product.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
        />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <button className="whitespace-nowrap bg-background-dark text-white text-[10px] font-bold uppercase py-3 px-6 rounded shadow-xl hover:bg-primary transition-colors">
            Aperçu Rapide
          </button>
        </div>
      </Link>
      <div className={isLoaded ? 'opacity-100' : 'opacity-40'}>
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-sm font-bold text-white/90 group-hover:text-primary transition-colors tracking-tight">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h4>
          <p className="text-primary font-black text-xs whitespace-nowrap">{product.price.toLocaleString()} FCFA</p>
        </div>
        <p className="text-[10px] text-sand/50 mt-1 uppercase font-bold tracking-tighter">{product.description}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
