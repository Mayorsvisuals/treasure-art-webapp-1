import { PageHero } from "@/components/ui/PageHero";
import { ShopGrid } from "@/components/sections/ShopGrid";
import { getProductsByCategory, getCategories } from "@/lib/data/products";

export const metadata = {
  title: "Resin Interiors | Treasure Arts",
  description:
    "Luxury handcrafted resin furniture, tables, and interior accessories.",
};

export default async function InteriorsPage() {
  const products = await getProductsByCategory("interiors");
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Resin Interiors"
        subtitle="Bespoke center tables, fluid art decor, and handcrafted furnishings designed to captivate."
        imageUrl="https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=2000&auto=format&fit=crop"
      />
      <ShopGrid
        products={products}
        categories={categories}
        currentCategory="interiors"
      />
    </div>
  );
}
