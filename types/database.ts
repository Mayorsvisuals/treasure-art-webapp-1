export interface DbCategory {
  id: string; // uuid
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProduct {
  id: string; // uuid
  category_id: string | null; // references categories
  title: string;
  slug: string;
  sku: string | null;
  product_type: 'ready_made' | 'custom_quote' | 'made_to_order';
  is_customizable: boolean;
  description: string | null;
  price: number;
  old_price: number | null;
  is_new: boolean;
  is_featured: boolean;
  stock_status: string; // 'in_stock', 'out_of_stock'
  dimensions: string | null;
  materials: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProductImage {
  id: string; // uuid
  product_id: string; // references products
  image_url: string;
  alt_text: string | null;
  display_order: number;
  created_at: string;
}
