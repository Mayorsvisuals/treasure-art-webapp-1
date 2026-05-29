"use client";

import { useState } from "react";
import { Eye, Clock, CheckCircle2, UserCircle } from "lucide-react";

// Mock Data
const mockOrders = [
  { id: "TA-914285", customer: "Sarah Johnson", date: "May 29, 2026", status: "Pending", total: 450000 },
  { id: "TA-219401", customer: "Michael Chen", date: "May 28, 2026", status: "Processing", total: 125000 },
  { id: "TA-502912", customer: "Victoria Adebayo", date: "May 25, 2026", status: "Completed", total: 85000 },
  { id: "TA-110293", customer: "Emeka Obi", date: "May 22, 2026", status: "Completed", total: 320000 },
];

export default function AdminOrdersPage() {
  const [orders] = useState(mockOrders);

  return (
    <div className="pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-2">Order Queue</h1>
          <p className="text-gray-400 font-light text-sm">Track and manage customer curations and shipments.</p>
        </div>
      </div>

      <div className="bg-luxury-charcoal/10 border border-luxury-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-luxury-charcoal/30 text-xs tracking-widest uppercase text-gray-400 border-b border-luxury-charcoal">
              <tr>
                <th className="px-6 py-4 font-medium">Order Number</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-charcoal">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-luxury-charcoal/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-luxury-gold uppercase">{order.id}</td>
                  <td className="px-6 py-4 text-luxury-paper flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-gray-500" /> {order.customer}
                  </td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 flex w-fit items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold border ${
                      order.status === 'Completed' ? 'text-green-400 border-green-400 bg-green-400/5' :
                      order.status === 'Processing' ? 'text-blue-400 border-blue-400 bg-blue-400/5' :
                      'text-yellow-400 border-yellow-400 bg-yellow-400/5'
                    }`}>
                      {order.status === 'Pending' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-luxury-paper">₦{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4 flex items-center justify-end text-gray-400">
                    <button className="flex items-center gap-2 text-[10px] tracking-widest uppercase hover:text-white transition-colors border border-luxury-charcoal px-3 py-1.5 hover:border-white">
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-luxury-charcoal flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 to 4 of 128 entries</span>
        </div>
      </div>
    </div>
  );
}
