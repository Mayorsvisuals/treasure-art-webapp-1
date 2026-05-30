"use client";

import { useState } from "react";
import { HeroContentForm } from "@/components/admin/content/HeroContentForm";
import { TestimonialsManager } from "@/components/admin/content/TestimonialsManager";
import { FAQManager } from "@/components/admin/content/FAQManager";
import { ContactInfoForm } from "@/components/admin/content/ContactInfoForm";
import { SocialLinksForm } from "@/components/admin/content/SocialLinksForm";
import { PoliciesEditor } from "@/components/admin/content/PoliciesEditor";
import { LayoutTemplate, MessageSquare, HelpCircle, Phone, Share2, FileText } from "lucide-react";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("homepage");

  const tabs = [
    { id: "homepage", label: "Homepage", icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: "testimonials", label: "Testimonials", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "faqs", label: "FAQs", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "contact", label: "Contact Info", icon: <Phone className="w-4 h-4" /> },
    { id: "social", label: "Social", icon: <Share2 className="w-4 h-4" /> },
    { id: "policies", label: "Policies", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="pb-16 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-luxury-paper mb-2">Content Management</h1>
        <p className="text-gray-400 font-light text-sm">Manage dynamic content displayed across your storefront.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors border ${
                activeTab === tab.id
                  ? "bg-luxury-gold text-black border-luxury-gold font-medium"
                  : "bg-[#0a0a0a] text-gray-400 border-luxury-charcoal hover:border-gray-500 hover:text-luxury-paper"
              }`}
            >
              {tab.icon}
              <span className="uppercase tracking-widest text-xs font-bold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-luxury-charcoal/10 border border-luxury-charcoal p-6 lg:p-8">
          {activeTab === "homepage" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-serif text-luxury-paper">Homepage Content</h2>
                <p className="text-sm text-gray-400 mt-1">Manage banners, headlines, and hero details.</p>
              </div>
              <HeroContentForm />
            </div>
          )}

          {activeTab === "testimonials" && (
            <div>
              <TestimonialsManager />
            </div>
          )}

          {activeTab === "faqs" && (
            <div>
               <FAQManager />
            </div>
          )}

          {activeTab === "contact" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-serif text-luxury-paper">Contact Information</h2>
                <p className="text-sm text-gray-400 mt-1">Update global addresses, numbers, and emails.</p>
              </div>
              <ContactInfoForm />
            </div>
          )}

          {activeTab === "social" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-serif text-luxury-paper">Social Media Links</h2>
                <p className="text-sm text-gray-400 mt-1">Connect your social platforms.</p>
              </div>
              <SocialLinksForm />
            </div>
          )}

          {activeTab === "policies" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-serif text-luxury-paper">Store Policies</h2>
                <p className="text-sm text-gray-400 mt-1">Edit terms, privacy, and shipping policies.</p>
              </div>
              <PoliciesEditor />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
