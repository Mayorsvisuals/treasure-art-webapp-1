import { PageHero } from "@/components/ui/PageHero";
import { ShopGrid } from "@/components/sections/ShopGrid";
import { getProducts, getCategories } from "@/lib/data/products";

export const metadata = {
  title: "Architectural Resin | Treasure Arts",
  description:
    "Premium resin installations, wall panels, and structural elements.",
};

export default async function ArchitecturalPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Architectural Details"
        subtitle="Large-scale installations, deep-pour basins, wall panels, and structural accents for high-end spaces."
        imageUrl="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2000&auto=format&fit=crop"
      />
      <ShopGrid
        products={products}
        categories={categories}
        currentCategory="architectural"
      />
    </div>
  );
}
