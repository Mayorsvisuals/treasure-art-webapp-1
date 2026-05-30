"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { Save } from "lucide-react";

export function PaymentSettingsForm() {
  const { paymentSettings, updatePaymentSettings } = useSettingsStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Paystack Public Key</label>
          <input 
            type="text" 
            value={paymentSettings.paystackPublicKey}
            onChange={(e) => updatePaymentSettings({ paystackPublicKey: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Paystack Secret Key</label>
          <input 
            type="password" 
            value={paymentSettings.paystackSecretKey}
            onChange={(e) => updatePaymentSettings({ paystackSecretKey: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="checkbox"
            id="paymentEnabled"
            checked={paymentSettings.paymentEnabled}
            onChange={(e) => updatePaymentSettings({ paymentEnabled: e.target.checked })}
            className="w-4 h-4 accent-luxury-gold"
          />
          <label htmlFor="paymentEnabled" className="text-sm text-luxury-paper cursor-pointer uppercase tracking-widest text-xs">
            Payment Enabled
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
