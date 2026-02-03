
import React from 'react';

export const SECTORS = [
  { 
    name: 'La Mode', 
    slug: 'mode', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFtQq4SKIJ1tBTQDr_KTdHSlBC9_5C4DgZnSdMyq6cRDomP4iZdMXbVJfyGBh7EwOHsF-Go-PSB01feh_csQaRlliVU0gv0nAb2CqAgg_ensxurMtLwG_u7yNaqm0nIJc80auQeKJgK-9NR_qo1T9b98dOt9OgP6tKQfWVDRsI1ysFJINaYlwzTMEVdJwGoAoSm9ner2dkHKYJILs1QKDmrBRw_y89kWEnyK1fRFrv3tyEq2oJM2YCu--4w4UHZgqLG4Jt8xMcxzb9' 
  },
  { 
    name: "L'Art de Vivre", 
    slug: 'art-de-vivre', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4B69BHXYm9jyHfSpzmwSSu1AbGEoHp07rqlsYpPiKmFddUsisCgyRrUlxTgJjfBbzeM5nxm2srW5tqCFPzQyjdgamozKTsGCo3Q3pKa9v8Ngv5Ab_THm_Ctea4hYkL-isQM_k_GQoE5rBesa1-Ri8f-jJa98wmZbonKxl1azdjbL0lcBjLq-N_ki70iiW03xAJWZ5SEw78EROIHAJwxkjqXZgzlyZUoiuEE9f9CrdKtdTA4cDIgORnojLDFJ1SzEzuSIkn8P0ViIh' 
  },
  { 
    name: "Galerie d'Art", 
    slug: 'art', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAryIlfwoUyMMiGyA3VK95bYNN9DHsfpYoZgbe8eCVqQ2izxvfMOSSuVgvG70qZVchLyIGv-DLFH5geagIbJPPYvMpW1lr7clqJmh3Ii2k3JUDj795txh0kPcyTYavg3JEiH_JpP3Yu8RrIugNN3RL1JSq4hlEuXxBsZd2QtvFdGa_WkvyFSVxwAgZixVwibNFwAWZCvBxGCMpFjTtjf_Oug19v1DosH4j2eB0nAn003hsu07MaFAwMmiWYjZkNtULR3W3QY8DlRSCW' 
  },
];

