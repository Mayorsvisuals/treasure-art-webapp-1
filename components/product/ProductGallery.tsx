"use client";

import { useState } from "react";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";

const PLACEHOLDER_IMG =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image */}
      <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden bg-luxury-charcoal group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={
                failedImages.has(currentIndex)
                  ? PLACEHOLDER_IMG
                  : images[currentIndex]
              }
              alt={`${title} - View ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onError={() => handleImageError(currentIndex)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden transition-all duration-300 ${
                idx === currentIndex
                  ? "border-2 border-luxury-gold filter brightness-110"
                  : "border border-luxury-charcoal opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={failedImages.has(idx) ? PLACEHOLDER_IMG : img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="96px"
                onError={() => handleImageError(idx)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
