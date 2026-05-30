"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { Save } from "lucide-react";

export function StoreSettingsForm() {
  const { storeSettings, updateStoreSettings } = useSettingsStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Store Name</label>
          <input 
            type="text" 
            value={storeSettings.storeName}
            onChange={(e) => updateStoreSettings({ storeName: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Store Tagline</label>
          <input 
            type="text" 
            value={storeSettings.storeTagline}
            onChange={(e) => updateStoreSettings({ storeTagline: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Store Logo URL</label>
          <input 
            type="text" 
            value={storeSettings.storeLogoUrl}
            onChange={(e) => updateStoreSettings({ storeLogoUrl: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Favicon URL</label>
          <input 
            type="text" 
            value={storeSettings.faviconUrl}
            onChange={(e) => updateStoreSettings({ faviconUrl: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Default Currency</label>
          <input 
            type="text" 
            value={storeSettings.defaultCurrency}
            onChange={(e) => updateStoreSettings({ defaultCurrency: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Store Timezone</label>
          <input 
            type="text" 
            value={storeSettings.storeTimezone}
            onChange={(e) => updateStoreSettings({ storeTimezone: e.target.value })}
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
