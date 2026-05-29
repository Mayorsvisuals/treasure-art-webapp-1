import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { getFeaturedProducts } from "@/lib/data/products";
import Link from "next/link";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-24 md:py-32 bg-luxury-charcoal/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-luxury-gold uppercase tracking-widest text-sm font-medium mb-4 block">
              New Arrivals
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-paper">
              Signature Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="border border-luxury-charcoal text-luxury-paper py-3 px-8 text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-black hover:border-luxury-gold transition-colors"
          >
            View All Pieces
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
