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
        imageUrl="https://picsum.photos/seed/151336/2000/2500"
      />
      <ShopGrid
        products={products}
        categories={categories}
        currentCategory="supplies"
      />
    </div>
  );
}
