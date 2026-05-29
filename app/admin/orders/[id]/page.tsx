"use client";

import { use, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Truck } from "lucide-react";
import { User } from "lucide-react";
import { Phone } from "lucide-react";
import { Package } from "lucide-react";
import { Save } from "lucide-react";
import { MapPin } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { useAdminOrdersStore, AdminOrder, FulfillmentStatus, PaymentStatus } from "@/store/useAdminOrdersStore";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { orders, updateOrderStatus, updatePaymentStatus, updateShippingInfo, updateInternalNotes } = useAdminOrdersStore();
  const order = orders.find((o) => o.id === unwrappedParams.id);

  const [shippingCost, setShippingCost] = useState(order?.shippingInfo?.cost?.toString() || "");
  const [courier, setCourier] = useState(order?.shippingInfo?.courier || "");
  const [trackingNumber, setTrackingNumber] = useState(order?.shippingInfo?.trackingNumber || "");
  const [shippingNotes, setShippingNotes] = useState(order?.shippingInfo?.notes || "");
  const [internalNotes, setInternalNotes] = useState(order?.internalNotes || "");

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Package className="w-12 h-12 mb-4 opacity-50" />
        <h2 className="text-xl font-serif text-luxury-paper mb-2">Order Not Found</h2>
        <Link href="/admin/orders" className="text-sm border border-luxury-charcoal px-4 py-2 hover:text-white transition-colors">
          Return to Orders
        </Link>
      </div>
    );
  }

  const handleStatusUpdate = (status: FulfillmentStatus) => {
    updateOrderStatus(order.id, status, `Manually updated status to ${status.replace(/_/g, ' ')}`);
  };

  const handlePaymentUpdate = (status: PaymentStatus) => {
    updatePaymentStatus(order.id, status);
  };

  const saveShipping = () => {
    updateShippingInfo(order.id, {
      cost: shippingCost ? parseFloat(shippingCost) : undefined,
      courier,
      trackingNumber,
      notes: shippingNotes
    });
  };

  const saveNotes = () => {
    updateInternalNotes(order.id, internalNotes);
  };

  const wpNumber = "2348100791114";
  const encodeMsg = (msg: string) => encodeURIComponent(msg);

  const getStatusBadgeColor = (status: AdminOrder['fulfillmentStatus']) => {
    switch (status) {
      case 'received': return 'text-yellow-400 border-yellow-400 bg-yellow-400/5';
      case 'processing': return 'text-blue-400 border-blue-400 bg-blue-400/5';
      case 'ready_for_shipping': return 'text-purple-400 border-purple-400 bg-purple-400/5';
      case 'shipped': return 'text-indigo-400 border-indigo-400 bg-indigo-400/5';
      case 'delivered': return 'text-green-400 border-green-400 bg-green-400/5';
      case 'cancelled': return 'text-red-400 border-red-400 bg-red-400/5';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/5';
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
        <Link href="/admin/orders" className="flex items-center gap-1 hover:text-luxury-gold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-1 flex items-center gap-3">
            Order {order.orderNumber}
            <span className={`px-2 py-0.5 flex w-fit items-center gap-1 text-[10px] tracking-widest uppercase font-bold border ${getStatusBadgeColor(order.fulfillmentStatus)}`}>
              {order.fulfillmentStatus.replace(/_/g, ' ')}
            </span>
          </h1>
          <p className="text-gray-400 font-light text-sm">
            {format(new Date(order.date), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select 
            value={order.fulfillmentStatus}
            onChange={(e) => handleStatusUpdate(e.target.value as FulfillmentStatus)}
            className="bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper py-2 px-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors"
          >
            <option value="received">Received</option>
            <option value="processing">Processing</option>
            <option value="ready_for_shipping">Ready for Shipping</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Order details & Products */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2">Ordered Items</h2>
            <div className="divide-y divide-luxury-charcoal">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-luxury-charcoal/20 relative flex-shrink-0">
                    {item.image && <Image src={item.image} alt={item.productName} fill className="object-cover" sizes="64px" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-luxury-paper font-medium">{item.productName}</h3>
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right text-luxury-paper font-medium">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-luxury-charcoal mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>₦{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Shipping</span>
                <span>{order.shippingInfo?.cost ? `₦${order.shippingInfo.cost.toLocaleString()}` : "To be calculated"}</span>
              </div>
              <div className="flex justify-between text-luxury-paper font-bold text-lg pt-2 border-t border-luxury-charcoal/50">
                <span>Total</span>
                <span>₦{(order.total + (order.shippingInfo?.cost || 0)).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2">Timeline</h2>
            <div className="space-y-4">
              {order.timeline.map((event, idx) => (
                <div key={event.id} className="flex gap-4 relative">
                  {idx !== order.timeline.length - 1 && (
                    <div className="absolute left-2 top-8 bottom-[-16px] w-[1px] bg-luxury-charcoal"></div>
                  )}
                  <div className={`w-4 h-4 rounded-full mt-1 z-10 ${statusColorForTimeline(event.status)}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-luxury-paper capitalize">{event.status.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-gray-500">{format(new Date(event.date), "MMM d, h:mm a")}</p>
                    {event.note && <p className="text-sm text-gray-400 mt-1">{event.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Customer, Payment, Shipping */}
        <div className="space-y-6">
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Customer
            </h2>
            <div className="text-sm space-y-2 text-luxury-paper">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-gray-400">{order.email}</p>
              <p className="text-gray-400 flex items-center gap-2"><Phone className="w-3 h-3" /> {order.phone}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-luxury-charcoal space-y-2">
              <a 
                href={`https://wa.me/${wpNumber}?text=${encodeMsg(`Hello ${order.customerName}, regarding your Treasure Arts order ${order.orderNumber}...`)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-luxury-charcoal hover:border-white px-3 py-2 text-xs tracking-widest uppercase transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Contact via WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Payment
            </h2>
            <div className="flex items-center gap-2 mb-4 text-sm">
              Status: 
              <select 
                value={order.paymentStatus}
                onChange={(e) => handlePaymentUpdate(e.target.value as PaymentStatus)}
                className="bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper py-1 px-2 text-xs uppercase focus:outline-none focus:border-white"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            {order.paymentStatus === 'pending' && (
              <a 
                href={`https://wa.me/${wpNumber}?text=${encodeMsg(`Hi ${order.customerName}, a quick reminder about the pending payment of ₦${order.total.toLocaleString()} for your Treasure Arts order ${order.orderNumber}.`)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black px-3 py-2 text-xs tracking-widest uppercase transition-colors"
              >
                Send Payment Reminder
              </a>
            )}
          </div>

          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Shipping Address
            </h2>
            <div className="text-sm text-gray-400 leading-relaxed">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p>{order.shippingAddress.country}</p>
              {order.shippingAddress.postalCode && <p>{order.shippingAddress.postalCode}</p>}
            </div>
          </div>

          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2 flex items-center gap-2">
              <Truck className="w-4 h-4" /> Shipping Management
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-gray-500 text-xs mb-1">Shipping Cost (₦)</label>
                <input 
                  type="number" 
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  className="w-full bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-1.5 focus:outline-none focus:border-white"
                  placeholder="e.g. 5000"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs mb-1">Courier Name</label>
                <input 
                  type="text" 
                  value={courier}
                  onChange={(e) => setCourier(e.target.value)}
                  className="w-full bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-1.5 focus:outline-none focus:border-white"
                  placeholder="e.g. GIG Logistics"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs mb-1">Tracking Number</label>
                <input 
                  type="text" 
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-1.5 focus:outline-none focus:border-white"
                  placeholder="e.g. GIG-12345"
                />
              </div>
              <button 
                onClick={saveShipping}
                className="w-full flex items-center justify-center gap-2 bg-luxury-gold text-black px-3 py-2 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
                title="Save shipping details"
              >
                <Save className="w-4 h-4" /> Save Shipping
              </button>
            </div>
          </div>

          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2">Internal Notes</h2>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              className="w-full h-24 bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-2 text-sm focus:outline-none focus:border-white resize-none"
              placeholder="Add private notes about this order..."
            ></textarea>
            <button 
              onClick={saveNotes}
              className="mt-2 text-xs tracking-widest uppercase text-luxury-gold hover:text-white transition-colors"
              title="Save internal notes"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function statusColorForTimeline(status: string) {
  switch (status) {
    case 'received': return 'bg-yellow-500';
    case 'processing': return 'bg-blue-500';
    case 'ready_for_shipping': return 'bg-purple-500';
    case 'shipped': return 'bg-indigo-500';
    case 'delivered': return 'bg-green-500';
    case 'cancelled': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}
