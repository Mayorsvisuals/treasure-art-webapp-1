import { supabase } from '../supabase';
import { DbCategory } from '@/types/database';

export class CategoryRepository {
  async getAll(): Promise<DbCategory[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data as DbCategory[];
  }

  async getBySlug(slug: string): Promise<DbCategory | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // not found
        console.error('Error fetching category by slug:', error);
      }
      return null;
    }

    return data as DbCategory;
  }
}

export const categoryRepository = new CategoryRepository();
