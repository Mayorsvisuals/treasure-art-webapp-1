import { productRepository } from '../repositories/product.repository';
import { categoryRepository } from '../repositories/category.repository';
import { productImageRepository } from '../repositories/product-image.repository';
import { DbProduct, DbCategory, DbProductImage } from '@/types/database';
import { Product, Category } from '@/types/product';
import { featureFlags } from '../config/features';
import { seededProducts, seededCategories } from '../data/seed';

export class ProductService {
  // --- Mappers ---

  private mapDbCategoryToCategory(dbCategory: DbCategory): Category {
    return {
      id: dbCategory.id,
      name: dbCategory.name,
      slug: dbCategory.slug,
      description: dbCategory.description || undefined,
      image: dbCategory.image_url || undefined,
    };
  }

  private mapDbProductToProduct(
    dbProduct: DbProduct,
    dbCategory?: DbCategory | null,
    dbImages: DbProductImage[] = []
  ): Product {
    return {
      id: dbProduct.id,
      slug: dbProduct.slug,
      title: dbProduct.title,
      description: dbProduct.description || '',
      category: dbCategory ? dbCategory.slug : '', // We use slug based on current Product type structure
      images: dbImages.length > 0 ? dbImages.map(img => img.image_url) : [],
      price: dbProduct.price,
      type: (dbProduct.product_type === 'ready_made' ? 'standard' : dbProduct.product_type === 'custom_quote' ? 'consultation' : 'configurable') as any, // Map to frontend type
      featured: dbProduct.is_featured,
      stock: dbProduct.stock_status === 'in_stock' ? 10 : 0, // Fallback dummy stock number
      created_at: dbProduct.created_at,
    };
  }

  // --- Fetch Methods ---

  async getCategories(): Promise<Category[]> {
    if (featureFlags.USE_SUPABASE_PRODUCTS) {
      const dbCategories = await categoryRepository.getAll();
      if (dbCategories.length > 0) {
        return dbCategories.map(this.mapDbCategoryToCategory);
      }
    }
    return seededCategories;
  }

  async getProducts(): Promise<Product[]> {
    if (featureFlags.USE_SUPABASE_PRODUCTS) {
      const dbProducts = await productRepository.getAll();
      if (dbProducts.length > 0) {
        return this.enrichProducts(dbProducts);
      }
    }
    return seededProducts;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (featureFlags.USE_SUPABASE_PRODUCTS) {
      const dbProduct = await productRepository.getBySlug(slug);
      if (dbProduct) {
        const products = await this.enrichProducts([dbProduct]);
        return products.length > 0 ? products[0] : null;
      }
    }
    return seededProducts.find(p => p.slug === slug) || null;
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    if (featureFlags.USE_SUPABASE_PRODUCTS) {
      const category = await categoryRepository.getBySlug(categorySlug);
      if (category) {
        const dbProducts = await productRepository.getByCategory(category.id);
        if (dbProducts.length > 0) {
          return this.enrichProducts(dbProducts);
        }
      }
    }
    return seededProducts.filter(p => p.category === categorySlug);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    if (featureFlags.USE_SUPABASE_PRODUCTS) {
      const dbProducts = await productRepository.getFeatured();
      if (dbProducts.length > 0) {
        return this.enrichProducts(dbProducts);
      }
    }
    return seededProducts.filter(p => p.featured).slice(0, 6);
  }

  async searchProducts(query: string): Promise<Product[]> {
    if (!query) return [];
    
    if (featureFlags.USE_SUPABASE_PRODUCTS) {
      const dbProducts = await productRepository.search(query);
      if (dbProducts.length > 0) {
        return this.enrichProducts(dbProducts);
      }
    }

    const lowerQuery = query.toLowerCase();
    const searchTerms = lowerQuery.split(' ').filter(term => term.length > 0);

    return seededProducts.filter(p => {
      const searchableText = `${p.title} ${p.description} ${p.category} ${p.tags?.join(' ') || ''}`.toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    });
  }

  // --- Helper to Enrich ---
  
  private async enrichProducts(dbProducts: DbProduct[]): Promise<Product[]> {
    // Collect all unique category IDs
    const categoryIds = Array.from(new Set(dbProducts.map(p => p.category_id).filter(Boolean))) as string[];
    const categories: Record<string, DbCategory> = {};
    
    // Naively fetching categories for now. We can add batch fetching to categoryRepository later.
    // For now we get all categories since there are usually few of them, to save on roundtrips.
    const allCategories = await categoryRepository.getAll();
    allCategories.forEach(cat => {
      categories[cat.id] = cat;
    });

    const products: Product[] = [];
    for (const dbProduct of dbProducts) {
      const images = await productImageRepository.getByProductId(dbProduct.id);
      const category = dbProduct.category_id ? categories[dbProduct.category_id] : null;
      products.push(this.mapDbProductToProduct(dbProduct, category, images));
    }

    return products;
  }
}

export const productService = new ProductService();
