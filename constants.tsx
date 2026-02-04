
import React from 'react';

export const SECTORS = [
  { 
    name: 'Nid du Bien-Être', 
    slug: 'bien-etre', 
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    name: "Accessoires de Mode", 
    slug: 'accessoires-mode', 
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    name: "Art Culinaire", 
    slug: 'art-culinaire', 
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop' 
  },
];

export const FEATURED_PRODUCTS = [
  // --- NID DU BIEN-ÊTRE ---
  {
    id: "prod_be_01",
    name: "Élixir d'Oud Sacré",
    slug: "elixir-oud-sacre",
    description: "HUILE PRÉCIEUSE & RITUELS ANCESTRAUX",
    price: 145,
    images: ["https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?q=80&w=1000&auto=format&fit=crop"],
    category: "Soin Corps",
    sector: "bien-etre",
    rating: 5.0,
    reviewsCount: 18,
    badges: ["Signature"],
    variants: [{ id: "v_be1", color: "Ambre", size: "50ml", stock: 12, sku: "BE-OUD-50" }]
  },
  {
    id: "prod_be_02",
    name: "Bougie Terre Cuite",
    slug: "bougie-terre-cuite",
    description: "ENCENS DU SAHEL & CIRE VÉGÉTALE",
    price: 85,
    images: ["https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=1000&auto=format&fit=crop"],
    category: "Maison",
    sector: "bien-etre",
    rating: 4.9,
    reviewsCount: 32,
    badges: ["Artisanal"],
    variants: [{ id: "v_be2", color: "Naturel", size: "Grand", stock: 20, sku: "BE-CAN-OC" }]
  },

  // --- ACCESSOIRES DE MODE ---
  {
    id: "prod_acc_01",
    name: "Sac Bijou 'Sèdé'",
    slug: "sac-bijou-sede",
    description: "CUIR DE LUXE & FERMOIR HORLOGE",
    price: 890,
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop"],
    category: "Maroquinerie",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 7,
    badges: ["Édition Limitée"],
    variants: [{ id: "v_acc1", color: "Vert Émeraude", size: "Unique", stock: 3, sku: "ACC-BAG-SE" }]
  },
  {
    id: "prod_acc_02",
    name: "Bracelet Manchette Ife",
    slug: "manchette-ife",
    description: "LAITON DORÉ À L'OR FIN 24K",
    price: 260,
    images: ["https://images.unsplash.com/photo-1611085583191-a3b13b844297?q=80&w=1000&auto=format&fit=crop"],
    category: "Bijoux",
    sector: "accessoires-mode",
    rating: 4.8,
    reviewsCount: 14,
    badges: ["Best Seller"],
    variants: [{ id: "v_acc2", color: "Or", size: "M", stock: 8, sku: "ACC-BRAC-IFE" }]
  },

  // --- ART CULINAIRE ---
  {
    id: "prod_cul_01",
    name: "Coffret Épices Royales",
    slug: "coffret-epices-royales",
    description: "MÉLANGES RARES DU BÉNIN & MALI",
    price: 95,
    images: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop"],
    category: "Épicerie Fine",
    sector: "art-culinaire",
    rating: 5.0,
    reviewsCount: 45,
    badges: ["Gastronomie"],
    variants: [{ id: "v_cul1", color: "Assortiment", size: "Standard", stock: 50, sku: "CUL-SPICE-ROY" }]
  },
  {
    id: "prod_cul_02",
    name: "Plat à Partage Senufo",
    slug: "plat-senufo",
    description: "BOIS D'ÉBÈNE SCULPTÉ À LA MAIN",
    price: 180,
    images: ["https://images.unsplash.com/photo-1594913785162-e678ac0570da?q=80&w=1000&auto=format&fit=crop"],
    category: "Art de la Table",
    sector: "art-culinaire",
    rating: 4.7,
    reviewsCount: 12,
    badges: ["Artisanat"],
    variants: [{ id: "v_cul2", color: "Noir Ébène", size: "Ø 35cm", stock: 5, sku: "CUL-PLATE-SEN" }]
  }
];

export const LOGO_SVG = (
  <svg fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full group-hover:scale-110 transition-transform">
    {/* Anneau externe discret */}
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" className="opacity-20" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2.5" />
    
    {/* Cloches d'alarme stylisées */}
    <path d="M25 25C22 28 18 35 20 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M75 25C78 28 82 35 80 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    
    {/* Aiguilles de l'horloge */}
    <circle cx="50" cy="50" r="1.5" fill="currentColor" />
    <line x1="50" y1="50" x2="50" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-clock-hand" />
    <line x1="50" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Pieds support */}
    <path d="M38 85L34 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M62 85L66 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
