"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { Filter } from "lucide-react";
import { Mail } from "lucide-react";
import { Eye } from "lucide-react";
import { Phone } from "lucide-react";
import { Tag } from "lucide-react";
import { useAdminCustomersStore, CustomerStatus, LeadType } from "@/store/useAdminCustomersStore";

export default function AdminCustomersPage() {
  const { customers } = useAdminCustomersStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leadFilter, setLeadFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search);
      
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesLead = leadFilter === "all" || customer.leadType === leadFilter;
    
    return matchesSearch && matchesStatus && matchesLead;
  });

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
    <div className="pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-2">Customers</h1>
          <p className="text-gray-400 font-light text-sm">Manage customer relationships and purchase histories.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-luxury-charcoal/10 p-4 border border-luxury-charcoal mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
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
            <option value="all">All Status</option>
            <option value="new">New Customer</option>
            <option value="returning">Returning Customer</option>
            <option value="vip">VIP Customer</option>
            <option value="custom_project">Custom Project Lead</option>
            <option value="wholesale">Wholesale Lead</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={leadFilter}
            onChange={(e) => setLeadFilter(e.target.value)}
            className="bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper py-2 px-3 focus:outline-none focus:border-white transition-colors text-sm uppercase tracking-wider"
          >
            <option value="all">All Leads</option>
            <option value="custom_project">Custom Project</option>
            <option value="architectural">Architectural</option>
            <option value="interior_design">Interior Design</option>
            <option value="resin_supply_bulk">Resin Supply Bulk</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      <div className="bg-luxury-charcoal/10 border border-luxury-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-luxury-charcoal/30 text-xs tracking-widest uppercase text-gray-400 border-b border-luxury-charcoal">
              <tr>
                <th className="px-6 py-4 font-medium">Customer Name</th>
                <th className="px-6 py-4 font-medium">Status / Lead Type</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium">Total Orders</th>
                <th className="px-6 py-4 font-medium">Lifetime Value</th>
                <th className="px-6 py-4 text-right font-medium">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-charcoal">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-luxury-charcoal/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-luxury-paper">{customer.name}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Mail className="w-3 h-3" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Phone className="w-3 h-3" /> {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-2">
                      <span className={`px-2 py-0.5 w-fit flex items-center gap-1 text-[10px] tracking-widest uppercase font-bold border ${getStatusBadgeColor(customer.status)}`}>
                        {customer.status.replace('_', ' ')}
                      </span>
                      {customer.leadType !== 'none' && (
                         <span className="px-2 py-0.5 w-fit flex items-center gap-1 text-[10px] tracking-widest uppercase font-bold border border-gray-600 text-gray-400 bg-gray-600/10">
                           <Tag className="w-3 h-3" /> {customer.leadType.replace(/_/g, ' ')}
                         </span>
                      )}
                    </td>
                    <td className="px-6 py-4">{format(new Date(customer.dateJoined), "MMM d, yyyy")}</td>
                    <td className="px-6 py-4 font-mono">{customer.ordersCount}</td>
                    <td className="px-6 py-4 text-luxury-gold">₦{customer.lifetimeValue.toLocaleString()}</td>
                    <td className="px-6 py-4 flex items-center justify-end text-gray-400">
                      <Link 
                        href={`/admin/customers/${customer.id}`}
                        className="flex items-center gap-2 text-[10px] tracking-widest uppercase hover:text-white transition-colors border border-luxury-charcoal px-3 py-1.5 hover:border-white"
                      >
                        <Eye className="w-3 h-3" /> View Source
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 tracking-wider text-xs uppercase">
                    No customers found matching your filters.
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
