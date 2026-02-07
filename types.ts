
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

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  status: 'pending' | 'completed' | 'failed';
  items: any[];
  created_at: string;
  transaction_id?: string;
}
