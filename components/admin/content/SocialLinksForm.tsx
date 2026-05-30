"use client";

import { useContentStore } from "@/store/useContentStore";
import { Save } from "lucide-react";

export function SocialLinksForm() {
  const { socialLinks, updateSocialLinks } = useContentStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Saved successfully!");
  };

  const fields = [
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'facebook', label: 'Facebook URL' },
    { key: 'tiktok', label: 'TikTok URL' },
    { key: 'pinterest', label: 'Pinterest URL' },
    { key: 'linkedin', label: 'LinkedIn URL' },
    { key: 'youtube', label: 'YouTube URL' },
  ] as const;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">{label}</label>
            <input 
              type="text" 
              value={socialLinks[key]}
              onChange={(e) => updateSocialLinks({ [key]: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
              placeholder="https://..."
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-end pt-4 border-t border-luxury-charcoal">
        <button 
          type="submit"
          className="flex items-center gap-2 bg-luxury-gold text-black px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
        >
          <Save className="w-4 h-4" /> Save Social Links
        </button>
      </div>
    </form>
  );
}
