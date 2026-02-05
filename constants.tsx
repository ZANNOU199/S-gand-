
import React from 'react';

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

export const SECTORS = [
  { 
    name: 'Nid du Bien-Être', 
    slug: 'bien-etre', 
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1400&auto=format&fit=crop' 
  },
  { 
    name: "Accessoires de Mode", 
    slug: 'accessoires-mode', 
    image: 'https://i.ibb.co/bj2jSxj7/Gemini-Generated-Image-y5etqny5etqny5et.png' 
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
    id: "prod_be_08",
    name: "Nectar de Fleur de Hibiscus",
    slug: "nectar-hibiscus",
    description: "INFUSION ROYALE AUX VERTUS ANTIOXYDANTES ET ÉNERGISANTES",
    price: 65,
    images: ["https://i.ibb.co/21g1JspC/Gemini-Generated-Image-pabdbspabdbspabd.png"], 
    category: "Bien-être",
    sector: "bien-etre",
    rating: 5.0,
    reviewsCount: 89,
    badges: ["Premium", "Éclat"],
    variants: [{ id: "v_be8", color: "Carafe Cristal", size: "1L", stock: 50, sku: "BE-HIB-NEC" }]
  },
  {
    id: "prod_be_07",
    name: "Eau Alcaline SÈGANDÉ",
    slug: "eau-alcaline",
    description: "PURETÉ ET ÉQUILIBRE MINÉRAL POUR UNE HYDRATATION SUPÉRIEURE",
    price: 55,
    images: ["https://i.ibb.co/sdYGKnv6/Gemini-Generated-Image-spb3x7spb3x7spb3.png"], 
    category: "Bien-être",
    sector: "bien-etre",
    rating: 5.0,
    reviewsCount: 210,
    badges: ["Pureté", "Équilibre"],
    variants: [{ id: "v_be7", color: "Bouteille Verre", size: "750ml", stock: 100, sku: "BE-H2O-ALC" }]
  },
  {
    id: "prod_be_05",
    name: "Vin de Dahomey",
    slug: "vin-dahomey",
    description: "UN CRU D'EXCEPTION AUX SAVEURS DU TERROIR",
    price: 160,
    images: ["https://i.ibb.co/KnKqpG0/Gemini-Generated-Image-e7jz7ke7jz7ke7jz.png"], 
    category: "Bien-être",
    sector: "bien-etre",
    rating: 5.0,
    reviewsCount: 42,
    badges: ["Héritage", "Nouveauté"],
    variants: [{ id: "v_be5", color: "Bouteille Prestige", size: "750ml", stock: 12, sku: "BE-VIN-DAH" }]
  },
  {
    id: "prod_be_06",
    name: "Liqueur SÈGANDÉ",
    slug: "liqueur-segande",
    description: "L'ESSENCE DES PLANTES RARES EN GOUTTES PRÉCIEUSES",
    price: 210,
    images: ["https://i.ibb.co/4nWPM2hK/Gemini-Generated-Image-xv8wjixv8wjixv8w.png"], 
    category: "Bien-être",
    sector: "bien-etre",
    rating: 4.9,
    reviewsCount: 28,
    badges: ["Signature", "Premium"],
    variants: [{ id: "v_be6", color: "Flacon Cristal", size: "500ml", stock: 10, sku: "BE-LIQ-SEG" }]
  },

  // --- ACCESSOIRES DE MODE (NEW) ---
  {
    id: "prod_acc_01_new",
    name: "Accessoire 1",
    slug: "accessoire-1",
    description: "HAUTE MAROQUINERIE : L'ÉLÉGANCE DU CUIR TANNÉ VÉGÉTAL",
    price: 450,
    images: ["https://i.ibb.co/b5X61hLf/Gemini-Generated-Image-fwzhcsfwzhcsfwzh-1.png"],
    category: "Maroquinerie",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 18,
    badges: ["Exclusivité"],
    variants: [{ id: "v_acc1n", color: "Ebène Luxe", size: "M", stock: 5, sku: "ACC-01-LUX" }]
  },
  {
    id: "prod_acc_02_new",
    name: "Accessoire 2",
    slug: "accessoire-2",
    description: "ORFÈVRERIE ANCESTRALE : PARURE DE PERLES ET FIL D'OR",
    price: 320,
    images: ["https://i.ibb.co/sdK45WsW/Gemini-Generated-Image-xflpzbxflpzbxflp-1.png"],
    category: "Bijoux",
    sector: "accessoires-mode",
    rating: 4.9,
    reviewsCount: 24,
    badges: ["Artisanal"],
    variants: [{ id: "v_acc2n", color: "Or Rose", size: "Unique", stock: 8, sku: "ACC-02-LUX" }]
  },
  {
    id: "prod_acc_03_new",
    name: "Accessoire 3",
    slug: "accessoire-3",
    description: "TISSAGE IMPÉRIAL : L'ÂME DES TEXTILES SACRÉS",
    price: 280,
    images: ["https://i.ibb.co/zVtHLCTV/Gemini-Generated-Image-7t6gwp7t6gwp7t6g-1.png"],
    category: "Textiles",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 15,
    badges: ["Série Limitée"],
    variants: [{ id: "v_acc3n", color: "Indigo", size: "Standard", stock: 12, sku: "ACC-03-LUX" }]
  },
  {
    id: "prod_acc_04_new",
    name: "Accessoire 4",
    slug: "accessoire-4",
    description: "DESIGN CONTEMPORAIN : SYMBOLE DE PRESTIGE ET DE MODERNITÉ",
    price: 590,
    images: ["https://i.ibb.co/s9PWS3p7/Gemini-Generated-Image-rkgc48rkgc48rkgc-1.png"],
    category: "Maroquinerie",
    sector: "accessoires-mode",
    rating: 4.8,
    reviewsCount: 31,
    badges: ["Signature"],
    variants: [{ id: "v_acc4n", color: "Terre de Sienne", size: "L", stock: 3, sku: "ACC-04-LUX" }]
  },
  {
    id: "prod_acc_05_new",
    name: "Accessoire 5",
    slug: "accessoire-5",
    description: "ALCHIMIE DES MATIÈRES : MÉLANGE DE TRADITION ET D'INNOVATION",
    price: 380,
    images: ["https://i.ibb.co/3mM5YgLB/Gemini-Generated-Image-ncucyqncucyqncuc-1.png"],
    category: "Accessoires d'exception",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 12,
    badges: ["Chef-d'œuvre"],
    variants: [{ id: "v_acc5n", color: "Ocre", size: "Unique", stock: 6, sku: "ACC-05-LUX" }]
  },
  {
    id: "prod_acc_06_new",
    name: "Accessoire 6",
    slug: "accessoire-6",
    description: "PIÈCE DE COLLECTION : L'ÉCLAT DU SAVOIR-FAIRE SÈGANDÉ",
    price: 720,
    images: ["https://i.ibb.co/twYd90MM/Gemini-Generated-Image-bb7tovbb7tovbb7t.png"],
    category: "Haute Accessoirie",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 9,
    badges: ["Unique"],
    variants: [{ id: "v_acc6n", color: "Multicolore Royal", size: "XL", stock: 2, sku: "ACC-06-LUX" }]
  }
];
