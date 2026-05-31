import { Product, Category } from '@/types/product';
import { productService } from '../services/product.service';

export async function getProducts(): Promise<Product[]> {
  return productService.getProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return productService.getProductBySlug(slug);
}

export async function getCategories(): Promise<Category[]> {
  return productService.getCategories();
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return productService.getProductsByCategory(categorySlug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  return productService.searchProducts(query);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return productService.getFeaturedProducts();
}
