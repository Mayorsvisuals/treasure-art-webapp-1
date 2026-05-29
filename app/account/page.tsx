"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-luxury-black">
      <PageHero
        title="My Account"
        imageUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="py-24 flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="flex flex-col gap-2">
                <div className="mb-8 px-4">
                  <h3 className="font-serif text-2xl text-luxury-paper mb-1">
                    Welcome,
                  </h3>
                  <p className="text-gray-400 font-light">Valued Client</p>
                </div>

                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 text-sm tracking-wider uppercase transition-colors text-left",
                        activeTab === tab.id
                          ? "text-luxury-gold bg-luxury-charcoal/50 border-l-2 border-luxury-gold"
                          : "text-gray-400 hover:text-luxury-paper hover:bg-luxury-charcoal/20",
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {tab.label}
                    </button>
                  );
                })}

                <button className="flex items-center gap-4 px-4 py-3 text-sm tracking-wider uppercase text-gray-500 hover:text-red-400 hover:bg-luxury-charcoal/20 transition-colors text-left mt-8">
                  <LogOut className="w-4 h-4 shrink-0" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-luxury-charcoal/10 border border-luxury-charcoal p-8 min-h-[500px]">
              {activeTab === "profile" && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="font-serif text-3xl text-luxury-paper mb-8">
                    Profile Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value="Client"
                        disabled
                        className="w-full bg-luxury-black/50 border-b border-luxury-charcoal py-3 text-luxury-paper outline-none cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value="User"
                        disabled
                        className="w-full bg-luxury-black/50 border-b border-luxury-charcoal py-3 text-luxury-paper outline-none cursor-not-allowed"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value="client@example.com"
                        disabled
                        className="w-full bg-luxury-black/50 border-b border-luxury-charcoal py-3 text-luxury-paper outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <button className="mt-8 border border-luxury-charcoal text-luxury-paper text-xs font-bold uppercase tracking-widest px-8 py-3 hover:border-luxury-gold hover:text-luxury-gold transition-colors">
                    Edit Profile Actions Placeholder
                  </button>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="font-serif text-3xl text-luxury-paper mb-8">
                    Order History
                  </h2>
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Package className="w-12 h-12 text-luxury-charcoal mb-4" />
                    <h3 className="text-xl text-luxury-paper mb-2 font-serif">
                      No Orders Yet
                    </h3>
                    <p className="text-gray-400 font-light max-w-sm mb-6">
                      When you commission a custom project or purchase a piece,
                      it will appear here.
                    </p>
                    <Link
                      href="/shop"
                      className="text-luxury-gold uppercase tracking-widest text-xs font-medium hover:text-white transition-colors border-b border-luxury-gold pb-1"
                    >
                      Start Exploring
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="font-serif text-3xl text-luxury-paper mb-8">
                    Saved Items
                  </h2>
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Heart className="w-12 h-12 text-luxury-charcoal mb-4" />
                    <h3 className="text-xl text-luxury-paper mb-2 font-serif">
                      Empty Wishlist
                    </h3>
                    <p className="text-gray-400 font-light max-w-sm mb-6">
                      You haven't saved any items to your wishlist yet.
                    </p>
                    <Link
                      href="/shop"
                      className="text-luxury-gold uppercase tracking-widest text-xs font-medium hover:text-white transition-colors border-b border-luxury-gold pb-1"
                    >
                      Discover Pieces
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="font-serif text-3xl text-luxury-paper mb-8">
                    Account Settings
                  </h2>
                  <p className="text-gray-400 font-light">
                    Preferences and account management UI placeholder.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
