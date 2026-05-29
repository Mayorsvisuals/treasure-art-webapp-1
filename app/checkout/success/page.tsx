"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Truck, ShieldCheck, Mail, MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/services/whatsapp";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  
  const [orderData, setOrderData] = useState<any>(null);
  
  useEffect(() => {
    // Attempt to load order data from session storage (prepared for future real persist)
    const stored = sessionStorage.getItem('lastOrder');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.ref === ref || (!ref && parsed)) {
          setOrderData(parsed);
        }
      } catch(e) {
        // ignore
      }
    }
  }, [ref]);

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-paper py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-20 h-20 bg-luxury-gold/10 border-2 border-luxury-gold rounded-full flex items-center justify-center mb-8 relative">
            <Check className="w-10 h-10 text-luxury-gold" />
            <div className="absolute inset-0 border border-luxury-gold rounded-full animate-ping opacity-20"></div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Thank You For Your Order</h1>
          <p className="text-gray-400 text-lg font-light">
            Your curation has been successfully received by Treasure Arts.
          </p>
          <div className="mt-8 bg-luxury-charcoal/30 border border-luxury-charcoal px-8 py-4 inline-flex items-center gap-4">
            <span className="text-sm tracking-widest uppercase text-gray-500">Order Reference</span>
            <span className="text-xl font-mono text-luxury-gold font-bold">{ref || orderData?.ref || "TA-PENDING"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-luxury-black border border-luxury-charcoal p-8">
            <h3 className="text-sm tracking-widest uppercase text-gray-400 mb-6 border-b border-luxury-charcoal pb-2">Next Steps</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <Truck className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Shipping & Delivery</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    A Treasure Arts representative will contact you shortly to communicate customized shipping costs based on your location and the delicate nature of your pieces.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Order Confirmation</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    An email containing your complete order details will be sent to you.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-luxury-black border border-luxury-charcoal p-8">
            <h3 className="text-sm tracking-widest uppercase text-gray-400 mb-6 border-b border-luxury-charcoal pb-2">Customer Details</h3>
            {orderData?.customer ? (
              <div className="space-y-3 font-light text-sm">
                <p><span className="text-gray-500 w-20 inline-block">Name:</span> {orderData.customer.firstName} {orderData.customer.lastName}</p>
                <p><span className="text-gray-500 w-20 inline-block">Email:</span> {orderData.customer.email}</p>
                <p><span className="text-gray-500 w-20 inline-block">Phone:</span> {orderData.customer.phone}</p>
                <p className="flex"><span className="text-gray-500 w-20 shrink-0">Address:</span> <span>{orderData.customer.address}<br/>{orderData.customer.city}, {orderData.customer.state}<br/>{orderData.customer.country}</span></p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm font-light">
                Customer information is being processed securely.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/shop"
            className="border-b border-luxury-charcoal pb-1 text-sm tracking-widest uppercase text-gray-400 hover:text-white hover:border-white transition-all"
          >
            Continue Exploring
          </Link>
          <a
            href={generateWhatsAppLink(`Hello Treasure Arts, I just placed an order (Ref: ${ref || orderData?.ref || "TA-PENDING"}). I would like to discuss next steps.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-luxury-gold text-black px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> Message Consultant
          </a>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-luxury-black"></div>}>
      <SuccessContent />
    </Suspense>
  );
}
