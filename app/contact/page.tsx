import { PageHero } from "@/components/ui/PageHero";
import { Mail, MapPin, Phone } from "lucide-react";
import { generateWhatsAppLink } from "@/services/whatsapp";

export const metadata = {
  title: "Contact | Treasure Arts",
  description: "Get in touch for custom luxury resin orders.",
};

export default function ContactPage() {
  const waLink = generateWhatsAppLink(
    "Hello, I would like to inquire about a custom project.",
  );

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Contact Us"
        subtitle="For inquiries, custom commissions, and creative consultations."
        imageUrl="https://picsum.photos/seed/154420/2000/2500"
      />

      <section className="py-24 bg-luxury-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-luxury-paper mb-8">
                Get In Touch
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
                Whether you're looking to commission a bespoke piece or need
                assistance with our premium supplies, our team is at your
                service.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-luxury-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-luxury-paper font-medium tracking-wide uppercase text-sm mb-2">
                      Our Studio
                    </h3>
                    <p className="text-gray-400 font-light">
                      Oluyole Akala Express, Ibadan
                      <br />
                      Oyo State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-luxury-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-luxury-paper font-medium tracking-wide uppercase text-sm mb-2">
                      Email
                    </h3>
                    <p className="text-gray-400 font-light cursor-pointer hover:text-luxury-paper transition-colors">
                      contact@treasurearts.com.ng
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-luxury-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-luxury-paper font-medium tracking-wide uppercase text-sm mb-2">
                      WhatsApp Support
                    </h3>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 font-light cursor-pointer hover:text-luxury-paper transition-colors block"
                    >
                      Click to chat with us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-luxury-charcoal/30 p-8 md:p-12 border border-luxury-charcoal">
              <h3 className="font-serif text-2xl text-luxury-paper mb-8">
                Send a Message
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-3 text-luxury-paper outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-3 text-luxury-paper outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Inquiry Type
                  </label>
                  <select className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-3 text-luxury-paper outline-none transition-colors appearance-none">
                    <option className="bg-luxury-black text-white">
                      General Inquiry
                    </option>
                    <option className="bg-luxury-black text-white">
                      Custom Commission
                    </option>
                    <option className="bg-luxury-black text-white">
                      Resin Supplies
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-3 text-luxury-paper outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full bg-luxury-paper text-black text-xs font-bold uppercase tracking-widest py-4 hover:bg-luxury-gold transition-colors mt-4"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
