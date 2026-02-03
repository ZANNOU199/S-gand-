
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
  // --- FASHION ---
  {
    id: "prod_001",
    name: "Woven Nomad Tote",
    slug: "woven-nomad-tote",
    description: "CUIR DE LUXE & RAPHIA TISSÉ MAIN",
    price: 320,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBI351qMo_18DILq3g5K1jNtyD9PVNXQfq_Mz0MIxBLgQ2EGkFasvfVuoTxCnPGj9hG7Ld5uCHnrshRzNNxiTEzw9nQvui89WpEQtDbSbBEGMFbW7R_OVjI7XxGw9LmAiUngxI7ruximmgLAiZbqPbt7uC06O1T1MIlrBmEfhg0NbvE26TkFfIkl156Fuj99v_B0gOhEAE9L17XNT5hmEP1VeSSTh32_bOuDKkEAaick-9sdaaqTWC3aCSkC95SVdYkPfURIKajzut8"],
    category: "Accessories",
    sector: "Fashion",
    rating: 4.8,
    reviewsCount: 12,
    badges: ["Best Seller"],
    variants: [{ id: "v1", color: "Beige", size: "OS", stock: 5, sku: "TOTE-BEI-01" }]
  },
  {
    id: "prod_003",
    name: "Indigo Dusk Wrap",
    slug: "indigo-dusk-wrap",
    description: "COTON ORGANIQUE / TEINTURE NATURELLE",
    price: 450,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCjWTrLnHa1bRfioSH_Ud324ej9f_WGuojDiJPXiZhz_9eyypbFyddr_KRpg217E1YprEjAiIWN4gTgW7c1JacJguWmT_lLNvJZlGqZFPi9J8Mp2c9V58Vrg5QSRX21AfvxvN8SrfWLyKTnmaLKEnLSJ8MPxiUlDFe1fGNtsArfQZ9SvHp5WFNZGqK7XsHoO2JUgioZgO8YE4LZwi6lqT6gV3kAyZ6QDhYj-5h_6lDNpPDl2RTIB8l3P6keUG2xbZ-qbznHSZ6zyp1Q"],
    category: "Apparel",
    sector: "Fashion",
    rating: 5.0,
    reviewsCount: 24,
    badges: ["Édition Limitée"],
    variants: [{ id: "v3", color: "Indigo", size: "M", stock: 10, sku: "WRAP-IND-M" }]
  },
  {
    id: "prod_004",
    name: "Sun Spirit Necklace",
    slug: "sun-spirit-necklace",
    description: "VERMEIL 24K & ÉBÈNE SCULPTÉ",
    price: 210,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCES4-SYp_kG4oRZFyp9vMRN4cnKkGa_C7AkEoBEv05epdyQTHCIVlvwHihiCkBj219Q7sSxjN0PWBvXdN8WuczeMGsfgn1SC4pW7a2RUBPQsuXDfnU9-mv_NA_g6VAtxjpjw_Y-uVEOZTQb5HwML_ZsZ6kh3doYMIFV5JESKPEvRaXtVbZ3p5Yr0qJvmbPV5CB2KtTYGCHs7R-sTzRFo-nEqWXhNl5j5OKIUJVMePSKrCQ7POxsrs5EWL__8IIcbMV_k3egRX7ohk5"],
    category: "Jewelry",
    sector: "Fashion",
    rating: 4.7,
    reviewsCount: 15,
    badges: [],
    variants: [{ id: "v4", color: "Gold", size: "OS", stock: 7, sku: "JEW-SUN-01" }]
  },

  // --- LIVING ---
  {
    id: "prod_002",
    name: "Ochre Earth Vase",
    slug: "ochre-earth-vase",
    description: "TERRE CUITE TRADITIONNELLE / CUISSON AU FEU",
    price: 185,
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDbqRE-SdeillU7VtjhWINQ67vBXlFwlB595kbU_k-0YxwNUwaDepWnsrGxNPU2wKF2odLhLCCYFgZOIBTcypLcE4PgAfSqcBy2aifoLonGwlOY0XG0wULCXxQxfa7_L8m4_zT3328jMEumQFLaMnJZWejSx9Jgeyjfv5Mvd54--tF_h0JVaU10c0hIC3s__Bh0Mt4RN7xc5WoU6v9de4sSpMxEjipKL4Z8-fAZBArFdBLjWN_G49lVxeQwzj3ObL6_ke6vGln5iQAA"],
    category: "Home Decor",
    sector: "Living",
    rating: 4.9,
    reviewsCount: 8,
    badges: ["Artisanal"],
    variants: [{ id: "v2", color: "Terracotta", size: "M", stock: 3, sku: "VASE-OCH-01" }]
  },
  {
    id: "prod_005",
    name: "Senufo Master Chair",
    slug: "senufo-master-chair",
    description: "BOIS D'IROKO MONOBLOC SCULPTÉ",
    price: 1250,
    images: ["https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop"],
    category: "Furniture",
    sector: "Living",
    rating: 5.0,
    reviewsCount: 3,
    badges: ["Collector"],
    variants: [{ id: "v5", color: "Ebony Black", size: "Large", stock: 2, sku: "FUR-SEN-01" }]
  },
  {
    id: "prod_006",
    name: "Bogolan Heritage Throw",
    slug: "bogolan-heritage-throw",
    description: "TEXTILE MUDCLOTH PEINT À LA MAIN",
    price: 245,
    images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop"],
    category: "Home Decor",
    sector: "Living",
    rating: 4.8,
    reviewsCount: 19,
    badges: ["Authentic"],
    variants: [{ id: "v6", color: "Earth/Black", size: "150x200cm", stock: 15, sku: "HOM-BOG-01" }]
  },

  // --- ART GALLERY ---
  {
    id: "prod_007",
    name: "Bronze Ife Portrait",
    slug: "bronze-ife-portrait",
    description: "REPRODUCTION MUSÉALE / BRONZE À LA CIRE PERDUE",
    price: 3400,
    images: ["https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000&auto=format&fit=crop"],
    category: "Sculpture",
    sector: "Art",
    rating: 5.0,
    reviewsCount: 1,
    badges: ["Certificat d'Authenticité"],
    variants: [{ id: "v7", color: "Antique Bronze", size: "H 45cm", stock: 1, sku: "ART-IFE-01" }]
  },
  {
    id: "prod_008",
    name: "Sahelian Horizon #4",
    slug: "sahelian-horizon-4",
    description: "PHOTOGRAPHIE D'ART / TIRAGE ARGENTIQUE SIGNÉ",
    price: 890,
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"],
    category: "Photography",
    sector: "Art",
    rating: 4.9,
    reviewsCount: 6,
    badges: ["Série Limitée /10"],
    variants: [{ id: "v8", color: "B&W Print", size: "60x90cm", stock: 4, sku: "ART-PHO-04" }]
  },
  {
    id: "prod_009",
    name: "Dogon Guardian Mask",
    slug: "dogon-guardian-mask",
    description: "MASQUE RITUEL ANCESTRAL / BOIS & PIGMENTS",
    price: 1100,
    images: ["https://images.unsplash.com/photo-1560155016-bd4879ae8f21?q=80&w=1000&auto=format&fit=crop"],
    category: "Sculpture",
    sector: "Art",
    rating: 4.7,
    reviewsCount: 4,
    badges: ["Pièce Unique"],
    variants: [{ id: "v9", color: "Natural Pigments", size: "H 120cm", stock: 1, sku: "ART-MAS-09" }]
  }
];

export const LOGO_SVG = (
  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
    <path clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor" fillRule="evenodd"></path>
  </svg>
);
