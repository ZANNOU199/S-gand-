
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group flex flex-col gap-4"
    >
      <Link to={`/product/${product.slug}`} className="relative overflow-hidden rounded-lg aspect-square bg-charcoal">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          src={product.images[0]} 
          alt={product.name}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <button className="whitespace-nowrap bg-white text-background-dark text-[10px] font-bold uppercase py-3 px-6 rounded shadow-xl hover:bg-primary hover:text-white transition-colors">
            Quick View
          </button>
        </div>
      </Link>
      <div>
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-white/90 group-hover:text-primary transition-colors tracking-tight">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h4>
          <p className="text-primary font-black text-sm">€{product.price}</p>
        </div>
        <p className="text-[10px] text-sand/50 mt-1 uppercase font-bold tracking-tighter">{product.description}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
