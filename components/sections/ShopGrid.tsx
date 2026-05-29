import { Product } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";

interface ShopGridProps {
  products: Product[];
  categories: { id: string; name: string; slug: string }[];
  currentCategory?: string;
  searchQuery?: string;
}

export function ShopGrid({
  products,
  categories,
  currentCategory,
  searchQuery,
}: ShopGridProps) {
  return (
    <div className="bg-luxury-black">
      <div className="container mx-auto px-4 py-12">
        {/* Filters & Search Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-luxury-charcoal pb-6 mb-12 gap-6">
          <div className="flex flex-wrap gap-4">
            <a
              href="/shop"
              className={`text-xs uppercase tracking-widest ${!currentCategory ? "text-luxury-gold" : "text-gray-500 hover:text-luxury-paper"} transition-colors`}
            >
              All
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={`text-xs uppercase tracking-widest ${currentCategory === cat.slug ? "text-luxury-gold" : "text-gray-500 hover:text-luxury-paper"} transition-colors`}
              >
                {cat.name}
              </a>
            ))}
          </div>

          <form action="/shop" method="GET" className="relative w-full md:w-64">
            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search collection..."
              className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-2 text-sm text-luxury-paper outline-none transition-colors"
            />
          </form>
        </div>

        {searchQuery && (
          <p className="text-gray-400 font-light mb-8 text-sm">
            Showing results for{" "}
            <span className="text-luxury-gold">"{searchQuery}"</span>
          </p>
        )}

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-serif text-2xl text-luxury-paper mb-4">
              No pieces found
            </h3>
            <p className="text-gray-400 font-light max-w-sm mx-auto">
              Try adjusting your search terms or exploring a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
