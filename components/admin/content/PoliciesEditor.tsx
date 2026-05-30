"use client";

import { useContentStore, StorePolicies } from "@/store/useContentStore";
import { Save } from "lucide-react";

export function PoliciesEditor() {
  const { storePolicies, updateStorePolicies } = useContentStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Saved successfully!");
  };

  const fields: { key: keyof StorePolicies; label: string }[] = [
    { key: 'privacyPolicy', label: 'Privacy Policy' },
    { key: 'termsConditions', label: 'Terms & Conditions' },
    { key: 'shippingPolicy', label: 'Shipping Policy' },
    { key: 'refundPolicy', label: 'Refund Policy' },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-8">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">{label}</label>
            <textarea 
              value={storePolicies[key]}
              onChange={(e) => updateStorePolicies({ [key]: e.target.value })}
              className="w-full h-48 bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors"
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-end pt-4 border-t border-luxury-charcoal">
        <button 
          type="submit"
          className="flex items-center gap-2 bg-luxury-gold text-black px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
        >
          <Save className="w-4 h-4" /> Save Policies
        </button>
      </div>
    </form>
  );
}
