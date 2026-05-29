"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

const PLACEHOLDER_IMG =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const {
    addItem: addWishlist,
    removeItem: removeWishlist,
    isInWishlist,
  } = useWishlistStore();
  const { addItem: addCart } = useCartStore();

  const inWishlist = isInWishlist(product.id);
  const isConsultation = product.type === "consultation";
  const isConfigurable = product.type === "configurable";

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addCart({
      id: product.id,
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.images[0],
    });
  };

  return (
    <motion.div
      className="group relative flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-luxury-charcoal">
        {product.images?.[0] && (
          <Image
            src={imgError ? PLACEHOLDER_IMG : product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-luxury-gold text-black text-xs font-bold uppercase tracking-wider px-3 py-1">
              Featured
            </span>
          )}
          {isConfigurable && (
            <span className="bg-luxury-paper text-black text-xs font-bold uppercase tracking-wider px-3 py-1">
              Customizable
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            onClick={handleWishlist}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${inWishlist ? "bg-luxury-gold text-black" : "bg-luxury-paper text-black hover:bg-luxury-gold"}`}
          >
            <Heart
              className="w-5 h-5"
              fill={inWishlist ? "currentColor" : "none"}
            />
          </button>
          {!isConsultation && !isConfigurable && (
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-full bg-luxury-gold text-black flex items-center justify-center hover:bg-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          )}
          {isConfigurable && (
            <Link
              href={`/product/${product.slug}`}
              className="px-6 h-12 rounded-full bg-luxury-gold text-black flex items-center justify-center hover:bg-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Configure
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <div className="text-xs text-luxury-gold font-medium tracking-widest uppercase">
          {product.category}
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="group-hover:text-luxury-gold transition-colors"
        >
          <h3 className="font-serif text-xl">{product.title}</h3>
        </Link>
        <div className="text-gray-400">
          {isConsultation
            ? "Price upon request"
            : `₦${product.price.toLocaleString()}`}
        </div>
      </div>
    </motion.div>
  );
}
