
import React from 'react';

export const SECTORS = [
  { 
    name: 'Nid du Bien-Être', 
    slug: 'bien-etre', 
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1400&auto=format&fit=crop' 
  },
  { 
    name: "Accessoires de Mode", 
    slug: 'accessoires-mode', 
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1400&auto=format&fit=crop' 
  },
  { 
    name: "Art Culinaire", 
    slug: 'art-culinaire', 
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1400&auto=format&fit=crop' 
  },
];

export const FEATURED_PRODUCTS = [
  // --- NID DU BIEN-ÊTRE ---
  {
    id: "prod_be_01",
    name: "CleanShield",
    slug: "cleanshield",
    description: "LE BOUCLIER DE PURETÉ POUR VOTRE INTÉRIEUR",
    price: 195,
    images: ["https://i.ibb.co/xpqrNQF/Gemini-Generated-Image-2l064s2l064s2l06.png"], 
    category: "Bien-être",
    sector: "bien-etre",
    rating: 5.0,
    reviewsCount: 142,
    badges: ["Best Seller", "Nouveauté"],
    variants: [{ id: "v_be1", color: "Flacon Luxe", size: "500ml", stock: 15, sku: "BE-CLN-SHLD" }]
  },
  {
    id: "prod_be_03",
    name: "Hemorozime",
    slug: "hemorozime",
    description: "L'ÉLIXIR NATUREL DE CONFORT ET DE VITALITÉ",
    price: 145,
    images: ["https://i.ibb.co/HTwqDfQC/Gemini-Generated-Image-3aahk53aahk53aah.png"], 
    category: "Bien-être",
    sector: "bien-etre",
    rating: 5.0,
    reviewsCount: 56,
    badges: ["Artisanal", "Haute Performance"],
    variants: [{ id: "v_be3", color: "Flacon Tradition", size: "300ml", stock: 20, sku: "BE-HEM-ZIM" }]
  },
  {
    id: "prod_be_04",
    name: "Kombucha SÈGANDÉ",
    slug: "kombucha",
    description: "ALCHIMIE FERMENTÉE AUX PLANTES SACRÉES",
    price: 85,
    images: ["https://i.ibb.co/ZpQ74yBP/Gemini-Generated-Image-z0hwqpz0hwqpz0hw.png"], 
    category: "Bien-être",
    sector: "bien-etre",
    rating: 4.8,
    reviewsCount: 112,
    badges: ["Bio", "Fermentation Naturelle"],
    variants: [{ id: "v_be4", color: "Édition Limitée", size: "750ml", stock: 35, sku: "BE-KOM-BCH" }]
  },
  {
    id: "prod_be_02",
    name: "Sérum d'Or Pur",
    slug: "serum-or",
    description: "ÉCLAT DU VISAGE AUX HUILES SACRÉES",
    price: 125,
    images: ["https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"],
    category: "Soins Visage",
    sector: "bien-etre",
    rating: 4.9,
    reviewsCount: 88,
    badges: ["Premium"],
    variants: [{ id: "v_be2", color: "Cristal", size: "50ml", stock: 40, sku: "BE-SR-OR" }]
  },

  // --- ACCESSOIRES DE MODE ---
  {
    id: "prod_acc_01",
    name: "Sac 'Perles de Dahomey'",
    slug: "sac-perles-dahomey",
    description: "HAUTE MAROQUINERIE : 12 000 PERLES TISSÉES À LA MAIN",
    price: 950,
    images: ["https://images.unsplash.com/photo-1566150905458-1bf1fd15dcb4?q=80&w=1000&auto=format&fit=crop"],
    category: "Maroquinerie Perlée",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 12,
    badges: ["Exclusivité"],
    variants: [{ id: "v_acc1", color: "Perlage Royal", size: "Unique", stock: 2, sku: "ACC-DAH-BAG" }]
  },
  {
    id: "prod_acc_02",
    name: "Manchette 'Reine Amina'",
    slug: "manchette-amina",
    description: "BRACELET LARGE EN PERLES DE VERRE ET FIL D'OR",
    price: 320,
    images: ["https://images.unsplash.com/photo-1611085583191-a3b1a30a5af4?q=80&w=1000&auto=format&fit=crop"],
    category: "Bijoux Perlés",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 24,
    badges: ["Héritage"],
    variants: [{ id: "v_acc2", color: "Bronze & Or", size: "Ajustable", stock: 8, sku: "ACC-AMINA-BR" }]
  },

  // --- ART CULINAIRE ---
  {
    id: "prod_cul_01",
    name: "Le Grand Secret des 15",
    slug: "grand-secret-15",
    description: "ALCHIMIE DE 15 ÉPICES RARES : SOUUMBALA, PIMENT OISEAU, GRAINES DE PARADIS...",
    price: 115,
    images: ["https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1000&auto=format&fit=crop"],
    category: "Épicerie Fine",
    sector: "art-culinaire",
    rating: 5.0,
    reviewsCount: 245,
    badges: ["Signature"],
    variants: [{ id: "v_cul1", color: "Épices d'Afrique", size: "500g", stock: 100, sku: "CUL-SP-15" }]
  },
  {
    id: "prod_cul_02",
    name: "Service à Condiments Perlé",
    slug: "service-condiments",
    description: "CÉRAMIQUE NOIRE ET DÉTAILS DE PERLES DE ROCAILLE",
    price: 240,
    images: ["https://images.unsplash.com/photo-1594913785162-e678ac0570da?q=80&w=1000&auto=format&fit=crop"],
    category: "Art de la Table",
    sector: "art-culinaire",
    rating: 4.8,
    reviewsCount: 15,
    badges: ["Fait Main"],
    variants: [{ id: "v_cul2", color: "Ébène", size: "Set Trio", stock: 10, sku: "CUL-SVC-PRL" }]
  }
];

export const LOGO_SVG = (
  <svg fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full group-hover:scale-110 transition-transform">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" className="opacity-20" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2.5" />
    <path d="M25 25C22 28 18 35 20 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M75 25C78 28 82 35 80 42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="50" r="1.5" fill="currentColor" />
    <line x1="50" y1="50" x2="50" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-clock-hand" />
    <line x1="50" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M38 85L34 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M62 85L66 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
