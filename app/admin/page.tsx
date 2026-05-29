"use client";

import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import Link from "next/link";

const demoStats = [
  { label: "Total Products", value: "34", icon: Package },
  { label: "Total Orders", value: "128", icon: ShoppingCart },
  { label: "Total Customers", value: "412", icon: Users },
  { label: "Pending Orders", value: "3", icon: ShoppingCart },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-2">Dashboard Overview</h1>
          <p className="text-gray-400 font-light text-sm">Welcome to the Treasure Arts Administrative Hub.</p>
        </div>
        <Link 
          href="/admin/orders" 
          className="bg-luxury-gold text-black border border-luxury-gold px-6 py-3 text-xs tracking-widest uppercase font-bold hover:bg-transparent hover:text-luxury-gold transition-colors text-center"
        >
          View Pending Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {demoStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-xs uppercase tracking-widest text-gray-400">{stat.label}</div>
                <Icon className="w-5 h-5 text-luxury-gold" />
              </div>
              <div className="font-serif text-3xl text-luxury-paper">{stat.value}</div>
            </div>
          );
        })}
        <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6 md:col-span-2 lg:col-span-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">Total Revenue (Demo)</div>
            <div className="font-serif text-4xl text-luxury-paper">₦4,250,000</div>
          </div>
          <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold flex items-center justify-center rounded-full">
            <DollarSign className="w-6 h-6 text-luxury-gold" />
          </div>
        </div>
      </div>

    </div>
  );
}
