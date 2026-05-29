import { PageHero } from "@/components/ui/PageHero";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";

export const metadata = {
  title: "Categories | Treasure Arts",
  description:
    "Explore the full range of luxury resin collections, from supplies to custom interiors.",
};

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Curated Collections"
        subtitle="Discover our distinctive ranges categorized by medium, application, and form."
        imageUrl="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
      />

      {/* We reuse the featured categories block here, which matches perfectly */}
      <div className="-mt-12 bg-luxury-black pb-24">
        <FeaturedCategories />
      </div>
    </div>
  );
}
