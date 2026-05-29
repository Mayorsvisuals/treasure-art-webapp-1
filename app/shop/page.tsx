import { PageHero } from "@/components/ui/PageHero";
import { ShopGrid } from "@/components/sections/ShopGrid";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from "@/lib/data/products";

export const metadata = {
  title: "Shop All | Treasure Arts",
  description: "Explore the full luxury resin art collection.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const { category, q } = resolvedParams;

  let products = [];
  if (q) {
    products = await searchProducts(q);
  } else if (category) {
    products = await getProductsByCategory(category);
  } else {
    products = await getProducts();
  }

  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="The Collection"
        subtitle="Explore our complete range of bespoke resin art, interiors, and premium supplies."
        imageUrl="https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=2000&auto=format&fit=crop"
      />
      <ShopGrid
        products={products}
        categories={categories}
        currentCategory={category}
        searchQuery={q}
      />
    </div>
  );
}
