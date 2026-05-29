import { supabase } from '../supabase';
import { Product, Category } from '@/types/product';
import { seededProducts, seededCategories } from './seed';

// Utility to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && url !== 'https://placeholder-project.supabase.co' && 
         anonKey && anonKey !== 'placeholder-anon-key';
};

export async function getProducts(): Promise<Product[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Product[];
    }
  } catch (error) {
    console.error('Error fetching Supabase products:', error);
  }
  // Return semantic mock data if no db configured
  return seededProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (!error && data) return data as Product;
    }
  } catch (error) {
    console.error('Error fetching Supabase product:', error);
  }
  return seededProducts.find(p => p.slug === slug) || null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data && data.length > 0) return data as Category[];
    }
  } catch (error) {
    console.error('Error fetching Supabase categories:', error);
  }
  return seededCategories;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('products').select('*').eq('category', categorySlug);
      if (!error && data) return data as Product[];
    }
  } catch (error) {
    console.error('Error fetching Supabase products by category:', error);
  }
  return seededProducts.filter(p => p.category === categorySlug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query) return [];
  
  try {
    if (isSupabaseConfigured()) {
      // This uses ILIKE behind the scenes
      const { data, error } = await supabase.from('products').select('*').ilike('title', `%${query}%`);
      if (!error && data) return data as Product[];
    }
  } catch (error) {
    console.error('Error searching Supabase products:', error);
  }
  
  const lowerQuery = query.toLowerCase();
  return seededProducts.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) || 
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('products').select('*').eq('featured', true).limit(6);
      if (!error && data && data.length > 0) return data as Product[];
    }
  } catch (error) {
    console.error('Error fetching featured products:', error);
  }
  return seededProducts.filter(p => p.featured).slice(0, 6);
}
