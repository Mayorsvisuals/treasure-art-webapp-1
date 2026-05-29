"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { generateWhatsAppLink } from "@/services/whatsapp";

export function WhatsAppFAB() {
  // Use a generic inquiry placeholder for the sitewide FAB
  const waLink = generateWhatsAppLink(
    "Hello! I'm interested in exploring your luxury resin art collections.",
  );

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      className="fixed bottom-6 right-6 z-40 hidden md:flex"
    >
      <Link href={waLink} target="_blank" rel="noopener noreferrer">
        <div className="relative group flex items-center">
          <div className="absolute right-full mr-4 bg-luxury-black/90 border border-luxury-charcoal text-luxury-paper px-4 py-2 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm tracking-wider pointer-events-none">
            Chat on WhatsApp
          </div>
          <button className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageCircle className="w-7 h-7 relative z-10" />
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
