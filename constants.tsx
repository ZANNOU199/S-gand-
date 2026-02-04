
import React from 'react';

export const SECTORS = [
  { 
    name: 'Nid du Bien-Être', 
    slug: 'bien-etre', 
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1400&auto=format&fit=crop' // Spa minimaliste aux tons terreux
  },
  { 
    name: "Accessoires de Mode", 
    slug: 'accessoires-mode', 
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1400&auto=format&fit=crop' // Maroquinerie et textures de luxe
  },
  { 
    name: "Art Culinaire", 
    slug: 'art-culinaire', 
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400&auto=format&fit=crop' // Épices et art de la table raffiné
  },
];

export const FEATURED_PRODUCTS = [
  // --- NID DU BIEN-ÊTRE ---
  {
    id: "prod_be_01",
    name: "Brume de Sérénité 'Ouidah'",
    slug: "brume-ouidah",
    description: "ESSENCES D'ORCHIDÉE SAUVAGE ET RACINES DE VÉTIVER",
    price: 110,
    images: ["https://images.unsplash.com/photo-1616984748472-74cc29f6487e?q=80&w=1000&auto=format&fit=crop"],
    category: "Soin Corps",
    sector: "bien-etre",
    rating: 5.0,
    reviewsCount: 24,
    badges: ["Signature"],
    variants: [{ id: "v_be1", color: "Verre Ambré", size: "100ml", stock: 15, sku: "BE-BR-100" }]
  },
  {
    id: "prod_be_02",
    name: "Coffret Rituel Hammam",
    slug: "coffret-rituel-hammam",
    description: "SAVON NOIR À L'EUCALYPTUS ET GANT DE FIBRE NATURELLE",
    price: 185,
    images: ["https://images.unsplash.com/photo-1556229162-5c63ed9c4ffb?q=80&w=1000&auto=format&fit=crop"],
    category: "Rituel",
    sector: "bien-etre",
    rating: 4.9,
    reviewsCount: 12,
    badges: ["Artisanal"],
    variants: [{ id: "v_be2", color: "Coffret Bois", size: "Set Complet", stock: 8, sku: "BE-SET-RH" }]
  },

  // --- ACCESSOIRES DE MODE ---
  {
    id: "prod_acc_01",
    name: "Le Sac 'Sèdé' Mini",
    slug: "sac-sede-mini",
    description: "CUIR DE VEAU PLEINE FLEUR ET DÉTAILS EN BRONZE CIRE PERDUE",
    price: 1250,
    images: ["https://images.unsplash.com/photo-1594093876628-59b50143016b?q=80&w=1000&auto=format&fit=crop"],
    category: "Maroquinerie",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 9,
    badges: ["Édition Numérotée"],
    variants: [{ id: "v_acc1", color: "Vert Sèdé", size: "Mini", stock: 2, sku: "ACC-BG-MINI" }]
  },
  {
    id: "prod_acc_02",
    name: "Bracelet 'Infini Africain'",
    slug: "bracelet-infini",
    description: "OR JAUNE 18K SCULPTÉ COMME LES DUNES DU SAHARA",
    price: 2800,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"],
    category: "Haute Joaillerie",
    sector: "accessoires-mode",
    rating: 5.0,
    reviewsCount: 5,
    badges: ["Prestige"],
    variants: [{ id: "v_acc2", color: "Or Jaune", size: "M", stock: 3, sku: "ACC-JW-INF" }]
  },

  // --- ART CULINAIRE ---
  {
    id: "prod_cul_01",
    name: "Sel de Gemme de Kiffa",
    slug: "sel-gemme-kiffa",
    description: "SEL MILLÉNAIRE EN CRISTAUX PURS PRÉSENTÉ EN GRÈS NOIR",
    price: 65,
    images: ["https://images.unsplash.com/photo-1506368083636-6defb67639a7?q=80&w=1000&auto=format&fit=crop"],
    category: "Épicerie Fine",
    sector: "art-culinaire",
    rating: 4.8,
    reviewsCount: 56,
    badges: ["Exception"],
    variants: [{ id: "v_cul1", color: "Grès Noir", size: "250g", stock: 40, sku: "CUL-SALT-KIF" }]
  },
  {
    id: "prod_cul_02",
    name: "Service à Café 'Abomey'",
    slug: "service-abomey",
    description: "PORCELAINE FINE PEINTE À LA MAIN À L'OR 24K",
    price: 420,
    images: ["https://images.unsplash.com/photo-1517133194642-43ae245d625d?q=80&w=1000&auto=format&fit=crop"],
    category: "Art de la Table",
    sector: "art-culinaire",
    rating: 5.0,
    reviewsCount: 4,
    badges: ["Héritage"],
    variants: [{ id: "v_cul2", color: "Blanc & Or", size: "6 Personnes", stock: 5, sku: "CUL-CER-AB" }]
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
