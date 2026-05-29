"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://picsum.photos/seed/154093/2000/2500",
        }}
      >
        <div className="absolute inset-0 bg-luxury-black/60 md:bg-luxury-black/40 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-luxury-gold uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6">
            Handcrafted Luxury
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-luxury-paper mb-8 leading-tight max-w-5xl">
            Where Art Meets <br className="hidden md:block" /> Form & Function
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg md:text-xl font-light mb-12">
            Elevate your space with bespoke resin centerpieces, luxurious
            architectural details, and exclusive supplies for creators.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <Button
              size="lg"
              className="bg-luxury-gold text-black hover:bg-white min-w-[200px] text-sm tracking-wider uppercase"
            >
              Explore Collection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-luxury-paper text-luxury-paper hover:bg-luxury-paper hover:text-black min-w-[200px] text-sm tracking-wider uppercase"
            >
              Custom Projects
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs uppercase tracking-widest text-luxury-gold mb-2">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-luxury-gold" />
      </motion.div>
    </section>
  );
}
