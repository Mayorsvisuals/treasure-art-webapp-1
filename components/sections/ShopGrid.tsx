"use client";

import { useState, useMemo, useEffect } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { ChevronDown, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ShopGridProps {
  products: Product[];
  categories: Category[];
  currentCategory?: string;
  searchQuery?: string;
}

type SortOption = "featured" | "newest" | "price-low" | "price-high";

export function ShopGrid({
  products,
  categories,
  currentCategory,
  searchQuery,
}: ShopGridProps) {
  const router = useRouter();
  
  const [activeCategory, setActiveCategory] = useState<string | undefined>(currentCategory);
  const [search, setSearch] = useState(searchQuery || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [sortParam, setSortParam] = useState<SortOption>("featured");
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setActiveCategory(currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Derived filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by Category
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by Search (Partial Match)
    if (debouncedSearch) {
      const lowerQuery = debouncedSearch.toLowerCase();
      const searchTerms = lowerQuery.split(' ').filter(term => term.length > 0);
      result = result.filter(p => {
        const searchableText = `${p.title} ${p.description} ${p.category} ${p.tags?.join(' ') || ''}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Filter by Featured
    if (showFeaturedOnly) {
      result = result.filter((p) => p.featured);
    }

    // Filter by In-Stock
    if (showInStockOnly) {
      result = result.filter((p) => p.stock > 0 || p.type === 'consultation');
    }

    // Filter by Price Range
    result = result.filter((p) => {
      // Treat consultation items basically as passing price filter since price=0
      if (p.type === 'consultation') return true; 
      return p.price >= priceRange[0] && p.price <= priceRange[1];
    });

    // Sorting
    result = [...result].sort((a, b) => {
      switch (sortParam) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          // mock newest by placing latest seeded first, or id reverse
          return b.id.localeCompare(a.id);
        case "featured":
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
      }
    });

    return result;
  }, [products, activeCategory, debouncedSearch, showFeaturedOnly, showInStockOnly, priceRange, sortParam]);

  const activeCategoryName = categories.find(c => c.slug === activeCategory)?.name || "All Collections";

  return (
    <div className="bg-luxury-black min-h-screen text-luxury-paper pb-24">
      {/* Breadcrumb */}
      <div className="border-b border-luxury-charcoal">
        <div className="container mx-auto px-4 py-4">
          <div className="text-xs tracking-widest uppercase text-gray-500 whitespace-nowrap overflow-x-auto scroller-none flex items-center gap-2">
            <Link href="/" className="hover:text-luxury-paper transition-colors">Home</Link>
            <span>/</span>
            <button onClick={() => setActiveCategory(undefined)} className="hover:text-luxury-paper transition-colors">Shop</button>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-luxury-gold">{activeCategoryName}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <span className="font-serif text-2xl">{filteredProducts.length} Pieces</span>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest border border-luxury-charcoal px-4 py-2 hover:border-luxury-gold transition-colors"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Sidebar Filters */}
        <div className={`
          fixed inset-0 z-50 bg-luxury-black p-6 overflow-y-auto transition-transform duration-500 transform lg:transform-none lg:static lg:block lg:w-64 lg:shrink-0 lg:p-0 lg:bg-transparent lg:z-auto
          ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="flex justify-between items-center mb-10 lg:hidden">
            <span className="font-serif text-2xl text-luxury-gold">Filters</span>
            <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-12">
            {/* Search */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Search</h3>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search collection..."
                className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-2 text-sm text-luxury-paper outline-none transition-colors"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Categories</h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setActiveCategory(undefined)}
                  className={`text-left text-sm transition-colors ${!activeCategory ? "text-luxury-gold" : "text-gray-400 hover:text-luxury-paper"}`}
                >
                  All Collections
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`text-left text-sm transition-colors ${activeCategory === cat.slug ? "text-luxury-gold" : "text-gray-400 hover:text-luxury-paper"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Sort By</h3>
              <select 
                value={sortParam}
                onChange={(e) => setSortParam(e.target.value as SortOption)}
                className="w-full bg-luxury-black border-b border-luxury-charcoal py-2 text-sm text-luxury-paper outline-none cursor-pointer appearance-none focus:border-luxury-gold"
              >
                <option value="featured">Featured First</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Availability & Featured */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Filters</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${showFeaturedOnly ? 'bg-luxury-gold border-luxury-gold' : 'border-luxury-charcoal group-hover:border-gray-500'}`}>
                    {showFeaturedOnly && <div className="w-2 h-2 bg-black" />}
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-luxury-paper transition-colors">Featured Works</span>
                  <input type="checkbox" className="hidden" checked={showFeaturedOnly} onChange={(e) => setShowFeaturedOnly(e.target.checked)} />
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${showInStockOnly ? 'bg-luxury-gold border-luxury-gold' : 'border-luxury-charcoal group-hover:border-gray-500'}`}>
                    {showInStockOnly && <div className="w-2 h-2 bg-black" />}
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-luxury-paper transition-colors">In Stock</span>
                  <input type="checkbox" className="hidden" checked={showInStockOnly} onChange={(e) => setShowInStockOnly(e.target.checked)} />
                </label>
              </div>
            </div>
            
            <div className="lg:hidden mt-8 pt-8 border-t border-luxury-charcoal">
               <button 
                 onClick={() => setIsMobileFilterOpen(false)}
                 className="w-full bg-luxury-gold text-black py-4 text-xs uppercase tracking-widest font-bold"
               >
                 View {filteredProducts.length} Results
               </button>
            </div>
          </div>
        </div>

        {/* Main Grid Area */}
        <div className="flex-1">
          <div className="hidden lg:flex justify-between items-end border-b border-luxury-charcoal pb-4 mb-8">
            <h2 className="font-serif text-3xl text-luxury-paper">{activeCategoryName}</h2>
            <span className="text-gray-400 text-sm">{filteredProducts.length} Pieces</span>
          </div>

          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-32 flex flex-col items-center justify-center text-center border border-luxury-charcoal bg-luxury-charcoal/10"
              >
                <div className="w-16 h-16 bg-luxury-charcoal/30 flex items-center justify-center rounded-full mb-6 text-luxury-gold">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-luxury-paper mb-4">
                  No exquisite pieces found
                </h3>
                <p className="text-gray-400 font-light max-w-sm mb-8">
                  We couldn't find any works matching your current curation. Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={() => {
                    setSearch("");
                    setActiveCategory(undefined);
                    setShowFeaturedOnly(false);
                    setShowInStockOnly(false);
                  }}
                  className="border-b border-luxury-gold text-luxury-gold text-xs uppercase tracking-widest pb-1 hover:text-white hover:border-white transition-colors"
                >
                  Clear Curation
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
