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
        imageUrl="https://picsum.photos/seed/154093/2000/2500"
      />

      <section className="py-24 bg-luxury-black flex-1 flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex">
          <WishlistContainer />
        </div>
      </section>
    </div>
  );
}
