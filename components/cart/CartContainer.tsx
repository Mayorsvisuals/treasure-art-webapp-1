"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";

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
        <h2 className="text-luxury-paper font-serif text-2xl mb-8">
          Item Overview
        </h2>
        <div className="border-t border-b border-luxury-charcoal py-16 flex flex-col items-center justify-center text-center flex-1">
          <div className="w-20 h-20 rounded-full bg-luxury-charcoal/50 flex items-center justify-center mb-6">
            <ShoppingBag className="w-8 h-8 text-luxury-gold opacity-50" />
          </div>
          <h3 className="font-serif text-2xl text-luxury-paper mb-2">
            Your Cart is Empty
          </h3>
          <p className="text-gray-400 font-light mb-8 max-w-sm">
            You haven't added any premium resin pieces to your cart yet.
          </p>
          <Link
            href="/shop"
            className="border border-luxury-charcoal text-luxury-paper text-xs font-bold uppercase tracking-widest px-8 py-4 hover:border-luxury-gold hover:text-luxury-gold transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col xl:flex-row gap-12 w-full">
      {/* Cart Items Area */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-luxury-paper font-serif text-2xl mb-8">
          Cart Items ({items.length})
        </h2>
        <div className="flex flex-col gap-8 w-full border-t border-luxury-charcoal pt-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 pb-8 border-b border-luxury-charcoal/50 relative group"
            >
              <div className="w-24 h-32 md:w-32 md:h-40 shrink-0 relative bg-luxury-charcoal">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=";
                      e.currentTarget.srcset = "";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-luxury-paper mb-2 pr-8">
                    {item.name}
                  </h3>
                  <p className="text-luxury-gold text-lg mb-4">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-6">
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

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs uppercase tracking-widest text-gray-500 hover:text-red-400 transition-colors flex items-center gap-2"
                  >
                    <X className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Area */}
      <div className="w-full xl:w-[400px] shrink-0">
        <div className="bg-luxury-charcoal/30 border border-luxury-charcoal p-8">
          <h2 className="text-luxury-paper font-serif text-2xl mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-400 font-light pb-4 border-b border-luxury-charcoal">
              <span>Subtotal</span>
              <span>₦{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400 font-light pb-4 border-b border-luxury-charcoal">
              <span>Shipping</span>
              <span className="text-right">Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-luxury-paper text-lg pt-4">
              <span>Total</span>
              <span>₦{cartTotal.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 font-light mb-6 text-center leading-relaxed">
            Taxes and regional delivery costs are calculated securely during
            checkout.
          </p>

          <button className="w-full bg-luxury-paper text-black text-xs font-bold uppercase tracking-widest py-4 hover:bg-luxury-gold transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
