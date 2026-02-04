
import React from 'react';

export const SECTORS = [
  { 
    name: 'Nid du Bien-Être', 
    slug: 'bien-etre', 
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1400&auto=format&fit=crop' // Famille souriante, éclat de santé et bien-être
  },
  { 
    name: "Accessoires de Mode", 
    slug: 'accessoires-mode', 
    image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1400&auto=format&fit=crop' // Perles précieuses et univers beauté
  },
  { 
    name: "Art Culinaire", 
    slug: 'art-culinaire', 
    image: 'https://images.unsplash.com/photo-1506368083636-6defb67639a7?q=80&w=1400&auto=format&fit=crop' // Mélange artistique de multiples épices (plus de 15 variétés)
  },
];

export const FEATURED_PRODUCTS = [
  // --- NID DU BIEN-ÊTRE ---
  {
    id: "prod_be_01",
    name: "Éclat Familial 'Aura'",
    slug: "eclat-familial-aura",
    description: "SUPPLÉMENTS VÉGÉTAUX POUR UNE VITALITÉ RADIEUSE",
    price: 135,
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"],
    category: "Soin & Vitalité",
    sector: "bien-etre",
    rating: 5.0,
    reviewsCount: 42,
    badges: ["Best Seller"],
    variants: [{ id: "v_be1", color: "Or Pur", size: "Cure 30j", stock: 25, sku: "BE-AUR-30" }]
  },
  {
    id: "prod_be_02",
    name: "Huile de Vie Sègandé",
    slug: "huile-de-vie",
    description: "ÉLIXIR MULTIVITAMINÉ AUX EXTRAITS DE BAOBAB ET MORINGA",
    price: 95,
    images: ["https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"],
    category: "Bien-être",
    sector: "bien-etre",
    rating: 4.9,
    reviewsCount: 18,
    badges: ["Naturel"],
    variants: [{ id: "v_be2", color: "Ambre", size: "200ml", stock: 15, sku: "BE-OIL-LIFE" }]
  },

  // --- ACCESSOIRES DE MODE ---
  {
    id: "prod_acc_01",
    name: "Manchette 'Perles Royales'",
    slug: "manchette-perles",
    description: "TISSAGE DE PERLES DE VERRE ET FERMOIR DORÉ À L'OR FIN",
    price: 380,
    images: ["https://images.unsplash.com/photo-1535105372370-9086f688e7a0?q=80&w=1000&auto=format&fit=crop"],
    category: "Bijoux en Perles",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 15,
    badges: ["Artisanat"],
    variants: [{ id: "v_acc1", color: "Multicolore", size: "Ajustable", stock: 5, sku: "ACC-PRL-MN" }]
  },
  {
    id: "prod_acc_02",
    name: "Palette 'Reine de Saba'",
    slug: "palette-saba",
    description: "COFFRET MAQUILLAGE HAUTE PIGMENTATION & MIROIR DE POCHE",
    price: 145,
    images: ["https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=1000&auto=format&fit=crop"],
    category: "Beauté",
    sector: "accessoires-mode",
    rating: 4.8,
    reviewsCount: 29,
    badges: ["Luxe"],
    variants: [{ id: "v_acc2", color: "Tons Terres", size: "Standard", stock: 20, sku: "ACC-MK-SABA" }]
  },

  // --- ART CULINAIRE ---
  {
    id: "prod_cul_01",
    name: "Grand Mélange de 15 Épices",
    slug: "melange-15-epices",
    description: "ALCHIMIE SECRÈTE DE 15 VARIÉTÉS RARES ET PRÉCIEUSES",
    price: 75,
    images: ["https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1000&auto=format&fit=crop"],
    category: "Gastronomie",
    sector: "art-culinaire",
    rating: 5.0,
    reviewsCount: 112,
    badges: ["Chef's Choice"],
    variants: [{ id: "v_cul1", color: "Éclat d'Épices", size: "500g", stock: 100, sku: "CUL-SP-15" }]
  },
  {
    id: "prod_cul_02",
    name: "Mortier 'Ébène & Bronze'",
    slug: "mortier-ebene",
    description: "PIÈCE DE COLLECTION SCULPTÉE POUR LE RITUEL DES SAVEURS",
    price: 290,
    images: ["https://images.unsplash.com/photo-1594913785162-e678ac0570da?q=80&w=1000&auto=format&fit=crop"],
    category: "Art de la Table",
    sector: "art-culinaire",
    rating: 4.9,
    reviewsCount: 7,
    badges: ["Exclusivité"],
    variants: [{ id: "v_cul2", color: "Noir Profond", size: "Grand Modèle", stock: 3, sku: "CUL-MOR-EB" }]
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
