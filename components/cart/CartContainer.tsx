"use client";

import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import { ShoppingBag, Minus, Plus, X, Heart, MessageCircle, ShieldCheck, Truck, Award, Lock } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import { generateWhatsAppLink } from "@/services/whatsapp";

export function CartContainer() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  const cartTotal = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col">
        <h2 className="text-luxury-paper font-serif text-3xl mb-8">
          Personal Order
        </h2>
        <div className="border border-luxury-charcoal bg-luxury-charcoal/10 py-24 flex flex-col items-center justify-center text-center flex-1">
          <div className="w-20 h-20 rounded-full bg-luxury-charcoal/30 border border-luxury-charcoal flex items-center justify-center mb-8">
            <ShoppingBag className="w-8 h-8 text-luxury-gold opacity-60" />
          </div>
          <h3 className="font-serif text-2xl text-luxury-paper mb-3">
            Your Cart is Empty
          </h3>
          <p className="text-gray-400 font-light mb-10 max-w-md px-4">
            You haven't added any premium resin pieces to your curation yet. 
            Discover works of exceptional craftsmanship in our collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="bg-luxury-gold text-black text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors text-center"
            >
              Explore Collection
            </Link>
            <a
              href={generateWhatsAppLink("Hello Treasure Arts, I'd like to discuss a custom piece.")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-luxury-charcoal text-luxury-paper text-xs font-bold uppercase tracking-widest px-8 py-4 hover:border-luxury-gold transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Message Consultant
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleSupportClick = () => {
    window.open(generateWhatsAppLink("Hello Treasure Arts, I have a question about my cart items."), "_blank");
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-12 w-full max-w-7xl mx-auto">
      {/* Cart Items Area */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-luxury-paper font-serif text-3xl mb-8">
          Your Curation ({items.length})
        </h2>
        
        {/* Desk/Mobile Column Titles */}
        <div className="hidden md:flex justify-between text-xs tracking-widest uppercase text-gray-500 pb-4 border-b border-luxury-charcoal">
          <span>Product</span>
          <div className="flex gap-16 md:gap-24 lg:gap-32">
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
        </div>

        <div className="flex flex-col w-full md:border-none border-t border-luxury-charcoal md:pt-4 pt-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row md:items-center py-8 border-b border-luxury-charcoal/50 relative group gap-6"
            >
              <div className="flex gap-6 flex-1">
                <div className="w-24 h-32 md:w-32 md:h-40 shrink-0 relative bg-luxury-charcoal group-hover:opacity-90 transition-opacity">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-serif text-xl md:text-2xl text-luxury-paper mb-2">
                    {item.name}
                  </h3>
                  <div className="text-gray-400 text-sm mb-4">
                    Price: ₦{item.price.toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs uppercase tracking-widest text-gray-500 hover:text-luxury-gold transition-colors flex items-center gap-2 mt-auto self-start"
                  >
                    <X className="w-3 h-3" /> Remove Item
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-16 md:gap-24 lg:gap-32 w-full md:w-auto mt-4 md:mt-0">
                {/* Quantity */}
                <div className="flex items-center border border-luxury-charcoal h-10 w-24">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-luxury-paper transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="flex-1 text-center text-sm text-luxury-paper">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-luxury-paper transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* dynamic Subtotal */}
                <div className="text-luxury-gold text-lg md:text-xl font-light">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Support Banner below cart */}
        <div className="mt-12 bg-luxury-charcoal/20 border border-luxury-charcoal p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl text-luxury-paper mb-2">Need assistance with your order?</h4>
            <p className="text-gray-400 text-sm font-light">Our luxury consultants are available to help arrange premium delivery or answer any questions.</p>
          </div>
          <button 
            onClick={handleSupportClick}
            className="flex items-center gap-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-colors px-6 py-3 text-xs uppercase tracking-widest font-bold whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </button>
        </div>
      </div>

      {/* Order Summary Area */}
      <div className="w-full lg:w-[420px] shrink-0">
        <div className="bg-luxury-black border border-luxury-charcoal p-8 sticky top-32">
          <h2 className="text-luxury-paper font-serif text-2xl mb-8">
            Order Summary
          </h2>

          <div className="space-y-6 mb-8">
            <div className="flex justify-between text-gray-400 font-light pb-4 border-b border-luxury-charcoal">
              <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
              <span className="text-luxury-paper">₦{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400 font-light pb-6 border-b border-luxury-charcoal">
              <span>Estimated Shipping</span>
              <span className="text-right text-xs">Calculated Post-Order</span>
            </div>
            
            <div className="bg-luxury-charcoal/20 p-4 border-l-2 border-luxury-gold mb-6">
              <p className="text-xs leading-relaxed text-gray-400">
                <span className="text-luxury-gold">Note:</span> Shipping costs are calculated and communicated after order confirmation by a Treasure Arts representative. Estimated delivery varies strictly based on location and piece configuration.
              </p>
            </div>

            <div className="flex justify-between text-luxury-paper text-xl pt-2">
              <span>Estimated Total</span>
              <span>₦{cartTotal.toLocaleString()}</span>
            </div>
          </div>

          <Link href="/checkout" className="block text-center w-full bg-luxury-gold text-black text-xs font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors mb-6">
            Proceed to Checkout
          </Link>
          
          <div className="pt-6 border-t border-luxury-charcoal grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-luxury-gold shrink-0" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400">Secure Payments</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-luxury-gold shrink-0" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400">Nationwide Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-luxury-gold shrink-0" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400">Premium Quality</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border border-luxury-gold rounded-full flex items-center justify-center shrink-0">
                <span className="text-[10px] text-luxury-gold">+</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400">Handmade Craft</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky Checkout CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-luxury-black/95 backdrop-blur-md border-t border-luxury-charcoal z-40 lg:hidden transform translate-y-0 transition-transform">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-400">Total</span>
          <span className="text-lg text-luxury-gold">₦{cartTotal.toLocaleString()}</span>
        </div>
        <Link href="/checkout" className="block text-center w-full bg-luxury-gold text-black text-xs font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors">
          Checkout Now
        </Link>
      </div>
    </div>
  );
}

