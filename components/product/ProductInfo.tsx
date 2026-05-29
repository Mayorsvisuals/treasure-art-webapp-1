"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  Upload,
} from "lucide-react";
import { generateWhatsAppLink } from "@/services/whatsapp";

export function ProductInfo({ product }: { product: Product }) {
  const { addItem: addCart } = useCartStore();
  const {
    addItem: addWishlist,
    removeItem: removeWishlist,
    isInWishlist,
  } = useWishlistStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const inWishlist = isInWishlist(product.id);
  const isConfigurable = product.type === "configurable";
  const isConsultation = product.type === "consultation";

  // Calculate dynamic price based on selected variants
  let dynamicPrice = product.price;
  if (isConfigurable && product.options) {
    product.options.forEach((opt) => {
      const selectedVariantId = selectedOptions[opt.id];
      if (selectedVariantId) {
        const variant = opt.variants.find((v) => v.id === selectedVariantId);
        if (variant) {
          dynamicPrice += variant.price_adjustment;
        }
      }
    });
  }

  const handleOptionSelect = (optionId: string, variantId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: variantId }));
  };

  const handleAddToCart = () => {
    if (isConsultation) return;

    // Add validation for options if needed
    if (isConfigurable && product.options) {
      const missingOption = product.options.find(
        (opt) => !selectedOptions[opt.id],
      );
      if (missingOption) {
        alert(`Please select a ${missingOption.name}`);
        return;
      }
    }

    addCart({
      id: `${product.id}-${JSON.stringify(selectedOptions)}`,
      productId: product.id,
      name: product.title,
      price: dynamicPrice,
      quantity,
      imageUrl: product.images[0],
    });
  };

  const handleWishlist = () => {
    if (inWishlist) removeWishlist(product.id);
    else addWishlist(product);
  };

  const waLink = generateWhatsAppLink(
    `Hello Treasure Arts, I'm interested in the ${product.title}.`,
  );

  return (
    <div className="flex flex-col">
      <span className="text-luxury-gold uppercase tracking-widest text-xs font-medium mb-4 block">
        {product.category}
      </span>
      <h1 className="font-serif text-3xl md:text-5xl text-luxury-paper mb-4 leading-tight">
        {product.title}
      </h1>

      {!isConsultation && (
        <div className="text-2xl text-luxury-paper mb-8 font-light">
          ₦{dynamicPrice.toLocaleString()}
        </div>
      )}

      <p className="text-gray-400 font-light leading-relaxed mb-10 text-lg">
        {product.description}
      </p>

      {/* Configurable Options */}
      {isConfigurable && product.options && (
        <div className="space-y-8 mb-10">
          {product.options.map((option) => (
            <div key={option.id} className="flex flex-col gap-3">
              <label className="text-xs uppercase tracking-widest text-gray-400">
                {option.name}
              </label>
              <div className="flex flex-wrap gap-3">
                {option.variants.map((variant) => {
                  const isSelected = selectedOptions[option.id] === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => handleOptionSelect(option.id, variant.id)}
                      className={`px-6 py-3 border text-sm transition-all duration-300 ${
                        isSelected
                          ? "border-luxury-gold text-luxury-gold bg-luxury-charcoal/30"
                          : "border-luxury-charcoal text-gray-400 hover:border-gray-500 hover:text-luxury-paper"
                      }`}
                    >
                      {variant.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-3 pt-4 border-t border-luxury-charcoal">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Inspiration or Custom Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about specific color mixtures or features..."
              className="w-full bg-luxury-black/50 border border-luxury-charcoal p-4 text-luxury-paper text-sm outline-none focus:border-luxury-gold transition-colors resize-none"
            ></textarea>
            <button className="flex items-center gap-2 text-luxury-gold text-sm hover:text-luxury-paper transition-colors w-fit">
              <Upload className="w-4 h-4" /> Upload reference image
            </button>
          </div>
        </div>
      )}

      {/* Action Area */}
      {isConsultation ? (
        <div className="mt-auto pt-8 border-t border-luxury-charcoal">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-14 bg-luxury-gold text-black flex items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
          >
            Discuss Project <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-center text-xs text-gray-500 mt-4">
            Opens WhatsApp to speak directly with our team.
          </p>
        </div>
      ) : (
        <div className="mt-auto flex flex-col gap-6 pt-8 border-t border-luxury-charcoal">
          <div className="flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-luxury-charcoal h-14 w-32 shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-luxury-paper transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex-1 text-center text-luxury-paper">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-luxury-paper transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 h-14 bg-luxury-paper text-black flex items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase hover:bg-luxury-gold transition-colors"
            >
              Add to Cart
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`w-14 h-14 border flex items-center justify-center shrink-0 transition-colors ${
                inWishlist
                  ? "border-luxury-gold text-luxury-gold bg-luxury-charcoal/20"
                  : "border-luxury-charcoal text-gray-400 hover:border-luxury-gold"
              }`}
            >
              <Heart
                className="w-5 h-5"
                fill={inWishlist ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="flex items-center text-xs text-gray-500 uppercase tracking-widest gap-4 mt-2">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div> In Stock
            </span>
            <span>|</span>
            <span>Ships in {isConfigurable ? "2-4 Weeks" : "3-5 Days"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
