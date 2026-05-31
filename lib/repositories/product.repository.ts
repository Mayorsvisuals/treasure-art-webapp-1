import { supabase } from '../supabase';
import { DbProduct } from '@/types/database';

export class ProductRepository {
  async getAll(): Promise<DbProduct[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data as DbProduct[];
  }

  async getBySlug(slug: string): Promise<DbProduct | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error('Error fetching product by slug:', error);
      }
      return null;
    }

    return data as DbProduct;
  }

  async getByCategory(categoryId: string): Promise<DbProduct[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }

    return data as DbProduct[];
  }

  async getFeatured(limit: number = 6): Promise<DbProduct[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .limit(limit);

    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }

    return data as DbProduct[];
  }

  async search(query: string): Promise<DbProduct[]> {
    if (!query) return [];
    
    // Simple naive ilike search for now
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('title', `%${query}%`);

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    return data as DbProduct[];
  }
}

export const productRepository = new ProductRepository();
