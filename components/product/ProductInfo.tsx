"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Upload } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Lock } from "lucide-react";
import { Truck } from "lucide-react";
import { Award } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { generateWhatsAppLink } from "@/services/whatsapp";
import { AnimatePresence, motion } from "motion/react";

export function ProductInfo({ product }: { product: Product }) {
  const { addItem: addCart } = useCartStore();
  const {
    addItem: addWishlist,
    removeItem: removeWishlist,
    isInWishlist,
  } = useWishlistStore();

  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [activeTab, setActiveTab] = useState<string | null>("description");

  useEffect(() => {
    setMounted(true);
  }, []);

  const inWishlist = mounted ? isInWishlist(product.id) : false;
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

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
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
        <div className="text-2xl text-luxury-paper mb-8 font-light flex items-center gap-4">
          ₦{dynamicPrice.toLocaleString()}
          {product.stock > 0 ? (
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-500/80"></div> In Stock
            </span>
          ) : (
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
              <div className="w-2 h-2 rounded-full bg-red-500/80"></div> Out of Stock
            </span>
          )}
        </div>
      )}

      <p className="text-gray-400 font-light leading-relaxed mb-10 text-lg line-clamp-3">
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
                          ? "border-luxury-gold text-luxury-gold bg-luxury-charcoal/30 flex items-center gap-2"
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
        <div className="mt-auto pt-8 border-t border-luxury-charcoal mb-10">
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
        <div className="mt-auto flex flex-col gap-6 pt-8 border-t border-luxury-charcoal mb-12">
          <div className="flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-luxury-charcoal h-14 w-32 shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-luxury-paper transition-colors"
                disabled={product.stock === 0}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex-1 text-center text-luxury-paper">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-luxury-paper transition-colors"
                disabled={product.stock === 0}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 h-14 bg-luxury-paper text-black flex items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase hover:bg-luxury-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ask To Add to Cart
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
                className="w-5 h-5 flex-shrink-0"
                fill={inWishlist ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      )}

      {/* Trust Elements Block */}
      <div className="grid grid-cols-2 gap-4 py-8 border-y border-luxury-charcoal mb-10">
        <div className="flex items-center gap-3 text-gray-400">
          <Award className="w-5 h-5 text-luxury-gold shrink-0" />
          <span className="text-xs tracking-widest uppercase">Handmade Craftsmanship</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <ShieldCheck className="w-5 h-5 text-luxury-gold shrink-0" />
          <span className="text-xs tracking-widest uppercase">Premium Quality Guarantee</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Lock className="w-5 h-5 text-luxury-gold shrink-0" />
          <span className="text-xs tracking-widest uppercase">Secure Checkout</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Truck className="w-5 h-5 text-luxury-gold shrink-0" />
          <span className="text-xs tracking-widest uppercase">Nationwide Delivery</span>
        </div>
      </div>

      {/* Rich Details Accordion */}
      <div className="flex flex-col divide-y divide-luxury-charcoal border-b border-luxury-charcoal">
        {/* Full Description */}
        <div className="py-2">
          <button
            onClick={() => toggleTab("description")}
            className="flex items-center justify-between w-full py-4 text-left group"
          >
            <span className="text-xs uppercase tracking-widest text-luxury-paper group-hover:text-luxury-gold transition-colors font-medium">
              Full Description
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                activeTab === "description" ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {activeTab === "description" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 text-gray-400 font-light leading-relaxed text-sm">
                  {product.description}
                  {product.description} {/* Duplicate to show full text for mockup */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Materials & Dimensions */}
        <div className="py-2">
          <button
            onClick={() => toggleTab("materials")}
            className="flex items-center justify-between w-full py-4 text-left group"
          >
            <span className="text-xs uppercase tracking-widest text-luxury-paper group-hover:text-luxury-gold transition-colors font-medium">
              Materials & Details
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                activeTab === "materials" ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {activeTab === "materials" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 text-gray-400 font-light leading-relaxed text-sm">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Premium High-Gloss Epoxy Resin</li>
                    <li>Sustainably sourced hardwood accents (if applicable)</li>
                    <li>Handcrafted in our Nigerian Studio</li>
                    <li>UV-resistant top coat to prevent yellowing</li>
                    <li>Weight and detailed dimensions vary by specific piece</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Care Instructions */}
        <div className="py-2">
          <button
            onClick={() => toggleTab("care")}
            className="flex items-center justify-between w-full py-4 text-left group"
          >
            <span className="text-xs uppercase tracking-widest text-luxury-paper group-hover:text-luxury-gold transition-colors font-medium">
              Care Instructions
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                activeTab === "care" ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {activeTab === "care" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 text-gray-400 font-light leading-relaxed text-sm">
                  Keep away from prolonged direct sunlight. Clean with a soft, microfiber cloth and gentle glass cleaner. Do not use abrasive scrubbers or harsh chemicals. For food-contact items, wash by hand only. 
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Delivery */}
        <div className="py-2">
          <button
            onClick={() => toggleTab("delivery")}
            className="flex items-center justify-between w-full py-4 text-left group"
          >
            <span className="text-xs uppercase tracking-widest text-luxury-paper group-hover:text-luxury-gold transition-colors font-medium">
              Delivery Information
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                activeTab === "delivery" ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {activeTab === "delivery" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2 text-gray-400 font-light leading-relaxed text-sm">
                  We offer nationwide shipping within Nigeria. Pieces in stock typically ship within 3-5 business days. Custom and configurable commissions require 2-4 weeks for complete curing, quality assurance, and polishing before delivery.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
