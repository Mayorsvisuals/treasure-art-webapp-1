"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

interface CategoryWithCount {
  title: string;
  image: string;
  href: string;
  slug: string;
}

const categories: CategoryWithCount[] = [
  {
    title: "Resin Supplies",
    image:
      "https://picsum.photos/seed/151336/800/1000",
    href: "/shop?category=supplies",
    slug: "supplies",
  },
  {
    title: "Resin Jewelry",
    image:
      "https://picsum.photos/seed/151556/800/1000",
    href: "/shop?category=jewelry",
    slug: "jewelry",
  },
  {
    title: "Resin Interiors",
    image:
      "https://picsum.photos/seed/160021/800/1000",
    href: "/shop?category=interiors",
    slug: "interiors",
  },
  {
    title: "Architectural Resin",
    image:
      "https://picsum.photos/seed/162874/800/1000",
    href: "/shop?category=architectural",
    slug: "architectural",
  },
  {
    title: "Outdoor Collection",
    image:
      "https://picsum.photos/seed/160581/800/1000",
    href: "/shop?category=outdoor",
    slug: "outdoor",
  },
  {
    title: "Custom Luxury Projects",
    image:
      "https://picsum.photos/seed/160060/800/1000",
    href: "/custom-projects",
    slug: "custom",
  },
];

interface FeaturedCategoriesProps {
  counts?: Record<string, number>;
}

export function FeaturedCategories({ counts }: FeaturedCategoriesProps) {
  return (
    <section className="py-24 md:py-32 bg-luxury-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-luxury-gold uppercase tracking-widest text-sm font-medium mb-4">
            Curated Collections
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-paper mb-6">
            Discover Our Artistry
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => {
            const count = counts?.[category.slug];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="group block relative aspect-[4/5] overflow-hidden bg-luxury-charcoal"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=";
                      e.currentTarget.srcset = "";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/40" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-3xl text-luxury-paper mb-3 group-hover:text-luxury-gold transition-colors">
                        {category.title}
                      </h3>
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="text-xs uppercase tracking-widest text-gray-300">
                          {count !== undefined ? `${count} Pieces` : 'View Collection'}
                        </span>
                        <div className="w-8 h-[1px] bg-luxury-gold"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
