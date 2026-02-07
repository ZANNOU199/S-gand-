
export interface Variant {
  id: string;
  color: string;
  size: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  variants: Variant[];
  category: string;
  sector: string;
  rating: number;
  reviewsCount: number;
  badges: string[];
  isFeatured: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  variantName: string;
}
