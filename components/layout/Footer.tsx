import Link from "next/link";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Twitter } from "lucide-react";
import { Mail } from "lucide-react";
import { MapPin } from "lucide-react";
import { Phone } from "lucide-react";
import { generateWhatsAppLink } from "@/services/whatsapp";

export function Footer() {
  const waLink = generateWhatsAppLink(
    "Hello, I'm reaching out from your website.",
  );

  return (
    <footer className="border-t border-luxury-charcoal bg-luxury-black text-luxury-paper pb-8 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <span className="font-serif text-2xl font-bold tracking-widest text-luxury-gold">
              TREASURE ARTS
            </span>
            <p className="text-sm text-gray-400 max-w-xs font-light leading-relaxed">
              Premium luxury resin art, custom handcrafted pieces, and
              high-quality supplies built for elegance.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-luxury-charcoal flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:border-luxury-gold transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-luxury-charcoal flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:border-luxury-gold transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-luxury-charcoal flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:border-luxury-gold transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium tracking-widest text-luxury-gold uppercase mb-6">
              Explore
            </h3>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-luxury-paper transition-colors"
                >
                  All Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/interiors"
                  className="hover:text-luxury-paper transition-colors"
                >
                  Resin Interiors
                </Link>
              </li>
              <li>
                <Link
                  href="/resin-supplies"
                  className="hover:text-luxury-paper transition-colors"
                >
                  Artist Supplies
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-projects"
                  className="hover:text-luxury-paper transition-colors"
                >
                  Custom Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-luxury-paper transition-colors"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium tracking-widest text-luxury-gold uppercase mb-6">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-luxury-charcoal shrink-0" />
                <span>
                  Oluyole Akala Express, Ibadan
                  <br />
                  Oyo State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-luxury-charcoal shrink-0" />
                <a
                  href="mailto:contact@treasurearts.com.ng"
                  className="hover:text-luxury-paper transition-colors"
                >
                  contact@treasurearts.com.ng
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-luxury-charcoal shrink-0" />
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-luxury-paper transition-colors"
                >
                  2348100791114
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium tracking-widest text-luxury-gold uppercase mb-6">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 font-light mb-4">
              Subscribe for exclusive interior pieces, artist tips, and new
              collection launches.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-b border-luxury-charcoal focus:border-luxury-gold py-2 text-sm text-luxury-paper outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-luxury-paper text-black text-xs font-bold uppercase tracking-widest py-3 hover:bg-luxury-gold transition-colors mt-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-luxury-charcoal text-center text-xs text-gray-500 font-light flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} Treasure Arts. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="hover:text-luxury-gold transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-luxury-gold transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
