"use client";

import { useContentStore } from "@/store/useContentStore";
import { Save } from "lucide-react";

export function ContactInfoForm() {
  const { contactInfo, updateContactInfo } = useContentStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Saved successfully!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Business Name</label>
          <input 
            type="text" 
            value={contactInfo.businessName}
            onChange={(e) => updateContactInfo({ businessName: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Email Address</label>
          <input 
            type="email" 
            value={contactInfo.email}
            onChange={(e) => updateContactInfo({ email: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Phone Number</label>
          <input 
            type="text" 
            value={contactInfo.phoneNumber}
            onChange={(e) => updateContactInfo({ phoneNumber: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">WhatsApp Number</label>
          <input 
            type="text" 
            value={contactInfo.whatsappNumber}
            onChange={(e) => updateContactInfo({ whatsappNumber: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Physical Address</label>
          <textarea 
            value={contactInfo.address}
            onChange={(e) => updateContactInfo({ address: e.target.value })}
            className="w-full h-20 bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors resize-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Working Hours</label>
          <input 
            type="text" 
            value={contactInfo.workingHours}
            onChange={(e) => updateContactInfo({ workingHours: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-4 border-t border-luxury-charcoal">
        <button 
          type="submit"
          className="flex items-center gap-2 bg-luxury-gold text-black px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
        >
          <Save className="w-4 h-4" /> Save Contact Info
        </button>
      </div>
    </form>
  );
}
