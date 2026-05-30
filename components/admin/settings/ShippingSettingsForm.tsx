"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { Save } from "lucide-react";

export function ShippingSettingsForm() {
  const { shippingSettings, updateShippingSettings } = useSettingsStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Local Shipping Fee</label>
          <input 
            type="number" 
            value={shippingSettings.localShippingFee}
            onChange={(e) => updateShippingSettings({ localShippingFee: Number(e.target.value) })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Free Shipping Threshold</label>
          <input 
            type="number" 
            value={shippingSettings.freeShippingThreshold}
            onChange={(e) => updateShippingSettings({ freeShippingThreshold: Number(e.target.value) })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="checkbox"
            id="internationalShippingEnabled"
            checked={shippingSettings.internationalShippingEnabled}
            onChange={(e) => updateShippingSettings({ internationalShippingEnabled: e.target.checked })}
            className="w-4 h-4 accent-luxury-gold"
          />
          <label htmlFor="internationalShippingEnabled" className="text-sm text-luxury-paper cursor-pointer uppercase tracking-widest text-xs">
            International Shipping Enabled
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="checkbox"
            id="storePickupEnabled"
            checked={shippingSettings.storePickupEnabled}
            onChange={(e) => updateShippingSettings({ storePickupEnabled: e.target.checked })}
            className="w-4 h-4 accent-luxury-gold"
          />
          <label htmlFor="storePickupEnabled" className="text-sm text-luxury-paper cursor-pointer uppercase tracking-widest text-xs">
            Store Pickup Enabled
          </label>
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
