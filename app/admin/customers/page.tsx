"use client";

import { useState } from "react";
import { Mail, MoreVertical } from "lucide-react";

// Mock Data
const mockCustomers = [
  { id: "1", name: "Victoria Adebayo", email: "victoria.a@example.com", ordersCount: 4, spend: 350000, joinedDate: "Jan 12, 2026" },
  { id: "2", name: "Michael Chen", email: "m.chen99@example.com", ordersCount: 1, spend: 125000, joinedDate: "May 28, 2026" },
  { id: "3", name: "Sarah Johnson", email: "sarah.j.design@example.com", ordersCount: 2, spend: 650000, joinedDate: "Mar 04, 2026" },
  { id: "4", name: "Emeka Obi", email: "emeka.obi@example.com", ordersCount: 1, spend: 320000, joinedDate: "May 22, 2026" },
];

export default function AdminCustomersPage() {
  const [customers] = useState(mockCustomers);

  return (
    <div className="pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-2">Clientele</h1>
          <p className="text-gray-400 font-light text-sm">Manage customer relationships and purchase histories.</p>
        </div>
      </div>

      <div className="bg-luxury-charcoal/10 border border-luxury-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-luxury-charcoal/30 text-xs tracking-widest uppercase text-gray-400 border-b border-luxury-charcoal">
              <tr>
                <th className="px-6 py-4 font-medium">Customer Name</th>
                <th className="px-6 py-4 font-medium">Email Address</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium">Total Orders</th>
                <th className="px-6 py-4 font-medium">Total Spend</th>
                <th className="px-6 py-4 text-right font-medium">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-charcoal">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-luxury-charcoal/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-luxury-paper">{customer.name}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Mail className="w-3 h-3 text-gray-500" /> {customer.email}
                  </td>
                  <td className="px-6 py-4">{customer.joinedDate}</td>
                  <td className="px-6 py-4 font-mono">{customer.ordersCount}</td>
                  <td className="px-6 py-4 text-luxury-gold">₦{customer.spend.toLocaleString()}</td>
                  <td className="px-6 py-4 flex items-center justify-end text-gray-400">
                    <button className="hover:text-white transition-colors p-1"><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-luxury-charcoal flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 to 4 of 412 entries</span>
        </div>
      </div>
    </div>
  );
}
