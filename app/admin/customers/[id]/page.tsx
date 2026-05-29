"use client";

import { use, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { User } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";
import { Tag } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Calendar } from "lucide-react";
import { Plus } from "lucide-react";
import { Save } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { useAdminCustomersStore, CustomerStatus, LeadType, CustomerNote } from "@/store/useAdminCustomersStore";

export default function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { customers, updateCustomerStatus, addCustomerNote, updateConsultationStatus } = useAdminCustomersStore();
  const customer = customers.find((c) => c.id === unwrappedParams.id);

  const [noteContent, setNoteContent] = useState("");
  const [noteType, setNoteType] = useState<CustomerNote['type']>("general");
  const [isAddingNote, setIsAddingNote] = useState(false);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <User className="w-12 h-12 mb-4 opacity-50" />
        <h2 className="text-xl font-serif text-luxury-paper mb-2">Customer Not Found</h2>
        <Link href="/admin/customers" className="text-sm border border-luxury-charcoal px-4 py-2 hover:text-white transition-colors">
          Return to Clientele
        </Link>
      </div>
    );
  }

  const handleStatusChange = (status: CustomerStatus) => {
    updateCustomerStatus(customer.id, status);
  };

  const handleAddNote = () => {
    if (!noteContent.trim()) return;
    addCustomerNote(customer.id, {
      type: noteType,
      content: noteContent
    });
    setNoteContent("");
    setIsAddingNote(false);
  };

  const wpNumber = "2348100791114";
  const encodeMsg = (msg: string) => encodeURIComponent(msg);

  const getStatusBadgeColor = (status: CustomerStatus) => {
    switch (status) {
      case 'new': return 'text-blue-400 border-blue-400 bg-blue-400/5';
      case 'returning': return 'text-green-400 border-green-400 bg-green-400/5';
      case 'vip': return 'text-luxury-gold border-luxury-gold bg-luxury-gold/5';
      case 'custom_project': return 'text-purple-400 border-purple-400 bg-purple-400/5';
      case 'wholesale': return 'text-indigo-400 border-indigo-400 bg-indigo-400/5';
      case 'inactive': return 'text-gray-400 border-gray-400 bg-gray-400/5';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/5';
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
        <Link href="/admin/customers" className="flex items-center gap-1 hover:text-luxury-gold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Customers
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-1">{customer.name}</h1>
          <p className="text-gray-400 font-light text-sm">
            Customer since {format(new Date(customer.dateJoined), "MMMM d, yyyy")}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {customer.leadType !== 'none' && (
             <span className="px-3 py-2 flex items-center gap-2 text-xs tracking-widest uppercase font-bold border border-gray-600 text-gray-400 bg-gray-600/10">
               <Tag className="w-4 h-4" /> {customer.leadType.replace(/_/g, ' ')}
             </span>
          )}
          <select 
            value={customer.status}
            onChange={(e) => handleStatusChange(e.target.value as CustomerStatus)}
            className={`bg-[#0a0a0a] border border-luxury-charcoal py-2 px-3 focus:outline-none focus:border-white transition-colors text-xs uppercase tracking-widest font-bold ${getStatusBadgeColor(customer.status)}`}
          >
            <option value="new">New Customer</option>
            <option value="returning">Returning</option>
            <option value="vip">VIP</option>
            <option value="custom_project">Custom Project</option>
            <option value="wholesale">Wholesale</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Lifetime Value", value: `₦${customer.lifetimeValue.toLocaleString()}` },
          { label: "Total Orders", value: customer.ordersCount },
          { label: "Consultations", value: customer.consultations.length },
          { label: "Last Active", value: format(new Date(), "MMM d, yyyy") } // Using today for mock brevity
        ].map((stat, idx) => (
          <div key={idx} className="bg-luxury-charcoal/10 border border-luxury-charcoal p-4 text-center">
             <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">{stat.label}</div>
             <div className="text-xl font-medium text-luxury-paper">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Orders, Consultations, Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order History */}
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2 flex items-center justify-between">
              <span>Order History</span>
              <span className="text-luxury-paper">{customer.orderHistory.length} Orders</span>
            </h2>
            {customer.orderHistory.length > 0 ? (
              <div className="space-y-4">
                {customer.orderHistory.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 hover:bg-white/5 px-2 -mx-2 transition-colors">
                    <div>
                      <Link href={`/admin/orders/${order.id}`} className="font-mono text-luxury-gold hover:underline flex items-center gap-2">
                        {order.orderNumber} <ExternalLink className="w-3 h-3" />
                      </Link>
                      <div className="text-xs text-gray-500 mt-1">{format(new Date(order.date), "MMM d, yyyy")}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-luxury-paper font-medium">₦{order.total.toLocaleString()}</div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No orders found for this customer.</p>
            )}
          </div>

          {/* Consultations */}
          {customer.consultations.length > 0 && (
            <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2">Consultation Requests</h2>
              <div className="space-y-4 border border-luxury-charcoal">
                {customer.consultations.map((cons) => (
                  <div key={cons.id} className="p-4 bg-black/20">
                     <div className="flex items-start justify-between mb-2">
                       <div>
                         <div className="font-medium text-luxury-paper uppercase tracking-wider text-sm">{cons.type.replace(/_/g, ' ')}</div>
                         <div className="text-xs text-gray-500">{format(new Date(cons.date), "MMM d, yyyy")}</div>
                       </div>
                       <select
                         value={cons.status}
                         onChange={(e) => updateConsultationStatus(customer.id, cons.id, e.target.value as any)}
                         className="bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper py-1 px-2 focus:outline-none focus:border-white transition-colors text-xs uppercase tracking-wider"
                       >
                         <option value="pending">Pending</option>
                         <option value="contacted">Contacted</option>
                         <option value="quoted">Quoted</option>
                         <option value="closed">Closed</option>
                       </select>
                     </div>
                     <p className="text-sm text-gray-300 leading-relaxed border-t border-luxury-charcoal/50 pt-2">{cons.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Notes */}
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <div className="flex items-center justify-between mb-4 border-b border-luxury-charcoal pb-2">
              <h2 className="text-xs uppercase tracking-widest text-gray-400">Customer Notes</h2>
              <button 
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-luxury-gold hover:text-white transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Note
              </button>
            </div>

            {isAddingNote && (
              <div className="mb-6 bg-black/40 p-4 border border-luxury-gold/50">
                 <div className="mb-3">
                   <select 
                     value={noteType} 
                     onChange={(e) => setNoteType(e.target.value as any)}
                     className="bg-transparent border border-luxury-charcoal text-luxury-paper py-1.5 px-2 text-xs uppercase focus:outline-none focus:border-luxury-gold"
                   >
                     <option value="general">General Note</option>
                     <option value="sales">Sales Note</option>
                     <option value="consultation">Consultation Note</option>
                     <option value="follow_up">Follow Up</option>
                     <option value="delivery">Delivery Note</option>
                   </select>
                 </div>
                 <textarea
                   value={noteContent}
                   onChange={(e) => setNoteContent(e.target.value)}
                   className="w-full h-24 bg-transparent border border-luxury-charcoal text-luxury-paper p-3 text-sm focus:outline-none focus:border-luxury-gold resize-none mb-3"
                   placeholder="Type your note here..."
                 ></textarea>
                 <div className="flex justify-end gap-2">
                   <button 
                     onClick={() => setIsAddingNote(false)}
                     className="px-4 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={handleAddNote}
                     className="flex items-center gap-2 bg-luxury-gold text-black px-4 py-1.5 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
                   >
                     <Save className="w-3 h-3" /> Save Note
                   </button>
                 </div>
              </div>
            )}

            <div className="space-y-4">
              {customer.notes.length > 0 ? (
                customer.notes.slice().reverse().map((note) => (
                  <div key={note.id} className="bg-[#0a0a0a] p-4 border border-luxury-charcoal">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold px-2 py-0.5 border border-luxury-gold/30">
                        {note.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500">{format(new Date(note.date), "MMM d, yyyy h:mm a")}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">No notes added to this customer yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact, Addresses, Timeline */}
        <div className="space-y-6">
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Email</div>
                <div className="flex items-center gap-2 text-sm text-luxury-paper">
                  <Mail className="w-4 h-4 text-gray-500" /> {customer.email}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Phone</div>
                <div className="flex items-center gap-2 text-sm text-luxury-paper">
                  <Phone className="w-4 h-4 text-gray-500" /> {customer.phone}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <a 
                href={`https://wa.me/${wpNumber}?text=${encodeMsg(`Hello ${customer.name}, regarding your recent inquiry at Treasure Arts...`)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-2 text-xs tracking-widest uppercase transition-colors font-medium border border-transparent"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Message
              </a>
              <a 
                href={`mailto:${customer.email}`}
                className="w-full flex items-center justify-center gap-2 border border-luxury-charcoal hover:border-white px-3 py-2 text-xs tracking-widest uppercase text-luxury-paper transition-colors"
              >
                <Mail className="w-4 h-4" /> Send Email
              </a>
            </div>
          </div>

          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Saved Addresses
            </h2>
            {customer.addresses.length > 0 ? (
              <div className="space-y-4">
                {customer.addresses.map((addr) => (
                  <div key={addr.id} className="text-sm">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold block mb-1">
                      {addr.type} Address
                    </span>
                    <p className="text-gray-300">{addr.street}</p>
                    <p className="text-gray-400">{addr.city}, {addr.state}</p>
                    <p className="text-gray-400">{addr.country} {addr.postalCode}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No addresses on file.</p>
            )}
          </div>

          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-luxury-charcoal pb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Customer Timeline
            </h2>
            <div className="space-y-4">
              {customer.timeline.slice().reverse().map((event, idx) => (
                <div key={event.id} className="flex gap-4 relative">
                  {idx !== customer.timeline.length - 1 && (
                    <div className="absolute left-2 top-8 bottom-[-16px] w-[1px] bg-luxury-charcoal"></div>
                  )}
                  <div className="w-4 h-4 rounded-full mt-1 z-10 bg-luxury-charcoal border-2 border-luxury-gold"></div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm text-luxury-paper leading-tight">{event.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{format(new Date(event.date), "MMM d, yyyy")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
