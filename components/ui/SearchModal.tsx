"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Clock, TrendingUp } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const executeSearch = (term: string) => {
    router.push(`/shop?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-luxury-black/95 backdrop-blur-xl"
        >
          <div className="container mx-auto px-4 py-6 md:py-12 flex-1 flex flex-col">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-luxury-paper hover:text-luxury-gold transition-colors p-2"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="max-w-3xl w-full mx-auto mt-10 md:mt-20">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search luxury resin art..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-luxury-charcoal/50 border-b-2 border-luxury-charcoal hover:border-luxury-gold focus:border-luxury-gold text-2xl md:text-4xl text-luxury-paper py-4 pl-14 pr-4 transition-colors outline-none font-serif placeholder:text-gray-600"
                  autoFocus
                />
              </form>

              {!query && (
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="flex items-center text-luxury-gold font-medium mb-6 uppercase tracking-wider text-sm">
                      <TrendingUp className="mr-2 h-4 w-4" /> Trending
                      Categories
                    </h3>
                    <ul className="space-y-4">
                      {["table", "wall art", "pigment", "resin"].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => executeSearch(item)}
                            className="text-xl text-gray-400 hover:text-luxury-paper transition-colors capitalize"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center text-luxury-gold font-medium mb-6 uppercase tracking-wider text-sm">
                      <Clock className="mr-2 h-4 w-4" /> Recent Searches
                    </h3>
                    <ul className="space-y-4">
                      {["ocean", "gold", "emerald"].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => executeSearch(item)}
                            className="text-xl text-gray-400 hover:text-luxury-paper transition-colors capitalize"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {query && (
                <div className="mt-16 text-center text-gray-400">
                  <p className="text-xl">Press enter to search for "{query}"</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
