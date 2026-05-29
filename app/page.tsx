import { Hero } from "@/components/sections/Hero";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FounderSection } from "@/components/sections/FounderSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <FounderSection />
      <TestimonialSection />
      <FaqSection />
    </div>
  );
}
