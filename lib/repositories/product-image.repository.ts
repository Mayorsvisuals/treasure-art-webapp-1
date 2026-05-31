import { supabase } from '../supabase';
import { DbProductImage } from '@/types/database';

export class ProductImageRepository {
  async getByProductId(productId: string): Promise<DbProductImage[]> {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching product images:', error);
      return [];
    }

    return data as DbProductImage[];
  }
}

export const productImageRepository = new ProductImageRepository();
