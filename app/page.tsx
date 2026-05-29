import { Hero } from "@/components/sections/Hero";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FounderSection } from "@/components/sections/FounderSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { getProducts } from "@/lib/data/products";

export default async function Home() {
  const products = await getProducts();
  const counts = products.reduce((acc, current) => {
    acc[current.category] = (acc[current.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCategories counts={counts} />
      <FeaturedProducts />
      <FounderSection />
      <TestimonialSection />
      <FaqSection />
    </div>
  );
}
