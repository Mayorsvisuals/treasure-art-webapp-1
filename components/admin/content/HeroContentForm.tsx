"use client";

import { useContentStore } from "@/store/useContentStore";
import { Save } from "lucide-react";

export function HeroContentForm() {
  const { homepageContent, updateHomepageContent } = useContentStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save is handled via onChange immediately in Zustand, but you could add a toast here.
    alert("Saved successfully!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg text-luxury-paper font-serif border-b border-luxury-charcoal pb-2">Hero Section</h3>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Title</label>
            <input 
              type="text" 
              value={homepageContent.heroTitle}
              onChange={(e) => updateHomepageContent({ heroTitle: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Subtitle</label>
            <textarea 
              value={homepageContent.heroSubtitle}
              onChange={(e) => updateHomepageContent({ heroSubtitle: e.target.value })}
              className="w-full h-24 bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Button Text</label>
              <input 
                type="text" 
                value={homepageContent.heroButtonText}
                onChange={(e) => updateHomepageContent({ heroButtonText: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Button Link</label>
              <input 
                type="text" 
                value={homepageContent.heroButtonLink}
                onChange={(e) => updateHomepageContent({ heroButtonLink: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Background Image URL</label>
            <input 
              type="text" 
              value={homepageContent.heroBackgroundImageUrl}
              onChange={(e) => updateHomepageContent({ heroBackgroundImageUrl: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg text-luxury-paper font-serif border-b border-luxury-charcoal pb-2">Featured Sections</h3>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Featured Products Title</label>
            <input 
              type="text" 
              value={homepageContent.featuredProductsTitle}
              onChange={(e) => updateHomepageContent({ featuredProductsTitle: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Featured Categories Title</label>
            <input 
              type="text" 
              value={homepageContent.featuredCategoriesTitle}
              onChange={(e) => updateHomepageContent({ featuredCategoriesTitle: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          
          <h3 className="text-lg text-luxury-paper font-serif border-b border-luxury-charcoal pb-2 mt-6">Banners</h3>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Promotional Banner Text</label>
            <input 
              type="text" 
              value={homepageContent.promotionalBannerText}
              onChange={(e) => updateHomepageContent({ promotionalBannerText: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Announcement Bar Text</label>
            <input 
              type="text" 
              value={homepageContent.announcementBarText}
              onChange={(e) => updateHomepageContent({ announcementBarText: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4 border-t border-luxury-charcoal">
        <button 
          type="submit"
          className="flex items-center gap-2 bg-luxury-gold text-black px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
        >
          <Save className="w-4 h-4" /> Save Content
        </button>
      </div>
    </form>
  );
}
