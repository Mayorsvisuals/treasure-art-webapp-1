import { PageHero } from "@/components/ui/PageHero";
import { ShopGrid } from "@/components/sections/ShopGrid";
import { getProducts, getCategories } from "@/lib/data/products";

export const metadata = {
  title: "Resin Supplies | Treasure Arts",
  description: "Premium quality epoxy resins, pigments, and tools for artists.",
};

export default async function ResinSuppliesPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Artist Supplies"
        subtitle="Uncompromising quality epoxy resins, mica powders, alcohol inks, and casting tools."
        imageUrl="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop"
      />
      <ShopGrid
        products={products}
        categories={categories}
        currentCategory="supplies"
      />
    </div>
  );
}
