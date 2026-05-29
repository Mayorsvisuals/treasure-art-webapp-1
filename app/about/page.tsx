import { PageHero } from "@/components/ui/PageHero";
import { FounderSection } from "@/components/sections/FounderSection";

export const metadata = {
  title: "About | Treasure Arts",
  description: "Learn about our luxury resin art and craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Our Story"
        subtitle="Crafting timeless luxury through the fluid medium of resin."
        imageUrl="https://picsum.photos/seed/160060/2000/2500"
      />

      <section className="py-24 bg-luxury-black">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-luxury-gold uppercase tracking-widest text-sm font-medium mb-6 block">
            The Vision
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-paper mb-8 leading-tight">
            Elevating Spaces with Handcrafted Excellence
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-8">
            Treasure Arts was born from a desire to merge the raw, unpredictable
            nature of resin with precise architectural vision. We specialize in
            creating bespoke surfaces, luxury decor, and premium artist
            supplies, designed for those who appreciate uncompromising quality.
          </p>
        </div>
      </section>

      <FounderSection />
    </div>
  );
}
