"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import { Heart, ShoppingBag, X, MessageCircle, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { generateWhatsAppLink } from "@/services/whatsapp";

export function WishlistContainer() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto flex flex-col items-center py-24 border border-luxury-charcoal bg-luxury-charcoal/10 text-center px-6">
        <div className="w-24 h-24 rounded-full bg-luxury-charcoal/30 border border-luxury-charcoal flex items-center justify-center mb-8">
          <Heart className="w-10 h-10 text-luxury-gold opacity-60" />
        </div>
        <h2 className="font-serif text-3xl text-luxury-paper mb-4">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-400 font-light mb-10 leading-relaxed max-w-sm mx-auto">
          Explore our collections and curate pieces that inspire your personal space.
        </p>
        <Link
          href="/shop"
          className="bg-luxury-gold text-black text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors"
        >
          Continue Curation
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-10 pb-6 border-b border-luxury-charcoal">
        <h2 className="font-serif text-4xl text-luxury-paper">
          Saved Curations
        </h2>
        <p className="text-gray-400 font-light">You have {items.length} exquisite {items.length === 1 ? 'piece' : 'pieces'} saved.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((product) => {
          const waLink = generateWhatsAppLink(`Hello Treasure Arts, I'm interested in the ${product.title} from my wishlist.`);
          return (
            <div key={product.id} className="group relative flex flex-col border border-luxury-charcoal bg-luxury-black overflow-hidden hover:border-gray-500 transition-colors">
              <div className="relative aspect-square overflow-hidden bg-luxury-charcoal/30">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-gray-600" />
                  </div>
                )}
                
                {/* Remove button overlaid */}
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                  title="Remove from wishlist"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-black/80 backdrop-blur-md border border-luxury-charcoal text-luxury-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 transform translate-y-0 transition-transform">
                <div className="flex justify-between items-start mb-4">
                  <Link href={`/product/${product.slug}`} className="hover:text-luxury-gold transition-colors flex-1 pr-4">
                    <h3 className="font-serif text-xl">{product.title}</h3>
                  </Link>
                  <div className="text-luxury-gold whitespace-nowrap">
                    {product.type === "consultation" ? "Contact" : `₦${product.price.toLocaleString()}`}
                  </div>
                </div>

                <p className="text-gray-400 text-sm font-light line-clamp-2 mb-8 flex-1">
                  {product.description}
                </p>

                <div className="flex flex-col gap-3 mt-auto">
                  {product.type !== "consultation" && (
                    <button
                      onClick={() => {
                        addCart({
                          id: product.id,
                          productId: product.id,
                          name: product.title,
                          price: product.price,
                          quantity: 1,
                          imageUrl: product.images?.[0] || "",
                        });
                        removeItem(product.id);
                      }}
                      className="w-full bg-luxury-paper text-black py-4 text-xs tracking-widest uppercase font-bold hover:bg-luxury-gold transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Move to Cart
                    </button>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-luxury-charcoal text-luxury-paper hover:text-luxury-gold hover:border-luxury-gold transition-colors py-3 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-3 h-3" /> Ask
                    </a>
                    <Link
                      href={`/product/${product.slug}`}
                      className="border border-luxury-charcoal text-luxury-paper hover:text-luxury-gold hover:border-luxury-gold transition-colors py-3 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-3 h-3" /> View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Support section for populated wishlist */}
      <div className="mt-20 border-t border-luxury-charcoal pt-12 flex flex-col items-center justify-center text-center">
        <p className="text-luxury-gold text-xs tracking-widest uppercase mb-4">Undecided?</p>
        <h3 className="font-serif text-2xl text-luxury-paper mb-4">Speak with an Artisan</h3>
        <p className="text-gray-400 font-light max-w-md mx-auto mb-8">
          Discuss dimensions, custom requests, and delivery timelines directly on WhatsApp with our studio.
        </p>
        <a 
          href={generateWhatsAppLink("Hello Treasure Arts, I'd like some advice on the items in my wishlist.")}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-colors px-10 py-4 text-xs uppercase tracking-widest font-bold flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
