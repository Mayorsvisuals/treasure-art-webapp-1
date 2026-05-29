import { PageHero } from "@/components/ui/PageHero";
import { Mail, ArrowRight } from "lucide-react";
import { generateWhatsAppLink } from "@/services/whatsapp";

export const metadata = {
  title: "Custom Projects | Treasure Arts",
  description: "Inquire about private commissions and bespoke installations.",
};

export default function CustomProjectsPage() {
  const waLink = generateWhatsAppLink(
    "Hello, I am interested in commissioning a custom resin piece.",
  );

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Custom Commissions"
        subtitle="Bring your architectural visions to life with our bespoke residential and commercial resin installations."
        imageUrl="https://picsum.photos/seed/162064/2000/2500"
      />

      <section className="py-24 bg-luxury-black">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <span className="text-luxury-gold uppercase tracking-widest text-sm font-medium mb-6 block">
            The Process
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-paper mb-16">
            Creating the Extraordinary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-3xl text-luxury-black bg-luxury-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-serif">
                1
              </div>
              <h3 className="text-xl text-luxury-paper mb-4 font-serif">
                Consultation
              </h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                We discuss your aesthetic preferences, space requirements, and
                functional needs to map out a structural vision.
              </p>
            </div>
            <div>
              <div className="text-3xl text-luxury-black bg-luxury-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-serif">
                2
              </div>
              <h3 className="text-xl text-luxury-paper mb-4 font-serif">
                Design & Curing
              </h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Our artists begin the intricate, multi-layer pouring process,
                blending pigments and calculating precise curing times.
              </p>
            </div>
            <div>
              <div className="text-3xl text-luxury-black bg-luxury-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-serif">
                3
              </div>
              <h3 className="text-xl text-luxury-paper mb-4 font-serif">
                Installation
              </h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Final polishing, quality inspection, and white-glove delivery or
                installation of your bespoke centerpiece.
              </p>
            </div>
          </div>

          <div className="mt-24 bg-luxury-charcoal/20 border border-luxury-charcoal p-12">
            <h3 className="font-serif text-3xl text-luxury-paper mb-6">
              Start Your Commission
            </h3>
            <p className="text-gray-400 font-light mb-8 max-w-xl mx-auto">
              Our schedule is currently open for select commissions. Provide us
              with your project details to begin exploring possibilities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-luxury-gold text-black uppercase tracking-widest px-8 py-4 text-xs font-bold hover:bg-white transition-colors flex items-center justify-center gap-3"
              >
                Chat via WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@treasurearts.com.ng"
                className="border border-luxury-charcoal text-luxury-paper uppercase tracking-widest px-8 py-4 text-xs font-bold hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center gap-3"
              >
                Email Studio <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
