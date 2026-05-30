"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { Save } from "lucide-react";

export function BusinessSettingsForm() {
  const { businessSettings, updateBusinessSettings } = useSettingsStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Business Registration Name</label>
          <input 
            type="text" 
            value={businessSettings.businessRegistrationName}
            onChange={(e) => updateBusinessSettings({ businessRegistrationName: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Support Email</label>
          <input 
            type="email" 
            value={businessSettings.supportEmail}
            onChange={(e) => updateBusinessSettings({ supportEmail: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Support Phone Number</label>
          <input 
            type="text" 
            value={businessSettings.supportPhoneNumber}
            onChange={(e) => updateBusinessSettings({ supportPhoneNumber: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">WhatsApp Number</label>
          <input 
            type="text" 
            value={businessSettings.whatsappNumber}
            onChange={(e) => updateBusinessSettings({ whatsappNumber: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
      </div>
      <div className="flex justify-end pt-4 border-t border-luxury-charcoal">
        <button 
          type="submit"
          className="flex items-center gap-2 bg-luxury-gold text-black px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
        >
          <Save className="w-4 h-4" /> Save
        </button>
      </div>
    </form>
  );
}
