"use client";

import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "The custom resin table completely transformed our office lobby. It's not just furniture; it's a profound piece of art that catches every client's eye.",
    author: "Sarah Jenkins",
    role: "Interior Designer",
  },
  {
    quote:
      "Exceptional quality and attention to detail. The depth of the pigments in the wash basin is unparalleled. Truly luxury craftsmanship.",
    author: "Marcus Aurelius",
    role: "Architectural Lead",
  },
  {
    quote:
      "We commissioned a bespoke wall installation. The entire process from consultation to delivery was highly professional and deeply creative.",
    author: "Elena Rostov",
    role: "Private Collector",
  },
];

export function TestimonialSection() {
  return (
    <section className="py-24 md:py-32 bg-luxury-charcoal/50 border-y border-luxury-charcoal/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-luxury-gold uppercase tracking-widest text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-paper mb-6">
            Client Experiences
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="text-luxury-gold text-4xl font-serif mb-6 opacity-50">
                "
              </div>
              <p className="text-gray-300 font-light leading-relaxed mb-8 text-lg flex-1">
                {item.quote}
              </p>
              <div>
                <div className="text-luxury-paper font-medium tracking-wide uppercase text-sm mb-1">
                  {item.author}
                </div>
                <div className="text-luxury-gold tracking-wider text-xs uppercase">
                  {item.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
