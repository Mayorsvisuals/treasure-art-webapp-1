"use client";

import { motion } from "motion/react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

export function PageHero({ title, subtitle, imageUrl }: PageHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-luxury-black/60 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-luxury-black/80" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-[1px] bg-luxury-gold mb-6"></div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-luxury-paper mb-6 tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
