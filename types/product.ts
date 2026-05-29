export type ProductType = 'standard' | 'configurable' | 'consultation';

export interface ProductVariant {
  id: string;
  name: string;
  price_adjustment: number;
}

export interface ProductOption {
  id: string;
  name: string;
  variants: ProductVariant[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  price: number; // Base price
  type: ProductType;
  featured: boolean;
  options?: ProductOption[]; // For configurable products
  stock: number;
  tags?: string[];
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}
