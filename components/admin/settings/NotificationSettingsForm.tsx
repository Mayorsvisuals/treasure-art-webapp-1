"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { Save } from "lucide-react";

export function NotificationSettingsForm() {
  const { notificationSettings, updateNotificationSettings } = useSettingsStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input 
            type="checkbox"
            id="newOrderNotifications"
            checked={notificationSettings.newOrderNotifications}
            onChange={(e) => updateNotificationSettings({ newOrderNotifications: e.target.checked })}
            className="w-4 h-4 accent-luxury-gold"
          />
          <label htmlFor="newOrderNotifications" className="text-sm text-luxury-paper cursor-pointer uppercase tracking-widest text-xs">
            New Order Notifications
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="checkbox"
            id="customerSignupNotifications"
            checked={notificationSettings.customerSignupNotifications}
            onChange={(e) => updateNotificationSettings({ customerSignupNotifications: e.target.checked })}
            className="w-4 h-4 accent-luxury-gold"
          />
          <label htmlFor="customerSignupNotifications" className="text-sm text-luxury-paper cursor-pointer uppercase tracking-widest text-xs">
            Customer Signup Notifications
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="checkbox"
            id="contactFormNotifications"
            checked={notificationSettings.contactFormNotifications}
            onChange={(e) => updateNotificationSettings({ contactFormNotifications: e.target.checked })}
            className="w-4 h-4 accent-luxury-gold"
          />
          <label htmlFor="contactFormNotifications" className="text-sm text-luxury-paper cursor-pointer uppercase tracking-widest text-xs">
            Contact Form Notifications
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="checkbox"
            id="marketingNotifications"
            checked={notificationSettings.marketingNotifications}
            onChange={(e) => updateNotificationSettings({ marketingNotifications: e.target.checked })}
            className="w-4 h-4 accent-luxury-gold"
          />
          <label htmlFor="marketingNotifications" className="text-sm text-luxury-paper cursor-pointer uppercase tracking-widest text-xs">
            Marketing Notifications
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
