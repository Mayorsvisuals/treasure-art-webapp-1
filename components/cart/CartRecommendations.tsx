"use client";

import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { useState, useEffect } from "react";

interface CartRecommendationsProps {
  products: Product[];
}

export function CartRecommendations({ products }: CartRecommendationsProps) {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  // Determine a dominant category from cart items (just using the first product's category for simplicity, or matching by ID)
  // Our items in cart only have productId, we need to map them back to actual products to get their categories.
  const cartProductIds = items.map((item) => item.productId);
  const cartProducts = products.filter((p) => cartProductIds.includes(p.id));
  
  if (cartProducts.length === 0) return null;

  const mainCategory = cartProducts[0].category;

  // Find products in that category that aren't already in the cart
  const recommendations = products
    .filter((p) => p.category === mainCategory && !cartProductIds.includes(p.id))
    .slice(0, 4);

  if (recommendations.length === 0) return null;

  return (
    <div className="w-full mt-32 border-t border-luxury-charcoal pt-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-paper mb-4">
            You May Also Like
          </h2>
          <p className="text-gray-400 font-light max-w-xl">
            Complement your curation with these pieces from the {mainCategory} collection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
