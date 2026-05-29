"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export function WishlistContainer() {
  const { items } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto flex flex-col items-center py-16">
        <div className="w-24 h-24 rounded-full bg-luxury-charcoal/50 border border-luxury-charcoal flex items-center justify-center mb-8">
          <Heart className="w-10 h-10 text-luxury-gold opacity-50" />
        </div>
        <h2 className="font-serif text-3xl text-luxury-paper mb-4">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-400 font-light mb-10 leading-relaxed text-center">
          Explore our collections and save pieces that inspire your space.
        </p>
        <Link
          href="/shop"
          className="bg-luxury-gold text-black text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 mb-12 border-b border-luxury-charcoal pb-6">
        <h2 className="font-serif text-3xl text-luxury-paper">
          Saved Curations ({items.length})
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 py-8">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
