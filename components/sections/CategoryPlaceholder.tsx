import { FeaturedProducts } from "@/components/sections/FeaturedProducts";

interface CategoryPlaceholderProps {
  title: string;
}

export function CategoryPlaceholder({ title }: CategoryPlaceholderProps) {
  return (
    <div className="bg-luxury-black">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between border-b border-luxury-charcoal pb-6 mb-12">
          <div className="flex gap-4">
            <button className="text-sm uppercase tracking-widest text-luxury-gold flex items-center gap-2">
              Filter{" "}
              <span className="w-4 h-[1px] bg-luxury-gold inline-block"></span>
            </button>
            <button className="text-sm uppercase tracking-widest text-gray-500 hover:text-luxury-paper transition-colors flex items-center gap-2">
              Sort By{" "}
              <span className="w-4 h-[1px] bg-gray-500 inline-block"></span>
            </button>
          </div>
          <p className="text-xs text-gray-500 tracking-widest uppercase">
            Placeholder Products
          </p>
        </div>
      </div>

      {/* Resusing the featured products grid as a placeholder */}
      <div className="-mt-12">
        <FeaturedProducts />
      </div>
    </div>
  );
}
