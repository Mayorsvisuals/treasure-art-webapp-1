"use client";

import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, Truck, Award, Lock, MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/services/whatsapp";

// Mapping category slugs checking
const CUSTOM_CATEGORIES = ["custom", "architectural", "bulk"];

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-luxury-black"></div>;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-black flex flex-col items-center justify-center p-4 text-center">
        <h1 className="font-serif text-3xl text-luxury-paper mb-4">Your Curation is Empty</h1>
        <p className="text-gray-400 font-light mb-8">Please add items to your curation before checking out.</p>
        <Link
          href="/shop"
          className="bg-luxury-gold text-black px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const cartTotal = getCartTotal();
  const hasCustomItems = items.some(item => 
    // In our real app we would check product.category, but cart items only have name/id. 
    // Since we don't have the full product info in store, we fallback to names or we can fetch them.
    // For now we check if name includes 'Custom', 'Architectural', 'Installation', etc.
    item.name.toLowerCase().includes('custom') || 
    item.name.toLowerCase().includes('architectural') ||
    item.name.toLowerCase().includes('installation') ||
    item.name.toLowerCase().includes('project')
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStandardCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call / order placement
    setTimeout(() => {
      clearCart();
      const orderRef = "TA-" + Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('lastOrder', JSON.stringify({
        ref: orderRef,
        customer: formData,
      }));
      router.push(`/checkout/success?ref=${orderRef}`);
    }, 1500);
  };

  const handleCustomConsultation = () => {
    const message = `Hello Treasure Arts, I am requesting a consultation for the custom items in my curation:\n\n` +
      items.map(i => `- ${i.name} (x${i.quantity})`).join("\n") +
      `\n\nMy details:\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city}, ${formData.state}`;
    
    window.open(generateWhatsAppLink(message), "_blank");
  };

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-paper pb-24">
      {/* Checkout Header */}
      <div className="border-b border-luxury-charcoal bg-luxury-black sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/cart" className="text-gray-400 hover:text-luxury-gold transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
            <ChevronLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <div className="font-serif text-xl tracking-wider text-luxury-gold">Treasure Arts</div>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        
        {/* Left Col - Form */}
        <div className="flex-1 lg:max-w-3xl">
          <h1 className="font-serif text-4xl mb-10">Checkout</h1>
          
          <form id="checkout-form" onSubmit={handleStandardCheckout} className="space-y-12">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-6 pb-2 border-b border-luxury-charcoal">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div>
              <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-6 pb-2 border-b border-luxury-charcoal">
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Street Address</label>
                  <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">City</label>
                  <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">State / Province</label>
                  <input required name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Country</label>
                  <select required name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors appearance-none cursor-pointer">
                    <option value="Nigeria">Nigeria</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other Integration Available</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Payment Method Notice */}
            <div>
              <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-6 pb-2 border-b border-luxury-charcoal">
                Payment Method
              </h2>
              <div className="border border-luxury-charcoal p-6 flex items-start gap-4 bg-luxury-charcoal/10">
                <div className="mt-1"><Lock className="w-5 h-5 text-luxury-gold" /></div>
                <div>
                  <h3 className="text-luxury-paper font-medium mb-1">Secure Checkout</h3>
                  <p className="text-sm text-gray-400">Your order will be securely processed. Paystack integration will be finalized upon order confirmation.</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              {hasCustomItems ? (
                <button
                  type="button"
                  onClick={handleCustomConsultation}
                  className="w-full bg-luxury-gold text-black px-8 py-5 text-sm tracking-widest uppercase font-bold hover:bg-white transition-colors flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Request Consultation
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-luxury-gold text-black px-8 py-5 text-sm tracking-widest uppercase font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Confirm Secure Order"}
                </button>
              )}
            </div>

          </form>
        </div>

        {/* Right Col - Order Summary */}
        <div className="w-full lg:w-[420px] shrink-0">
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-8 lg:sticky lg:top-32">
            <h2 className="font-serif text-2xl mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-luxury-charcoal relative shrink-0">
                    {item.imageUrl && (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    )}
                    <div className="absolute -top-2 -right-2 bg-luxury-charcoal border border-gray-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-medium text-luxury-paper line-clamp-2">{item.name}</h4>
                    <span className="text-luxury-gold text-sm mt-1">₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-luxury-charcoal pt-6 space-y-4 mb-6">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span className="text-luxury-paper">₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Shipping</span>
                <span>Calculated Later</span>
              </div>
            </div>

            <div className="border-t border-luxury-charcoal pt-6 flex justify-between items-center mb-8">
              <span className="text-lg">Total</span>
              <span className="text-2xl text-luxury-gold font-light">₦{cartTotal.toLocaleString()}</span>
            </div>

            <div className="bg-luxury-black border border-luxury-charcoal p-4 mb-8">
              <div className="flex gap-3 mb-2">
                <Truck className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <h4 className="text-sm font-medium text-luxury-paper">Shipping Information</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-7">
                Shipping costs are not included at checkout. A Treasure Arts representative will contact you after order confirmation to communicate shipping costs and delivery arrangements.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <ShieldCheck className="w-4 h-4 text-luxury-gold" /> Secure Checkout
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Award className="w-4 h-4 text-luxury-gold" /> Premium Quality Guarantee
              </div>
            </div>
            
            {/* Mobile Actions */}
            <div className="block lg:hidden mt-10">
              {hasCustomItems ? (
                <button
                  type="button"
                  onClick={handleCustomConsultation}
                  className="w-full bg-luxury-gold text-black px-8 py-5 text-sm tracking-widest uppercase font-bold hover:bg-white transition-colors flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Request Consultation
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full bg-luxury-gold text-black px-8 py-5 text-sm tracking-widest uppercase font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Confirm Secure Order"}
                </button>
              )}
            </div>

          </div>
        </div>
        
      </div>
      
      {/* Footer Support Notice */}
      <div className="container mx-auto px-4 mt-12 pb-12 border-b border-luxury-charcoal">
        <div className="max-w-3xl flex flex-col sm:flex-row items-center gap-6 justify-center text-center sm:text-left bg-luxury-charcoal/20 border border-luxury-charcoal p-6">
          <div className="w-12 h-12 rounded-full border border-luxury-gold flex items-center justify-center shrink-0">
            <MessageCircle className="w-6 h-6 text-luxury-gold" />
          </div>
          <div>
            <h4 className="font-serif text-lg text-luxury-paper mb-1">Need assistance during checkout?</h4>
            <p className="text-gray-400 text-sm font-light">Our luxury consultants are here to help.</p>
          </div>
          <a
            href={generateWhatsAppLink("Hello Treasure Arts, I need some help completing my checkout.")}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:ml-auto whitespace-nowrap border border-luxury-charcoal px-6 py-3 text-xs tracking-widest uppercase text-luxury-gold hover:border-luxury-gold hover:text-white transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
