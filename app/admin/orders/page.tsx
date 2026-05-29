"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { Filter } from "lucide-react";
import { Eye } from "lucide-react";
import { Clock } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { UserCircle } from "lucide-react";
import { XCircle } from "lucide-react";
import { useAdminOrdersStore, AdminOrder } from "@/store/useAdminOrdersStore";

export default function AdminOrdersPage() {
  const { orders } = useAdminOrdersStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || order.fulfillmentStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

  const getPaymentStatusIcon = (status: AdminOrder['paymentStatus']) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 className="w-3 h-3 text-green-400" />;
      case 'pending': return <Clock className="w-3 h-3 text-yellow-400" />;
      case 'failed':
      case 'refunded': return <XCircle className="w-3 h-3 text-red-400" />;
      default: return null;
    }
  };

  return (
    <div className="pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-2">Order Queue</h1>
          <p className="text-gray-400 font-light text-sm">Track and manage customer curations and shipments.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-luxury-charcoal/10 p-4 border border-luxury-charcoal mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search orders, customers, emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-transparent border border-luxury-charcoal text-luxury-paper focus:outline-none focus:border-white transition-colors text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper py-2 px-3 focus:outline-none focus:border-white transition-colors text-sm uppercase tracking-wider"
          >
            <option value="all">All Statuses</option>
            <option value="received">Received</option>
            <option value="processing">Processing</option>
            <option value="ready_for_shipping">Ready for Shipping</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-luxury-charcoal/10 border border-luxury-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-luxury-charcoal/30 text-xs tracking-widest uppercase text-gray-400 border-b border-luxury-charcoal">
              <tr>
                <th className="px-6 py-4 font-medium">Order Number</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-charcoal">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-luxury-charcoal/20 transition-colors">
                    <td className="px-6 py-4 font-mono text-luxury-gold uppercase">{order.orderNumber}</td>
                    <td className="px-6 py-4">{format(new Date(order.date), "MMM d, yyyy")}</td>
                    <td className="px-6 py-4 text-luxury-paper">
                      <div className="flex items-center gap-2 mb-1">
                        <UserCircle className="w-4 h-4 text-gray-500" /> {order.customerName}
                      </div>
                      <div className="text-gray-500 text-[10px] tracking-wider uppercase ml-6">{order.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-luxury-paper">
                        {getPaymentStatusIcon(order.paymentStatus)}
                        {order.paymentStatus}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-luxury-paper">₦{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 flex w-fit items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold border ${getStatusBadgeColor(order.fulfillmentStatus)}`}>
                        {order.fulfillmentStatus.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-end text-gray-400">
                      <Link 
                        href={`/admin/orders/${order.id}`}
                        className="flex items-center gap-2 text-[10px] tracking-widest uppercase hover:text-white transition-colors border border-luxury-charcoal px-3 py-1.5 hover:border-white"
                      >
                        <Eye className="w-3 h-3" /> View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 tracking-wider text-xs uppercase">
                    No orders found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
