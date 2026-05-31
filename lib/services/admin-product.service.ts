import { supabase } from '../supabase/client';
import { AdminProduct, useAdminProductsStore } from '@/store/useAdminProductsStore';
import { featureFlags } from '../config/features';
import { DbProduct, DbCategory, DbProductImage } from '@/types/database';

export class AdminProductService {
  async getCategories() {
    if (featureFlags.USE_SUPABASE_PRODUCTS && supabase) {
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data) return data as DbCategory[];
    }
    return [];
  }

  async getProducts(): Promise<AdminProduct[]> {
    if (featureFlags.USE_SUPABASE_PRODUCTS && supabase) {
      const { data: dbProducts, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching admin products:', error);
        return [];
      }
      
      const { data: dbCategories } = await supabase.from('categories').select('*');
      const { data: dbImages } = await supabase.from('product_images').select('*').order('display_order', { ascending: true });
      
      return dbProducts.map((p: DbProduct) => {
        const cat = dbCategories?.find((c: DbCategory) => c.id === p.category_id);
        const images = dbImages?.filter((i: DbProductImage) => i.product_id === p.id).map((i: DbProductImage) => i.image_url) || [];
        
        return {
          id: p.id,
          name: p.title,
          slug: p.slug,
          shortDescription: p.description || '',
          fullDescription: p.materials || '', // Hacking materials as fullDescription for now
          category: cat?.id || '', 
          price: p.price,
          salePrice: p.old_price || 0,
          inventory: p.stock_status === 'in_stock' ? 10 : 0,
          status: (p.stock_status === 'draft' ? 'Draft' : p.stock_status === 'out_of_stock' ? 'Out of Stock' : 'Active') as any,
          images,
          variants: [], // Unused in DB schema yet
          seoTitle: p.title,
          metaDescription: p.description || '',
          dateCreated: new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        };
      });
    }
    
    // Fallback to Zustand
    return useAdminProductsStore.getState().products;
  }

  async getProduct(id: string): Promise<AdminProduct | null> {
    if (featureFlags.USE_SUPABASE_PRODUCTS && supabase) {
      const { data: p, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error || !p) return null;

      const { data: images } = await supabase.from('product_images').select('image_url').eq('product_id', p.id).order('display_order', { ascending: true });
      
      return {
        id: p.id,
        name: p.title,
        slug: p.slug,
        shortDescription: p.description || '',
        fullDescription: p.materials || '',
        category: p.category_id || '', 
        price: p.price,
        salePrice: p.old_price || 0,
        inventory: p.stock_status === 'in_stock' ? 10 : 0,
        status: (p.stock_status === 'draft' ? 'Draft' : p.stock_status === 'out_of_stock' ? 'Out of Stock' : 'Active') as any,
        images: images?.map((img: any) => img.image_url) || [],
        variants: [], 
        seoTitle: p.title,
        metaDescription: p.description || '',
        dateCreated: new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };
    }
    return useAdminProductsStore.getState().products.find(p => p.id === id) || null;
  }

  async createProduct(product: AdminProduct): Promise<void> {
    if (featureFlags.USE_SUPABASE_PRODUCTS && supabase) {
      const { data: pData, error: pError } = await supabase.from('products').insert({
        title: product.name,
        slug: product.slug,
        description: product.shortDescription,
        materials: product.fullDescription,
        category_id: product.category || null,
        price: product.price,
        old_price: product.salePrice || null,
        stock_status: product.status === 'Draft' ? 'draft' : product.status === 'Out of Stock' ? 'out_of_stock' : 'in_stock',
        product_type: 'ready_made'
      }).select().single();

      if (pError) throw pError;

      if (product.images.length > 0) {
        const imageInserts = product.images.map((url, i) => ({
          product_id: pData.id,
          image_url: url,
          display_order: i
        }));
        await supabase.from('product_images').insert(imageInserts);
      }
    } else {
      useAdminProductsStore.getState().addProduct(product);
    }
  }

  async updateProduct(id: string, product: AdminProduct): Promise<void> {
    if (featureFlags.USE_SUPABASE_PRODUCTS && supabase) {
      const { error } = await supabase.from('products').update({
        title: product.name,
        slug: product.slug,
        description: product.shortDescription,
        materials: product.fullDescription,
        category_id: product.category || null,
        price: product.price,
        old_price: product.salePrice || null,
        stock_status: product.status === 'Draft' ? 'draft' : product.status === 'Out of Stock' ? 'out_of_stock' : 'in_stock',
      }).eq('id', id);

      if (error) throw error;
      
      // Handle images (delete then recreate)
      await supabase.from('product_images').delete().eq('product_id', id);
      if (product.images.length > 0) {
        const imageInserts = product.images.map((url, i) => ({
          product_id: id,
          image_url: url,
          display_order: i
        }));
        await supabase.from('product_images').insert(imageInserts);
      }
    } else {
      useAdminProductsStore.getState().updateProduct(id, product);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    if (featureFlags.USE_SUPABASE_PRODUCTS && supabase) {
      await supabase.from('products').delete().eq('id', id);
    } else {
      useAdminProductsStore.getState().deleteProduct(id);
    }
  }

  async bulkDelete(ids: string[]): Promise<void> {
    if (featureFlags.USE_SUPABASE_PRODUCTS && supabase) {
      await supabase.from('products').delete().in('id', ids);
    } else {
      useAdminProductsStore.getState().bulkDelete(ids);
    }
  }

  async bulkUpdateStatus(ids: string[], status: string): Promise<void> {
    if (featureFlags.USE_SUPABASE_PRODUCTS && supabase) {
      const stock_status = status === 'Draft' ? 'draft' : status === 'Out of Stock' ? 'out_of_stock' : 'in_stock';
      await supabase.from('products').update({ stock_status }).in('id', ids);
    } else {
      useAdminProductsStore.getState().bulkUpdateStatus(ids, status as any);
    }
  }
}

export const adminProductService = new AdminProductService();
