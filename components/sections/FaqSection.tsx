"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship our luxury resin pieces globally. Shipping costs and timelines vary depending on the destination and the size of the piece, especially for large architectural installations.",
  },
  {
    question: "How do I care for my resin art?",
    answer:
      "To maintain the pristine finish of your resin art, wipe with a soft, damp microfiber cloth. Avoid harsh chemicals, abrasive sponges, and prolonged direct sunlight to prevent slight discoloration over decades.",
  },
  {
    question: "Can I commission a custom project?",
    answer:
      "Absolutely. We specialize in bespoke projects tailored to your lifestyle and space. Contact us via WhatsApp or our Contact page to begin the consultation process.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Due to the individualized nature of custom pieces, returns are not accepted. For our standard catalog items, we offer a 14-day exchange policy for items in original, undamaged condition.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-luxury-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-luxury-gold uppercase tracking-widest text-sm font-medium mb-4">
            Support
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-paper mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-b border-luxury-charcoal"
            >
              <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg md:text-xl font-serif text-luxury-paper group-hover:text-luxury-gold transition-colors pr-8">
                  {faq.question}
                </span>
                <span className="text-luxury-gold shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-gray-400 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
