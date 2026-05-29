import { PageHero } from "@/components/ui/PageHero";
import { WishlistContainer } from "@/components/wishlist/WishlistContainer";

export const metadata = {
  title: "Wishlist | Treasure Arts",
  description: "Your saved luxury resin art pieces.",
};

export default function WishlistPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Wishlist"
        subtitle="Your curated selection of luxury resin pieces."
        imageUrl="https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="py-24 bg-luxury-black flex-1 flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex">
          <WishlistContainer />
        </div>
      </section>
    </div>
  );
}
