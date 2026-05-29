"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Resin Supplies",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    href: "/resin-supplies",
  },
  {
    title: "Resin Jewelry",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    href: "/shop",
  },
  {
    title: "Resin Interiors",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
    href: "/interiors",
  },
  {
    title: "Architectural Resin",
    image:
      "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=800&auto=format&fit=crop",
    href: "/architectural",
  },
  {
    title: "Outdoor Collection",
    image:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop",
    href: "/shop",
  },
  {
    title: "Custom Luxury Projects",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop",
    href: "/custom-projects",
  },
];

export function FeaturedCategories() {
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
          {categories.map((category, index) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-2xl text-luxury-paper mb-4 group-hover:text-luxury-gold transition-colors">
                    {category.title}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-luxury-paper border-b border-transparent group-hover:border-luxury-paper pb-1 transition-all">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
