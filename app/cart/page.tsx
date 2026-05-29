import { PageHero } from "@/components/ui/PageHero";
import { CartContainer } from "@/components/cart/CartContainer";
import { CartRecommendations } from "@/components/cart/CartRecommendations";
import { getProducts } from "@/lib/data/products";

export const metadata = {
  title: "Cart | Treasure Arts",
  description: "Your shopping cart.",
};

export default async function CartPage() {
  const products = await getProducts();
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Personal Curation"
        imageUrl="https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="py-24 bg-luxury-black flex-1 flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col">
          <CartContainer />
          <CartRecommendations products={products} />
        </div>
      </section>
    </div>
  );
}
