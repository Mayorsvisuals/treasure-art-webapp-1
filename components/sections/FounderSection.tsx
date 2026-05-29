"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function FounderSection() {
  return (
    <section className="py-24 md:py-32 bg-luxury-black overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:ml-auto">
              {/* Optional decor frame */}
              <div className="absolute -inset-4 border border-luxury-gold/30 hidden md:block" />

              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
                alt="Ayomikun Ayodeji - Founder & Artist"
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=";
                  e.currentTarget.srcset = "";
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-luxury-gold uppercase tracking-widest text-xs font-bold mb-4">
              Meet the Artist
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-paper mb-6">
              Ayomikun Ayodeji
            </h2>

            <div className="w-12 h-[1px] bg-luxury-gold mb-8 mx-auto md:mx-0"></div>

            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
              "My practice explores the fluid boundary between sculptural art
              and functional design. Each piece is hand-poured, layering
              pigments and inclusions to create depth that captures light and
              imagination."
            </p>

            <p className="text-gray-500 mb-8 max-w-lg leading-relaxed">
              As a female sculptor and resin artist, Ayomikun brings an
              architectural approach to luxury materials, transforming
              commercial and residential spaces with bespoke, handcrafted resin
              installations.
            </p>

            <Image
              src="/placeholder-signature.png"
              alt="Signature"
              width={160}
              height={60}
              className="opacity-50 grayscale invert"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
