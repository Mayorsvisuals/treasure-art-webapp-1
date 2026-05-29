import { PageHero } from "@/components/ui/PageHero";
import { ShopGrid } from "@/components/sections/ShopGrid";
import { getProducts, getCategories } from "@/lib/data/products";

export const metadata = {
  title: "Resin Interiors | Treasure Arts",
  description:
    "Luxury handcrafted resin furniture, tables, and interior accessories.",
};

export default async function InteriorsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Resin Interiors"
        subtitle="Bespoke center tables, fluid art decor, and handcrafted furnishings designed to captivate."
        imageUrl="https://picsum.photos/seed/154093/2000/2500"
      />
      <ShopGrid
        products={products}
        categories={categories}
        currentCategory="interiors"
      />
    </div>
  );
}
