"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { AlertTriangle, Save } from "lucide-react";

export function MaintenanceSettings() {
  const { maintenanceSettings, updateMaintenanceSettings } = useSettingsStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-luxury-charcoal/30 border border-[#333] p-4 flex items-start gap-4">
        <AlertTriangle className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-luxury-paper mb-1 uppercase tracking-widest">Warning</h3>
          <p className="text-gray-400 text-sm">
            Enabling maintenance mode will hide the storefront from public visitors.
            Administrators will still be able to access the /admin dashboard.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <input 
          type="checkbox"
          id="maintenanceModeEnabled"
          checked={maintenanceSettings.maintenanceModeEnabled}
          onChange={(e) => updateMaintenanceSettings({ maintenanceModeEnabled: e.target.checked })}
          className="w-4 h-4 accent-luxury-gold"
        />
        <label htmlFor="maintenanceModeEnabled" className="text-sm text-luxury-paper cursor-pointer uppercase tracking-widest text-xs font-bold">
          Enable Maintenance Mode
        </label>
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