export const FEATURED_PRODUCTS = [
  // --- LA MODE (Sector: mode) ---
  {
    id: "prod_001",
    name: "Sac Cabas Nomade",
    slug: "sac-cabas-nomade",
    description: "CUIR DE LUXE & RAPHIA TISSÉ MAIN",
    price: 320,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBI351qMo_18DILq3g5K1jNtyD9PVNXQfq_Mz0MIxBLgQ2EGkFasvfVuoTxCnPGj9hG7Ld5uCHnrshRzNNxiTEzw9nQvui89WpEQtDbSbBEGMFbW7R_OVjI7XxGw9LmAiUngxI7ruximmgLAiZbqPbt7uC06O1T1MIlrBmEfhg0NbvE26TkFfIkl156Fuj99v_B0gOhEAE9L17XNT5hmEP1VeSSTh32_bOuDKkEAaick-9sdaaqTWC3aCSkC95SVdYkPfURIKajzut8"],
    category: "Accessoires",
    sector: "mode",
    rating: 4.8,
    reviewsCount: 12,
    badges: ["Best Seller"],
    variants: [{ id: "v1", color: "Beige", size: "Unique", stock: 5, sku: "TOTE-BEI-01" }]
  },
  {
    id: "prod_003",
    name: "Étole Indigo Dusk",
    slug: "etole-indigo-dusk",
    description: "COTON ORGANIQUE / TEINTURE NATURELLE",
    price: 450,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCjWTrLnHa1bRfioSH_Ud324ej9f_WGuojDiJPXiZhz_9eyypbFyddr_KRpg217E1YprEjAiIWN4gTgW7c1JacJguWmT_lLNvJZlGqZFPi9J8Mp2c9V58Vrg5QSRX21AfvxvN8SrfWLyKTnmaLKEnLSJ8MPxiUlDFe1fGNtsArfQZ9SvHp5WFNZGqK7XsHoO2JUgioZgO8YE4LZwi6lqT6gV3kAyZ6QDhYj-5h_6lDNpPDl2RTIB8l3P6keUG2xbZ-qbznHSZ6zyp1Q"],
    category: "Vêtements",
    sector: "mode",
    rating: 5.0,
    reviewsCount: 24,
    badges: ["Édition Limitée"],
    variants: [{ id: "v3", color: "Indigo", size: "M", stock: 10, sku: "WRAP-IND-M" }]
  },
  {
    id: "prod_101",
    name: "Collier Esprit du Soleil",
    slug: "collier-esprit-du-soleil",
    description: "VERMEIL 24K & ÉBÈNE SCULPTÉ",
    price: 210,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"],
    category: "Bijoux",
    sector: "mode",
    rating: 4.9,
    reviewsCount: 15,
    badges: ["Artisanat"],
    variants: [{ id: "v101", color: "Or/Noir", size: "Unique", stock: 3, sku: "JEW-SUN-01" }]
  },

  // --- L'ART DE VIVRE (Sector: art-de-vivre) ---
  {
    id: "prod_002",
    name: "Vase Terre d'Ocre",
    slug: "vase-terre-docre",
    description: "TERRE CUITE TRADITIONNELLE / CUISSON AU FEU",
    price: 185,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDbqRE-SdeillU7VtjhWINQ67vBXlFwlB595kbU_k-0YxwNUwaDepWnsrGxNPU2wKF2odLhLCCYFgZOIBTcypLcE4PgAfSqcBy2aifoLonGwlOY0XG0wULCXxQxfa7_L8m4_zT3328jMEumQFLaMnJZWejSx9Jgeyjfv5Mvd54--tF_h0JVaU10c0hIC3s__Bh0Mt4RN7xc5WoU6v9de4sSpMxEjipKL4Z8-fAZBArFdBLjWN_G49lVxeQwzj3ObL6_ke6vGln5iQAA"],
    category: "Décoration",
    sector: "art-de-vivre",
    rating: 4.9,
    reviewsCount: 8,
    badges: ["Artisanal"],
    variants: [{ id: "v2", color: "Terracotta", size: "M", stock: 3, sku: "VASE-OCH-01" }]
  },
  {
    id: "prod_201",
    name: "Fauteuil Senufo Royal",
    slug: "fauteuil-senufo-royal",
    description: "BOIS D'IROKO MONOBLOC SCULPTÉ",
    price: 1250,
    images: ["https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop"],
    category: "Meubles",
    sector: "art-de-vivre",
    rating: 5.0,
    reviewsCount: 4,
    badges: ["Pièce Maîtresse"],
    variants: [{ id: "v201", color: "Bois Sombre", size: "Large", stock: 2, sku: "FUR-SEN-01" }]
  },
  {
    id: "prod_202",
    name: "Jeté Bogolan Heritage",
    slug: "jete-bogolan-heritage",
    description: "TEXTILE MUDCLOTH PEINT À LA MAIN",
    price: 245,
    images: ["https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop"],
    category: "Décoration",
    sector: "art-de-vivre",
    rating: 4.7,
    reviewsCount: 18,
    badges: ["Tradition"],
    variants: [{ id: "v202", color: "Motifs Noirs", size: "150x200cm", stock: 12, sku: "HOM-BOG-01" }]
  },

  // --- GALERIE D'ART (Sector: art) ---
  {
    id: "prod_007",
    name: "Portrait Ife en Bronze",
    slug: "portrait-ife-en-bronze",
    description: "REPRODUCTION MUSÉALE / BRONZE À LA CIRE PERDUE",
    price: 3400,
    images: ["https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000&auto=format&fit=crop"],
    category: "Sculpture",
    sector: "art",
    rating: 5.0,
    reviewsCount: 1,
    badges: ["Certificat d'Authenticité"],
    variants: [{ id: "v7", color: "Bronze Antique", size: "H 45cm", stock: 1, sku: "ART-IFE-01" }]
  },
  {
    id: "prod_301",
    name: "Horizon Sahélien n°4",
    slug: "horizon-sahelien-n4",
    description: "PHOTOGRAPHIE D'ART / TIRAGE ARGENTIQUE SIGNÉ",
    price: 890,
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"],
    category: "Photographie",
    sector: "art",
    rating: 5.0,
    reviewsCount: 3,
    badges: ["Série Limitée"],
    variants: [{ id: "v301", color: "Noir et Blanc", size: "60x90cm", stock: 5, sku: "PHO-SAH-04" }]
  },
  {
    id: "prod_302",
    name: "Masque Gardien Ancestral",
    slug: "masque-gardien-ancestral",
    description: "BOIS SCULPTÉ ET PIGMENTS NATURELS",
    price: 1100,
    images: ["https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop"],
    category: "Sculpture",
    sector: "art",
    rating: 4.8,
    reviewsCount: 6,
    badges: ["Pièce de Collection"],
    variants: [{ id: "v302", color: "Multicolore", size: "Unique", stock: 1, sku: "MSK-GUA-01" }]
  }
];

export const LOGO_SVG = (
  <svg fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full group-hover:scale-110 transition-transform">
    {/* External Ring */}
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="2 4" className="opacity-40" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3" />
    
    {/* Alarm Bells */}
    <path d="M25 25C20 30 15 40 20 45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M75 25C80 30 85 40 80 45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    
    {/* Clock Face Details */}
    <circle cx="50" cy="50" r="2" fill="currentColor" />
    <line x1="50" y1="50" x2="50" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-clock-hand" />
    <line x1="50" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    
    {/* Feet */}
    <path d="M35 85L30 92" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M65 85L70 92" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
